export interface ITariffData {
  /** Name of the warehouse */
  warehouseName: string;

  /** The box delivery and storage expression */
  boxDeliveryAndStorageExpr: string;

  /** The base cost for box delivery */
  boxDeliveryBase: string;

  /** The cost per liter for box delivery */
  boxDeliveryLiter: string;

  /** The base cost for box storage */
  boxStorageBase: string;

  /** The cost per liter for box storage */
  boxStorageLiter: string;
}

export interface IApiResponse {
  warehouseList: ITariffData[];
}
