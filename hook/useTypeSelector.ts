// We need this to use useSelector  (You can Export this as a react-hook to use separately)
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/creatReducer";
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
