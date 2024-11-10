import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

@Injectable()
export class GoogleSheetsService {
  private sheets = google.sheets('v4');
  private authClient;

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
