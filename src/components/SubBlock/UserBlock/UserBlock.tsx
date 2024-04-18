/* eslint-disable react/react-in-jsx-scope */
import { Suspense, useEffect, useState } from 'react';
import { getIsUserFollow } from '../../../http/Follower/followerAPI';
import { getNoun } from '../../Button/ProfileButton';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../../utils/consts';
import { follow_unfollow } from '../../../http/Follower/followerFunctions';
import { useSelector } from 'react-redux';
import { IUser, selectUser } from '../../../features/users/usersSlice';
import DeleteUser from '../../../assets/delete-user.svg';
import SubUser from '../../../assets/sub-user.svg';
import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react';
import UserAvatar from '@/components/UserAvatar/UserAvatar';

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
        <Card className="mb-3">
            <CardBody>
                <div className='flex justify-between'>
                    <UserAvatar user={otherUser} />
                    {isThisUser ? (
                            <span className="text-small text-success self-center">Это вы!</span>       
                        ) : (
                            <button 
                                className="p-0 align-self-center btn__reset"
                                onClick={() => follow_unfollow(isFollow, setIsFollow, otherUser)}
                            >
                                {!isLoading &&                  
                                    (isFollow ?
                                        <DeleteUser width={24} height={24} />
                                        :
                                        <SubUser width={24} height={24} />
                                    )
                                }
                            </button>
                        )}
                </div>
            </CardBody>
        </Card>
    );
};

export default UserBlock;
