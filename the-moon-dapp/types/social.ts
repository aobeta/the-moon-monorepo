export enum SocialLinkType {
  YouTube,
  Twitter,
  PornHub,
  OnlyFans,
  Instagram,
}

export const SocialLinkImageMap = new Map([
  [SocialLinkType.OnlyFans, '/onlyfans.png'],
  [SocialLinkType.Twitter, '/twitter.png'],
  [SocialLinkType.Instagram, '/instagram.png'],
]);
