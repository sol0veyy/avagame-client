import { $authHost, $host } from ".";
import { IUser } from "../features/users/usersSlice";
import { update } from "./userAPI";

export const createAvatar = async (avatarFormData: FormData, user: IUser) => {
    const {data} = await $authHost.post('api/avatar', avatarFormData);
    await update(user.id);
    return data;
};

export const deleteAvatar = async (avatarId: number, userId: number) => {
    const {data} = await $authHost.post('api/avatar/del', {avatarId, userId});
    await update(userId);
    return data;
};

export const setLikes = async (avatarId: number, userId: number) => {
    try {
        const {data} = await $authHost.post('api/avatar/like', {avatarId, userId});
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const delLike = async (avatarId: number, userId: number) => {
    try {
        const {data} = await $authHost.post('api/avatar/like/del', {avatarId, userId});
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getLike = async (avatarId: number, userId: number) => {
    try {
        const {data} = await $host.get('api/avatar/like/' + avatarId + "/" + userId);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getByTag = async (tag: string) => {
    const {data} = await $host.get('api/avatar/tag/' + tag);
    return data;
};

export const getAll = async (page: number) => {
    const {data} = await $host.get('api/avatar/' + page);
    return data;
};

export const getUserAvatars = async (userId: number) => {
    const {data} = await $host.get('api/avatar/user/' + userId);
    return data;
};