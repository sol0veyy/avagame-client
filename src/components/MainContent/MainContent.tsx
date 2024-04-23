import SubBlock from '../SubBlock/SubBlock';
import './mainContent.scss';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/users/usersSlice';
import Avatars from '../Avatars/Avatars';

interface IMainContent {
    textInput: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const MainContent = ({ textInput, setText }: IMainContent) => {
    const user = useSelector(selectUser);

    return (
        <main>
            <div className="hidden lg:block">{user.isAuth && <SubBlock />}</div>
            <div className="main__block">
                <Search textInput={textInput} setText={setText} />
                <Avatars textInput={textInput} />
            </div>
        </main>
    );
};

export default MainContent;
