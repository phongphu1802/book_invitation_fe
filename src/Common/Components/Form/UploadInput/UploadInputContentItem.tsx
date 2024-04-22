import { MouseEvent, memo, useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";

import { ImageDataType } from "../../../../App/Types/Common";

export interface UploadInputContentItemProps {
  image: string;
  onClearImage: (e: MouseEvent<HTMLDivElement>, image: ImageDataType["url"]) => void;
}

const UploadInputContentItem = ({ image, onClearImage }: UploadInputContentItemProps) => {
  const handleClearImage = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      onClearImage(e, image);
    },
    [image, onClearImage],
  );

  return (
    <div className="group relative aspect-4/3 h-14 w-[calc(25%-12px)] flex-none rounded-lg">
      <img src={image} alt="cstorage" className="object-cover object-center w-full h-full rounded-lg" />
      <div
        role="button"
        tabIndex={0}
        className="absolute top-0 flex items-center justify-center invisible w-full h-full text-red-500 bg-gray-100 rounded-lg opacity-70 group-hover:visible"
        onClick={handleClearImage}
      >
        <FiTrash2 size={22} />
      </div>
    </div>
  );
};

export default memo(UploadInputContentItem);
