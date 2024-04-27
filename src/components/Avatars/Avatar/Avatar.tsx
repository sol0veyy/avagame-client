import { useEffect, useState } from "react";
import "./avatar.scss";
import { delLike, getLike, setLikes } from "../../../http/avatarsAPI";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/users/usersSlice";
import { IAvatar } from "../../../features/avatars/interface";
import CommentBlock from "../../CommentBlock/CommentBlock";
import Delete from "@/assets/x.svg";
import Download from "../../../assets/download.svg";
import Heart from "../../../assets/heart.svg";
import Chat from "../../../assets/chat.svg";
import { Skeleton } from "@nextui-org/react";

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
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    
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
        <div className="avatarBlock flex flex-col items-center self-start relative">            
            {profile ? 
                <div className="delete__block">
                    <Delete onClick={() => clickDel(avatar)} className="delete" width={24} height={24}  />
                </div>
                :
                ""
            }
            <div className="download__block">
                <Download onClick={() => clickDownload(avatar)} className="download" width={22} height={22} />
            </div>
            <div className="w-[150px] h-[150px]">
                {!isImgLoaded && (
                    <Skeleton>
                        <div className="h-[150px] rounded-lg bg-default-300"></div>
                    </Skeleton>
                )}
                <img onLoad={() => setIsImgLoaded(true)} className={`${!isImgLoaded && 'hidden'} picture`} width={150} src={process.env.REACT_APP_API_URL + avatar.img} alt="avatar" />
            </div>
            <footer>
                <div className="heart__block">
                    <Heart onClick={clickHeart} className="heart" fill={`${onLike ? 'red' : 'currentColor'}`} width={20} height={20} />
                    <div className={`rating ${onLike ? 'red' : ''}`}>{userAvatar.likes.length}</div>
                </div>
                <div className="chat__block" onClick={() => setActiveCommentBlock(true)}>
                    <Chat className="chat" width={20} height={20} />
                </div>
            </footer>
            <CommentBlock active={activeCommentBlock} setActiveCommentBlock={setActiveCommentBlock} avatar={avatar} />
        </div>
    );
};

export default Avatar;