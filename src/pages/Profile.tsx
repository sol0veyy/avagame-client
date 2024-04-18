import { useEffect, useState } from "react";
import UserAvatars from "../components/Avatars/UserAvatars/UserAvatars";
import { clickDownload } from "../components/Avatars/functions";
import { useParams } from "react-router-dom";
import { getUserByLogin } from "../http/userAPI";
import UserProfile from "../components/Profile/UserProfile/UserProfile";
import ViewProfile from "../components/Profile/ViewProfile/ViewProfile";
import { IUser, selectUser } from "../features/users/usersSlice";
import { useSelector } from "react-redux";
import '../styles/profile.scss';

const Profile = () => {
    const user = useSelector(selectUser);
    const {login} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [profileUser, setProfileUser] = useState<IUser>();

    useEffect(() => {
        getUserByLogin(login)
            .then(user => {
                console.log(user);
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
        <div className="profile gap-8">
            {!isLoading ? (
                <>
                    {user.id === profileUser.id ? <UserProfile /> : <ViewProfile profileUser={profileUser} />}
                    <UserAvatars profileUser={profileUser} clickDownload={clickDownload} />
                </>
            ) : null}
        </div>
    );
};

export default Profile;