import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import { delete_svg, plus_svg } from '../../assets';
import { useBool } from '../../hooks/useBool';
import { useInput } from '../../hooks/useInput';
import { menuState } from '../../recoils/booth';
import { MenuType } from '../../types';

type Props = {
  toggle: boolean;
  menuFilter: (menu: MenuType) => boolean;
  addMenu: (name: string, price: number) => Promise<void>;
  deleteMenu: (menuId: number) => Promise<void>;
};

const Menus = ({ toggle, menuFilter, addMenu, deleteMenu }: Props) => {
  const { bool, onTrue, onFalse } = useBool(false);
  const menus = useRecoilValue(menuState);
  const { value: name, onChange: onChangeName } = useInput('');
  const { value: price, onChange: onChangePrice } = useInput('');

  return (
    <Wrap>
      {menus.filter(menuFilter).map(({ menuId, name, price }) => (
        <li key={menuId} className={`menu-item ${price > 0 ? 'positive' : 'negative'} ${toggle ? 'active' : ''}`}>
          <span>{name}</span>
          <span>{price > 0 ? price : -price}</span>
          {toggle && <img src={delete_svg} alt='delete' title='delete' onClick={() => deleteMenu(menuId)} />}
        </li>
      ))}
      {bool && (
        <AddInputWrap className='menu-item'>
          <span>
            <input type='text' value={name} onChange={onChangeName} />
          </span>
          <span>
            <input type='text' value={price} onChange={onChangePrice} onKeyPress={(e) => e.key === 'Enter' && addMenu(name, +price)} />
          </span>
          <img src={delete_svg} alt='delete' title='delete' onClick={onFalse} />
        </AddInputWrap>
      )}
      {toggle && (
        <AddBoxWrap>
          <button onClick={onTrue}>
            <img src={plus_svg} alt='plus' title='plus' />
          </button>
        </AddBoxWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.ul`
  display: grid;
  grid-auto-rows: 140px;
  grid-template-columns: repeat(4, minmax(200px, 250px));
  grid-row-gap: 18px;
  grid-column-gap: 18px;
  max-height: calc(140px * 2 + 18px * 4);
  padding: 0 8px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #e2e2e2;
    border-radius: 4px;
  }
  > li {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 24px;
    border-radius: 4px;
    color: #242a2e;
    cursor: pointer;
    &.menu-item {
      border: 1px solid #e2e2e2;
    }
    &.positive > span:last-of-type {
      color: #4384f3;
    }
    &.negative > span:last-of-type {
      color: var(--base-color);
    }
    &.active {
      cursor: default;
    }
    > span {
      position: relative;
      margin-top: 24px;
      font-size: 18px;
      &::before {
        position: absolute;
        bottom: calc(100% + 2px);
        left: 0;
        color: gray;
        font-size: 12px;
      }
      &:first-of-type::before {
        content: '이름';
      }
      &:last-of-type::before {
        content: '가격';
      }
    }
    > img {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 16px;
      right: 14px;
      cursor: pointer;
    }
  }
`;

const AddBoxWrap = styled.li`
  > button {
    width: 40px;
    margin: auto;
    height: 40px;
    padding: 8px;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const AddInputWrap = styled.li`
  > span > input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #ececec;
    outline: none;
  }
`;

export default Menus;
