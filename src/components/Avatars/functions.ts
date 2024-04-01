import { IAvatar } from '../../features/avatars/interface';
import download from 'downloadjs';

export const clickDownload = async (avatar: IAvatar) => {
    download(process.env.REACT_APP_API_URL + '/' + avatar.img);
};