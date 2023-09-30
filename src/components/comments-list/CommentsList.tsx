import React, {FC, useEffect, useState} from "react";
import {Comment} from "../comment/Comment";
import {transformCommentsData} from "src/lib/helpers";
import {IComment, IPagination} from "src/types/commentsTypes";
import "./commentList.css";

interface Props {
    comments: IComment[];
    level: number;
}

export const CommentsList: FC<Props> = ({comments, level}) => {
    const renderComments = (comments: any) => {
        return comments.map((comment: any) => (
            <div key={comment.id}>
                <Comment comment={comment} level={level} />
                {comment.children && comment.children.length > 0 && (
                    <CommentsList
                        comments={comment.children}
                        level={level + 1}
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

export default CommentsList;
