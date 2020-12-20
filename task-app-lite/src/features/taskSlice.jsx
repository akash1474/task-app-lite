import { createSlice } from "@reduxjs/toolkit";
import {v4} from 'uuid';
import moment from 'moment';

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
			category: {name:"Tasks",color:"rgba( 255, 255, 255, 0.80 )"},
			id:"asdfasdfasdfasd",
		}],
	},
	reducers: {
		addTask: (state, action) => {
			const newTask={
				title:action.payload.text,
				category:action.payload.category,
				expectedDate: moment().add(1,"days").format(),
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
			console.log(action.payload);
			let index=0;
			const remainingTask=state.tasks.filter((task,i,arr)=>{
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

export const { addTask, removeTask ,editTask} = taskSlice.actions;

export const selectTask = (state) => state.task.tasks;

export default taskSlice.reducer;
