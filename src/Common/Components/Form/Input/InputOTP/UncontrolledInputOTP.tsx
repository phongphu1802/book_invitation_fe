import { memo } from "react";
import PinInput from "react-pin-input";

import { UncontrolledInputOTPProps } from "../../interface";

const UncontrolledInputOTP = ({
  quantity = 6,
  value,
  error,
  inlineError = false,
  onChange,
  onComplete,
}: UncontrolledInputOTPProps) => {
  const handleOnChangeOTP = (inputOTP: string) => {
    onChange?.(inputOTP);
  };

  return (
    <div className="block transition-colors duration-100 bg-white cursor-text ring-inset">
      <PinInput
        length={quantity}
        initialValue={String(value)}
        type="numeric"
        inputMode="number"
        style={{ display: "flex", justifyContent: "space-between" }}
        inputStyle={{
          borderRadius: "8px",
          borderWidth: "2px",
          borderColor: error ? "#EF4444" : "#f3f4f6",
          marginInline: "0px",
        }}
        inputFocusStyle={{ borderColor: "#3b82f6" }}
        autoSelect
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        onChange={handleOnChangeOTP}
        onComplete={onComplete}
      />
      {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledInputOTP);
