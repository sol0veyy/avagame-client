import React from 'react';
import ProfileInfo from './ProfileInfo';
import { IUser } from '../../../features/users/usersSlice';

export interface IViewProfile {
    profileUser: IUser;
}

const ViewProfile = ({ profileUser }: IViewProfile) => {
    return (
        <>
            <ProfileInfo profileUser={profileUser}  />
        </>
    );
};

export default ViewProfile;