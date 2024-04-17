import { ImageProps } from "../Image";

export interface AvatarProps extends Pick<ImageProps, "isViewOnClick"> {
  alt?: string;
  skeleton?: boolean;
  src?: string;
  imageClassName?: string;
  className?: string;
}
