import { useDispatch as reduxUseDispatch } from "react-redux";

import { AppDispatch } from "../../App/store";

const useDispatch: () => AppDispatch = reduxUseDispatch;

export default useDispatch;
