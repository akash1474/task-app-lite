import React, { useState } from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { editTask, removeTask, selectTask } from "./features/taskSlice";
import { categories } from "./utils";
import {
	IconButton,
	DropDown,
	DropDownItem,
} from "./react-custom-ui-components/index";

import Calendar from "./react-custom-ui-components/Calendar/Calendar";
import Overlay from "./overlay";
import IconProvider from "./iconsProvider";
import { Task } from "./@types";

interface Props {
	id: string;
	isOpen: boolean;
	setIsOpen: (arg: boolean) => void;
}

const TasKPage: React.FC<Props> = ({ id, isOpen, setIsOpen }) => {
	const tasks = useSelector(selectTask);
	const dispatch = useDispatch();

	const currentTask = tasks.find((task: Task) => task.id === id);
	const [text, setText] = useState(() => {
		if (id) {
			return currentTask.title;
		} else {
			return null;
		}
	});
	if (!isOpen) return null;
	let categoryName = currentTask.category.name;

	function handleSave() {
		const currentCategory = categories.find(
			(el) => el.name === categoryName
		);
		const updatedTask = {
			...currentTask,
			title: text,
			category: currentCategory,
		};

		if(updatedTask.title.length!==0){
			dispatch(editTask(updatedTask));
		}
		setIsOpen(false);
	}

	return ReactDom.createPortal(
		<>
			<Overlay onClick={() => setIsOpen(false)} />
			<div className="taskPage">
				<label className="taskPage__title">
					Task Infomation
				</label>
				<input
					placeholder="Task"
					className="taskPage__input"
					value={text}
					type="text"
					onChange={(e) => setText(e.target.value)}
				/>
				<IconButton
					onClick={() => {
						dispatch(removeTask(currentTask.id));
						setIsOpen(false);
					}}
					className="taskPage__trash"
					color="#FF3C64"
				>
					{IconProvider("trash")}
				</IconButton>
				<IconButton
					onClick={() => setIsOpen(false)}
					className="taskPage__cross"
					color="#FF3C64"
				>
					{IconProvider("cross")}
				</IconButton>
				<DropDown
					onChange={(val) => (categoryName = val)}
					title={currentTask.category.name}
				>
					{categories.map((category) => (
						<DropDownItem
							key={category.color}
							value={category.name}
							title={category.name}
						></DropDownItem>
					))}
				</DropDown>
				<div className="taskPage__datePicker">
					<Calendar
						defaultDate={new Date(currentTask.expectedDate)}
						float="left"
						showRelativeDate
						showDate
						onChange={(val) => console.log(val)}
					/>
				</div>
				<button className="taskPage__save" onClick={handleSave}>
					Save
				</button>
			</div>
		</>,
		document.getElementById("taskPage")!
	);
};

export default TasKPage;
