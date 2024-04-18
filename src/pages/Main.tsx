import { useState } from 'react';
import 'https://kit.fontawesome.com/ec79f0a95b.js';
import MainContent from '../components/MainContent/MainContent';

const Main = () => {
    const [textInput, setText] = useState('');

    return (
        <MainContent textInput={textInput} setText={setText} />
    );
};

export default Main;
