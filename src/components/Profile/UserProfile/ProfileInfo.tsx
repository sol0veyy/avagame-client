import React from 'react';
import '../profile.scss';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import {
    logout,
    selectUser
} from '../../../features/users/usersSlice';

interface IPropsProfileInfo {
    setUploadActive: (active: boolean) => void;
	setSettingsActive: (active: boolean) => void;
}

const ProfileInfo = ({ setUploadActive, setSettingsActive }: IPropsProfileInfo) => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate(MAIN_ROUTE);
    };

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                <img
                    src={process.env.REACT_APP_API_URL + user.img}
                    className="avatar"
                    alt="avatar"
                />
                <span className="nickname">{user.login}</span>
                <span className="col-avatar">
                    Количество аватарок - {user.publications}
                </span>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => navigate(MAIN_ROUTE)}
                >
                    Главная
                </button>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => setUploadActive(true)}
                >
                    Опубликовать аватарку
                </button>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => setSettingsActive(true)}
                >
                    Настройки профиля
                </button>
                <button
                    className="w-75 btn btn-outline-danger"
                    onClick={handleLogout}
                >
                    Выйти с аккаунта
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
