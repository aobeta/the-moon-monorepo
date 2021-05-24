import { Avatar, Box, Heading, Paragraph, Text } from 'grommet';
import { Location } from 'grommet-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import HeartIcon from '../components/customIcons/heart';
import SocialIcon from '../components/customIcons/socialIcon';
import { TabLink } from '../components/underLineLink';
import { SocialLinkType } from '../types/social';

enum ProfileTab {
	About = 'about',
	Assets = 'assets',
	Packs = 'packs',
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

const ProfilePage: FunctionComponent = () => {
	const { asPath } = useRouter();
	const hash = getPathHash(asPath);
	const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.About);

	useEffect(() => {
		if (hash == null) {
			setActiveTab(ProfileTab.About);
		} else {
			setActiveTab(hash);
		}
	}, [hash]);

	return (
		<Box direction="row">
			{/* Left Side Of Profile */}
			<Box direction="column" justify="center" pad="large" alignContent="center">
				<Avatar src="/default_profile.png" size="2xl" alignSelf="center" margin="xsmall" />
				<Heading
					className="scripted-text"
					level="3"
					size="large"
					alignSelf="center"
					margin="medium"
				>
					Megan Styles
				</Heading>
				<Paragraph
					size="small"
					textAlign="center"
					alignSelf="center"
					color="brand"
					margin={{ vertical: 'xsmall', horizontal: 'none' }}
				>
					Hi there! I’m Effie! Excited to get to know you! (personal blurb)
				</Paragraph>
				<Box direction="row" justify="center" margin="medium">
					<Location color="brand" />
					<Text margin={{ horizontal: 'medium' }} color="brand">
						Canada
					</Text>
				</Box>
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
					<HeartIcon fillRed={false} />
				</Box>
				{/* Tab Content */}
				<Box pad={{ vertical: 'medium' }} fill>
					<AboutTab
						active={activeTab === ProfileTab.About}
						description="Hi there! I’m Effie! Excited to get to know you! (personal blurb)"
					/>
				</Box>
			</Box>
		</Box>
	);
};

interface AboutTabProps extends Tab {
	description: string;
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

export default ProfilePage;
