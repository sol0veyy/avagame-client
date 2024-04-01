/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { getIsUserFollow } from "../../../http/Follower/followerAPI";
import { getNoun } from "../../Button/ProfileButton";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../../../utils/consts";
import { follow_unfollow } from "../../../http/Follower/followerFunctions";
import { useSelector } from "react-redux";
import { IUser, selectUser } from "../../../features/users/usersSlice";

interface IUserBlock {
    otherUser: IUser;
}

const UserBlock = ({ otherUser }: IUserBlock) => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const isThisUser = user.id === otherUser.id;
    const [isLoading, setIsLoading] = useState(true);
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        if (isThisUser) return;

        getIsUserFollow(otherUser.id)
            .then((isFollow: boolean) => {
                setIsFollow(isFollow);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="user__block d-flex mb-3">
            <button 
                className="p-0 btn__reset"
                onClick={() => navigate(`${otherUser.login + PROFILE_ROUTE}`)}
            >
                <img className="user__avatar" src={process.env.REACT_APP_API_URL + otherUser.img} alt="avatar" width={50} height={50} />
            </button>
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex flex-column justify-content-around align-items-start mx-2">
                    <button 
                        className="user__login btn__reset"
                        onClick={() => navigate(`${otherUser.login + PROFILE_ROUTE}`)}
                    >{otherUser.login}</button>
                    <span className="user__colAvatars text-secondary">{otherUser.publications + " " + getNoun(otherUser.publications, "аватарка", "аватарки", "аватарок")}</span>
                </div>
                {isThisUser ? (
                    <span className="text-success align-self-center">Это вы!</span>       
                ) : (
                    <button 
                        className="p-0 align-self-center btn__reset"
                        onClick={() => follow_unfollow(isFollow, setIsFollow, otherUser)}
                    >
                        {!isLoading ?
                            <img src={`/img/${isFollow ? 'delete-user.svg' : 'sub-user.svg'}`} alt="delete user" width={26} height={26} /> : ''
                        }
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserBlock;