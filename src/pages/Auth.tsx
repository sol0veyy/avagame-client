import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import '../styles/reg-auth.scss';
import { loginIn, registration } from '../http/userAPI';
import { useDispatch } from 'react-redux';
import { IUser, setUser } from '../features/users/usersSlice';
import PassView from '../assets/view.svg';
import PassNoView from '../assets/no-view.svg';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';

const Auth = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPassView, setIsPassView] = useState(false);
    const [typePass, setTypePass] = useState('password');

    const click = () => {
        if (isLogin) {
            loginIn(login, password)
                .then((user: IUser) => {
                    dispatch(setUser(user));
                    navigate(MAIN_ROUTE);
                })
                .catch((error) => {
                    setError(error.response.data.message);
                });
        } else {
            registration(login, email, password)
                .then((user: IUser) => {
                    dispatch(setUser(user));
                    navigate(MAIN_ROUTE);
                })
                .catch((error) => {
                    setError(error.response.data.message);
                });
        }
        setError('');
    };

    const correctInput = (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    };

    const clearError = () => {
        setError('');
    };

    const passOnView = () => {
        if (isPassView) {
            setIsPassView(false);
            setTypePass('password');
        } else {
            setIsPassView(true);
            setTypePass('text');
        }
    };

    return (
        <div className='flex justify-center mt-36'>
            <Card className="lg:w-1/6 ">
                <CardHeader>
                    <div className='w-full'>
                        <h1 className="text-center text-lg">
                            {isLogin ? 'Авторизация' : 'Регистрация'}
                        </h1>
                    </div>
                </CardHeader>
                <CardBody>
                    <form className='flex flex-col gap-3'>
                        <Input
                            required
                            type="text"
                            name="login"
                            placeholder="Логин"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            onKeyDown={e => correctInput(e)}
                        />
                        {!isLogin &&
                            <Input
                                required
                                type="email"
                                name="email"
                                placeholder="Почта"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => correctInput(e)}
                            />
                        }
                        <div className='password__input'>
                            <Input
                                required
                                type={typePass}
                                name="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={e => correctInput(e)}
                            />
                            {isPassView ?
                                <PassNoView onClick={passOnView} className="password__control" />
                                :
                                <PassView onClick={passOnView} className="password__control" />
                            }
                        </div>
                        {error &&
                            <div className="text-center text-danger text-small">
                                {error}
                            </div>
                        }
                        <div className='flex gap-2'>
                            <Link to={MAIN_ROUTE} className='basis-1/3'>
                                <Button variant='bordered'>Главная</Button>
                            </Link>
                            <Button
                                className='basis-2/3'
                                color='primary'
                                onClick={click}
                            >{isLogin ? 'вход' : 'зарегистрироваться'}</Button>
                        </div>
                    </form>
                </CardBody>
                <CardFooter>
                    {isLogin ?
                        <p className="text-center text-small">
                            У вас нет аккаунта? - <Link className="text-success text-small" onClick={clearError} to={REGISTRATION_ROUTE}>зарегистрируйтесь</Link>
                        </p>
                        :
                        <p className="text-center text-small">
                            У вас есть аккаунт? - <Link className="text-success text-small" onClick={clearError} to={LOGIN_ROUTE}>авторизируйтесь</Link>
                        </p>
                    }
                </CardFooter>
            </Card>
        </div>
    );
};

export default Auth;
