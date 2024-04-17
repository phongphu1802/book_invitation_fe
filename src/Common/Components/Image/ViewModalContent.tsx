import { ReactNode, memo, useCallback, useMemo, useRef } from "react";
import { ReactZoomPanPinchContentRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export interface ImageNativeSize {
  width: number;
  height: number;
}

export interface ImageViewModalContentProps {
  children: ReactNode;
  imageRect: DOMRect | null;
  imageNativeSize: ImageNativeSize;
}

const ImageViewModalContent = ({ children, imageRect, imageNativeSize }: ImageViewModalContentProps) => {
  const zoomWrapperRef = useRef<ReactZoomPanPinchContentRef>(null);

  // Recalculate the `imageNativeSize` to scale the image to fit the screen.
  const calculatedImageNativeSize = useMemo(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // If both `width` and `height` of the image are smaller than the screen, no need to scale.
    if (imageNativeSize.width < windowWidth && imageNativeSize.height < windowHeight) {
      return imageNativeSize;
    }

    // If the `width` of the image is larger than the screen, and the `height` is smaller than the screen,
    // scale the image to fit the screen width.
    if (imageNativeSize.width > windowWidth && imageNativeSize.height < windowHeight) {
      const scale = windowWidth / imageNativeSize.width;

      return {
        width: windowWidth,
        height: imageNativeSize.height * scale,
      };
    }

    // If the `width` of the image is smaller than the screen, and the `height` is larger than the screen,
    // scale the image to fit the screen height.
    if (imageNativeSize.width < windowWidth && imageNativeSize.height > windowHeight) {
      const scale = windowHeight / imageNativeSize.height;

      return {
        width: imageNativeSize.width * scale,
        height: windowHeight,
      };
    }

    // If both `width` and `height` of the image are larger than the screen, scale the image to fit the screen.
    // Find the best scale to fit the screen, and not crop the image.
    const widthScale = windowWidth / imageNativeSize.width;
    const heightScale = windowHeight / imageNativeSize.height;
    const scale = Math.min(widthScale, heightScale);

    return {
      width: imageNativeSize.width * scale,
      height: imageNativeSize.height * scale,
    };
  }, [imageNativeSize]);

  // Calculate `x` and `y` to make the image preview show from the center of the showing image.
  const initialPositionX = useMemo(() => {
    if (!imageRect) {
      return 0;
    }

    const centerX = imageRect.x + imageRect.width / 2;
    const imageHalfWidth = calculatedImageNativeSize.width / 2;

    return centerX - imageHalfWidth;
  }, [calculatedImageNativeSize.width, imageRect]);

  const handleInit = useCallback(() => {
    const zoomWrapper = zoomWrapperRef.current;

    if (!zoomWrapper) {
      return;
    }

    zoomWrapper.centerView();
  }, []);

  const handleClickImage = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  return (
    <TransformWrapper
      ref={zoomWrapperRef}
      initialPositionX={initialPositionX}
      initialPositionY={imageRect!.y}
      onInit={handleInit}
    >
      <TransformComponent wrapperClass="size-screen">
        <div
          role="none"
          style={{
            width: calculatedImageNativeSize.width,
            height: calculatedImageNativeSize.height,
          }}
          tabIndex={-1}
          onClick={handleClickImage}
        >
          {children}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default memo(ImageViewModalContent);
