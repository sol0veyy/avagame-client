import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
    logout,
    selectUser
} from '../../../features/users/usersSlice';
import { Button, Card, CardBody, CardHeader, useDisclosure } from '@nextui-org/react';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import Logout from '@/assets/logout.svg';
import AvatarUpload from '../AvatarUpload/AvatarUpload';
import Settings from '../Settings/Settings';

const ProfileInfo = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate(MAIN_ROUTE);
    };

    return (
        <>
            <Card className='self-start'>
                <CardHeader className='flex justify-between'>
                    <UserAvatar user={user} size="lg" />
                    <div className='flex items-center gap-4 self-start'>
                        <Settings />
                        <Logout 
                            width={25} 
                            height={25} 
                            fill='red' 
                            className='cursor-pointer'
                            onClick={handleLogout} 
                        />
                    </div>
                </CardHeader>
                <CardBody className='flex items-center justify-center pb-6'>
                    <AvatarUpload />
                </CardBody>
            </Card>
        </>
    );
};

export default ProfileInfo;
