import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { createAvatar } from '../../http/avatarsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addPublication, selectUser } from '../../features/users/usersSlice';
import { setAvatars } from '../../features/avatars/avatarsSlice';
import { IAvatar } from '../../features/avatars/interface';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react';
import FileInput from '../ui/FileInput/FileInput';
import 'react-image-crop/dist/ReactCrop.css';
import { PixelCrop } from 'react-image-crop';
import CropImage from '../CropImage/CropImage';

interface ModalUploadAvatarProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const ModalUploadAvatar = ({
    isOpen,
    onClose,
    onOpenChange,
}: ModalUploadAvatarProps) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [imgUrl, setImgUrl] = useState('');
    const [sizeImg, setSizeImg] = useState('');
    const [errorImg, setErrorImg] = useState('');
    const [tags, setTags] = useState('');

    // Crop
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const [viewImg, setViewImg] = useState(false);
    const [file, setFile] = useState(null);

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
        setErrorImg('');
        setViewImg(true);
    };

    const deleteHashInTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Backspace' && tags[tags.length - 1] === '#') {
            setTags(tags.slice(0, -1));
        }
    }

    const onChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanTags = e.target.value.replace(/#/g, ''); // Удаляем все символы #
        const tagsArray = cleanTags.split(/\s+/); // Разделяем строку на массив тегов
    
        const result = tagsArray.map(tag => `#${tag}`).join(' '); // Добавляем # перед каждым тегом и объединяем их обратно в строку
    
        setTags(result);
    }

    useEffect(() => {
        if (file) {
            setImgUrl(URL.createObjectURL(file));
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setSizeImg(img.width + 'x' + img.height);
            };
        }
    }, [file]);

    const uploadAvatar = async () => {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height
        );

        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        });

        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
            if (img.width === img.height) {
                const regular = /#|\s#/;
                const arrTags = tags.split(regular).filter((el) => el !== '');
                const formData = new FormData();
                formData.append('userId', `${user.id}`);
                formData.append('categoryId', '2');
                formData.append('img', blob);
                formData.append('tags', JSON.stringify(arrTags));
                createAvatar(formData, user).then((avatars: IAvatar[]) => {
                    dispatch(setAvatars(avatars));
                    dispatch(addPublication());
                    onClose();
                });
                setViewImg(false);
            } else {
                setErrorImg('Фото не соответсвует требованиям!');
            }
        };
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                <ModalHeader>Публикация аватарки</ModalHeader>
                <ModalBody>
                    {viewImg && (
                        <div className="flex flex-col items-center gap-2 mb-3">
                            <CropImage
                                imgRef={imgRef}
                                previewCanvasRef={previewCanvasRef}
                                imgUrl={imgUrl}
                                completedCrop={completedCrop}
                                setCompletedCrop={setCompletedCrop}
                            />
                            <p className="text-default-400">{sizeImg}</p>
                            {errorImg && (
                                <p className="text-danger">{errorImg}</p>
                            )}
                        </div>
                    )}
                    <form className="flex flex-col gap-3" autoComplete="off">
                        <FileInput selectFile={selectFile} />
                        <div className="text-sm text-default-400">
                            <p>Изображение должно быть:</p>
                            <p>- в формате JPG или PNG</p>
                            <p>- 1 к 1</p>
                        </div>
                        <Input
                            size="sm"
                            id="inputTags"
                            type="text"
                            label="Теги"
                            value={tags}
                            onKeyDown={deleteHashInTags}
                            onChange={onChangeTags}
                        />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="bordered" onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button color="success" onClick={uploadAvatar}>
                        Опубликовать
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalUploadAvatar;
