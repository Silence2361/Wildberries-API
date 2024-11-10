import { Body, Controller, Post } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  /**
   * Initializes the GoogleSheetsController with the GoogleSheetsService.
   * @param {GoogleSheetsService} googleSheetsService - Service for handling Google Sheets export functionality
   */
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  /**
   * Endpoint to export data to a specified Google Sheets spreadsheet.
   * @param {string} spreadsheetId - The ID of the Google Sheets spreadsheet where data will be exported
   * @returns {Promise<void>} Confirmation message or an error if the export fails
   */
  @Post('export')
  async exportToGoogleSheet(@Body('spreadsheetId') spreadsheetId: string) {
    return this.googleSheetsService.exportDataToSheet(spreadsheetId);
  }
}
