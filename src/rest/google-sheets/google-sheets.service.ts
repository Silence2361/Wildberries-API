import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

/**
 * Service for exporting data from PostgreSQL to Google Sheets.
 * Uses Google Sheets API to update multiple Google Sheets with data from the database.
 */
@Injectable()
export class GoogleSheetsService {
  private sheets = google.sheets('v4');
  private authClient;

  /**
   * Constructs an instance of GoogleSheetsService with Google Sheets API authorization.
   * @param {Knex} knex - The Knex instance for database operations.
   */
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.authClient = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  /**
   * Exports data from the database to multiple Google Sheets.
   * @param {string[]} spreadsheetIds - Array of Google Sheets IDs
   * @param {string} [range='stocks_coefs!A2'] - The range to write data in each sheet
   * @returns {Promise<void>} - Resolves when data export is complete.
   * @throws {TypeError} - If spreadsheetIds is not an array.
   */
  async exportDataToSheets(
    spreadsheetIds: string[],
    range: string = 'stocks_coefs!A2',
  ): Promise<void> {
    if (!Array.isArray(spreadsheetIds)) {
      throw new TypeError('spreadsheetIds must be an array');
    }

    const auth = await this.authClient.getClient();

    const data = await this.knex('tariffs')
      .select(
        'boxDeliveryAndStorageExpr',
        'boxDeliveryBase',
        'boxDeliveryLiter',
        'boxStorageBase',
        'boxStorageLiter',
        'warehouseName',
      )
      .orderBy('boxDeliveryAndStorageExpr', 'asc');

    const values = data.map((item) => [
      item.boxDeliveryAndStorageExpr,
      item.boxDeliveryBase,
      item.boxDeliveryLiter,
      item.boxStorageBase,
      item.boxStorageLiter,
      item.warehouseName,
    ]);

    for (const spreadsheetId of spreadsheetIds) {
      try {
        await this.sheets.spreadsheets.values.update({
          auth,
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: { values },
        });
      } catch (error) {
        console.error(
          `Error exporting data to Google Sheets with ID: ${spreadsheetId}`,
          error,
        );
      }
    }
  }
}
