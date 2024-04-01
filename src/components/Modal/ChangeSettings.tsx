import React, { useState } from 'react';
import Modal from "./Modal";
import { changeSettings } from '../../http/userAPI';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/users/usersSlice';

interface IChangeSettings {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeSettings = ({ modalActive, setModalActive }: IChangeSettings) => {
    const user = useSelector(selectUser);
 
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [isFile, setIsFile] = useState("");
    const [error, setError] = useState("");

    const selectFile = (e) => {
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
            await changeSettings(formData).then(() => setModalActive(false));
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
        <Modal active={modalActive}>
            <form>
                <div className='mb-3'>
                    <label htmlFor="inputFile" className='form-label'>Новая аватарка</label>
                    <input id='inputFile' className='form-control' type="file" onChange={selectFile} />
                </div>
                <div className='mb-3'>
                    <input 
                        type="text"
                        placeholder='Новый логин' 
                        value={login} 
                        onChange={(e) => setLogin(e.target.value)} 
                        className='form-control' 
                    />
                </div>
                <div className='mb-3'>
                    <input 
                        type="password" 
                        placeholder="Новый пароль" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='form-control' 
                    />
                </div>
                <div className='mb-3'>
                    <input 
                        type="email" 
                        placeholder="Новая почта" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='form-control' 
                    />
                </div>
                {error ?
                    <p className='text-danger text-center'>{error}</p>
                    :
                    ""
                }
            </form>
            <div className='d-flex justify-content-end gap-2'>
                <button 
                    onClick={() => {
                        setModalActive(false);
                        setError('');
                    }}
                    className='btn btn-outline-secondary'
                >
                    Закрыть
                </button>
                <button className='btn btn-success' onClick={startChange}>Сохранить</button>
            </div>
        </Modal>
    );
};

export default ChangeSettings;