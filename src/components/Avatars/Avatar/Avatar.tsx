import React, { useEffect, useState } from "react";
import "./avatar.scss";
import { delLike, getLike, setLikes } from "../../../http/avatarsAPI";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/users/usersSlice";
import { IAvatar } from "../../../features/avatars/interface";
import CommentBlock from "../../CommentBlock/CommentBlock";

interface IPropsAvatar {
    clickDel?: (avatar: IAvatar) => void;
    clickDownload: (avatar: IAvatar) => void;
    avatar: IAvatar;
    profile?: boolean;
}

const Avatar = ({ clickDel, clickDownload, avatar, profile }: IPropsAvatar) => {
    const user = useSelector(selectUser);

    const [userAvatar, setUserAvatar] = useState(avatar);
    const [onLike, setOnLike] = useState(false);
    const [activeCommentBlock, setActiveCommentBlock] = useState(false);
    
    useEffect(() => {
        getLike(userAvatar.id, user.id)
            .then(data => {
                if (data) {
                    setOnLike(true);
                }
            })
            .catch(err => console.log(err));
    }, [userAvatar, user]);

    const clickHeart = async () => {
        if (!user.isAuth) {
            console.log('unauthorized');
            return;
        }

        let avatar = null;

        if (onLike) {
            avatar = await delLike(userAvatar.id, user.id);
        } else {
            avatar = await setLikes(userAvatar.id, user.id);
        }

        setOnLike(!onLike);
        setUserAvatar(avatar);
    };

    return (
        <div className="avatarBlock d-flex flex-column align-items-center align-self-start position-relative">            
            {profile ? 
                <div className="delete__block">
                    <svg onClick={() => clickDel(avatar)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="delete bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
                :
                ""
            }
            <div className="download__block">
                <svg onClick={() => clickDownload(avatar)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="download bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708"/>
                </svg>
            </div>
            <img className="picture" width={150} src={process.env.REACT_APP_API_URL + avatar.img} alt="avatar" />
            <footer>
                <div className="heart__block">
                    <svg onClick={clickHeart} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={`${onLike ? 'red' : 'currentColor'}`} className="heart bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>
                    <div className={`rating ${onLike ? 'red' : ''}`}>{userAvatar.likes.length}</div>
                </div>
                <div className="chat__block" onClick={() => setActiveCommentBlock(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="chat bi bi-chat-fill" viewBox="0 0 16 16">
                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
                    </svg>
                </div>
            </footer>
            <CommentBlock active={activeCommentBlock} />
        </div>
    );
};

export default Avatar;