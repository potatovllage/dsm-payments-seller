export type UserType = {
  uuid: string;
  number: number;
  name: string;
  coin: number;
};

export type BoothInfoType = {
  id: string;
  password: string;
  name: string;
  coin: number;
  totalCoin: number;
};

export type MenuType = {
  boothId: string;
  menuId: number;
  name: string;
  price: number;
};

export type HistoryLog = {
  id: number;
  name: string;
  requestCoin: number;
  tax: number;
  coin: number;
  place: string;
  number: string;
  time: string;
};

export const NORMAL = 'NORMAL' as const;
export const ERROR = 'ERROR' as const;
export const SUCCESS = 'SUCCESS' as const;

export type ConnectionType = typeof NORMAL | typeof ERROR | typeof SUCCESS;
