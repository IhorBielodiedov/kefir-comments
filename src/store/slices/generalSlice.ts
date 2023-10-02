import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import "../../lib/axios";
import {IGeneralSlice} from "src/types/generalTypes";

const initialState: IGeneralSlice = {
    general: null,
    generalLoadingStatus: "loading",
};

export const fetchGeneral = createAsyncThunk(
    "comments/fetchGeneral",
    async () => {
        let pages = 0; // Переменная для хранения количества страниц
        const general: {commentsCount: number; likesCount: number} = {
            commentsCount: 0,
            likesCount: 0,
        };

        // Получаем данные первой страницы для получения total_pages
        const firstPage = await getCommentsRequest(1);
        pages = firstPage.pagination.total_pages;

        // Обходим остальные страницы и суммируем длину комментариев и лайки
        for (let i = 1; i <= pages; i++) {
            try {
                const comments = await getCommentsRequest(i);

                // Получаем комментарии для текущей страницы
                general.commentsCount += comments.data.length; // Добавляем длину комментариев текущей страницы к общей сумме

                // Суммируем лайки
                comments.data.forEach((comment: any) => {
                    general.likesCount += comment.likes;
                });
            } catch (error) {
                throw error;
            }
        }
        return general;
    },
);

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setLikes: (state, action: PayloadAction<number>) => {
            state.general!.likesCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

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

const {actions, reducer} = generalSlice;

export default reducer;
export const {setLikes} = actions;
