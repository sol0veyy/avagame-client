import { Suspense, lazy, useEffect, useState } from 'react';
import { getUserAvatars } from '../../../http/avatarsAPI';
import ModalAcceptRemoveAvatar from '../../Modal/ModalAcceptRemoveAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, selectUser } from '../../../features/users/usersSlice';
import { IAvatar } from '../../../features/avatars/interface';
import { selectAvatars, setAvatars } from '../../../features/avatars/avatarsSlice';
import AvatarSkeleton from '../Avatar/AvatarSkeleton';

const Avatar = lazy(() => import('../Avatar/Avatar'));

interface IPropsUserAvatars {
    profileUser: IUser;
    clickDownload: (avatar: IAvatar) => void;
}

export interface IModalAccept {
    active: boolean
    avatar: IAvatar
}

const UserAvatars = ({ profileUser, clickDownload }: IPropsUserAvatars) => {
    const user = useSelector(selectUser);
    const avatars = useSelector(selectAvatars);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [modalAccept, setModalAccept] = useState<IModalAccept>({
        active: false,
        avatar: {} as IAvatar,
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
                <div className='flex flex-wrap gap-4 col-span-3 mt-8 lg:mt-0 justify-around lg:justify-start'>
                    {avatars.map((avatar) => (
                        <Suspense fallback={<AvatarSkeleton />}>
                            <Avatar
                                profile={user.id === profileUser.id}
                                clickDel={clickDel}
                                clickDownload={clickDownload}
                                avatar={avatar}
                                key={avatar.id}
                            />
                        </Suspense>
                    ))}
                    <ModalAcceptRemoveAvatar
                        modalAccept={modalAccept}
                        setModalAccept={setModalAccept}
                    />
                </div>
            ) : (
                <>
                    {!loading && (
                        <div className='mt-8 lg:mt-0 flex justify-center items-center col-span-3'>
                            <h2 className='text-default-400'>
                                Нет опубликованных аватарок
                            </h2>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UserAvatars;
