import { Suspense, lazy, useEffect, useState } from 'react';
import { getAll, getByTag } from '../../http/avatarsAPI';
import { clickDownload } from './functions';
import './avatars.scss';
import { IAvatar } from '../../features/avatars/interface';
import AvatarSkeleton from './Avatar/AvatarSkeleton';

interface IPropsAvatars {
    textInput?: string;
}

const Avatar = lazy(() => import('./Avatar/Avatar'));

const Avatars = ({ textInput }: IPropsAvatars) => {
    const [avatars, setAvatars] = useState<IAvatar[]>([]);

    useEffect(() => {
        if (textInput && textInput !== '' && textInput.trim() !== '') {
            getByTag(textInput.trim()).then((data) => setAvatars(data));
        } else {
            getAll().then((data) => {
                setAvatars(data.avatars);
            });
        }
    }, [textInput]);

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
        </>
    );
};

export default Avatars;
