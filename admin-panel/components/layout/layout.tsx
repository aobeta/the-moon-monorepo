import { Box, Grommet, grommet, Main, ThemeType } from "grommet";
import React, { FunctionComponent } from "react";
import SideBar from "./sidebar";
import { css } from 'styled-components';

const Layout : FunctionComponent = ({ children }) => {
    return (
        <Grommet
            theme = {extendedGrommetTheme}
            full
        >
            <Box direction="row" height={{ min: '100%' }}>
                <SideBar />
                <Main pad="xsmall">
                    {children}
                </Main>
            </Box>
        </Grommet>
    )
};

const extendedGrommetTheme : ThemeType = {
    ...grommet,
    fileInput: {
		extend: css`
			height: 500px;
			border-width: 5px;
		`,
        dragOver: {
            border: {
                color : 'neutral-3'
            }
        }
	},
}

export default Layout;
