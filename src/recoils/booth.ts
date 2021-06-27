import { atom } from 'recoil';

import { MenuType } from '../types';

export const menuState = atom<MenuType[]>({
  key: 'menuState',
  default: [
    ...[...Array(20)].map((_, i) => ({
      boothId: '1',
      menuId: i,
      name: `n${i}`,
      price: (i < 10 ? i * 1000 : -i * 1000) || 1000,
    })),
  ],
});

export const targetUuidState = atom<string>({
  key: 'targetUuidState',
  default: '',
});

export const connectionConditionState = atom<boolean>({
  key: 'connectionConditionState',
  default: false,
});
