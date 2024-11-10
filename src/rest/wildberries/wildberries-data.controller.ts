import { Controller, Post } from '@nestjs/common';
import { WildberriesDataService } from './wildberries-data.service';

@Controller('wildberries')
export class WildberriesDataController {
  constructor(
    private readonly wildberriesDataService: WildberriesDataService,
  ) {}

  @Post('fetch-and-save')
  async fetchDataAndSaveToDB(): Promise<void> {
    await this.wildberriesDataService.fetchAndSaveData();
  }
}
