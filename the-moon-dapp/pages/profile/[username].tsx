import { Profile, ProfileType } from '@aobeta/db-model/prisma';
import UserRepository from '@aobeta/db-model/repositories/UserRepository';
import { Avatar, Box, Heading, Paragraph, Text } from 'grommet';
import { Location } from 'grommet-icons';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import HeartIcon from '../../components/customIcons/heart';
import SocialIcon from '../../components/customIcons/socialIcon';
import { TabLink } from '../../components/underLineLink';
import { useUser } from '../../context/UserProvider';
import prisma from '../../lib/prisma';
import { SocialLinkType } from '../../types/social';

const defaultTab = (profile: Profile) =>
	profile.type == ProfileType.Influencer ? ProfileTab.About : ProfileTab.Assets;

enum ProfileTab {
	About = 'about',
	Assets = 'assets',
	Packs = 'packs',
	FavouriteInfluencers = 'favourites',
}

interface SocialLink {
	linkType: SocialLinkType;
	url: string;
}

interface Tab {
	active: boolean;
}

const getPathHash = (path: string) => {
	if (!path.includes('#')) return null;

	const splitPath = path.split('#');
	if (splitPath.length <= 1) return null;

	return splitPath[1] as ProfileTab;
};

interface Props {
	profile: Profile;
}

const ProfilePage: FunctionComponent<Props> = (props) => {
	const { profile } = props;

	const { asPath } = useRouter();
	const hash = getPathHash(asPath);
	const [activeTab, setActiveTab] = useState<ProfileTab>(defaultTab(profile));

	const { user } = useUser();

	useEffect(() => {
		if (hash == null) {
			setActiveTab(defaultTab(profile));
		} else {
			setActiveTab(hash);
		}
	}, [hash]);

	// am I an influencer and am I not looking at my own profile?
	const canFavouriteInfluencer =
		profile.type === ProfileType.Influencer && user?.profile?.id != profile.id;

	return (
		<Box direction="row">
			{/* Left Side Of Profile */}
			<Box direction="column" justify="center" pad="large" alignContent="center">
				<Avatar
					src={profile.avatar ?? '/default_profile.png'}
					size="2xl"
					alignSelf="center"
					margin="xsmall"
				/>
				<Heading
					className="scripted-text"
					level="3"
					size="large"
					alignSelf="center"
					margin="medium"
				>
					{profile.name}
				</Heading>
				{profile.tagLine != null && (
					<Paragraph
						size="small"
						textAlign="center"
						alignSelf="center"
						color="brand"
						margin={{ vertical: 'xsmall', horizontal: 'none' }}
					>
						{profile.tagLine}
					</Paragraph>
				)}
				{profile.location != null && (
					<Box direction="row" justify="center" margin="medium">
						<Location color="brand" />
						<Text margin={{ horizontal: 'medium' }} color="brand">
							{profile.location}
						</Text>
					</Box>
				)}
			</Box>
			{/* Rest Of profile */}
			<Box pad="large" width="100%">
				{/* Tabs */}
				<Box
					justify="between"
					direction="row"
					border={{ color: 'brand', side: 'bottom', style: 'solid' }}
					pad={{ bottom: 'medium' }}
					width="100%"
				>
					{profile.type === ProfileType.Influencer ? (
						<Box direction="row">
							<Link href={`#${ProfileTab.About}`}>
								<TabLink active={activeTab === ProfileTab.About} size="small">
									About
								</TabLink>
							</Link>
							<Link href={`#${ProfileTab.Assets}`}>
								<TabLink active={activeTab === ProfileTab.Assets} size="small">
									Assets
								</TabLink>
							</Link>
							<Link href={`#${ProfileTab.Packs}`}>
								<TabLink active={activeTab === ProfileTab.Packs} size="small">
									Packs
								</TabLink>
							</Link>
						</Box>
					) : (
						<Box direction="row">
							<Link href={`#${ProfileTab.Assets}`}>
								<TabLink active={activeTab === ProfileTab.Assets} size="small">
									Assets
								</TabLink>
							</Link>
							<Link href={`#${ProfileTab.FavouriteInfluencers}`}>
								<TabLink active={activeTab === ProfileTab.FavouriteInfluencers} size="small">
									Favourite Creators
								</TabLink>
							</Link>
						</Box>
					)}
					{canFavouriteInfluencer && <HeartIcon fillRed={false} />}
				</Box>
				{/* Tab Content */}
				<Box pad={{ vertical: 'medium' }} fill>
					{profile.type == ProfileType.Influencer && (
						<AboutTab active={activeTab === ProfileTab.About} description={profile.bio} />
					)}
				</Box>
			</Box>
		</Box>
	);
};

interface AboutTabProps extends Tab {
	description: string | null;
	links?: SocialLink[];
}

const AboutTab: FunctionComponent<AboutTabProps> = (props) => {
	const { description, active } = props;

	return (
		<FadeIn>
			<Box alignSelf="center" direction="row" justify="center" hidden={active} fill>
				{/* Left side */}
				<Box fill>
					<Paragraph color="brand">{description}</Paragraph>
				</Box>
				{/* Right side */}
				<Box direction="row" fill>
					<Heading></Heading>
					<SocialIcon socialLinkType={SocialLinkType.OnlyFans} />
					<SocialIcon socialLinkType={SocialLinkType.Instagram} />
					<SocialIcon socialLinkType={SocialLinkType.Twitter} />
				</Box>
			</Box>
		</FadeIn>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { username } = context.query;

	const userRepository = new UserRepository(prisma);
	const profile = await userRepository.getProfileByUsername(username as string);

	if (profile == null) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	return {
		props: {
			title: username,
			profile,
		},
	};
};

export default ProfilePage;
