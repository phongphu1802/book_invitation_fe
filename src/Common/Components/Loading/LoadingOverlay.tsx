import { memo, useEffect, useId, useMemo } from "react";

import { hideLoadingOverlay, showLoadingOverlay } from "../../../App/Slices/commonSlice";
import { useDispatch } from "../../Hooks";

interface LoadingOverlayProps {
  id?: string;
}

const LoadingOverlay = ({ id: idProp }: LoadingOverlayProps) => {
  const id = useId();
  const overlayId = useMemo(() => idProp || id, [id, idProp]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoadingOverlay(overlayId));

    return () => {
      dispatch(hideLoadingOverlay(overlayId));
    };
  }, [dispatch, overlayId]);

  return null;
};

export default memo(LoadingOverlay);
