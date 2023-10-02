import {FC} from "react";
import {IComment} from "src/types/commentsTypes";
import "./CommentList.css";
import {Comment} from "../comment";

interface Props {
    comments: IComment[]; // Массив комментариев, которые будут отображаться
    level: number; // Уровень вложенности текущего списка комментариев
}

export const CommentsList: FC<Props> = ({comments, level}) => {
    // Функция для рекурсивного отображения комментариев и их подкомментариев
    const renderComments = (comments: IComment[]) => {
        return comments.map((comment: IComment) => (
            <div key={comment.id}>
                <Comment comment={comment} level={level} />
                {/* Отображение компонента Comment для каждого комментария */}
                {comment.children && comment.children.length > 0 && (
                    <CommentsList
                        comments={comment.children} // Рекурсивный вызов CommentsList для подкомментариев
                        level={level + 1} // Увеличение уровня вложенности
                    />
                )}
            </div>
        ));
    };

    return (
        <>
            {comments && (
                <div className="comments-list">{renderComments(comments)}</div>
            )}
        </>
    );
};
