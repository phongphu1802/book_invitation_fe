// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { ROOM_API_PATH } from "../../Constants";
import { BaseListQueryType, ResponseDataType } from "../../Types/Common";
import { RoomDataType, RoomFormDataType } from "../../Types/Common/roomType";

const getRooms = async (params?: BaseListQueryType): Promise<ResponseDataType<RoomDataType[]>> => {
  const response = await axiosInstance.get(ROOM_API_PATH.ROOMS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getRoomById = async (id: number): Promise<RoomDataType> => {
  const response = await axiosInstance.get(ROOM_API_PATH.ROOM_ID(id));
  return response.data.data;
};

const createRoom = async (data: RoomFormDataType) => {
  await axiosInstance.post(ROOM_API_PATH.ROOM, data);
};
const editRoom = async (id: number, data: RoomFormDataType) => {
  await axiosInstance.put(ROOM_API_PATH.ROOM_ID(id), data);
};
const deleteRoom = async (id: number) => {
  await axiosInstance.delete(ROOM_API_PATH.ROOM_ID(id));
};

export { getRooms, getRoomById, createRoom, editRoom, deleteRoom };
