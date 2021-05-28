import { Anchor } from 'grommet';
import styled from 'styled-components';
import { Color, Colors } from '../styles/theme';

export const NavLink = styled(Anchor)`
	text-transform: uppercase;
	text-decoration: none !important;
	letter-spacing: 0.15em;
	display: inline-block;
	position: relative;
	margin: 0 30px;

	&::after {
		background: none repeat scroll 0 0 transparent;
		content: '';
		display: block;
		height: 2px;
		left: 50%;
		top: 30px;
		position: absolute;
		background: ${Colors[Color.WHEAT]};
		transition: width 0.3s ease 0s, left 0.3s ease 0s;
		width: 0;
	}

	&:hover {
		&::after {
			width: 100%;
			left: 0;
		}
	}
`;

export const TabLink = styled(Anchor)<{ active?: boolean }>`
	text-decoration: none !important;
	letter-spacing: 0.1em;
	display: inline-block;
	position: relative;
	margin: 0 15px;

	&::after {
		background: none repeat scroll 0 0 transparent;
		bottom: 0;
		content: '';
		display: block;
		height: 1px;
		left: ${(props) => (props.active ? '0' : '50%')};
		top: 20px;
		position: absolute;
		background: ${Colors[Color.WHEAT]};
		transition: width 0.3s ease 0s, left 0.3s ease 0s;
		width: ${(props) => (props.active ? '100%' : '0')};
	}

	&:hover {
		&::after {
			width: 100%;
			left: 0;
		}
	}
`;
