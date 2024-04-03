import { Key, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { UncontrolledInputFileProps } from "../../interface";
import InputFileList from "./InputFileList";
import InputFilePlaceholder from "./InputFilePlaceholder";

const UncontrolledInputFile = ({
  accept,
  disabled,
  error,
  files,
  label,
  multiple,
  onChange,
}: UncontrolledInputFileProps) => {
  const handleRemoveFile = useCallback(
    (id: Key) => {
      const newFiles = files.filter((file) => String(file.id) !== String(id));

      onChange(newFiles);
    },
    [files, onChange],
  );

  return (
    <div>
      <div className={twMerge("relative rounded-lg border-2 border-gray-100", error && "border-red-500")}>
        {!!files.length && (
          <div
            className={twMerge(
              "absolute -top-3 left-2 z-10 bg-white px-2 text-sm font-semibold text-blue-500",
              disabled && "bg-transparent text-gray-400",
            )}
          >
            <span>{label}</span>
            <span
              className={twMerge(
                "absolute inset-x-0 top-2.75 -z-10 inline-block border-b-2 border-white",
                disabled && "border-gray-50",
              )}
            />
          </div>
        )}
        {!files.length && <InputFilePlaceholder accept={accept} multiple={multiple} onChange={onChange} />}
        {!!files.length && <InputFileList files={files} onRemove={handleRemoveFile} />}
        {disabled && <div className="absolute inset-0 rounded-lg bg-gray-100 bg-opacity-50" />}
      </div>
      {!!error && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledInputFile);
