import {FC} from "react";
import Heart from "../../assets/icons/heartEmpty.svg";
import "./commentsHeader.css";
interface Props {
    commentsCount: number;
    likesCount: number;
}
export const CommentsHeader: FC<Props> = ({commentsCount, likesCount}) => {
    return (
        <div className="comments-header-container">
            <p className="bold-text">{commentsCount} комментариев</p>
            <div className="likes-info">
                <img src={Heart} alt="Heart" />
                <p className="bold-text-nums">{likesCount}</p>
            </div>
        </div>
    );
};
