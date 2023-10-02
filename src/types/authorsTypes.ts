import {TLoadingStatus} from "./commonTypes";

export interface IAuthor {
    id: number;
    name: string;
    avatar: string;
}
export interface IAuthorSlice {
    authors: IAuthor[];
    authorsLoadingStatus: TLoadingStatus;
}
