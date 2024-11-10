import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectKnex, Knex } from 'nestjs-knex';
import { firstValueFrom } from 'rxjs';
import { IApiResponse, ITariffData } from './wildberries-data.interface';

@Injectable()
export class WildberriesDataService {
  private readonly apiUrl =
    'https://common-api.wildberries.ru/api/v1/tariffs/box';
  private readonly token = `Bearer ${process.env.WB_API_TOKEN}`;

  constructor(
    private readonly httpService: HttpService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  async fetchDataFromApi(date: string): Promise<IApiResponse | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ response: { data: IApiResponse } }>(
          this.apiUrl,

          {
            headers: {
              Authorization: this.token,
              Accept: 'application/json',
            },
            params: { date },
          },
        ),
      );
      return response.data.response.data;
    } catch (error) {
      console.error('Error to request API Wildberries:', error);
      return null;
    }
  }

  async saveOrUpdateData(warehouseList: ITariffData[]): Promise<void> {
    for (const item of warehouseList) {
      try {
        await this.knex('tariffs').insert({
          boxDeliveryAndStorageExpr: item.boxDeliveryAndStorageExpr,
          boxDeliveryBase: item.boxDeliveryBase,
          boxDeliveryLiter: item.boxDeliveryLiter,
          boxStorageBase: item.boxStorageBase,
          boxStorageLiter: item.boxStorageLiter,
          warehouseName: item.warehouseName,
        });
      } catch (error) {
        console.error('Error saving data to DB:', error);
      }
    }
  }

  async fetchAndSaveData(): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const data = await this.fetchDataFromApi(today);

    if (data && Array.isArray(data.warehouseList)) {
      await this.saveOrUpdateData(data.warehouseList);
    } else {
      console.error(
        'The provided data does not contain warehouseList or has an incorrect format',
      );
    }
  }
}
