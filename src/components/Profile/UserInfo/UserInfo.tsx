import { useSelector } from 'react-redux';
import {
    IUser,
    selectUser
} from '../../../features/users/usersSlice';
import UserBlock from './UserBlock';
import VisitUserBlock from './VisitUserBlock';

export interface UserInfoProps {
    profileUser: IUser
}

const UserInfo = ({profileUser}: UserInfoProps) => {
    const user = useSelector(selectUser);

    return (
        <>
            {user.id === profileUser.id ? (
                <UserBlock profileUser={user} />
            ) : (
                <VisitUserBlock profileUser={profileUser} />
            )}
        </>
    );
};

export default UserInfo;
