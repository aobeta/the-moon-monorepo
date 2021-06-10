import styled, { keyframes } from 'styled-components';
import { Color, Colors } from '../../styles/theme';

const FlashingAnimation = keyframes`
    0% {
        background-color: ${Colors[Color.GREY_3]};
    }
    50%,
    100% {
        background-color: #ebe6ff;
    }
`;

const Loader = styled.div`
	position: relative;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: ${Colors[Color.GREY_3]};
	color: ${Colors[Color.GREY_3]};
	animation: ${FlashingAnimation} 1s infinite linear alternate;
	animation-delay: 0.5s;
	margin: 1px 17px;

	&::before,
	&::after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
	}

	&::before {
		left: -15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: ${Colors[Color.GREY_3]};
		color: ${Colors[Color.GREY_3]};
		animation: ${FlashingAnimation} 1s infinite alternate;
		animation-delay: 0s;
	}

	&::after {
		left: 15px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background-color: ${Colors[Color.GREY_3]};
		color: ${Colors[Color.GREY_3]};
		animation: ${FlashingAnimation} 1s infinite alternate;
		animation-delay: 1s;
	}
`;

export default Loader;
