import React, { useState } from 'react';
import 'https://kit.fontawesome.com/ec79f0a95b.js';
import MainContent from '../components/MainContent/MainContent';
import Layout from '../components/Layout/Layout';

const Main = () => {
    const [textInput, setText] = useState('');

    return (
        <Layout>
            <MainContent textInput={textInput} setText={setText} />
        </Layout>
    );
};

export default Main;
