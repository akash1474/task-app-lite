import React from "react";
import './CustomComponent.css';
import IconProvider from './iconsProvider';
import { createUseStyles } from "react-jss";

export function IconButton({disabled=false,className,customSize,color="#5a5a5a", icon="error", size="medium",children,onClick}) {

	const sizes={
		small:{
			iconSize:17,
			button:35
		},
		medium:{
			iconSize:20,
			button:40
		},
		large:{
			iconSize:27,
			button:45
		}
	}

	const useStyles = createUseStyles({
		iconButton__ripple: {
			position: "absolute",
			backgroundColor: `${color}94`,
			alignSelf: "center",
			justifySelf: "center",
			borderRadius: "50%",
		},
		iconButton:children?{
			height:"fit-content",
			width:'fit-content',
			color: "rgba(0, 0, 0, 0.54)",
			overflow: "visible",
			textAlign: "center",
			transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			borderRadius: "50%",
			cursor: "pointer",
			padding:customSize?customSize:"7px",
			position: "relative",
			"&:hover": {
				backgroundColor: disabled?`transparent`:`${color}26`,
			},
			"&:active":{
				backgroundColor:disabled?`transparent`:`${color}4d`,
			}
		}:{
			height: `${sizes[size].button}px`,
			width: `${sizes[size].button}px`,
			color: "rgba(0, 0, 0, 0.54)",
			overflow: "visible",
			textAlign: "center",
			transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
			borderRadius: "50%",
			cursor: "pointer",
			display: "grid",
			placeItems: "center",
			position: "relative",
			"&:hover": {
				backgroundColor: `${color}26`,
			},
			"&:active":{
				backgroundColor:`${color}4d`,
			}
		},
		iconButton__icon: {
			height: `${sizes[size].iconSize}px`,
			width: `${sizes[size].iconSize}px`,
			fill:color
		},
	});
	const classes = useStyles();
	return (
		<div onClick={onClick} className={className}>
			<div className={classes.iconButton}>
			<div className={classes.iconButton__icon}>
				{children?children:<svg viewBox="0 0 24 24">
					{IconProvider(icon)}
				</svg>}
			</div>
			<div className={classes.iconButton__ripple}></div>
		</div>
		</div>
	);
}

// export function Icon(){

// 	return
// }