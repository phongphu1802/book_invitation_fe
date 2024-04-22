import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import {
  ChangeEvent,
  MouseEvent,
  MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import EmptyUploadInput from "./EmptyUploadInput";
import UploadInputContent from "./UploadInputContent";
import useToast from "../../../Hooks/useToast";
import { ImageDataType } from "../../../../App/Types/Common";
import { getImageURLFromFile } from "../../../Utils/Helpers/imageHelper";
import { ImageUploadTypeEnum } from "../../../../App/Enums";
import { uploadService } from "../../../../App/Services";

export interface UncontrolledUploadInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "multiple"> {
  className?: string;
  containerClassName?: string;
  error?: string;
  inlineError?: boolean;
  multiple: boolean;
  value?: string | string[];
  label?: string;
  placeholder: string;
  onChange?: (image: string | string[]) => void;
}

const UncontrolledUploadInput = ({
  className,
  containerClassName,
  error,
  inlineError = false,
  multiple,
  value,
  label,
  disabled = false,
  onChange,
  placeholder,
  ...props
}: UncontrolledUploadInputProps) => {
  const { t } = useTranslation("common");
  const toast = useToast();

  const inputFileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewedImages, setReviewedImages] = useState<string[]>([]);
  const isFirstRender = useRef(true);

  const handleClickInput = useCallback(() => {
    const inputFileElement = inputFileRef.current;
    inputFileElement.click();
  }, []);

  const handleChangeInput = useCallback(
    async (imageFile: ImageDataType) => {
      setIsLoading(true);
      if (!multiple) {
        setImages?.([]);
      }

      try {
        const image = await uploadService.uploadImage(imageFile, ImageUploadTypeEnum.SYSTEM);
        const newFileData = image as ImageDataType;

        if (multiple) {
          setImages((prev) => [...prev, newFileData.absolute_url]);
          isFirstRender.current = false;
          return;
        }
        onChange?.(newFileData.absolute_url);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(t("uploadError"));
        }
      } finally {
        setIsLoading(false);
        setReviewedImages([]);
      }
    },
    [multiple, onChange, t, toast],
  );

  const handleChooseImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const filesInput = e.target.files;
      if (filesInput === null) {
        return;
      }

      (Array.from(filesInput) as ImageDataType[]).forEach((imageFile) => {
        setReviewedImages((prev) => [...prev, getImageURLFromFile(imageFile)]);
        handleChangeInput(imageFile);
      });
    },

    [handleChangeInput],
  );

  const handleClearImage = useCallback(
    (e: MouseEvent<HTMLDivElement>, image: ImageDataType["url"]) => {
      e.preventDefault();
      e.stopPropagation();

      setImages((prev) => prev.filter((imageItem) => imageItem !== image));
      if (multiple) {
        onChange?.(images.filter((imageItem) => imageItem !== image));
        return;
      }
      onChange?.("");
    },
    [images, multiple, onChange],
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      onChange?.(images);
    }
  }, [images, onChange]);

  useEffect(() => {
    if (!isFirstRender.current) {
      return;
    }

    if (!value || isEmpty(value)) {
      setImages([]);
      return;
    }

    setImages(Array.isArray(value) ? value : [value]);
  }, [value]);

  return (
    <div
      className={twMerge(
        "relative block cursor-text rounded-lg border-2 border-gray-100 bg-white px-4 py-4 ring-inset transition-colors duration-100 hover:border-blue-500",
        disabled && "cursor-default bg-gray-50 ring-gray-100 hover:border-gray-100",
        containerClassName,
      )}
    >
      <div
        className={twMerge(
          "absolute left-2 top-1.5 z-5 -mt-0.5 flex -translate-y-4 items-center justify-between bg-white px-2 text-sm font-semibold text-blue-500 transition-all duration-100",
          disabled && "text-gray-400",
        )}
      >
        <div className="absolute inset-y-0 left-0 top-1/2 -z-30 w-full -translate-y-0.5" />
        {label}
      </div>
      <button
        type="button"
        className={twMerge("block w-full cursor-pointer text-left outline-none", className)}
        tabIndex={0}
        onClick={handleClickInput}
      >
        <input
          type="file"
          className="hidden"
          name="input_file"
          ref={inputFileRef}
          multiple={multiple}
          onChange={handleChooseImage}
          {...props}
        />
        <div className="w-full h-full">
          {images?.length > 0 || isLoading ? (
            <UploadInputContent
              images={images}
              onClearImage={handleClearImage}
              isLoading={isLoading}
              reviewedImages={reviewedImages}
            />
          ) : (
            <EmptyUploadInput placeholder={placeholder} />
          )}
        </div>
      </button>
      {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};
export default memo(UncontrolledUploadInput);
