import axios from 'axios';
import { MenuType } from '../types';

const BASE_URL = 'http://192.168.137.233:8080';

const request = axios.create({
  baseURL: BASE_URL,
});

const requestWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export const postBoothLogin = (id: string, password: string) => {
  return request.post<{ accessToken: string }>('/booth/auth', {
    id,
    password,
  });
};

export const postBoothMenu = (name: string, price: number) => {
  return requestWithToken.post<MenuType>('/booth/menu', {
    name,
    price,
  });
};

export const getBoothMenu = () => {
  return requestWithToken.get<{ menus: MenuType[] }>('/booth/menu');
};

export const deleteBoothMenu = (menuId: number) => {
  return requestWithToken.delete(`/booth/menu?menuId=${menuId}`);
};
