import { IUser } from "@/features/users/usersSlice";
import { PROFILE_ROUTE } from "@/shared/utils/consts";
import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { getNoun } from "../ProfileButton/ProfileButton";

interface UserAvatarProps {
    user: IUser;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const UserAvatar = ({user, size, className}: UserAvatarProps) => {
    const navigate = useNavigate();
    const sizes = {
        avatarSize: size,
        loginSize: size !== "lg" && "text-small"
    }

    return (
        <div className="flex">
            <Avatar
                className={`${className} cursor-pointer`}
                size={sizes.avatarSize}
                src={process.env.REACT_APP_API_URL + user.img}
                onClick={() => navigate(`/${user.login + PROFILE_ROUTE}`)}
            />
            <div className="flex justify-around">
                <div className="flex flex-col justify-around items-start mx-2">
                    <span
                        className={`${sizes.loginSize} cursor-pointer font-semibold leading-none text-default-600`}
                        onClick={() =>
                            navigate(`/${user.login + PROFILE_ROUTE}`)
                        }
                    >
                        {user.login}
                    </span>
                    <span className="text-small tracking-tight text-default-400">
                        {user.publications +
                            ' ' +
                            getNoun(
                                user.publications,
                                'аватарка',
                                'аватарки',
                                'аватарок'
                            )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;
