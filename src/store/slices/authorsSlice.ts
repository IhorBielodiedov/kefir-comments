import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import "../../lib/axios";
import {IAuthorSlice} from "src/types/authorsTypes";

const initialState: IAuthorSlice = {
    authors: [],
    authorsLoadingStatus: "loading",
};

export const fetchAuthors = createAsyncThunk(
    "authors/fetchAuthors",
    async () => {
        try {
            const comments = await getAuthorsRequest();
            return comments;
        } catch (error) {
            throw error;
        }
    },
);

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export default authorsSlice.reducer;
