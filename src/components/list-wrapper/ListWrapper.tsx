import {useEffect, useState} from "react";
import CommentsList from "../comments-list/CommentsList";
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

export const ListWrapper = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {comments, general} = useSelector(
        (state: RootState) => state.commentsSlice,
    );
    const [transformComments, setTransformedComments] = useState<IComment[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        // Диспетчерьте асинхронный thunk при монтировании компонента
        dispatch(fetchComments({page: currentPage}));
        dispatch(fetchAuthors());
        dispatch(fetchGeneral());
    }, [currentPage]);

    useEffect(() => {
        if (comments.length > 0)
            setTransformedComments(transformCommentsData(comments));
    }, [comments]);

    const handleButtonClick = () => {
        setCurrentPage((state) => state + 1);
    };

    return (
        <>
            {general && transformComments && (
                <div className="list-wrapper">
                    <CommentsHeader />
                    <div className="list-line"></div>
                    <CommentsList comments={transformComments} level={0} />
                    {currentPage < 3 && (
                        <button
                            className="page-button"
                            onClick={handleButtonClick}
                        >
                            <p className="page-button-text">Загрузить еще</p>
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
