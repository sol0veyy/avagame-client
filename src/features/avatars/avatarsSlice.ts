import { createSlice } from "@reduxjs/toolkit";
import { IAvatar }  from './interface';

export const avatarsSlice = createSlice({
    name: 'avatars',
    initialState: {
        avatars: [] as IAvatar[]
    },
    reducers: {
        setAvatars: (state, action: { payload: IAvatar[] }) => {
            state.avatars = action.payload;
        }
    },
    selectors: {
        selectAvatars: (state) => state.avatars
    }
});

export const { setAvatars } = avatarsSlice.actions;
export const { selectAvatars } = avatarsSlice.selectors;

export default avatarsSlice.reducer;