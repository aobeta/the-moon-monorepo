import React, { FunctionComponent } from 'react';
import { Header as GrommetHeader, Anchor, Box, ResponsiveContext, Menu, Button } from 'grommet';
import styled from 'styled-components';
import { Colors, Color } from '../../styles/theme';
import MoonLogoSvg from '../svg/moon_logo';
import { NavLink } from '../underLineLink';
import Link from 'next/link';
import { Menu as MenuIcon } from 'grommet-icons';
import { signIn } from 'next-auth/client';
import { useSession } from 'next-auth/client';

const Header: FunctionComponent = () => {
	const [session] = useSession();

	console.log('session :: ', session);

	return (
		<GrommetHeader as="nav" background={Colors[Color.GREY_8]} pad="medium" height="90px">
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
						<Box justify="end" direction="row" gap="medium" alignContent="center">
							<Link href="/marketplace">
								<NavLink href="#" label="Marketplace" />
							</Link>
							<Link href="/creators/mint">
								<NavLink label="Mint" />
							</Link>
							<Button
								primary
								color="brand"
								label="login"
								onClick={() => signIn('Auth0', { scope: 'offline_access' })}
							/>
						</Box>
					)
				}
			</ResponsiveContext.Consumer>
		</GrommetHeader>
	);
};

const LogoBrand = styled(Anchor)`
	font-family: 'Bello Script';
	text-decoration: none !important;
	font-size: 1.75rem;
	color: ${Colors[Color.WHEAT]};
`;

export default Header;
