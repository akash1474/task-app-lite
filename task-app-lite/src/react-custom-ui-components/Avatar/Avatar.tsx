import React from 'react';
import "./Avatar.css";
import {Icon,IconsList} from '../Icons/Icon';

interface AvatarProps{
	imgUrl?:string;
	size?:number;
	onClick?:()=>void;
}

const Avatar:React.FC<AvatarProps>=({imgUrl,size,onClick})=>{

	const style={
    	background: `url(${imgUrl})`,
    	backgroundPosition: "center",
    	backgroundSize: "cover",
    	height:size && 35,
    	width:size && 35,
  };

	return (
			imgUrl?<div onClick={onClick} style={style} className="Avatar">

			</div> 
			:
			<Icon size={30} onClick={onClick} icon={IconsList.avatar} />
		);
}

export default Avatar;