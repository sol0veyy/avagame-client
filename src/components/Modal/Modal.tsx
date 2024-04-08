import React from 'react';
import "./modal.scss";

interface IPropsModal {
    active: boolean;
    children: JSX.Element | JSX.Element[];
}

const Modal = ({active, children}: IPropsModal) => {
    return (
        <div className={active ? "modal active" : "modal"}>
            <div className='p-3 rounded bg-body-tertiary' onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;