import { memo } from "react";

interface AuthFormContainerProps {
  children: React.ReactNode;
}

const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-[url('https://apis.book-invitation.encacap.com/images/systems/1713265679.jpg')] overflow-x-hidden overflow-y-auto">
      <div className="px-6 py-16 shadow-lg bg-white/20 w-128 rounded-xl">{children}</div>
    </div>
  );
};

export default memo(AuthFormContainer);
