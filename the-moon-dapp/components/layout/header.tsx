import React, { FunctionComponent, useMemo, useState } from 'react';
import {
	Header as GrommetHeader,
	Anchor,
	Box,
	ResponsiveContext,
	Menu,
	Button,
	Spinner,
	Avatar,
	Text,
} from 'grommet';
import styled from 'styled-components';
import { Colors, Color } from '../../styles/theme';
import MoonLogoSvg from '../svg/moon_logo';
import { NavLink } from '../underLineLink';
import Link from 'next/link';
import { Logout, Menu as MenuIcon, User, UserSettings } from 'grommet-icons';
import { signIn, signOut } from 'next-auth/client';
import { useUser } from '../../context/UserProvider';
import FadeIn from 'react-fade-in';

const Header: FunctionComponent = () => {
	const [showUserDropDown, setShowUserDropDown] = useState<boolean>(false);
	const { user, resolving: resolvingUser } = useUser();

	const userLoggedIn = useMemo(() => user != null && !resolvingUser, [user, resolvingUser]);
	const resolvedAndLoggedIn = useMemo(() => resolvingUser === false && userLoggedIn, [
		user,
		resolvingUser,
	]);
	const resolvedAndNotLoggedIn = useMemo(() => resolvingUser == false && userLoggedIn === false, [
		user,
		resolvingUser,
	]);

	const renderAvatar = (size?: string) => {
		size = size ?? 'medium';
		if (user == null) return;

		if (user.profilePic) {
			return <Avatar src={user.profilePic} size={size} alignSelf="center" margin="xsmall" />;
		} else {
			return <Avatar src="/default_profile.png" size={size} alignSelf="center" margin="xsmall" />;
		}
	};

	const showUserDropDownOnMouseOver = () => {
		if (!userLoggedIn) return;

		setShowUserDropDown(true);
	};

	const hideUserDropDownOnMouseLeave = () => {
		if (!userLoggedIn) return;

		setShowUserDropDown(false);
	};

	const onSignIn = () => signIn('auth0', { prompt: 'login' });
	const onSignOut = () => {
		const params = new URLSearchParams({
			callback: window.location.href,
			fromProvider: String(false)
		});

		window.location.href = `/api/signout?${params}`;
		// signOut();
	}

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
						<Box
							justify="end"
							direction="row"
							gap="none"
							alignContent="center"
							style={{ position: 'relative' }}
							onMouseEnter={showUserDropDownOnMouseOver}
						>
							{resolvedAndNotLoggedIn && (
								<Button
									primary
									color="brand"
									label="Sign In"
									style={{ borderRadius: '5px' }}
									onClick={onSignIn}
									margin={{ right: 'medium' }}
								/>
							)}
							{resolvingUser && <Spinner color="brand" margin={{ right: 'medium' }} size="small" />}
							{resolvedAndLoggedIn && (
								<AvatarButton plain icon={renderAvatar()} focusIndicator={false} color="brand" />
							)}
							{showUserDropDown && (
								<FadeIn>
									<UserDropDown
										onMouseEnter={showUserDropDownOnMouseOver}
										onMouseLeave={hideUserDropDownOnMouseLeave}
									>
										<Box direction="row" align="center" pad="small" gap="small">
											{renderAvatar('medium')}
											<Text color="brand">@{user?.username}</Text>
										</Box>
										<Link href="/profile">
											<SpacedAnchor>
												<User color="brand" />
												My Profile
											</SpacedAnchor>
										</Link>
										<Link href="/user/account">
											<SpacedAnchor>
												<UserSettings color="brand" />
												My Account
											</SpacedAnchor>
										</Link>
										<Divider />
										<Button plain onClick={onSignOut}>
											<SpacedAnchor>
												<Logout color="brand" />
												Sign Out
											</SpacedAnchor>
										</Button>
									</UserDropDown>
								</FadeIn>
							)}
						</Box>
					)
				}
			</ResponsiveContext.Consumer>
		</GrommetHeader>
	);
};

const LogoBrand = styled(Anchor)`
	font-family: 'Parisienne';
	text-decoration: none !important;
	font-size: 1.75rem;
	color: ${Colors[Color.WHEAT]};
`;

const AvatarButton = styled(Button)`
	margin-right: 10px;
	border-radius: 50%;
	border: 1px solid ${Colors[Color.GREY_8]};
	padding: 1px;

	&:hover {
		background-color: ${Colors[Color.GREY_3]};
	}
`;

const UserDropDown = styled.div`
	position: absolute;
	border-radius: 10px;
	top: 65px;
	right: 5px;
	background: ${Colors[Color.GREY_3]};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-bottom: 15px;
`;

const Divider = styled.div`
	width: 100%;
	margin: 20px 0;
	border-top: 1px dashed ${Colors[Color.WHEAT]};
`;

const SpacedAnchor = styled(Anchor)`
	margin: 10px 0 10px 22px;
	display: flex;

	> svg {
		margin-right: 15px;
	}
`;

export default Header;
