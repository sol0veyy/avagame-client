import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login: string, email: string, password: string) => {
    return $host.post('user/registration', {login, email, password, role: 'USER'})
        .then(({data}) => {
            localStorage.setItem('token', data.token);

            return jwt_decode(data.token);
        })
        .catch((error) => {
            throw error;
        });
        
};

export const loginIn = (login: string, password: string) => {
    return $host.post('user/login', {login, password})
        .then(({data}) => {
            localStorage.setItem('token', data.token);

            return jwt_decode(data.token);
        })
        .catch((error) => {
            throw error;
        }); 
};

export const changeSettings = async (settings: FormData) => {
    const {data} = await $authHost.post('user/settings', settings);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    try {
        const {data} = await $authHost.get('user/auth');
        localStorage.setItem('token', data.token);

        return jwt_decode(data.token);
    } catch(error) {
        throw new Error('Unauthorized');
    }
};

export const update = async (userId: number) => {
    const {data} = await $authHost.get('user/update' + userId);
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const getAllUsers = async () => {
    const {data} = await $authHost.get('user/all');

    return data;
};

export const getAllUsersByFilter = async (findText: string) => {
    try {
        const {data} = await $authHost.get(`user/allByFilter/${findText}`);

        return data.users;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByLogin = async (login: string) => {
    try {
        const {data} = await $host.get(`user/${login}`);

        return data.user;
    } catch (error) {
        console.log(error);
    }
};