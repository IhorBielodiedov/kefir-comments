import {IComment, IPagination} from "src/types/commentsTypes";

export function transformCommentsData(data: IComment[]) {
    const commentsMap: any = {};
    const commentsTree: any = [];

    // Создаем объекты комментариев и строим карту по id
    data.forEach((comment: any) => {
        commentsMap[comment.id] = {...comment, children: []};
    });

    // Строим дерево комментариев на основе поля parent
    data.forEach((comment: any) => {
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
