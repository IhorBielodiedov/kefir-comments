export interface IComment {
    id: number;
    author: number;
    text: string;
    parent: number | null;
    likes: string;
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
