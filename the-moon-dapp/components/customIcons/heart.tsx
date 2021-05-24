import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Color, Colors } from '../../styles/theme';

interface Props {
  fillRed?: boolean;
}

const HeartIcon: FunctionComponent<Props> = ({ fillRed }) => {
  return (
    <Heart fillRed={fillRed} aria-label="Favorite" viewBox="0 0 24 24">
      <path
        strokeWidth="2"
        d="M1,8.4 C1,4 4.5,3 6.5,3 C9,3 11,5 12,6.5 C13,5 15,3 17.5,3 C19.5,3 23,4 23,8.4 C23,15 12,21 12,21 C12,21 1,15 1,8.4 Z"
      ></path>
    </Heart>
  );
};

const Heart = styled.svg<{ fillRed?: boolean }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: ${(props) => (props.fillRed ? 'red' : Colors[Color.GREY_10])};
  stroke: ${(props) => (props.fillRed ? 'red' : Colors[Color.WHEAT])};

  &:hover {
    fill: red;
    stroke: red;
  }
`;

export default HeartIcon;
