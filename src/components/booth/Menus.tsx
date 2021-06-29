import { useState, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

import { Modal, AddMenuInput } from './';

import { delete_svg, plus_svg } from '../../assets';
import { useBool, useInput } from '../../hooks';
import { MenuType } from '../../types';

type Props = {
  menus: MenuType[];
  addMenu: (name: string, price: number) => Promise<void>;
  deleteMenu: (menuId: number) => Promise<void>;
};

const Menus = ({ menus, addMenu, deleteMenu }: Props) => {
  const { bool: modal, onTrue: openModal, onFalse: closeModal } = useBool(false);
  const { bool: inputWrap, onTrue: openInputWrap, onFalse: closeInputWrap } = useBool(false);
  const { value: name, onChange: onChangeName, setValue: setName } = useInput('');
  const { value: price, onChange: onChangePrice, setValue: setPrice } = useInput('');
  const [selectedMenu, setSelectedMenu] = useState<Omit<MenuType, 'boothId'>>({ menuId: 0, name: '', price: 0 });

  const onKeyPressAddMenu = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setName('');
      setPrice('');
      await addMenu(name, +price);
    }
  };

  const onClickCloseInputWrap = () => {
    closeInputWrap();
    setName('');
    setPrice('');
  };

  if (menus.length === 0) {
    return (
      <Wrap>
        <AddMenuInput name={name} price={price} onChangeName={onChangeName} onChangePrice={onChangePrice} onKeyPressAddMenu={onKeyPressAddMenu} />
      </Wrap>
    );
  }

  return (
    <Wrap>
      {menus.map(({ menuId, name, price }) => (
        <li
          key={menuId}
          className='menu-item'
          onClick={() => {
            openModal();
            setSelectedMenu({ menuId, name, price });
          }}
        >
          <p>
            <span>{name}</span>
          </p>
          <p className={price > 0 ? 'positive' : 'negative'}>
            <span>{price}</span>
          </p>
          <img
            src={delete_svg}
            alt='delete'
            title='delete'
            onClick={(e) => {
              e.stopPropagation();
              deleteMenu(menuId);
            }}
          />
        </li>
      ))}
      {inputWrap && (
        <AddMenuInput
          name={name}
          price={price}
          onChangeName={onChangeName}
          onChangePrice={onChangePrice}
          onKeyPressAddMenu={onKeyPressAddMenu}
          onClickCloseInputWrap={onClickCloseInputWrap}
        />
      )}
      <AddBoxWrap onClick={openInputWrap}>
        <p>메뉴 추가하기</p>
        <button>
          <img src={plus_svg} alt='plus' title='plus' />
        </button>
      </AddBoxWrap>
      {modal && <Modal selectedMenu={selectedMenu} closeModal={closeModal} />}
    </Wrap>
  );
};

const Wrap = styled.ul`
  display: grid;
  grid-auto-rows: 140px;
  grid-template-columns: repeat(4, minmax(200px, 250px));
  grid-row-gap: 18px;
  grid-column-gap: 18px;
  min-height: 140px;
  margin: 60px 0;
  padding: 0 8px;
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
      > p {
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
        &.positive {
          color: var(--base-color);
        }
        &.negative {
          color: var(--blue-color);
        }
        > span {
          display: block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    &.active {
      cursor: default;
    }
    &.loading {
      > p {
        height: 22px;
        > svg {
          height: 100%;
        }
      }
    }
    &:hover > img {
      display: block;
      opacity: 1;
    }
    > img {
      position: absolute;
      top: 16px;
      right: 14px;
      display: none;
      width: 24px;
      height: 24px;
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
      transition: 300ms;
      opacity: 0;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
  @media all and (max-width: 1075px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media all and (max-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AddBoxWrap = styled.li`
  text-align: center;
  > button {
    width: 30px;
    height: 30px;
    margin: auto;
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

export default Menus;
