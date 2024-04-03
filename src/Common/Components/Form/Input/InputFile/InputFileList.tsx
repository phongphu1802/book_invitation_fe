import { Key, memo } from "react";

import InputFileListItem from "./InputFileListItem";
import { UncontrolledInputFileProps } from "../../interface";

interface InputFileListProps extends Pick<UncontrolledInputFileProps, "files"> {
  onRemove: (id: Key) => void;
}

const InputFileList = ({ files, onRemove }: InputFileListProps) => {
  return (
    <div className="px-4">
      {files.map((file) => (
        <InputFileListItem key={file.id} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default memo(InputFileList);
