import React, { useEffect, useState } from "react";
import "../styles/profile.scss";
import UserAvatars from "../components/Avatars/UserAvatars/UserAvatars";
import { clickDownload } from "../components/Avatars/functions";
import { useParams } from "react-router-dom";
import { getUserByLogin } from "../http/userAPI";
import UserProfile from "../components/Profile/UserProfile/UserProfile";
import ViewProfile from "../components/Profile/ViewProfile/ViewProfile";
import Layout from "../components/Layout/Layout";
import { IUser, selectUser } from "../features/users/usersSlice";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(selectUser);
    const {login} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [profileUser, setProfileUser] = useState<IUser>();

    useEffect(() => {
        getUserByLogin(login)
            .then(user => {
                setProfileUser(user);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <Layout>
            <div className="profile">
                {!isLoading ? (
                    <>
                        {user.id === profileUser.id ? <UserProfile /> : <ViewProfile profileUser={profileUser} />}
                        <UserAvatars profileUser={profileUser} clickDownload={clickDownload} />
                    </>
                ) : null}
            </div>
        </Layout>
    );
};

export default Profile;