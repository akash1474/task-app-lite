import React from 'react';
import Header from './Header';
import {useSelector} from'react-redux';
import TaskContainer from './TaskContainer';
import InputController from './InputController';
import {selectUser} from './features/userSlice';

export default function HomePage(){
	const user=useSelector(selectUser);
	return(
			<>
			<Header userData={user}/>
			<TaskContainer />
			<InputController imgSrc="./calendar.svg" />
			</>
		);
}