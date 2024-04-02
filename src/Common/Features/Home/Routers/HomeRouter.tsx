import { useEffect } from "react";

import { authService } from "../../../../App/Services";

const HomeRouter = () => {
  useEffect(() => {
    const temp = authService.loginWithEmailAndPassword({ email: "user@gmail.com", password: "1234567" });
    console.log(temp);
  }, []);

  return <>HomeRouter</>;
};

export default HomeRouter;
