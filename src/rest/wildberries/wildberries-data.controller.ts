import { Controller, Post } from '@nestjs/common';
import { WildberriesDataService } from './wildberries-data.service';

@Controller('wildberries')
export class WildberriesDataController {
  /**
   * Initializes the WildberriesDataController with the WildberriesDataService.
   * @param {WildberriesDataService} wildberriesDataService - Service for handling data fetching and saving from the Wildberries API
   */

  constructor(
    private readonly wildberriesDataService: WildberriesDataService,
  ) {}

  /**
   * Endpoint to fetch data from the Wildberries API and save it to the database.
   * @returns {Promise<void>} A promise that resolves once the data is fetched and saved
   */
  @Post('fetch-and-save')
  async fetchDataAndSaveToDB(): Promise<void> {
    await this.wildberriesDataService.fetchAndSaveData();
  }
}
