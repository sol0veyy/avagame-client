import React from 'react';
import { useEffect, useState } from 'react';
import { createAvatar } from "../../http/avatarsAPI";
import { useDispatch, useSelector } from 'react-redux';
import { addPublication, selectUser } from '../../features/users/usersSlice';
import { setAvatars } from '../../features/avatars/avatarsSlice';
import { IAvatar } from '../../features/avatars/interface';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import FileInput from '../ui/FileInput/FileInput';

interface ModalUploadAvatarProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const ModalUploadAvatar = ({ isOpen, onClose, onOpenChange }: ModalUploadAvatarProps) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [imgUrl, setImgUrl] = useState("");
    const [sizeImg, setSizeImg] = useState("");
    const [errorImg, setErrorImg] = useState("");
    const [tags, setTags] = useState("");

    const [viewImg, setViewImg] = useState(false);
    const [file, setFile] = useState(null);

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
        setErrorImg("");
        setViewImg(true);
    };

    useEffect(() => {
        if (file) {
            setImgUrl(URL.createObjectURL(file));
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setSizeImg(img.width + "x" + img.height);
            };
        }
    }, [file]);

    const uploadAvatar = () => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width === img.height && file.type === "image/jpeg") {
                const regular = /#|\s#/;
                const arrTags = tags.split(regular).filter(el => el !== '');
                const formData = new FormData();
                formData.append('userId', `${user.id}`);
                formData.append('categoryId', "2");
                formData.append('img', file);
                formData.append('tags', JSON.stringify(arrTags));
                createAvatar(formData, user).then((avatars: IAvatar[])  => {
                    dispatch(setAvatars(avatars));
                    dispatch(addPublication());
                    onClose();
                });
                setViewImg(false);
                
            } else {
                setErrorImg("Фото не соответсвует требованиям!");
            }
        };
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
            <ModalContent>
                <ModalHeader>
                    Публикация аватарки
                </ModalHeader>
                <ModalBody>
                    {viewImg &&
                        <div className='flex flex-col items-center gap-2 mb-3'>
                            <img src={imgUrl} alt="img" width={300} height={300} />
                            <p className='text-default-400'>{sizeImg}</p>
                            {errorImg &&
                                <p className='text-danger'>{errorImg}</p>
                            }
                        </div>
                    }
                    <form className='flex flex-col gap-3' autoComplete='off'>
                        <FileInput selectFile={selectFile} />
                        <div className='text-sm text-default-400'>
                            <p>Изображение должно быть:</p>
                            <p>- в формате JPG или PNG</p>
                            <p>- 1 к 1</p>
                        </div>
                        <Input 
                            size='sm'
                            id='inputTags' 
                            type="text" 
                            label="Теги"
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant='bordered' onClick={onClose}>Закрыть</Button>
                    <Button color='success' onClick={uploadAvatar}>Опубликовать</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalUploadAvatar;