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

export const taskSlice = createSlice({
	name: "task",
	initialState: {
		tasks: [{
			title: "Completed the Task App",
			expectedDate: new Date("2020-10-25").getTime(),
			createdAt: new Date("2020-10-23").getTime(),
			isCompleted: false,
			isImportant: false,
			isEvent: false,
			category: { name: "Task", color: "#5C6BC0" },
			id:"asdfasdfasdfasd",
		}],
	},
	reducers: {
		updateList:(state,action)=>{
			state.tasks = [...action.payload];
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
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter(
				(task) => task.id !== action.payload
			);
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
		}
	},
});

export const { addTask, removeTask ,editTask,updateList} = taskSlice.actions;

export const selectTask = (state) => state.task.tasks;

export default taskSlice.reducer;
