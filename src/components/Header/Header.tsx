import ProfileButton from "../Button/ProfileButton";
import { MAIN_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";
import './header.scss';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <header>
            <nav className="flex justify-between">
                <Link to={MAIN_ROUTE} className="flex items-center">
                    <img src={logo} alt="logo" width={200} />
                </Link>
                <ProfileButton />
            </nav>
        </header>
    );
};

export default Header;