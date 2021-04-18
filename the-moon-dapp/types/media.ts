export enum MediaType {
  Image = 'Image',
  Video = 'Video',
  Audio = 'Audio',
}

export const DisplayAcceptedMediaTypes: Record<MediaType, string> = {
  [MediaType.Audio]: 'MP3',
  [MediaType.Video]: 'MP4',
  [MediaType.Image]: 'JPEG or PNG',
};
