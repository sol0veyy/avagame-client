import { useState } from 'react';
import MainContent from '@/components/MainContent/MainContent';

const Main = () => {
    const [textInput, setText] = useState('');

    return (
        <MainContent textInput={textInput} setText={setText} />
    );
};

export default Main;
