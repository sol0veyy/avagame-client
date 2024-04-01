import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/usersSlice';
import avatarsReducer from './features/avatars/avatarsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        avatars: avatarsReducer
    }
});