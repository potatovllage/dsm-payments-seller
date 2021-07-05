import axios from 'axios';

import { BoothInfoType, MenuType, PaymentHistoryType, UserType } from '../types';

const BASE_URL = 'https://api.dsm-pay.com';
export const SOCKET_URL = 'https://socket.dsm-pay.com';

const request = axios.create({
  baseURL: BASE_URL,
});

const requestWithToken = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  return instance;
};

export const postBoothLogin = (id: string, password: string) => {
  return request.post<{ accessToken: string }>('/booth/auth', {
    id,
    password,
  });
};

export const postBoothMenu = (name: string, price: number) => {
  return requestWithToken().post<MenuType>('/booth/menu', {
    name,
    price,
  });
};

export const getBoothMenu = () => {
  return requestWithToken().get<{ menus: MenuType[] }>('/booth/menu');
};

export const deleteBoothMenu = (menuId: number) => {
  return requestWithToken().delete(`/booth/menu?id=${menuId}`);
};

export const postPaymentPermission = (userUuid: string) => {
  return requestWithToken().post('/booth/menu/payment/permission', {
    userUuid,
  });
};

export const getUserInfo = (uuid: string) => {
  return requestWithToken().get<UserType>(`/user/booth?uuid=${uuid}`);
};

export const postPayment = (menuId: number, userUuid: string) => {
  return requestWithToken().post('/booth/menu/payment', {
    menuId,
    userUuid,
  });
};

export const getBooth = () => {
  return requestWithToken().get<BoothInfoType>('/booth');
};

export const getPaymentHistory = (page: number) => {
  return requestWithToken().get<PaymentHistoryType>(`booth/payment?page=${page}&size=20`);
};
