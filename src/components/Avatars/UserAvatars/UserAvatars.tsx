import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import './userAvatars.scss';
import { getUserAvatars } from '../../../http/avatarsAPI';
import ModalAcceptRemoveAvatar from '../../Modal/ModalAcceptRemoveAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, selectUser } from '../../../features/users/usersSlice';
import { IAvatar } from '../../../features/avatars/interface';
import { selectAvatars, setAvatars } from '../../../features/avatars/avatarsSlice';

interface IPropsUserAvatars {
    profileUser: IUser;
    clickDownload: (avatar: IAvatar) => void;
}

const UserAvatars = ({ profileUser, clickDownload }: IPropsUserAvatars) => {
    const user = useSelector(selectUser);
    const avatars = useSelector(selectAvatars);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [modalAccept, setModalAccept] = useState({
        active: false,
        avatar: {},
    });

    useEffect(() => {
        getUserAvatars(profileUser.id)
            .then((avatars: IAvatar[]) => {
                dispatch(setAvatars(avatars));
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [user]);

    const clickDel = (avatar: IAvatar) => {
        setModalAccept({
            active: true,
            avatar: { ...avatar },
        });
    };

    return (
        <>
            {!loading && avatars[0] ? (
                <div className='avatarsBlockProfile'>
                    {avatars.map((avatar) => (
                        <Avatar
                            profile={user.id === profileUser.id}
                            clickDel={clickDel}
                            clickDownload={clickDownload}
                            avatar={avatar}
                            key={avatar.id}
                        />
                    ))}
                    <ModalAcceptRemoveAvatar
                        modalAccept={modalAccept}
                        setModalAccept={setModalAccept}
                    />
                </div>
            ) : (
                <>
                    {!loading && (
                        <h2 className='noAvatars'>
                            Нет опубликованных аватарок
                        </h2>
                    )}
                </>
            )}
        </>
    );
};

export default UserAvatars;
