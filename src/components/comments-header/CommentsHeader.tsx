import {FC} from "react";

import "./CommentsHeader.css";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import {HeartEmpty} from "src/assets/icons";

export const CommentsHeader: FC = () => {
    const {comments} = useSelector((state: RootState) => state.commentsSlice);
    const {general} = useSelector((state: RootState) => state.generalSlice);

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
