import React, { SetStateAction } from 'react';
import './pagination.css';

interface IPropsPaginationBlock {
    page: number;
    selectedPage: number;
    setPage: React.Dispatch<SetStateAction<number>>
}

const PaginationBlock = ({ page, selectedPage, setPage }: IPropsPaginationBlock) => {
    return (
        <div
            // className={selectedPage === page ? styles.blockSelected : styles.block}
            className={`block ${selectedPage === page ? 'blockSelected' : ''}`}
            onClick={() => setPage(page)}>
            {page}
        </div>
    );
};

export default PaginationBlock;
