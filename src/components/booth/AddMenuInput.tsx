import { ChangeEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

import { delete_svg } from '../../assets';

type AddInputProps = {
  name: string;
  price: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPressAddMenu: (e: KeyboardEvent<HTMLInputElement>) => Promise<void>;
  onClickCloseInputWrap?: () => void;
};

const AddMenuInput = ({ name, price, onChangeName, onChangePrice, onKeyPressAddMenu, onClickCloseInputWrap }: AddInputProps) => {
  return (
    <AddInputWrap className='menu-item'>
      <p>
        <input type='text' value={name} onChange={onChangeName} />
      </p>
      <p>
        <input type='text' value={price} onChange={onChangePrice} onKeyPress={onKeyPressAddMenu} />
      </p>
      {onClickCloseInputWrap && <img src={delete_svg} alt='delete' title='delete' onClick={onClickCloseInputWrap} />}
    </AddInputWrap>
  );
};

const AddInputWrap = styled.li`
  cursor: default !important;
  > p > input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #ececec;
    outline: none;
  }
`;

export default AddMenuInput;
