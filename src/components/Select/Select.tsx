import React from "react";
import Form from "react-bootstrap/Form";
import "./select.css"
import { IDataFilter, IOptionDate } from "../Filter/Filter";

interface ISelect {
    options: IOptionDate[];
    dataFilter: IDataFilter;
    setDataFilter: React.Dispatch<React.SetStateAction<IDataFilter>>;
}

const Select = ({options, dataFilter, setDataFilter}: ISelect) => {
    return (
        <Form.Select className="select" onChange={(e) => {
            setDataFilter({...dataFilter, time: e.target.value})
        }}>
            {options.map((option) => (
                <option value={option.value} key={option.name}>{option.name}</option>
            ))}
        </Form.Select>
    )
}

export default Select;