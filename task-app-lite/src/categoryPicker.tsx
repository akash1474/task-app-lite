import React,{useRef,useEffect} from 'react';
import {categories} from './utils';
import {Category as CategoryType} from './@types'

interface Props{
	showCategoryPicker: (val: boolean) => void;
	setCategory: (val: CategoryType) => void;
}

const CategoryPicker:React.FC<Props>=({showCategoryPicker,setCategory})=>{

	const ref=useRef(null);

	useEffect(()=>{
		function handleClickOutside(e:MouseEvent):void {
            if (ref.current && !(ref.current! as HTMLElement).contains(e.target as HTMLElement)) {
				showCategoryPicker(false);
            }
        }
		document.addEventListener("mousedown",handleClickOutside);
		return ()=>{
			document.removeEventListener("click",handleClickOutside);
		}
	},[ref,showCategoryPicker]);


	const getSlectedCategory = (data: CategoryType) => {
		setCategory(data);
		showCategoryPicker(false);
	}

	return (
			<div ref={ref} className="categoryPicker">
				{categories.map(category=><Category key={category.color} onClick={getSlectedCategory} data={category}/>)}
			</div>
		);
}

interface CategoryInterface{
	data: CategoryType;
	onClick: (data: CategoryType) => void;
}

const Category:React.FC<CategoryInterface>=({data,onClick})=>{
	return(
		<div onClick={()=>onClick(data)} className="category">
			<div style={{background:data.color}}  className="category__color"></div>
			<p className="category__name">{data.name}</p>
		</div>
		);
}

export default CategoryPicker;