import { Key, memo, useCallback, useMemo } from "react";
import { FiTrash2 } from "react-icons/fi";

import { InputFileDataType } from "../../interface";
import { beautifyFileSize } from "../../../../Utils/Helpers/commonHelper";

interface InputFileListItemProps {
  file: InputFileDataType;
  onRemove: (id: Key) => void;
}

const InputFileListItem = ({ file, onRemove }: InputFileListItemProps) => {
  const name = useMemo(() => {
    if ("name" in file) {
      return file.name;
    }

    return file.file.name;
  }, [file]);
  const size = useMemo(() => {
    if ("file" in file && file.file?.size) {
      return beautifyFileSize(file.file.size);
    }

    return null;
  }, [file]);

  const handleClickRemove = useCallback(() => {
    onRemove(file.id);
  }, [file, onRemove]);

  return (
    <div className="flex items-center py-3">
      <div className="flex items-center flex-1 space-x-2 -translate-y-px">
        <div>{name}</div>
        {size && <div className="text-gray-400">({size})</div>}
      </div>
      <button
        className="text-gray-300 duration-100 hover:text-red-500"
        type="button"
        onClick={handleClickRemove}
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

export default memo(InputFileListItem);
