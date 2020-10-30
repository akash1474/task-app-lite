import React,{useState} from "react";
import Profile from './profile'
import {IconButton} from './CustomComponent';
import SettingContainer from './settingContainer';
export default function Header({ userData }) {
	const [showSetting,setShowSetting]=useState(false);
	const [showInfo,setShowInfo]=useState(false);
	return (
		<div className="header">
			{showInfo?<Profile showInfo={setShowInfo} userData={userData}/>:null}
			<IconButton onClick={()=>setShowInfo(prev=>!prev)} icon="avatar" className="header__avatar" />
			<div className="header__userinfo">
				<p className="header__userinfo--name">{userData.name}</p>
				<p className="header__userinfo--email">{userData.email}</p>
			</div> 
			<IconButton onClick={()=>setShowSetting(prev=>!prev)} className="header__settings" icon="setting" />
			{showSetting?<SettingContainer showSetting={setShowSetting} />:null}
		</div>
	);
}
