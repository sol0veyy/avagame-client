import { IUser } from "../../features/users/usersSlice";
import { follow, unfollow } from "./followerAPI";

export const follow_unfollow = (isFollow: boolean, setIsFollow: React.Dispatch<React.SetStateAction<boolean>>, user: IUser) => {
    if (isFollow) {
        unfollow(user.id)
            .then(() => {
                setIsFollow(false);
            });
    } else {
        follow(user.id)
            .then(() => {
                setIsFollow(true);
            });
    }
};