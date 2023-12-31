import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {IComment} from "src/types/commentsTypes";
import "./Comment.css";
import {formatDate} from "src/lib/date";

import {getMargin} from "src/lib/helpers";
import {IAuthor} from "src/types/authorsTypes";
import {Heart, HeartFilled} from "src/assets/icons";
import {setLikes} from "src/store/slices/generalSlice";
import {useMediaQuery} from "src/lib/hooks";

interface Props {
    comment: IComment;
    level: number;
}

export const Comment: FC<Props> = ({comment, level}) => {
    // Извлечение состояния и действий из Redux
    const {general} = useSelector((state: RootState) => state.generalSlice);
    const {authors} = useSelector((state: RootState) => state.authorsSlice);
    const dispatch = useDispatch();

    // Определение ширины экрана для мобильных устройств
    const isMobile = useMediaQuery("(max-width: 600px)");

    // Определение отступа слева для комментария на основе уровня вложенности
    const marginLeft = getMargin(isMobile, level);

    // Локальное состояние для информации об авторе
    const [authorInfo, setAuthorInfo] = useState<IAuthor[]>();

    // Локальное состояние для отслеживания состояния "лайка"
    const [isLiked, setIsLiked] = useState<boolean>();

    // Локальное состояние для отслеживания количества "лайков" для комментария
    const [commentLikesCount, setCommentLikesCount] = useState(comment.likes);

    // Обработчик клика по кнопке "лайка"
    const handleLikeClick = () => {
        if (isLiked) {
            // Уменьшаем количество лайков и устанавливаем состояние "не лайкнуто"
            dispatch(setLikes(general!.likesCount - 1));
            setCommentLikesCount((state) => state - 1);
            setIsLiked(false);
        } else {
            // Увеличиваем количество лайков и устанавливаем состояние "лайкнуто"
            dispatch(setLikes(general!.likesCount + 1));
            setCommentLikesCount((state) => state + 1);
            setIsLiked(true);
        }
    };

    // Эффект, выполняющий фильтрацию данных автора
    useEffect(() => {
        if (authors)
            setAuthorInfo(
                authors.filter((item: IAuthor) => {
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
                            className="comment-container__author-avatar"
                            src={authorInfo[0].avatar}
                            alt="avatar"
                        />
                        <div className="comment-container__content">
                            <div className="comment-container__info">
                                <div>
                                    <p className="comment-container__author-name bold-text">
                                        {authorInfo[0].name}
                                    </p>
                                    <p className="comment-container__time">
                                        {formatDate(comment.created)}
                                    </p>
                                </div>
                                <button
                                    className="comment-container__like-button"
                                    onClick={handleLikeClick}
                                >
                                    {isLiked ? (
                                        <div className="comment-container__like-button-icon">
                                            <HeartFilled />
                                        </div>
                                    ) : (
                                        <div className="comment-container__like-button-icon">
                                            <Heart />
                                        </div>
                                    )}
                                    <p className="bold-text-nums">
                                        {commentLikesCount}
                                    </p>
                                </button>
                            </div>
                            <div className="comment-container__text">
                                <p className="comment-container__text-base">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
