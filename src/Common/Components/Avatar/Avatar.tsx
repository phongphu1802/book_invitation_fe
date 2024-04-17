import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { Image } from "../Image";
import { LoadingSkeleton } from "../Loading";
import { AvatarProps } from "./interface";

const Avatar = (
  { alt, skeleton = false, src, className, imageClassName, ...props }: AvatarProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const firstALTChar = useMemo(() => alt?.charAt(0), [alt]);
  const colorByChar = useMemo(() => {
    if (!firstALTChar) {
      return "bg-gray-500";
    }

    const charCode = firstALTChar.charCodeAt(0);

    if (charCode >= 65 && charCode <= 70) {
      return "bg-red-500";
    }

    if (charCode >= 71 && charCode <= 75) {
      return "bg-yellow-500";
    }

    if (charCode >= 76 && charCode <= 80) {
      return "bg-green-500";
    }

    if (charCode >= 81 && charCode <= 85) {
      return "bg-blue-500";
    }

    return "bg-gray-500";
  }, [firstALTChar]);

  return (
    <div
      className={twMerge(
        "relative h-12 w-12 flex-shrink-0 cursor-pointer rounded-full bg-gray-100 text-xl",
        className,
      )}
      {...props}
      ref={ref}
    >
      {skeleton && !src && <LoadingSkeleton className={twMerge("h-12 w-12 rounded-full", imageClassName)} />}
      {!skeleton && src && (
        <Image
          src={src}
          alt={alt}
          className={twMerge(
            "h-full w-full rounded-full border-2 border-gray-100 object-cover object-center",
            imageClassName,
          )}
        />
      )}
      {!skeleton && !src && (
        <div
          className={twMerge(
            "flex h-full w-full items-center justify-center rounded-full border-2 border-gray-100 font-semibold uppercase text-white",
            colorByChar,
            imageClassName,
          )}
        >
          {alt?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default memo(forwardRef(Avatar));
