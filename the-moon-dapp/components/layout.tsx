import { FunctionComponent, PropsWithChildren } from "react";
import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu, Main } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { dark, grommet } from 'grommet/themes';
import MoonLogoSvg              from '../components/svg/moon_logo';
import styled                   from 'styled-components';
import { Color, Colors, theme } from "../styles/theme";
import Link                     from 'next/link';
import { Toaster }              from "react-hot-toast";



const Layout : FunctionComponent<PropsWithChildren<{}>> = ({ children } : PropsWithChildren<{}>) => {
    return(
        <Grommet 
            theme={{
                ...dark,
                ...theme
            }}
            themeMode = 'dark'
            background = 'background-primary'
        >
            <Header as='nav' background={Colors[Color.GREY_8]} pad="medium" height="xsmall">
                <LogoBrand
                    href="#"
                    icon={<MoonLogoSvg/>}
                    label="The Moon"
                />
                <ResponsiveContext.Consumer>
                    {size =>
                    size === 'small' ? (
                        <Box justify="end">
                        <Menu
                            a11yTitle="Navigation Menu"
                            dropProps={{ align: { top: 'bottom', right: 'right' } }}
                            icon={<MenuIcon color="brand" />}
                            items={[
                            {
                                label: <Box pad="small">Grommet.io</Box>,
                                href: 'https://v2.grommet.io/',
                            },
                            {
                                label: <Box pad="small">Feedback</Box>,
                                href: 'https://github.com/grommet/grommet/issues',
                            },
                            ]}
                        />
                        </Box>
                    ) : (
                        <Box justify="end" direction="row" gap="medium">
                            <Link href='/marketplace'>
                                <NavLink href="#" label="Marketplace" />
                            </Link>
                            <Link href='/creators/mint'>
                                <NavLink label="Mint"/>
                            </Link>
                        </Box>
                    )
                    }
                </ResponsiveContext.Consumer>
            </Header>
            <Main background = "background-primary" pad="small" fill = {true} overflow = 'inherit'>
                {children}
            </Main>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                    border: '1px solid #713200',
                    backgroundColor: Colors[Color.GREY_8],
                    color: Colors[Color.WHEAT],
                  },
              }}
            />
        </Grommet>
    )
}

const LogoBrand = styled(Anchor)`
    font-family: 'Bello Script';
    text-decoration: none !important;
    font-size: 1.75rem; 
    color: ${Colors[Color.WHEAT]};

`;

const NavLink = styled(Anchor)`
    text-transform: uppercase;
    text-decoration: none !important;
    letter-spacing: 0.15em;
    display: inline-block;
    position: relative;
    margin: 0 30px;

    &::after {
        background: none repeat scroll 0 0 transparent;
        bottom: 0;
        content: "";
        display: block;
        height: 2px;
        left: 50%;
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

export default Layout;
