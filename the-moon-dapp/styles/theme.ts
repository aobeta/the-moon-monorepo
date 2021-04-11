import { ThemeType } from 'grommet';
import colors from './colors.module.scss';

export enum Color {
    BACKGROUND_PRIMARY,
    GREY_10,
    GREY_8,
    WHEAT,
    WHITE
}

const {
    BACKGROUND_PRIMARY,
    GREY_10,
    GREY_8,
    WHEAT,
    WHITE,
} = Color;

// export const Colors = {
//     [WHEAT]   : '#f9f7cf',
//     [GREY_10]   : '#1a1a1a',
//     [GREY_8]    : '#141414',
//     [WHITE]     : '#f9fbff'
// }

export const Colors = {
    [WHEAT]                 : colors.wheat,
    [GREY_10]               : colors.grey10,
    [GREY_8]                : colors.grey8,
    [WHITE]                 : colors.white,
    [BACKGROUND_PRIMARY]    : colors.backgroundPrimary
}

export const theme : ThemeType = {
    global: {
        font: {
            family: "'Nunito', sans-serif"
        },
        colors:{
            brand: Colors[WHEAT],
            "dark-1": Colors[GREY_8],
            "dark-2": Colors[GREY_10],
            "light-1": Colors[WHITE],
            "background-primary" : Colors[BACKGROUND_PRIMARY],
            text: {
                dark: Colors[Color.WHITE]
            },
            border: {
                dark: Color[WHEAT]
            }
        }
    },
    anchor: {
        extend: {
            color: Colors[Color.WHEAT]
        }
    },
    fileInput: {
        extend: {
            height: '500px',
            borderWidth: '5px'
        }
    }
};
