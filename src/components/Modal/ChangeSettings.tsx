import { useState } from 'react';

import { changeSettings } from '../../http/userAPI';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/users/usersSlice';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import FileInput from '../ui/FileInput/FileInput';

interface ChangeSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
}

const ChangeSettings = ({ isOpen, onClose, onOpenChange }: ChangeSettingsProps) => {
    const user = useSelector(selectUser);
 
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [isFile, setIsFile] = useState("");
    const [error, setError] = useState("");

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
        setIsFile("true");
    };

    const startChange = async () => {
        try {
            const formData = new FormData();
            formData.append('isImg', isFile);
            formData.append('userId', `${user.id}`); 
            formData.append('img', file);
            formData.append('login', login);
            formData.append('password', password);
            formData.append('email', email);
            await changeSettings(formData).then(() => onClose());
            setLogin("");
            setPassword("");
            setEmail("");
            setIsFile("");
            window.location.reload();
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
            <ModalContent>
                <ModalHeader>Настройки профиля</ModalHeader>
                <ModalBody>
                    <form className='flex flex-col gap-3' autoComplete='off'>
                        <div>
                            <label>Новая аватарка</label>
                            <FileInput className='mt-2' selectFile={selectFile} />
                        </div>
                        <Input 
                            type="text"
                            label='Новый логин'
                            size='sm'
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                        />
                        <Input 
                            type="password" 
                            label="Новый пароль" 
                            size='sm'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <Input 
                            type="email" 
                            label="Новая почта" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {error &&
                            <p className='text-danger text-center'>{error}</p>
                        }
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        onClick={() => {
                            onClose();
                            setError('');
                        }}
                        variant='bordered'
                    >
                        Закрыть
                    </Button>
                    <Button color='success' onClick={startChange}>Сохранить</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ChangeSettings;