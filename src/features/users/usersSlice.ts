import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
    id: number;
    login: string;
    email: string;
    img: string;
    publications: number;
    role: string;
}

const user_default: IUser = {
    id: 0,
    login: '',
    email: '',
    img: '',
    publications: 0,
    role: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            ...user_default,
            isAuth: false
        }
    },
    reducers: {
        setUser: (state, action: {payload: IUser}) => {
            state.user = {...action.payload, isAuth: true};
        },
        logout: state => {
            state.user = {...user_default, isAuth: false};
        },
        addPublication: state => {
            state.user.publications += 1;
        },
        removePublication: state => {
            state.user.publications -= 1;
        }
    },
    selectors: {
        selectUser: (state) => state.user
    }
});

export const { setUser, logout, addPublication, removePublication } = userSlice.actions;
export const { selectUser } = userSlice.selectors;

export default userSlice.reducer;