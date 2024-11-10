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
   * @param {string[]} spreadsheetIds - Array of Google Sheets IDs
   * @returns {Promise<void>} Confirmation message or an error if the export fails
   */
  @Post('export')
  async exportToGoogleSheet(
    @Body('spreadsheetIds') spreadsheetIds: string[],
  ): Promise<void> {
    await this.googleSheetsService.exportDataToSheets(spreadsheetIds);
  }
}
