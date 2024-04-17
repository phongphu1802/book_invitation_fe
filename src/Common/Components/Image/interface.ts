import { ImgHTMLAttributes } from "react";

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  isViewOnClick?: boolean;
}
