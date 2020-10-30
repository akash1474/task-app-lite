import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		userData: {
			name: "Akash Pandit",
			email: "panditakash38@gmail.com",
			photoURL: "./avatar.svg",
			from:"Since November 25, 2020",
			totalCompleted:256
		},
	},
	reducers: {
		login: (state) => {
			state.userData={
			name: "Akash Pandit",
			email: "panditakash38@gmail.com",
			photoURL: "./avatar.svg",
			from:"Since November 25, 2020",
			totalCompleted:256
		};
		},
		logout:(state)=>{
			state.userData=null;
		}
	},
});

export const { login ,logout } = userSlice.actions;

export const selectUser = (state) => state.user.userData;

export default userSlice.reducer;
