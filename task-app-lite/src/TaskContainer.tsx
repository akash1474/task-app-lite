import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTask ,updateList} from "./features/taskSlice";
import Task from "./Task";
import { ReactSortable } from "react-sortablejs";
import { Task as TaskInterface } from './@types';
import TaskImage from './assets/img/todo-small.png';
export default function TaskContainer() {
	const taskInfo = useSelector(selectTask);
	const dispatch = useDispatch();

	const imageStyle={
		background:`url(${TaskImage})`,
		height: "125px",
		width:"170px",
		backgroundSize:"contain",
		backgroundPosition:"center",
		backgroundRepeat:"no-repeat",
	}

	return (
		<>
			{
				taskInfo.length>0 ? <ReactSortable
					animation={100}
					delayOnTouchStart={true}
					delay={50}
					list={taskInfo}
					setList={(val) => dispatch(updateList(val))}
					className="taskContainer"
				>
					{
						taskInfo.map((task: TaskInterface) => (
							<Task key={task.id} {...task} />
						))
					}
				</ReactSortable> :
				 <div  className="taskContainer">
						<div className="taskContainer__empty">
							<div style={imageStyle} className="taskContainer__image"></div>
							<p className="taskContainer__text">Look's like you are done!</p>
							<p className="taskContainer__suggestion">Let's get started with some new one! <br />Never GiveUp!!!</p>
						</div>
				 </div>
			}
		</>
	);
}
