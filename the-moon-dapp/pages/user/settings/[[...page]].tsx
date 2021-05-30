import { Box } from 'grommet';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { isAuthenticatedServerSide } from '../../../lib/AuthenticatePage';
import styled from 'styled-components';
import { TabLink } from '../../../components/underLineLink';
import { GetServerSideProps } from 'next';
import { PageProps } from '../../../types/pageProps';

import { useUser } from '../../../context/UserProvider';
import AccountSection from '../../../components/settings-page/AccountSection';

enum SettingsPageSection {
	Account = 'account',
	Profile = 'profile',
	Wallet = 'wallet',
}

interface Props {
	activeSection: SettingsPageSection;
}

const SettingsPage: FunctionComponent<PageProps<Props>> = (props) => {
	const { activeSection } = props;

	const { user } = useUser();

	const renderSection = (section: SettingsPageSection) => {
		switch (section) {
			case SettingsPageSection.Account:
				return <AccountSection user={user} />;
			case SettingsPageSection.Profile:
				return <ProfileSection />;
			case SettingsPageSection.Wallet:
				return <WalletSection />;
			default:
				return null;
		}
	};

	return (
		<Box direction="row" pad={{ vertical: 'large', horizontal: 'xlarge' }} fill>
			<Box height="100%" width="large">
				<MenuLinks>
					<li>
						<Link href="/user/settings/account">
							<TabLink active={activeSection === SettingsPageSection.Account}>Account</TabLink>
						</Link>
					</li>
					<li>
						<Link href="/user/settings/wallet">
							<TabLink active={activeSection === SettingsPageSection.Wallet}>Wallet</TabLink>
						</Link>
					</li>
					<li>
						<Link href="/user/settings/profile">
							<TabLink active={activeSection === SettingsPageSection.Profile}>Profile</TabLink>
						</Link>
					</li>
				</MenuLinks>
			</Box>
			<Box height="100%" fill pad={{ top: '60px' }}>
				{renderSection(activeSection)}
			</Box>
		</Box>
	);
};

const WalletSection: FunctionComponent = () => {
	return <Box>Wallet Section</Box>;
};

const ProfileSection: FunctionComponent = () => {
	return <Box>Profile Section</Box>;
};

const MenuLinks = styled.ul`
	list-style: none;
	margin: 0;

	> li {
		margin: 60px 0;
	}
`;

const getActiveSection = (routeParams: string[] | undefined) => {
	if (routeParams == null) {
		return SettingsPageSection.Account;
	}

	if (routeParams.length > 1) return null;

	const sections = Object.values(SettingsPageSection);
	const routeSectionReceived = routeParams[0];

	if (sections.includes(routeSectionReceived as SettingsPageSection)) {
		return routeSectionReceived as SettingsPageSection;
	} else {
		return null;
	}
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const isAuthenticated = await isAuthenticatedServerSide(context);

	if (!isAuthenticated) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const { page } = context.query;
	const activeSection = getActiveSection(page as string[]);

	if (activeSection == null) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	return {
		props: {
			title: 'My Settings',
			activeSection,
		},
	};
};

export default SettingsPage;
