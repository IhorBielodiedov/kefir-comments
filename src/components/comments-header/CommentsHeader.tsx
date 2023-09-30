import {FC, useEffect, useState} from "react";
import Heart from "../../assets/icons/heartEmpty.svg";
import "./commentsHeader.css";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "src/store";
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
                    <div className="likes-info">
                        <img src={Heart} alt="Heart" />
                        <p className="bold-text-nums">{general.likesCount}</p>
                    </div>
                </div>
            )}
        </>
    );
};
