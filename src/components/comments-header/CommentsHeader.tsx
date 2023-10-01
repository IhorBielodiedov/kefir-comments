import {FC} from "react";

import "./commentsHeader.css";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import {HeartEmpty} from "../../assets/icons/HeartEmpty";
export const CommentsHeader: FC = () => {
    const {comments, general} = useSelector(
        (state: RootState) => state.commentsSlice,
    );

    return (
        <>
            {general && comments && (
                <div className="comments-header-container">
                    <p className="bold-text">
                        {general.commentsCount} комментариев
                    </p>
                    <div className="comments-header-container__likes-info">
                        <HeartEmpty />
                        <p className="bold-text-nums">{general.likesCount}</p>
                    </div>
                </div>
            )}
        </>
    );
};
