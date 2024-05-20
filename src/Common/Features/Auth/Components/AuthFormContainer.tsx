import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface AuthFormContainerProps {
  children: React.ReactNode;
}

const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <div
      className={twMerge(
        "w-screen h-screen flex justify-center items-center bg-cover overflow-x-hidden overflow-y-auto bg-content",
      )}
    >
      <div className="px-6 py-16 shadow-lg bg-white/20 w-128 rounded-xl">{children}</div>
    </div>
  );
};

export default memo(AuthFormContainer);
