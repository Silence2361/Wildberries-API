import { Body, Controller, Post } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @Post('export')
  async exportToGoogleSheet(@Body('spreadsheetId') spreadsheetId: string) {
    return this.googleSheetsService.exportDataToSheet(spreadsheetId);
  }
}
