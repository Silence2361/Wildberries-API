import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WildberriesDataService } from './wildberries-data.service';
import { WildberriesDataController } from './wildberries-data.controller';

@Module({
  imports: [HttpModule],
  providers: [WildberriesDataService],
  controllers: [WildberriesDataController],
  exports: [WildberriesDataService],
})
export class WildberriesDataModule {}
