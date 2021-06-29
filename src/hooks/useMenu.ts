import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { useLoading } from './useLoading';

import { deleteBoothMenu, getBoothMenu, postBoothMenu } from '../apis/booth';
import { menuState } from '../recoils/booth';

export const useMenu = () => {
  const [menus, setMenus] = useRecoilState(menuState);
  const { loading, startLoading, endLoading } = useLoading(false);

  const getMenus = useCallback(async () => {
    startLoading();
    try {
      const { data } = await getBoothMenu();

      setMenus(data.menus);
    } catch (err) {
      alert('메뉴 정보 가져오기 실패');
    }
    endLoading();
  }, []);

  const addMenu = useCallback(
    async (name: string, price: number) => {
      if (name.trim() === '') return alert('메뉴 이름을 입력해주세요.');
      if (price === 0 || isNaN(price)) return alert('메뉴 가격을 입력해주세요.');

      startLoading();
      try {
        const { data } = await postBoothMenu(name, +price);
        const newMenus = [...menus];

        newMenus.push(data);
        setMenus(newMenus);
      } catch (err) {
        alert('메뉴 추가 실패');
      }
      endLoading();
    },
    [menus]
  );

  const deleteMenu = useCallback(
    async (menuId: number) => {
      if (!window.confirm('삭제하시겠습니까?')) return;

      startLoading();
      try {
        await deleteBoothMenu(menuId);
        setMenus(menus.filter(({ menuId: _menuId }) => _menuId !== menuId));
      } catch (err) {
        alert('메뉴 삭제 실패');
      }
      endLoading();
    },
    [menus]
  );

  return { menus, getMenus, addMenu, deleteMenu, loading } as const;
};
