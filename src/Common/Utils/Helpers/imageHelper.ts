import { ImageDataType } from "../../../App/Types/Common";

const getImageURLFromFile = (file: File | ImageDataType) => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }

  return file.url;
};

export { getImageURLFromFile };
