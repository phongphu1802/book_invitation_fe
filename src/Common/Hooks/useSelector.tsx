import { TypedUseSelectorHook, useSelector as reduxUseSelector } from "react-redux";

import { RootState } from "../../App/store";

const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export default useSelector;
