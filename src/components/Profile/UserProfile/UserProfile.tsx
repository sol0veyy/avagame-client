import { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangeSettings from '../../Modal/ChangeSettings';

const UserProfile = () => {
    return (
        <>
            <ProfileInfo />
            {/* <ChangeSettings modalActive={settingsActive} setModalActive={setSettingsActive} /> */}
        </>
    );
};

export default UserProfile;