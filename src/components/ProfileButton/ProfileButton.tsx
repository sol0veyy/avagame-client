import { Link } from "react-router-dom";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../../shared/utils/consts";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/users/usersSlice";
import { Button } from "@nextui-org/react";
import UserAvatar from "../UserAvatar/UserAvatar";

export const getNoun = (number: number, one: string, two: string, five: string) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};

interface IProfileButton {
    className?: string;
}

const ProfileButton = ({ className }: IProfileButton) => {
    const user = useSelector(selectUser);

    return (
        <div className={`${className}`}>
            {user.isAuth ?
                <div className="hidden lg:block">
                    <UserAvatar user={user} size="lg" />
                </div>
                :
                <div className="btn__group flex gap-2">
                    <Link to={REGISTRATION_ROUTE}>
                        <Button >Регистрация</Button>
                    </Link>
                    <Link to={LOGIN_ROUTE}>
                        <Button color="primary">Вход</Button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default ProfileButton;