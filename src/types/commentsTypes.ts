export interface IComment {
    id: number;
    author: number;
    text: string;
    parent: number | null;
    likes: number;
    created: string;
    children: IComment[] | [];
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
    comments: any[] | [];
    commentsLoadingStatus: TLoadingStatus;
    authors: any;
    authorsLoadingStatus: TLoadingStatus;
    general: {commentsCount: number; likesCount: number} | null;
    generalLoadingStatus: TLoadingStatus;
}
type TLoadingStatus = "idle" | "loading" | "error";
