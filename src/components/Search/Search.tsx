import React, { Dispatch, SetStateAction } from "react";
import './search.scss';
import { Input } from "@nextui-org/react";

interface ISearch {
    textInput: string;
    setText: Dispatch<SetStateAction<string>>;
    className?: string;
}

const Search = ({textInput, setText, className}: ISearch) => {
    return (
        <form className={`${className} search`} role="search">
            <Input 
                value={textInput}
                onChange={event => setText(event.target.value)}
                className="form-control me-2" 
                type="search" 
                placeholder="anime..."
                variant="bordered"
                id="mySearch" 
            />
        </form>
    );
};

export default Search;