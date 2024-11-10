import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';
import { WildberriesDataService } from '../wildberries/wildberries-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [NestScheduleModule.forRoot(), HttpModule],
  providers: [ScheduleService, WildberriesDataService],
})
export class ScheduleModule {}
