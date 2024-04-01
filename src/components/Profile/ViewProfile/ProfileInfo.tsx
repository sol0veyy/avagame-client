import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IViewProfile } from './ViewProfile';
import { MAIN_ROUTE } from '../../../utils/consts';
import { getIsUserFollow } from '../../../http/Follower/followerAPI';
import { follow_unfollow } from '../../../http/Follower/followerFunctions';

const ProfileInfo = ({ profileUser }: IViewProfile) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        getIsUserFollow(profileUser.id)
            .then((isFollow: boolean) => {
                setIsFollow(isFollow);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                <img
                    src={process.env.REACT_APP_API_URL + profileUser.img}
                    className="avatar"
                    alt="avatar"
                />
                <span className="nickname">{profileUser.login}</span>
                <span className="col-avatar">
                    Количество аватарок - {profileUser.publications}
                </span>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => navigate(MAIN_ROUTE)}
                >
                    Главная
                </button>
                {!isLoading ?
                    <button 
                        onClick={() => follow_unfollow(isFollow, setIsFollow, profileUser)}
                        className={`w-75 btn ${isFollow ? 'btn-outline-danger' : 'btn-outline-success'}`}
                    >{isFollow ? 'Отписаться' : 'Подписаться'}</button> : ''
                }
            </div>
        </div>
    );
};

export default ProfileInfo;