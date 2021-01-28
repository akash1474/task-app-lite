import { createSlice } from "@reduxjs/toolkit";
import {v4} from 'uuid';
// import {Task} from '../@types';

// interface InitialState{
// 	tasks:Task[]
// }


// interface TaskSlice{
// 	name:string,
// 	initialState:InitialState,
// 	reducers:{
// 		[prop:string]:()=>void
// 	}
// }

// {
// 	title: "Completed the Task App",
// 	expectedDate: new Date("2020-10-25").getTime(),
// 	createdAt: new Date("2020-10-23").getTime(),
// 	isCompleted: false,
// 	isImportant: false,
// 	isEvent: false,
// 	category: { name: "Task", color: "#5C6BC0" },
// 	id: "asdfasdfasdfasd",
// }

export const taskSlice = createSlice({
	name: "task",
	initialState: {
		tasks:JSON.parse(localStorage.getItem("tasks")) || {},
	},
	reducers: {
		loadData:(state,action)=>{
			state.tasks = [...action.payload.data];
		},
		updateList:(state,action)=>{
			state.tasks = [...action.payload];
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		addTask: (state, action) => {
			const newTask={
				title:action.payload.text,
				category:action.payload.category,
				expectedDate: action.payload.expectedDate || new Date().getTime(),
				createdAt: new Date().getTime(),
				isCompleted: false,
				isImportant: false,
				isEvent: false,
				id:v4(),
			}
			state.tasks=[...state.tasks,newTask];
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter(
				(task) => task.id !== action.payload
			);
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		editTask:(state,action)=>{
			let index=0;
			const remainingTask=state.tasks.filter((task,i)=>{
				if(task.id===action.payload.id){
					index=i;
				}
				return task.id!==action.payload.id;
			});
			remainingTask.splice(index,0,action.payload);
			state.tasks=[...remainingTask];
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		}
	},
});

export const { addTask,loadData, removeTask ,editTask,updateList} = taskSlice.actions;

export const selectTask = (state) => state.task.tasks;

export default taskSlice.reducer;
