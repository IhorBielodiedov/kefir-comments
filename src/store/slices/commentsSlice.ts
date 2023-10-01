import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {add} from "date-fns";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {IComment, IPagination} from "src/types/commentsTypes";
interface ICommentSlice {
    comments: any[] | [];
    commentsLoadingStatus: "idle" | "loading" | "error";
    authors: any;
    authorsLoadingStatus: "idle" | "loading" | "error";
    general: {commentsCount: number; likesCount: number} | null;
    generalLoadingStatus: "idle" | "loading" | "error";
}
const initialState: ICommentSlice = {
    comments: [],
    commentsLoadingStatus: "loading",
    authors: null,
    authorsLoadingStatus: "loading",
    general: null,
    generalLoadingStatus: "loading",
};
interface Props {
    page: number;
}

type OriginalRequest =
    | (AxiosError["config"] & {
          _retry?: boolean;
      })
    | undefined;

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error: AxiosError) {
        const originalRequest: OriginalRequest = error.config;
        if (error && !originalRequest._retry) {
            originalRequest._retry = true;
            const newRes = await axios.request(error.config);
            return newRes;
        } else {
            return Promise.reject(error);
        }
    },
);

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async ({page}: Props) => {
        const comments = await getCommentsRequest(page);
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

export const fetchGeneral = createAsyncThunk(
    "comments/fetchGeneral",
    async () => {
        let pages = 0; // Инициализируйте переменную для хранения количества страниц
        const general: any = {commentsCount: 0, likesCount: 0}; // Добавляем likesCount

        // Получаем данные первой страницы для получения total_pages
        const firstPage = await getCommentsRequest(1);
        pages = firstPage.pagination.total_pages;

        // Обходим остальные страницы и суммируем длину комментариев и лайки
        for (let i = 1; i <= pages; i++) {
            const comments = await getCommentsRequest(i); // Получаем комментарии для текущей страницы
            general.commentsCount += comments.data.length; // Добавляем длину комментариев текущей страницы к общей сумме

            // Суммируем лайки
            comments.data.forEach((comment: any) => {
                general.likesCount += comment.likes;
            });
        }
        return general;
    },
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setLikes: (state, action: PayloadAction<number>) => {
            state.general!.likesCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.commentsLoadingStatus = "loading";
            })
            .addCase(
                fetchComments.fulfilled,
                (state, action: PayloadAction<{data: any[]}>) => {
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
            .addCase(fetchGeneral.pending, (state) => {
                state.generalLoadingStatus = "loading";
            })
            .addCase(fetchGeneral.fulfilled, (state, action) => {
                state.generalLoadingStatus = "idle";
                state.general = action.payload;
            })
            .addCase(fetchGeneral.rejected, (state) => {
                state.generalLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const {actions, reducer} = commentsSlice;

export default reducer;
export const {setLikes} = actions;
