import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectKnex, Knex } from 'nestjs-knex';
import { firstValueFrom } from 'rxjs';
import { IApiResponse, ITariffData } from './wildberries-data.interface';

@Injectable()
export class WildberriesDataService {
  /** The Wildberries API URL for retrieving box tariffs */
  private readonly apiUrl =
    'https://common-api.wildberries.ru/api/v1/tariffs/box';

  /** API authorization token */
  private readonly token = `Bearer ${process.env.WB_API_TOKEN}`;

  /**
   * @param {HttpService} httpService - Service for performing HTTP requests
   * @param {Knex} knex - Knex instance for interacting with the database
   */

  constructor(
    private readonly httpService: HttpService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  /**
   * Fetches data from the Wildberries API for a specified date.
   * @param {string} date - The date to fetch data for in YYYY-MM-DD format
   * @returns {Promise<IApiResponse | null>} API response or null if there was an error
   */
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

  /**
   * Saves or updates tariff data in the database.
   * @param {ITariffData[]} warehouseList - List of tariff data retrieved from the API
   * @returns {Promise<void>}
   */
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

  /**
   * Fetches data from the Wildberries API for the current date and saves it to the database.
   * Validates data structure before saving.
   * @returns {Promise<void>}
   */
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
