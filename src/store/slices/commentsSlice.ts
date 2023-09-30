import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {IComment, IPagination} from "src/types/commentsTypes";
interface ICommentSlice {
    comments: IPagination<any[]> | null;
    commentsLoadingStatus: "idle" | "loading" | "error";
    authors: any;
    authorsLoadingStatus: "idle" | "loading" | "error";
}
const initialState: ICommentSlice = {
    comments: null,
    commentsLoadingStatus: "loading",
    authors: null,
    authorsLoadingStatus: "loading",
};
interface Props {
    page: number;
}
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async ({page}: Props) => {
        const comments = await getCommentsRequest(page);
        console.log(comments.data[0].text);
        return comments;
    },
);
export const fetchAuthors = createAsyncThunk(
    "comments/fetchAuthors",
    async () => {
        const comments = await getAuthorsRequest();
        return comments;
    },
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<IPagination<any[]>>) => {
            state.comments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.commentsLoadingStatus = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.commentsLoadingStatus = "idle";
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.commentsLoadingStatus = "error";
            })
            .addCase(fetchAuthors.pending, (state) => {
                state.authorsLoadingStatus = "loading";
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.authorsLoadingStatus = "idle";
                state.authors = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state) => {
                state.authorsLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const {actions, reducer} = commentsSlice;

export default reducer;
export const {setComments} = actions;
