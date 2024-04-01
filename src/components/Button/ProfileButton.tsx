import { Link } from "react-router-dom";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";

import React from "react";
import "./profileButton.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/users/usersSlice";

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
        <div className={`${className} col`}>
            {user.isAuth ?
                <div className="d-flex justify-content-lg-end">
                    <Link to={`/${user.login + PROFILE_ROUTE}`}>
                        <img className="rounded-circle" width={50} src={user.img ? process.env.REACT_APP_API_URL + user.img : "img/nonAvatar.jpg"} alt="profile" />
                    </Link>
                    <div className="d-flex justify-content-around flex-column mx-2">
                        <span>{user.login}</span>
                        <span className="col__avatars text-white-50">{user.publications} {getNoun(user.publications, "аватарка", "аватарки", "аватарок")}</span>
                    </div>
                </div>
                :
                <div className="d-flex gap-2 justify-content-lg-end">
                    <Link to={REGISTRATION_ROUTE}>
                        <button className="btn btn-outline-secondary">Регистрация</button>
                    </Link>
                    <Link to={LOGIN_ROUTE}>
                        <button className="btn btn-primary">Вход</button>
                    </Link>
                </div>
            }
        </div>
    );
};

export default ProfileButton;