import React, { useState,useEffect } from "react";
import {useSelector} from 'react-redux';
import {selectTask} from './features/taskSlice';
import Task from "./Task";
import { ReactSortable } from "react-sortablejs";
export default function TaskContainer() {

	const taskInfo=useSelector(selectTask);
	const [tasks, setTasks] = useState(taskInfo);

	useEffect(()=>{
		setTasks(taskInfo);
	},[taskInfo]);
	console.log("Rerendering TaskContainer....")
	return (
			<ReactSortable
				animation={200}
				delayOnTouchStart={true}
				delay={100}
				list={tasks}
				setList={setTasks}
				onChange={val=>console.log(val)}
				className="taskContainer"
			>
				{tasks.map((task) => (
					<Task key={task.id} {...task} />
				))}
			</ReactSortable>
	);
}
