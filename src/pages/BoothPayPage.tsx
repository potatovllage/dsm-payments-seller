import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';

import { deleteBoothMenu, getBoothMenu, postBoothMenu } from '../apis/booth';
import { Menus } from '../components';
import { useToggle } from '../hooks/useToggle';
import { menuState } from '../recoils/booth';

// TODO: 결제 페이지: 관리 버튼 추가(클릭 시 [메뉴 추가 + 메뉴 삭제])
// TODO: 사용자 뱃지 페이지 수정: 문구 추가(귀신의 집 뱃지 가지신 분은 [09:50]에 참여 신청이 가능합니다!!), 뱃지 위치 조정(가운데 + 문구 위로 넘어가면서 회전하기)

export const BoothPayPage = () => {
  const { toggle, onToggle } = useToggle(false);
  const [menus, setMenus] = useRecoilState(menuState);

  const addMenu = async (name: string, price: number) => {
    try {
      const { data } = await postBoothMenu(name, +price);
      const copy = [...menus];

      copy.push(data);
      setMenus(copy);
    } catch (err) {
      alert('메뉴 추가 실패');
    }
  };

  const getMenus = async () => {
    try {
      const { data } = await getBoothMenu();

      setMenus(data.menus);
    } catch (err) {
      alert('메뉴 정보 가져오기 실패');
    }
  };

  const deleteMenu = async (menuId: number) => {
    if (!window.confirm('삭제하시겠습니까?')) return;

    try {
      await deleteBoothMenu(menuId);

      const copy = [...menus];
      const idx = copy.findIndex(({ menuId: _menuId }) => _menuId === menuId);

      copy.splice(idx, 1);
      setMenus(copy);
    } catch (err) {
      alert('메뉴 삭제 실패');
    }
  };

  useEffect(() => {
    // getMenus();
  }, []);

  return (
    <Wrap>
      <div>
        <button onClick={onToggle}>{toggle ? '일반 모드' : '관리 모드'}</button>
      </div>
      <Menus toggle={toggle} menuFilter={({ price }) => price > 0} addMenu={addMenu} deleteMenu={deleteMenu} />
      <hr />
      <Menus toggle={toggle} menuFilter={({ price }) => price < 0} addMenu={addMenu} deleteMenu={deleteMenu} />
    </Wrap>
  );
};

const Wrap = styled.main`
  > div {
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
