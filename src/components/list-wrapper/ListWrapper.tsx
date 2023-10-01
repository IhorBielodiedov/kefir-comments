import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "src/store";
import {
    fetchAuthors,
    fetchComments,
    fetchGeneral,
} from "src/store/slices/commentsSlice";
import {transformCommentsData} from "src/lib/helpers";
import {IComment} from "src/types/commentsTypes";
import "./listWrapper.css";
import {CommentsHeader} from "../comments-header/CommentsHeader";
import {CommentsList} from "../comments-list/CommentsList";

export const ListWrapper = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        comments,
        general,
        generalLoadingStatus,
        commentsLoadingStatus,
        authorsLoadingStatus,
    } = useSelector((state: RootState) => state.commentsSlice);

    const [transformComments, setTransformedComments] = useState<IComment[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Загрузка данных при монтировании компонента и изменении текущей страницы
    useEffect(() => {
        dispatch(fetchComments({page: currentPage}));
        dispatch(fetchAuthors());
        dispatch(fetchGeneral());
    }, [currentPage]);

    // Преобразование данных комментариев при изменении комментариев
    useEffect(() => {
        setTransformedComments(transformCommentsData(comments));
    }, [comments]);

    // Обработчик кнопки "Загрузить еще"
    const handleButtonClick = () => {
        setCurrentPage((state) => state + 1);
    };

    return (
        <>
            {/* Отображение сообщения об ошибке, если что-то пошло не так при загрузке данных */}
            {(generalLoadingStatus === "error" ||
                commentsLoadingStatus === "error" ||
                authorsLoadingStatus === "error") && (
                <div className="error-message">
                    <p className="error-message__text bold-text">
                        Что-то пошло не так... Перезагрузите страницу
                    </p>
                </div>
            )}

            {/* Отображение компонентов после успешной загрузки данных */}
            {general && transformComments && (
                <div className="list-wrapper">
                    <CommentsHeader />
                    <div className="list-line"></div>

                    {/* Отображение списка комментариев с помощью CommentsList */}
                    <CommentsList comments={transformComments} level={0} />

                    {/* Отображение загрузчика, если данные еще загружаются */}
                    {commentsLoadingStatus === "loading" && (
                        <p className="bold-text loader">Загружаем еще...</p>
                    )}

                    {/* Отображение кнопки "Загрузить еще", если есть еще страницы комментариев */}
                    {currentPage < 3 && commentsLoadingStatus === "idle" && (
                        <button
                            className="page-button"
                            onClick={handleButtonClick}
                        >
                            <p className="page-button__text">Загрузить еще</p>
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
