import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {IComment} from "src/types/commentsTypes";
import "./comment.css";
import {formatDate} from "src/lib/date";
import Heart from "../../assets/icons/heart.svg";
import HeartFilled from "../../assets/icons/heartFilled.svg";
import {setLikes} from "src/store/slices/commentsSlice";

interface Props {
    comment: IComment;
    level: number;
}

export const Comment: FC<Props> = ({comment, level}) => {
    const {authors, general} = useSelector(
        (state: RootState) => state.commentsSlice,
    );
    const marginLeft = `${level * 34}px`;
    const [authorInfo, setAuthorInfo] = useState<any>();
    const [isLiked, setIsLiked] = useState<boolean>();
    const [commentLikesCount, setCommentLikesCount] = useState(comment.likes);
    const dispatch = useDispatch();

    const handleLikeClick = () => {
        if (isLiked) {
            dispatch(setLikes(general!.likesCount - 1));
            setCommentLikesCount((state) => state - 1);
            setIsLiked(false);
        } else {
            dispatch(setLikes(general!.likesCount + 1));
            setCommentLikesCount((state) => state + 1);
            setIsLiked(true);
        }
    };

    useEffect(() => {
        if (authors)
            setAuthorInfo(
                authors.filter((item: any) => {
                    return comment.author === item.id;
                }),
            );
    }, [authors]);

    return (
        <>
            {authorInfo && (
                <div className="comment" style={{marginLeft}}>
                    <div className="comment-container">
                        <img
                            className="comment-author-avatar"
                            src={authorInfo[0].avatar}
                        />
                        <div className="comment-content">
                            <div className="comment-info">
                                <div>
                                    <p className="comment-author-name bold-text">
                                        {authorInfo[0].name}
                                    </p>
                                    <p className="comment-time">
                                        {formatDate(comment.created)}
                                    </p>
                                </div>
                                <button
                                    className="like-button"
                                    onClick={handleLikeClick}
                                >
                                    {isLiked ? (
                                        <img src={HeartFilled} alt="Heart" />
                                    ) : (
                                        <img src={Heart} alt="Heart" />
                                    )}
                                    <p className="bold-text-nums">
                                        {commentLikesCount}
                                    </p>
                                </button>
                            </div>
                            <div className="comment-text">{comment.text}</div>
                        </div>
                    </div>
                    {/* Добавьте код для отображения информации о комментарии, например, аватара и имени автора */}
                </div>
            )}
        </>
    );
};
