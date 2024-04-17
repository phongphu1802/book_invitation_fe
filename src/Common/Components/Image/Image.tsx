/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  ForwardedRef,
  SyntheticEvent,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import ImageViewModal from "./ViewModal";
import { ImageProps } from "./interface";
import { useConfig } from "../../Hooks";
import { ConfigKeyEnum } from "../../../App/Enums";

const Image = (
  { alt, className, isViewOnClick = false, src, ...props }: ImageProps,
  ref: ForwardedRef<HTMLImageElement>,
) => {
  const [isViewFullscreen, setIsViewFullscreen] = useState(false);
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);
  const [imageNativeSize, setImageNativeSize] = useState({ width: 0, height: 0 });

  const innerRef = useRef<HTMLImageElement>(null);

  const config = useConfig();
  const defaultImage = useMemo(() => config(ConfigKeyEnum.COVER_IMAGE_DEFAULT), [config]);
  const previewImageRef = useRef<HTMLImageElement>(null);

  const toggleFullscreen = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget!;
    const rect = target.getBoundingClientRect();

    setImageRect(rect);
    setImageNativeSize({ width: target.naturalWidth, height: target.naturalHeight });

    setIsViewFullscreen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsViewFullscreen(false);
  }, []);

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      if (!defaultImage) {
        return;
      }

      const { currentTarget } = e;

      if (currentTarget.src !== defaultImage) {
        currentTarget.src = defaultImage;
      }
    },
    [defaultImage],
  );

  useImperativeHandle(ref, () => innerRef.current as HTMLImageElement);

  return (
    <>
      <img
        alt={alt}
        className={className}
        ref={innerRef}
        src={src}
        onError={handleError}
        onClick={toggleFullscreen}
        {...props}
      />
      {isViewOnClick && (
        <ImageViewModal
          isShow={isViewFullscreen}
          imageRect={imageRect}
          imageNativeSize={imageNativeSize}
          onClose={handleClose}
        >
          <img alt={alt} src={src} ref={previewImageRef} />
        </ImageViewModal>
      )}
    </>
  );
};

export default memo(forwardRef(Image));
