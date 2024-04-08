import React from 'react';
import Modal from './Modal';
import './modal.scss';
import { deleteAvatar } from '../../http/avatarsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { removePublication, selectUser } from '../../features/users/usersSlice';
import { IAvatar } from '../../features/avatars/interface';
import { setAvatars } from '../../features/avatars/avatarsSlice';
import { IModalAccept } from '../Avatars/UserAvatars/UserAvatars';

interface IModalAcceptRemoveAvatar {
    modalAccept: IModalAccept
    setModalAccept: React.Dispatch<React.SetStateAction<IModalAccept>>;
}

const ModalAcceptRemoveAvatar = ({modalAccept, setModalAccept}: IModalAcceptRemoveAvatar) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const delAvatar = async (avatar: IAvatar) => {
        deleteAvatar(avatar.id, user.id)
            .then((avatars: IAvatar[]) => {
                dispatch(setAvatars([...avatars]));
                dispatch(removePublication());
                
                setModalAccept({...modalAccept, active: false});
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Modal active={modalAccept.active}>
            <div>
                <div className='text-center mb-3'>Удаление аватарки</div>
                <div className='d-flex gap-3'>
                    <button className='btn btn-outline-secondary' onClick={() => setModalAccept({...modalAccept, active: false})}>Отмена</button>
                    <button className='btn btn-danger' onClick={() => delAvatar(modalAccept.avatar)}>Удалить</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAcceptRemoveAvatar;