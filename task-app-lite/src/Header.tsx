import React, { useState } from "react";
import Profile from "./profile";
import { IconButton } from "./react-custom-ui-components/index";
import SettingContainer from "./settingContainer";
import IconProvider from "./iconsProvider";
import { User } from "./@types";
import profilePhoto from "./assets/img/profilePhoto.jpg";
interface Props {
	userData: User;
}

const isLoggedIn = true;

const Header: React.FC<Props> = ({ userData }) => {
	const [showSetting, setShowSetting] = useState<boolean>(false);
	const [showInfo, setShowInfo] = useState<boolean>(false);

	const photoStyles = {
		background: `url(${profilePhoto})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
	};
	return (
		<div className="header">
			{showInfo ? (
				<Profile showInfo={setShowInfo} userData={userData} />
			) : null}
			{isLoggedIn ? (
				<div
					onClick={() => setShowInfo((prev) => !prev)}
					className="header__photo"
					style={photoStyles}
				></div>
			) : (
				<IconButton
					onClick={() => setShowInfo((prev) => !prev)}
					className="header__avatar"
					color="#404040"
				>
					{IconProvider("avatar")}
				</IconButton>
			)}

			<div className="header__userinfo">
				<p className="header__userinfo--name">{userData.name}</p>
				<p className="header__userinfo--email">{userData.email}</p>
			</div>
			<IconButton
				onClick={() => setShowSetting((prev) => !prev)}
				className="header__settings"
				color="#404040"
			>
				{IconProvider("setting")}
			</IconButton>
			{showSetting ? (
				<SettingContainer showSetting={setShowSetting} />
			) : null}
		</div>
	);
};

export default Header;
