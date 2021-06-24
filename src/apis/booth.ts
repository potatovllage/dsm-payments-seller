import axios from 'axios';

import { MenuType, UserType } from '../types';

const BASE_URL = 'https://6a170f85d823.ngrok.io';
export const SOCKET_URL = 'https://11b9365bd0c0.ngrok.io';

const request = axios.create({
  baseURL: BASE_URL,
});

const requestWithToken = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
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
