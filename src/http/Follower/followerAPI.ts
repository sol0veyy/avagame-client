import { $authHost, $host } from "..";

export const follow = async (userId: number) => {
    try {
        const {data} = await $authHost.post('follower/follow', {userId});

        return data.follower;
    } catch (err) {
        console.error(err.response.data);
    }
};

export const unfollow = async(userId: number) => {
    try {
        const {data} = await $authHost.delete(`follower/unfollow/${userId}`);

        return data.follower;
    } catch (err) {
        console.error(err);
    }
};

export const getIsUserFollow = async(userId: number) => {
    try {
        const {data} = await $authHost.get(`follower/isUserFollow/${userId}`);

        return data.isFollow;
    } catch (err) {
        console.error(err);
    }
};

export const getAllUserSubs = async(followerId: number) => {
    try {
        const {data} = await $host.get(`follower/userSubs/${followerId}`);

        return data.users;
    } catch (err) {
        console.error(err);
    }
};

export const getAllUserSubsByFilter = async (findText: string) => {
    try {
        const {data} = await $authHost.get(`follower/userSubsByFilter/${findText}`);

        return data.users;
    } catch (error) {
        console.log(error);
    }
};