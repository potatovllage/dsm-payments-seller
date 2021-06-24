import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';

import { deleteBoothMenu, getBoothMenu, postBoothMenu } from '../apis/booth';
import { Menus } from '../components';
import { menuState } from '../recoils/booth';

// TODO: 사용자 뱃지 페이지 수정: 문구 추가(귀신의 집 뱃지 가지신 분은 [09:50]에 참여 신청이 가능합니다!!), 뱃지 위치 조정(가운데 + 문구 위로 넘어가면서 회전하기)

export const BoothPayPage = () => {
  const setMenus = useSetRecoilState(menuState);

  const getMenus = async () => {
    try {
      const { data } = await getBoothMenu();

      setMenus(data.menus);
    } catch (err) {
      alert('메뉴 정보 가져오기 실패');
    }
  };

  const addMenu = async (name: string, price: number) => {
    if (name.trim() === '') return alert('메뉴 이름을 입력해주세요.');
    if (price === 0 || isNaN(price)) return alert('메뉴 가격을 입력해주세요.');

    try {
      await postBoothMenu(name, +price);
      await getMenus();
    } catch (err) {
      alert('메뉴 추가 실패');
    }
  };

  const deleteMenu = async (menuId: number) => {
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      await deleteBoothMenu(menuId);
      await getMenus();
    } catch (err) {
      alert('메뉴 삭제 실패');
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <Wrap>
      <div>
        <h1>결제</h1>
      </div>
      <Menus addMenu={addMenu} deleteMenu={deleteMenu} />
    </Wrap>
  );
};

const Wrap = styled.main`
  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 16px;
    text-align: right;
    > button {
      padding: 8px;
      border: 0;
      border-radius: 8px;
      background-color: var(--base-color);
      color: white;
      cursor: pointer;
    }
  }
  > hr {
    margin: 18px 0;
    border: 1px solid #d2d2d2;
  }
`;
