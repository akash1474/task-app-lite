import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: JSON.parse(localStorage.getItem('userData')) || {},
        userSettings: JSON.parse(localStorage.getItem('userSettings')) || {
            isDark: false,
            showCompleted: true,
            bgColor: '#aebaff',
            useGradient: false,
        },
    },
    reducers: {
        login: (state, actions) => {
            const data = {
                ...actions.payload,
                from: 'Since ' + moment(actions.payload.joinedDate).format('LL'),
            };
            state = {
                userData: data,
                userSettings: actions.payload.settings,
            };
            localStorage.setItem('userData', JSON.stringify(data));
            window.location = '/homePage';
        },
        syncSettings: (state, actions) => {
            state.userSettings = actions.payload;
            localStorage.setItem('userSettings', JSON.stringify(actions.payload));
        },
        logout: (state) => {
            state.userData = {};
            localStorage.clear();
        },
    },
});

export const { login, logout, syncSettings } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
