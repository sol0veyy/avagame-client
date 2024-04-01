import { $authHost, $host } from ".";
import { update } from "./userAPI";

export const createAvatar = async (avatar, user) => {
    const {data} = await $authHost.post('api/avatar', avatar);
    await update(user.id);
    return data;
};

export const deleteAvatar = async (avatarId, userId) => {
    const {data} = await $authHost.post('api/avatar/del', {avatarId, userId});
    await update(userId);
    return data;
};

export const setLikes = async (avatarId, userId) => {
    try {
        const {data} = await $authHost.post('api/avatar/like', {avatarId, userId});
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const delLike = async (avatarId, userId) => {
    try {
        const {data} = await $authHost.post('api/avatar/like/del', {avatarId, userId});
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getLike = async (avatarId, userId) => {
    try {
        const {data} = await $host.get('api/avatar/like/' + avatarId + "/" + userId);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getByTag = async (tag) => {
    const {data} = await $host.get('api/avatar/tag/' + tag);
    return data;
};

export const getAll = async (page) => {
    const {data} = await $host.get('api/avatar/' + page);
    return data;
};

export const getUserAvatars = async (userId) => {
    const {data} = await $host.get('api/avatar/user/' + userId);
    return data;
};