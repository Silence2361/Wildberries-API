import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import knexConfig from './config/knexfile';
import { WildberriesDataModule } from './rest/wildberries/wildberries-data.module';
import { GoogleSheetsModule } from './rest/google-sheets/google-sheets.module';
import { ScheduleModule } from './rest/schedules/schedule.module';

@Module({
  imports: [
    HttpModule,
    KnexModule.forRoot({
      config: knexConfig,
    }),
    GoogleSheetsModule,
    WildberriesDataModule,
    ScheduleModule,
  ],
})
export class AppModule {}
