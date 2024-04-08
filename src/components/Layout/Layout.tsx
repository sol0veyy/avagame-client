/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../Header/Header';
import './layout.scss';

interface ILayout {
    children: React.JSX.Element;
}

const Layout = ({ children }: ILayout) => {
    return (
        <div className='layout'>
            <Header />
            {children}
        </div>
    );
};

export default Layout;