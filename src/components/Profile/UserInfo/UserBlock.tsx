import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Settings from "../Settings/Settings";
import Logout from '@/assets/logout.svg';
import { useDispatch } from "react-redux";
import { logout } from "@/features/users/usersSlice";
import { MAIN_ROUTE } from "@/utils/consts";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../AvatarUpload/AvatarUpload";
import { UserInfoProps } from "./UserInfo";

const UserBlock = ({profileUser}: UserInfoProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate(MAIN_ROUTE);
    };

    return (
        <Card className='self-start'>
            <CardHeader className='flex justify-between'>
                <UserAvatar user={profileUser} size="lg" />
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
    );
};

export default UserBlock;