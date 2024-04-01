import React, { useEffect } from "react";
import { useState } from "react";
import "./SubBlock.scss";
import AllUsers from "./AllUsers/AllUsers";
import AllSubs from "./AllSubs/AllSubs";

export interface ISubBlockContent {
    findText: string;
}

const SubBlock = () => {
    const [isActiveBlockMySubs, setIsActiveBlockMySubs] = useState(true);
    const [isActiveBlockAllUsers, setIsActiveBlockAllUsers] = useState(false);
    const [content, setContent] = useState<React.JSX.Element>();
    const [findText, setFindText] = useState('');

    useEffect(() => {
        if (isActiveBlockMySubs) setContent(<AllSubs findText={findText} />);
        if (isActiveBlockAllUsers) setContent(<AllUsers findText={findText} />);
    }, [isActiveBlockMySubs, findText]);

    const openBlockMySubs = () => {
        setIsActiveBlockMySubs(true);
        setIsActiveBlockAllUsers(false);
    };

    const openBlockAllUsers = () => {
        setIsActiveBlockMySubs(false);
        setIsActiveBlockAllUsers(true);
    };

    return (
        <div className="sub__block d-flex flex-column gap-3 bg-body-tertiary">
            <div className="d-flex gap-3">
                <button
                    className={`${isActiveBlockMySubs ? 'btn__active' : ''} btn__sub__block`}
                    onClick={openBlockMySubs}
                >Мои подписки</button>
                <button 
                    className={`${isActiveBlockAllUsers ? 'btn__active' : ''} btn__sub__block`}
                    onClick={openBlockAllUsers}
                >Все пользователи</button>
            </div>
            <form className="d-flex" role="search">
                <input 
                    className="form-control" type="search" placeholder="Поиск" aria-label="Search" 
                    onChange={(event) => setFindText(event.target.value)}
                />
            </form>
            <div
                className="content"
            >
                {content}
            </div>
        </div>
    );
};

export default SubBlock;