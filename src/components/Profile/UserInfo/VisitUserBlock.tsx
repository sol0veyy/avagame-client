import { useEffect, useState } from 'react';
import { getIsUserFollow } from '../../../http/Follower/followerAPI';
import { follow_unfollow } from '../../../http/Follower/followerFunctions';
import { Button, Card, CardHeader } from '@nextui-org/react';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import { UserInfoProps } from './UserInfo';

const VisitUserBlock = ({ profileUser }: UserInfoProps) => {
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
        <Card className="self-start">
            <CardHeader className="flex justify-between">
                <UserAvatar user={profileUser} size="lg" />
                {!isLoading ? (
                    <Button
                        color={`${isFollow ? 'danger' : 'success'}`}
                        onClick={() => follow_unfollow(isFollow, setIsFollow, profileUser)}
                    >
                        {isFollow ? 'Отписаться' : 'Подписаться'}
                    </Button>
                ) : (
                    ''
                )}
            </CardHeader>
        </Card>
    );
};

export default VisitUserBlock;
