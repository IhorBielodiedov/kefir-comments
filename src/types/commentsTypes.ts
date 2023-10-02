import {TLoadingStatus} from "./commonTypes";

export interface IComment {
    id: number;
    author: number;
    text: string;
    parent: number | null;
    likes: number;
    created: string;
    children: IComment[];
}
export interface ICommentRes {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number | null;
    likes: number;
}
export interface IPagination<T> {
    pagination: {
        page: number;
        size: number;
        total_pages: number;
    };
    data: T;
}
export interface ICommentSlice {
    comments: ICommentRes[];
    commentsLoadingStatus: TLoadingStatus;
}
