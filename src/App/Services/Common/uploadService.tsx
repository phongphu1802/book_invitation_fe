// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { COMMON_API_PATH } from "../../Constants";
import { ImageUploadTypeEnum } from "../../Enums";
import { ImageDataType } from "../../Types/Common";

const uploadImage = async (image: File | ImageDataType, type: ImageUploadTypeEnum) => {
  if (image instanceof File) {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("type", type);

    const response = await axiosInstance.post(COMMON_API_PATH.UPLOAD_IMAGE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  }

  return image;
};

export { uploadImage };
