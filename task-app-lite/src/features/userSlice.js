import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';
const userSlice = createSlice({
	name: "user",
	initialState: {
		userData: JSON.parse(localStorage.getItem('userData')) || null,
	},
	reducers: {
		login: (state,actions) => {
			const data={
				...actions.payload,
				from:"Since "+moment(actions.payload.joinedDate).format('LL'),
				totalCompleted:207,
			}
			state={
				userData:data
			}
			localStorage.setItem('userData',JSON.stringify(data))
			window.location="/";
		},
		logout:(state)=>{
			localStorage.removeItem('userData');
			state=null;
		}
	},
});


export const { login ,logout } = userSlice.actions;

export const selectUser = (state) => state.user.userData;

export default userSlice.reducer;
