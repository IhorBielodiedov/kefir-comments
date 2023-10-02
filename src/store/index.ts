import {configureStore} from "@reduxjs/toolkit";
import commentsSlice from "./slices/commentsSlice";
import authorsSlice from "./slices/authorsSlice";
import generalSlice from "./slices/generalSlice";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {commentsSlice, authorsSlice, generalSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
