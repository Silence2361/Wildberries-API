export interface ITariffData {
  warehouseName: string;
  boxDeliveryAndStorageExpr: string;
  boxDeliveryBase: string;
  boxDeliveryLiter: string;
  boxStorageBase: string;
  boxStorageLiter: string;
}

export interface IApiResponse {
  dtNextBox: string;
  dtTillMax: string;
  warehouseList: ITariffData[];
}
