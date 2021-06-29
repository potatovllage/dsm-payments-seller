import axios, { AxiosError } from 'axios';

import { BoothInfoType, MenuType, PaymentHistoryType, UserType } from '../types';

const BASE_URL = 'https://5192089a03c0.ngrok.io';
export const SOCKET_URL = 'https://df4d8611a63c.ngrok.io';

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

  instance.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      const status = err.response?.status;

      if (status === 401 || status === 404) {
        alert('로그인이 필요합니다.');
        localStorage.removeItem('accessToken');
        window.location.href = '/booth/login';
        return;
      }

      return Promise.reject(err);
    }
  );

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
