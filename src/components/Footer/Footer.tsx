import SVGProfile from '@/assets/person-circle.svg';
import SVGHome from '@/assets/images.svg';
import SVGSubs from '@/assets/people-fill.svg';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SUBS_ROUTE } from '@/shared/utils/consts';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/usersSlice';
import ProfileButton from '../ProfileButton/ProfileButton';

const Footer = () => {
    const user = useSelector(selectUser);
    const location = useLocation();

    const isProfileLocation = location.pathname === `/${user.login}${PROFILE_ROUTE}`;
    const isHomeLocation = location.pathname === MAIN_ROUTE;
    const isSubsLocation = location.pathname === SUBS_ROUTE;
    const isAuthRegLocation = location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE;

    const SVGProfileSize = isProfileLocation ? 30 : 25;
    const SVGHomeSize = isHomeLocation ? 30 : 25;
    const SVGSubsSize = isSubsLocation ? 30 : 25;

    return (
        <footer className={`${isAuthRegLocation && 'hidden'} border-t-1 border-gray-800 row-span-1 lg:hidden w-full p-2`}>
            <nav className='flex h-full justify-around items-center'>
                {user.isAuth ?
                    <>
                        <Link to={`${user.login}${PROFILE_ROUTE}`}>
                            <SVGProfile fill={`${!isProfileLocation ? 'gray' : 'white'}`} width={SVGProfileSize} height={SVGProfileSize} />
                        </Link>
                        <Link to={MAIN_ROUTE}>
                            <SVGHome fill={`${!isHomeLocation ? 'gray' : 'white'}`} width={SVGHomeSize} height={SVGHomeSize} />
                        </Link>
                        <Link to={SUBS_ROUTE}>
                            <SVGSubs fill={`${!isSubsLocation ? 'gray' : 'white'}`} width={SVGSubsSize} height={SVGSubsSize} />
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