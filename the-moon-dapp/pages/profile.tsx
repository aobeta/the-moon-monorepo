import { Avatar, Box, Heading, Paragraph, Text } from 'grommet';
import { Location } from 'grommet-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import HeartIcon from '../components/customIcons/heart';
import { TabLink } from '../components/underLineLink';

enum ProfileTab {
  About = 'about',
  Assets = 'assets',
  Packs = 'packs',
}

enum LinkType {
  YouTube,
  Twitter,
  PornHub,
  OnlyFans,
  Instagram,
}

interface SocialLink {
  linkType: LinkType;
  url: string;
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
        <Box></Box>
      </Box>
    </Box>
  );
};

const AboutTab: FunctionComponent<{ description: string; links: SocialLink[] }> = (props) => {
  const { description, links } = props;

  return <Box></Box>;
};

export default ProfilePage;
