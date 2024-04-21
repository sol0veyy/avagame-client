import React, { useEffect } from "react";
import { useState } from "react";
import "./SubBlock.scss";
import AllUsers from "./AllUsers/AllUsers";
import AllSubs from "./AllSubs/AllSubs";
import { Button, Input } from "@nextui-org/react";

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
        <div className="mt-4 lg:mt-0 sub__block flex flex-col gap-3">
            <div className="flex gap-3 justify-around">
                <Button 
                    color="default" 
                    variant={`${isActiveBlockMySubs ? 'bordered' : 'light'}`}
                    onClick={openBlockMySubs}
                >Мои подписки</Button>
                <Button 
                    color="default" 
                    variant={`${isActiveBlockAllUsers ? 'bordered' : 'light'}`}
                    onClick={openBlockAllUsers}
                >Все пользователи</Button>
            </div>
            <form className="flex" role="search">
                <Input 
                    type="search"
                    label="Поиск"
                    size="sm"
                    variant="underlined"
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