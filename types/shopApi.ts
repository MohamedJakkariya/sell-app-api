/**
 * @body {
 *    "shopId": "",
 *    "name": "",
 *    "label": "",
 *    "labelColor": "",
 *    "amount": "",
 * }
 */
export interface ICreateProductItem {
  shopId: number | string;
  name: string;
  label: string;
  labelColor?: string;
  amount: number | string;
}

/**
 * @body {
 *    "name": "",
 *    "address": "",
 *    "city": "",
 *    "country": "",
 *    "state": "",
 *    "postalCode": ""
 * }
 */
export interface ICreateShop {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number | string;
}
