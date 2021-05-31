import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { SocialLinkImageMap, SocialLinkType } from '../../types/social';

interface Props {
  socialLinkType: SocialLinkType;
}
const SocialIcon: FunctionComponent<Props> = ({ socialLinkType }) => {
  const imageUrl = SocialLinkImageMap.get(socialLinkType);

  if (imageUrl == null) return null;

  return <IconWithBackground imageUrl={imageUrl} />;
};

const IconWithBackground = styled.div<{ imageUrl: string }>`
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 35px;
  height: 35px;
  margin: 0 10px;
`;

export default SocialIcon;
