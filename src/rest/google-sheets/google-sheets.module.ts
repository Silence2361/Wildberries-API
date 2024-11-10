import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleSheetsService } from './google-sheets.service';
import { GoogleSheetsController } from './google-sheets.controller';

@Module({
  imports: [HttpModule],
  providers: [GoogleSheetsService],
  controllers: [GoogleSheetsController],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {}
