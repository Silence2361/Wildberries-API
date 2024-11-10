import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class GoogleSheetsService {
  /** Google Sheets API instance */
  private sheets = google.sheets('v4');

  /** Authentication client for Google Sheets API */
  private authClient;

  /**
   * Initializes the GoogleSheetsService with database and authentication configurations.
   * @param {Knex} knex - Knex instance for interacting with the database
   */
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.authClient = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  /**
   * Exports data from the database to a specified range in a Google Sheets spreadsheet.
   * Fetches tariff data from the database, organizes it into a format suitable for Google Sheets,
   * and writes it to the specified range in the target spreadsheet.
   * @param {string} spreadsheetId - ID of the Google Sheets spreadsheet to export data to
   * @param {string} [range='stocks_coefs!A2'] - The range within the spreadsheet where data will be written
   * @returns {Promise<void>}
   */
  async exportDataToSheet(
    spreadsheetId: string,
    range: string = 'stocks_coefs!A2',
  ): Promise<void> {
    try {
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

      await this.sheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: { values },
      });
      console.log('Data successfully exported to Google Sheets');
    } catch (error) {
      console.error('Error exporting data to Google Sheets:', error);
    }
  }
}
