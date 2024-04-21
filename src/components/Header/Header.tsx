import ProfileButton from "../Button/ProfileButton";
import { MAIN_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";
import './header.scss';
import logo from '../../assets/logo.png';
import MobileNavigation from "./MobileNavigation";

const Header = () => {
    return (
        <header className="flex justify-between items-center">
            <nav className="flex w-full justify-between">
                <Link to={MAIN_ROUTE} className="flex items-center">
                    <img src={logo} alt="logo" width={200} />
                </Link>
                <ProfileButton className="hidden lg:block" />
            </nav>
            <MobileNavigation />
        </header>
    );
};

export default Header;