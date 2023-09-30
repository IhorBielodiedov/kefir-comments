import React, {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "src/store";
import {IComment} from "src/types/commentsTypes";
import "./comment.css";
import {formatDate} from "src/lib/date";
import Heart from "../../assets/icons/heart.svg";

interface Props {
    comment: IComment;
    level: number;
}

export const Comment: FC<Props> = ({comment, level}) => {
    const {authors} = useSelector((state: RootState) => state.commentsSlice);
    const marginLeft = `${level * 34}px`;
    const [authorInfo, setAuthorInfo] = useState<any>();

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
                                <button className="like-button">
                                    <img src={Heart} alt="Heart" />
                                    <p className="bold-text-nums">
                                        {comment.likes}
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
