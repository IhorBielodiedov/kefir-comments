import {configureStore} from "@reduxjs/toolkit";
import commentsSlice from "./slices/commentsSlice";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {commentsSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
