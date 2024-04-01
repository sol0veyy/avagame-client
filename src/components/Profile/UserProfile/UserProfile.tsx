import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import ModalUploadAvatar from '../../Modal/ModalUploadAvatar';
import ChangeSettings from '../../Modal/ChangeSettings';

const UserProfile = () => {
    const [uploadActive, setUploadActive] = useState(false);
    const [settingsActive, setSettingsActive] = useState(false);

    return (
        <>
            <ProfileInfo setUploadActive={setUploadActive} setSettingsActive={setSettingsActive} />
            <ModalUploadAvatar modalActive={uploadActive} setModalActive={setUploadActive} />
            <ChangeSettings modalActive={settingsActive} setModalActive={setSettingsActive} />
        </>
    );
};

export default UserProfile;