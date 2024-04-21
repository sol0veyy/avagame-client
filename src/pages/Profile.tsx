import { useEffect, useState } from "react";
import UserAvatars from "../components/Avatars/UserAvatars/UserAvatars";
import { clickDownload } from "../components/Avatars/functions";
import { useParams } from "react-router-dom";
import { getUserByLogin } from "../http/userAPI";
import { IUser } from "../features/users/usersSlice";
import UserInfo from "@/components/Profile/UserInfo/UserInfo";

const Profile = () => {
    const {login} = useParams();
    const [profileUser, setProfileUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserByLogin(login)
            .then(user => {
                setProfileUser(user);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setIsLoading(false))
    }, []);

    return (
        <div className="lg:grid grid-cols-4 gap-8 p-8">
            {!isLoading && (
                <>
                    <UserInfo profileUser={profileUser} />
                    <UserAvatars profileUser={profileUser} clickDownload={clickDownload} />
                </>
            )}
        </div>
    );
};

export default Profile;