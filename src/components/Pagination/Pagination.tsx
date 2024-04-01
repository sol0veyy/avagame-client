import React, { SetStateAction } from 'react';
import PaginationBlock from './PaginationBlock';
import './pagination.css';

interface IPropsPagination {
    pages: number[];
    selectedPage: number;
    setPage: React.Dispatch<SetStateAction<number>>
}

const Pagination = ({ pages, selectedPage, setPage }: IPropsPagination) => {
    return (
        <div className='pagination'>
            {pages.map((page) => (
                <PaginationBlock
                    key={page}
                    page={page}
                    selectedPage={selectedPage}
                    setPage={setPage}
                />
            ))}
        </div>
    );
};

export default Pagination;
