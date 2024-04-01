import { $authHost, $host } from "..";

export const follow = async (userId: number) => {
    try {
        const {data} = await $authHost.post('api/follower/follow', {userId});

        return data.follower;
    } catch (err) {
        console.error(err.response.data);
    }
};

export const unfollow = async(userId: number) => {
    try {
        const {data} = await $authHost.delete(`api/follower/unfollow/${userId}`);

        return data.follower;
    } catch (err) {
        console.error(err);
    }
};

export const getIsUserFollow = async(userId: number) => {
    try {
        const {data} = await $authHost.get(`api/follower/isUserFollow/${userId}`);

        return data.isFollow;
    } catch (err) {
        console.error(err);
    }
};

export const getAllUserSubs = async(followerId: number) => {
    try {
        const {data} = await $host.get(`api/follower/userSubs/${followerId}`);

        return data.users;
    } catch (err) {
        console.error(err);
    }
};

export const getAllUserSubsByFilter = async (findText: string) => {
    try {
        const {data} = await $authHost.get(`api/follower/userSubsByFilter/${findText}`);

        return data.users;
    } catch (error) {
        console.log(error);
    }
};