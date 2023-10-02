import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {ICommentRes, ICommentSlice} from "src/types/commentsTypes";
import "../../lib/axios";

interface Props {
    page: number;
}

const initialState: ICommentSlice = {
    comments: [],
    commentsLoadingStatus: "loading",
};

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async ({page}: Props) => {
        try {
            const comments = await getCommentsRequest(page);

            return comments;
        } catch (error) {
            throw error;
        }
    },
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.commentsLoadingStatus = "loading";
            })
            .addCase(
                fetchComments.fulfilled,
                (state, action: PayloadAction<{data: ICommentRes[]}>) => {
                    state.commentsLoadingStatus = "idle";
                    if (state.comments.length > 0)
                        state.comments = [
                            ...state.comments,
                            ...action.payload.data,
                        ];
                    else state.comments = action.payload.data;
                },
            )
            .addCase(fetchComments.rejected, (state) => {
                state.commentsLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

export default commentsSlice.reducer;
