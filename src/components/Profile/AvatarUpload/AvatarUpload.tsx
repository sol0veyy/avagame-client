import ModalUploadAvatar from '@/components/Modal/ModalUploadAvatar';
import { Button, useDisclosure } from '@nextui-org/react';
import React from 'react';

const AvatarUpload = () => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    
    return (
        <>
            <Button 
                color='success' 
                variant='bordered' 
                onClick={onOpen}
            >
                Опубликовать аватарку
            </Button>
            <ModalUploadAvatar isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
        </>
    );
};

export default AvatarUpload;