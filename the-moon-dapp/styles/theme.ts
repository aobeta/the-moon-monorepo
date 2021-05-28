import { ThemeType } from 'grommet';
import { css } from 'styled-components';
import colors from './colors.module.scss';

export enum Color {
	BACKGROUND_PRIMARY,
	GREY_10,
	GREY_8,
	GREY_3,
	WHEAT,
	WHITE,
}

const { BACKGROUND_PRIMARY, GREY_10, GREY_8, GREY_3, WHEAT, WHITE } = Color;

export const Colors = {
	[WHEAT]: colors.wheat,
	[GREY_10]: colors.grey10,
	[GREY_8]: colors.grey8,
	[GREY_3]: colors.grey3,
	[WHITE]: colors.white,
	[BACKGROUND_PRIMARY]: colors.backgroundPrimary,
};

export const theme: ThemeType = {
	global: {
		font: {
			family: "'Nunito', sans-serif",
		},
		colors: {
			brand: Colors[WHEAT],
			'dark-1': Colors[GREY_8],
			'dark-2': Colors[GREY_10],
			'light-1': Colors[WHITE],
			'background-primary': Colors[BACKGROUND_PRIMARY],
			text: {
				dark: Colors[Color.WHITE],
			},
			border: {
				dark: Color[WHEAT],
			},
			control: {
				dark: 'brand',
			},
			selected: Colors[GREY_10],
		},
		focus: { border: { color: 'dark' } },
	},
	anchor: {
		color: {
			dark: Colors[Color.WHEAT],
		},
	},
	fileInput: {
		extend: css`
			height: 500px;
			border-width: 5px;
		`,
	},
	menu: {
		background: Colors[GREY_8],
		extend: css`
			box-shadow: none;
			outline: none;
		`,
	},
};
