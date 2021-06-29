import { atom } from 'recoil';

import { BoothInfoType, ConnectionType, MenuType, NORMAL } from '../types';

export const boothState = atom<BoothInfoType>({
  key: 'boothState',
  default: {
    coin: 0,
    id: '',
    name: '',
    numOfUsers: 0,
    totalCoin: 0,
  },
});

export const menuState = atom<MenuType[]>({
  key: 'menuState',
  default: [],
});

export const targetUuidState = atom<string>({
  key: 'targetUuidState',
  default: '',
});

export const connectionConditionState = atom<ConnectionType>({
  key: 'connectionConditionState',
  default: NORMAL,
});
