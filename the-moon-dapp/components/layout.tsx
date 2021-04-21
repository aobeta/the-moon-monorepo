import { FunctionComponent } from 'react';
import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu, Main } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import { dark } from 'grommet/themes';
import styled from 'styled-components';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { Color, Colors, theme } from '../styles/theme';
import MoonLogoSvg from '../components/svg/moon_logo';
import { NavLink } from './underLineLink';

const Layout: FunctionComponent = ({ children }) => (
  <Grommet
    theme={{
      ...dark,
      ...theme,
    }}
    themeMode="dark"
    background="background-primary"
  >
    <Header as="nav" background={Colors[Color.GREY_8]} pad="medium" height="90px">
      <LogoBrand href="#" icon={<MoonLogoSvg />} label="The Moon" />
      <ResponsiveContext.Consumer>
        {(size) =>
          size === 'small' ? (
            <Box justify="end">
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">MarketPlace</Box>,
                    href: '/marketplace',
                  },
                  {
                    label: <Box pad="small">Mint</Box>,
                    href: '/creators/mint',
                  },
                ]}
              />
            </Box>
          ) : (
            <Box justify="end" direction="row" gap="medium">
              <Link href="/marketplace">
                <NavLink href="#" label="Marketplace" />
              </Link>
              <Link href="/creators/mint">
                <NavLink label="Mint" />
              </Link>
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
    <Main background="background-primary" pad="xsmall" fill overflow="inherit">
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
);

const LogoBrand = styled(Anchor)`
  font-family: 'Bello Script';
  text-decoration: none !important;
  font-size: 1.75rem;
  color: ${Colors[Color.WHEAT]};
`;

export default Layout;
