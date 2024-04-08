import React, { useState } from "react";
import Select from "../Select/Select";
import "./filter.css"

export interface IDataFilter {
    time: string;
    tags: string;
    author: string;
    category: number;
}

export interface IOptionDate {
    value: string;
    name: string;
}

const DataFilter: IDataFilter = {
    time: "",
    tags: "",
    author: "",
    category: 2
}

interface IFilter {
    filterAvatar: (dataFilter: IDataFilter) => void;
}

const Filter = ({filterAvatar}: IFilter) => {
    const optionsDate: IOptionDate[] = [
        {value: "", name: "За всё время"},
        {value: "day", name: "Сегодня"},
        {value: "week", name: "За эту неделю"},
        {value: "month", name: "За этот месяц"},
        {value: "year", name: "За этот год"}
    ]

    const [dataFilter, setDataFilter] = useState(DataFilter)

    return (
        <div>
            <div className="filter">
                <h2>Фильтр</h2>
                <div className="filter-input">
                    <label>
                        Дата добавления
                    </label>
                    <Select options={optionsDate} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    <label>
                        Тег
                    </label>
                    <input 
                        type="text" 
                        placeholder="#anime" 
                        onChange={(e) => setDataFilter({...dataFilter, tags: e.target.value})} 
                    />
                    <label>
                        Автор
                    </label>
                    <input 
                        type="text" 
                        placeholder="Никнейм"
                        onChange={(e) => setDataFilter({...dataFilter, author: e.target.value})} 
                    />
                    <input onClick={() => filterAvatar(dataFilter)} type="submit" value="Применить" />
                </div>
            </div>
        </div>
    )
}

export default Filter;