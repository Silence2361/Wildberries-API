import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WildberriesDataService } from '../wildberries/wildberries-data.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly wildberriesService: WildberriesDataService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyTask() {
    try {
      await this.wildberriesService.fetchAndSaveData();
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error to update data:', error);
    }
  }
}
