import React,{useState} from 'react';
import ReactDom from 'react-dom';
import {useSelector,useDispatch} from 'react-redux';
import {editTask,removeTask,selectTask} from './features/taskSlice';
import {categories} from './utils';
import {IconButton} from './CustomComponent';
import Overlay from './overlay';
import {DropDown,DropDownItem} from './DropDown';
import * as timeago from 'timeago.js';
export default function TasKPage({id,isOpen,setIsOpen}){

	const tasks=useSelector(selectTask);
	const dispatch=useDispatch();

	const currentTask=tasks.find(task=>task.id===id);

	const [text,setText]=useState(()=>{
		if(id){
			return currentTask.title
		}else{
			return null;
		}
	});
	if(!isOpen) return null;
	let category=currentTask.category.name;

	function handleSave(){
		const currentCategory=categories.find(el=>el.name===category);
		console.log(text);
		const updatedTask={
			...currentTask,
			title:text,
			category:currentCategory,
		}

		dispatch(editTask(updatedTask));
		setIsOpen(false);
	}


	return ReactDom.createPortal(<>
			<Overlay onClick={()=>setIsOpen(false)}/>
			<div className="taskPage">
				<label className="taskPage__title">Task Infomation (<p>{timeago.format(currentTask.createdAt)}</p>)</label>
				<textarea placeholder="Task" className="taskPage__input" value={text} onChange={e=>setText(e.target.value)} type="text" />
				<IconButton onClick={()=>{dispatch(removeTask(currentTask.id));setIsOpen(false);}} className="taskPage__trash" icon="trash" color="#FF3C64"/>
				<IconButton onClick={()=>setIsOpen(false)} className="taskPage__cross" icon="cross" color="#FF3C64"/>
				<DropDown getValue={(val)=>{category=val}} title={currentTask.category.name}>
				{categories.map(category=>(<DropDownItem key={category.color} value={category.name} title={category.name}></DropDownItem>))}
				</DropDown>
				<button className="taskPage__save" onClick={handleSave}>Save</button>
			</div>
			</>,document.getElementById('taskPage'));
}