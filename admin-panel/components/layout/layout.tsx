import { Box, Grommet, grommet, Main, ThemeType } from "grommet";
import React, { FunctionComponent } from "react";
import SideBar from "./sidebar";
import styled, { css } from 'styled-components';
import { Toaster } from 'react-hot-toast';

const Layout : FunctionComponent = ({ children }) => {
    return (
        <Grommet
            theme = {extendedGrommetTheme}
            full
        >
            <Box direction="row" height={{ min: '100%' }}>
                <SideBar />
                <FullMain pad="xsmall" height="xxlarge">
                    {children}
                </FullMain>
            </Box>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </Grommet>
    )
};

const FullMain = styled(Main)`
    height: 100vh;
`;

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
