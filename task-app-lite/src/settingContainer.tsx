import React,{useState,useEffect,useRef} from "react";
import {useDispatch} from 'react-redux'
import {logout} from './features/userSlice';

interface Props{
	showSetting: (v: boolean) => void;
}

const SettingContainer:React.FC<Props>=({showSetting})=> {
	const [isDark,setIsDark]=useState(false);
	const dispatch=useDispatch();

	const ref=useRef(null);

	useEffect(()=>{
		function handleClickOutside(e:MouseEvent) {
			if (ref.current && !(ref.current! as HTMLElement).contains(e.target as HTMLElement)) {
				showSetting(false);
            }
        }
		document.addEventListener("mousedown",handleClickOutside);
		return ()=>{
			document.removeEventListener("click",handleClickOutside);
		}
	},[ref,showSetting]);

	return (
		<div ref={ref} className="settingContainer">
			<div className="settingContainer__theme">
				<p className="settingContainer__theme--title">Color Scheme</p>
				<div onClick={()=>setIsDark(prev=>!prev)} className="themeToggler">
					<div className="themeToggler__switch" style={{left:isDark?"18px":"2px"}}></div>
				</div>
			</div>
			<div className="settingContainer__logout" onClick={()=>dispatch(logout())}>
					<img className="settingContainer__google" src="./google.svg" alt="google"/>
				<p>Logout</p>
			</div>
		</div>
	);
}

export default SettingContainer;