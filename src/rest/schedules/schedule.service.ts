import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WildberriesDataService } from '../wildberries/wildberries-data.service';

@Injectable()
export class ScheduleService {
  /**
   * Initializes the ScheduleService with WildberriesDataService dependency.
   * @param {WildberriesDataService} wildberriesService - Service to fetch and save Wildberries API data
   */
  constructor(private readonly wildberriesService: WildberriesDataService) {}

  /**
   * Cron job that runs every hour to fetch and save data from the Wildberries API.
   * Logs success or error information after each execution.
   * @returns {Promise<void>}
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyTask(): Promise<void> {
    try {
      await this.wildberriesService.fetchAndSaveData();
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error to update data:', error);
    }
  }
}
