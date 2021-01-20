import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './homePage';
import LoginPage from './loginPage';
import { login, selectUser } from './features/userSlice';


export default function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	return (
		<div style={user ? {} : { height: 200 }} className="app">
			{
				user ? <HomePage /> : <LoginPage dispatch={dispatch} login={login} />
			}
		</div>
	);
}