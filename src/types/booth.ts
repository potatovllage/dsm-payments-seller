export type UserType = {
  uuid: string;
  number: number;
  name: string;
  coin: number;
};

export type BoothInfoType = {
  id: string;
  name: string;
  coin: number;
  numOfUsers: number;
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

export type Receipt = {
  id: number;
  userName: string;
  userNumber: number;
  boothName: string;
  sender: string;
  requestedValue: number;
  tax: number;
  finalValue: number;
  createAt: string;
};

export type PaymentHistoryType = {
  receipts: Receipt[];
  totalPage: number;
};
