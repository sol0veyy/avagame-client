/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../Header/Header';
import './layout.scss';

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Header />
            {children}
        </div>
    );
};

export default Layout;