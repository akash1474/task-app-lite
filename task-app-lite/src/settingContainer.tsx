import React,{useState,useEffect,useRef} from "react";
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import axios from 'axios';
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

	const handleLogout=async ()=>{
		await axios.get("http://localhost:5000/api/v1/user/logout");
		dispatch(logout())
	}

	return (
		<div ref={ref} className="settingContainer">
			<div className="settingContainer__theme">
				<p className="settingContainer__theme--title">Color Scheme</p>
				<div onClick={()=>setIsDark(prev=>!prev)} className="themeToggler">
					<div className="themeToggler__switch" style={{left:isDark?"18px":"2px"}}></div>
				</div>
			</div>
			<Link onClick={handleLogout} className="settingContainer__logout" to="/auth">
				<img className="settingContainer__google" src="./google.svg" alt="google"/>
					<p>Logout</p>
			</Link>
		</div>
	);
}

export default SettingContainer;