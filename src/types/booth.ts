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
