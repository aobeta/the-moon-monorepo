import React, { FunctionComponent } from 'react';
import {
	Header as GrommetHeader,
	Anchor,
	Box,
	ResponsiveContext,
	Menu,
	Button,
	Spinner,
	Avatar,
} from 'grommet';
import styled from 'styled-components';
import { Colors, Color } from '../../styles/theme';
import MoonLogoSvg from '../svg/moon_logo';
import { NavLink } from '../underLineLink';
import Link from 'next/link';
import { Menu as MenuIcon } from 'grommet-icons';
import { signIn, signOut } from 'next-auth/client';
import { useUser } from '../../context/UserProvider';

const Header: FunctionComponent = () => {
	const { user, resolving: resolvingUser } = useUser();

	console.log('session :: ', user, resolvingUser);

	const renderAvatar = () => {
		if (user == null) return;

		if (user.profilePic) {
			return <Avatar src={user.profilePic} size="medium" alignSelf="center" margin="xsmall" />;
		}

		return <Avatar src="/default_profile.png" size="medium" alignSelf="center" margin="xsmall" />;
	};

	const userLoggedIn = user != null && !resolvingUser;
	return (
		<GrommetHeader
			as="nav"
			background={Colors[Color.GREY_8]}
			pad={{ top: 'medium', bottom: 'medium', left: 'medium', right: 'none' }}
			height="90px"
		>
			<Box direction="row" alignContent="center">
				<LogoBrand href="#" icon={<MoonLogoSvg />} label="The Moon" />
				<Box
					justify="end"
					direction="row"
					gap="medium"
					alignSelf="center"
					alignContent="center"
					margin={{ horizontal: 'xlarge' }}
				>
					<Link href="/marketplace">
						<NavLink href="#" label="Marketplace" />
					</Link>
					<Link href="/creators/mint">
						<NavLink label="Mint" />
					</Link>
				</Box>
			</Box>
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
						<>
							<Box justify="end" direction="row" gap="medium" alignContent="center">
								{resolvingUser == false && userLoggedIn === false && (
									<Button
										primary
										color="brand"
										label="login"
										style={{ borderRadius: '5px' }}
										onClick={() => signIn('Auth0')}
										margin={{ right: 'medium' }}
									/>
								)}
								{resolvingUser && (
									<Spinner color="brand" margin={{ right: 'medium' }} size="small" />
								)}
								{resolvingUser == false && userLoggedIn && (
									<Menu
										label={renderAvatar()}
										focusIndicator={false}
										color="brand"
										items={[{ label: 'Logout', onClick: () => signOut() }]}
									/>
								)}
							</Box>
						</>
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
