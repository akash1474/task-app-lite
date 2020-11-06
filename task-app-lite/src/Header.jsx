import React, { useState } from "react";
import Profile from "./profile";
import { IconButton } from "./react-custom-ui-components/index";
import SettingContainer from "./settingContainer";
import IconProvider from "./iconsProvider";

export default function Header({ userData }) {
	const [showSetting, setShowSetting] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	return (
		<div className="header">
			{showInfo ? (
				<Profile showInfo={setShowInfo} userData={userData} />
			) : null}
			<IconButton
				onClick={() => setShowInfo((prev) => !prev)}
				className="header__avatar"
			>
				{IconProvider("avatar")}
			</IconButton>
			<div className="header__userinfo">
				<p className="header__userinfo--name">{userData.name}</p>
				<p className="header__userinfo--email">{userData.email}</p>
			</div>
			<IconButton
				onClick={() => setShowSetting((prev) => !prev)}
				className="header__settings"
			>
				{IconProvider("setting")}
			</IconButton>
			{showSetting ? (
				<SettingContainer showSetting={setShowSetting} />
			) : null}
		</div>
	);
}
