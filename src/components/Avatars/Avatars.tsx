import { Suspense, lazy, useEffect, useState } from 'react';
import { getAll, getByTag } from '../../http/avatarsAPI';
import { clickDownload } from './functions';
import Pagination from '../Pagination/Pagination';
import './avatars.scss';
import { IAvatar } from '../../features/avatars/interface';
import AvatarSkeleton from './Avatar/AvatarSkeleton';

interface IPropsAvatars {
    textInput?: string;
}

const Avatar = lazy(() => import('./Avatar/Avatar'));

const Avatars = ({ textInput }: IPropsAvatars) => {
    const [avatars, setAvatars] = useState<IAvatar[]>([]);
    const [pages, setPages] = useState([]);
    const [selectedPage, setPage] = useState(1);

    useEffect(() => {
        if (textInput && textInput !== '' && textInput.trim() !== '') {
            getByTag(textInput.trim()).then((data) => setAvatars(data));
        } else {
            getAll(selectedPage).then((data) => {
                setAvatars(data.avatars);
                const N = Math.round(data.colAvatars / 30) + 1;
                setPages(Array.from({ length: N }, (_, index) => index + 1));
            });
        }
    }, [textInput, selectedPage]);

    return (
        <>
            <div className="avatars__block justify-around lg:justify-start">
                {
                    (avatars ? [...avatars] : [])
                        .sort((a, b) => b.id - a.id)
                        .map((avatar) => (
                            <Suspense key={avatar.id} fallback={<AvatarSkeleton />}>
                                <Avatar
                                    clickDownload={clickDownload}
                                    avatar={avatar}
                                    key={avatar.id}
                                />
                            </Suspense>
                        ))}
            </div>
            {pages.length > 1 && 
                <Pagination
                    pages={pages}
                    selectedPage={selectedPage}
                    setPage={setPage}
                />
            }
        </>
    );
};

export default Avatars;
