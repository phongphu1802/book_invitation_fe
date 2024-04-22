import { MouseEvent, memo } from "react";
import { AiOutlineReload } from "react-icons/ai";

import UploadInputContentItem from "./UploadInputContentItem";
import { ImageDataType } from "../../../../App/Types/Common";

export interface UploadInputContentProps {
  images: string[];
  isLoading: boolean;
  onClearImage: (e: MouseEvent<HTMLDivElement>, image: ImageDataType["url"]) => void;
  reviewedImages: string[];
}

const UploadInputContent = ({ images, onClearImage, isLoading, reviewedImages }: UploadInputContentProps) => {
  return (
    <div className="flex flex-wrap justify-start gap-4 rounded-lg">
      {Array.from(images).map((image, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <UploadInputContentItem key={index} image={image} onClearImage={onClearImage} />;
      })}
      {isLoading &&
        Array.from(reviewedImages).map((image, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className="relative h-14 w-[calc(25%-12px)] rounded-lg" key={index}>
              <img
                src={image}
                alt="CStorage"
                className="object-cover object-center w-full h-full rounded-lg opacity-50"
              />
              <div className="absolute inset-0 w-4 h-4 m-auto border-2 rounded-full animate-spin border-t-gray-600" />
            </div>
          );
        })}
      <div className="flex items-center justify-center bg-gray-100 rounded-lg h-14 grow">
        <AiOutlineReload size={22} />
      </div>
    </div>
  );
};

export default memo(UploadInputContent);
