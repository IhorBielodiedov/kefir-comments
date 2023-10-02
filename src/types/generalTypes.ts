import {TLoadingStatus} from "./commonTypes";

export interface IGeneralSlice {
    general: {commentsCount: number; likesCount: number} | null;
    generalLoadingStatus: TLoadingStatus;
}
