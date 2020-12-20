import React, { useState } from "react";
import { IconButton } from "./react-custom-ui-components/index";
import IconProvider from './iconsProvider';
import {useDispatch} from 'react-redux';
import {addTask} from'./features/taskSlice';
import CategoryPicker from "./categoryPicker";
export default function InputController({ imgSrc }) {
	const [text, setText] = useState("");
	const [isOpenCateogry, setIsOpenCategory] = useState(false);
	const [category, setCategory] = useState({name:"Task",color:"rgba(255, 255, 255, 0.8)"});

	const dispatch=useDispatch();
	function submitData(e){
		e.preventDefault();
		setText("");
		setCategory({name:"Task",color:"rgb(239, 239, 239)"});
		dispatch(addTask({text,category}));
	}


	return (
		<div className="inputController">
			<div className="inputController__section">
				<IconButton className="inputController__calendar">
					{IconProvider("calendar")}
				</IconButton>
				<form onSubmit={submitData}>
					<input
					className="inputController__input"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onFocus={() => setIsOpenCategory(false)}
					type="text"
					placeholder="Task"
					/>
				</form>
			</div>
			{isOpenCateogry ? (
				<CategoryPicker
					setCategory={setCategory}
					showCategoryPicker={setIsOpenCategory}
				/>
			) : null}
			<IconButton onClick={() => setIsOpenCategory((prev) => !prev)}>
				<svg viewBox="0 0 24 24">
					<g
						id="Iconly/Bold/Category"
						stroke="none"
						strokeWidth="1"
						fillRule="evenodd"
					>
						<g
							id="Category"
							transform="translate(2.000000, 2.000000)"
							fillRule="nonzero"
							fill="#333"
						>
							<path d="M5.9199,11.4697 C7.3299,11.4697 8.4599,12.6107 8.4599,14.0307 L8.4599,14.0307 L8.4599,17.4397 C8.4599,18.8497 7.3299,19.9997 5.9199,19.9997 L5.9199,19.9997 L2.5399,19.9997 C1.1399,19.9997 -0.0001,18.8497 -0.0001,17.4397 L-0.0001,17.4397 L-0.0001,14.0307 C-0.0001,12.6107 1.1399,11.4697 2.5399,11.4697 L2.5399,11.4697 Z M17.46,11.4697 C18.86,11.4697 20,12.6107 20,14.0307 L20,14.0307 L20,17.4397 C20,18.8497 18.86,19.9997 17.46,19.9997 L17.46,19.9997 L14.08,19.9997 C12.67,19.9997 11.54,18.8497 11.54,17.4397 L11.54,17.4397 L11.54,14.0307 C11.54,12.6107 12.67,11.4697 14.08,11.4697 L14.08,11.4697 Z M5.9199,-9.32587341e-14 C7.3299,-9.32587341e-14 8.4599,1.15 8.4599,2.561 L8.4599,2.561 L8.4599,5.97 C8.4599,7.39 7.3299,8.53 5.9199,8.53 L5.9199,8.53 L2.5399,8.53 C1.1399,8.53 -0.0001,7.39 -0.0001,5.97 L-0.0001,5.97 L-0.0001,2.561 C-0.0001,1.15 1.1399,-9.32587341e-14 2.5399,-9.32587341e-14 L2.5399,-9.32587341e-14 Z M17.46,-9.32587341e-14 C18.86,-9.32587341e-14 20,1.15 20,2.561 L20,2.561 L20,5.97 C20,7.39 18.86,8.53 17.46,8.53 L17.46,8.53 L14.08,8.53 C12.67,8.53 11.54,7.39 11.54,5.97 L11.54,5.97 L11.54,2.561 C11.54,1.15 12.67,-9.32587341e-14 14.08,-9.32587341e-14 L14.08,-9.32587341e-14 Z"></path>
						</g>
					</g>
				</svg>
			</IconButton>
		</div>
	);
}
