import React,{useRef,useEffect} from 'react';
import {categories} from './utils';

export default function CategoryPicker({showCategoryPicker,setCategory}){

	const ref=useRef(null);

	useEffect(()=>{
		function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
				showCategoryPicker(false);
            }
        }
		document.addEventListener("mousedown",handleClickOutside);
		return ()=>{
			document.removeEventListener("click",handleClickOutside);
		}
	},[ref,showCategoryPicker]);


	const getSlectedCategory=(data)=>{
		console.log(data);
		setCategory(data);
		showCategoryPicker(false);
	}


	return (
			<div ref={ref} className="categoryPicker">
				{categories.map(category=><Category key={category.color} onClick={getSlectedCategory} data={category}/>)}
			</div>
		);
}

function Category({data,onClick}){
	return(
		<div onClick={()=>onClick(data)} className="category">
			<div style={{background:data.color}}  className="category__color"></div>
			<p className="category__name">{data.name}</p>
		</div>
		);
}