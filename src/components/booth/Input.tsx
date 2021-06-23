import { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type Props = {
  labelText: string;
  inputAttr: InputHTMLAttributes<HTMLInputElement>;
};

const Input = ({ labelText, inputAttr }: Props) => {
  return (
    <Wrap>
      <span>{labelText}</span>
      <input {...inputAttr} />
    </Wrap>
  );
};

const Wrap = styled.label`
  position: relative;
  margin: 12px 0;
  padding-top: 24px;
  > span {
    position: absolute;
    top: 0;
    left: 0;
    color: #a6a5ac;
    font-size: 14px;
    font-weight: 500;
  }
  > input {
    width: 100%;
    padding: 4px 0;
    border: 0;
    border-bottom: 1px solid #e2e2e2;
    outline: none;
    font-size: 16px;
  }
`;

export default Input;
