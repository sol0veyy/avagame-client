import SVGProfile from '@/assets/person-circle.svg';
import SVGHome from '@/assets/images.svg';
import SVGSubs from '@/assets/people-fill.svg';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SUBS_ROUTE } from '@/utils/consts';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/usersSlice';
import ProfileButton from '../ProfileButton/ProfileButton';

const Footer = () => {
    const user = useSelector(selectUser);
    const location = useLocation();

    const SVGProfileSize = location.pathname === `/${user.login}${PROFILE_ROUTE}` ? 30 : 25;
    const SVGHomeSize = location.pathname === MAIN_ROUTE ? 30 : 25;
    const SVGSubsSize = location.pathname === SUBS_ROUTE ? 30 : 25;
    const isAuthRegPage = location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE;

    return (
        <footer className={`${isAuthRegPage && 'hidden'} row-span-1 lg:hidden w-full p-2`}>
            <nav className='flex h-full justify-around items-center'>
                {user.isAuth ?
                    <>
                        <Link to={`${user.login}${PROFILE_ROUTE}`}>
                            <SVGProfile width={SVGProfileSize} height={SVGProfileSize} />
                        </Link>
                        <Link to={MAIN_ROUTE}>
                            <SVGHome width={SVGHomeSize} height={SVGHomeSize} />
                        </Link>
                        <Link to={SUBS_ROUTE}>
                            <SVGSubs width={SVGSubsSize} height={SVGSubsSize} />
                        </Link>
                    </>
                    :
                    <ProfileButton />
                }
            </nav>
        </footer>
    );
};

export default Footer;