import {IComment, ICommentRes} from "src/types/commentsTypes";

export function transformCommentsData(data: ICommentRes[]) {
    const commentsMap: Record<number, IComment> = {};
    const commentsTree: IComment[] = [];

    // Создаем объекты комментариев и строим карту по id
    data.forEach((comment: ICommentRes) => {
        commentsMap[comment.id] = {...comment, children: []};
        console.log("commentsMap", commentsMap);
    });

    // Строим дерево комментариев на основе поля parent
    data.forEach((comment: ICommentRes) => {
        if (comment.parent) {
            commentsMap[comment.parent].children.push(commentsMap[comment.id]);
        } else {
            commentsTree.push(commentsMap[comment.id]);
        }
    });
    return commentsTree;
}
export const getMargin = (isMobile: boolean, level: number) => {
    if (isMobile) {
        return level < 2 ? `${level * 20}px` : `20px`;
    }
    return `${level * 34}px`;
};
