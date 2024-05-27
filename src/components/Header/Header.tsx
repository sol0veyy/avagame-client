import ProfileButton from "../ProfileButton/ProfileButton";
import { MAIN_ROUTE } from "../../shared/utils/consts";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header className="row-span-1 flex justify-between items-center p-2">
            <nav className="flex w-full justify-between">
                <Link to={MAIN_ROUTE} className="flex items-center">
                    <img src={logo} alt="logo" width={160} />
                </Link>
                <ProfileButton className="hidden lg:block" />
            </nav>
        </header>
    );
};

export default Header;