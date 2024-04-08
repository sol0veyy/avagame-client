import React, { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { createAvatar } from "../../http/avatarsAPI";
import Modal from "./Modal";
import { useDispatch, useSelector } from 'react-redux';
import { addPublication, selectUser } from '../../features/users/usersSlice';
import { setAvatars } from '../../features/avatars/avatarsSlice';
import { IAvatar } from '../../features/avatars/interface';

interface IPropsModalUploadAvatar {
    modalActive: boolean;
    setModalActive: React.Dispatch<SetStateAction<boolean>>;
}

const ModalUploadAvatar = ({ modalActive, setModalActive}: IPropsModalUploadAvatar) => {
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
                    setModalActive(false);
                });
                setViewImg(false);
                
            } else {
                setErrorImg("Фото не соответсвует требованиям!");
            }
        };
    };

    return (
        <Modal active={modalActive}>
            <form>
                {viewImg ?
                    <div className='d-flex flex-column align-items-center gap-2 mb-3'>
                        <img src={imgUrl} alt="img" width="300px" height="300px" />
                        <p className='text-secondary-emphasis mb-0'>{sizeImg}</p>
                        {errorImg ?
                            <p className='text-danger mb-0'>{errorImg}</p>
                            :
                            ""
                        }
                    </div>
                    :
                    ""
                }
                <div className='mb-3'>
                    <input 
                        type="file" 
                        className='form-control' 
                        onChange={selectFile}
                    />
                </div>
                <div className='upload_rules text-secondary-emphasis'>
                    <p>Изображение должно быть:</p>
                    <p>- в формате JPG или PNG</p>
                    <p>- 1 к 1</p>
                </div>
                <div className='row'>
                    <label htmlFor="inputTags" className='col-sm-2 col-form-label'>Теги</label>
                    <div className='col-sm-10'>
                        <input 
                            id='inputTags' 
                            type="text" 
                            className='form-control' 
                            placeholder='#anime' 
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <button className='btn btn-outline-secondary' onClick={() => setModalActive(false)}>Закрыть</button>
                <button className='btn btn-success' onClick={uploadAvatar}>Опубликовать</button>
            </div>
        </Modal>
    );
};

export default ModalUploadAvatar;