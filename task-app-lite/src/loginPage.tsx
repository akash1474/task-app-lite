import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {GoogleLogin} from 'react-google-login';
import { login } from "./features/userSlice";
import axios from 'axios';

const LoginPage: React.FC = () => {
	const dispatch=useDispatch();

	const googleSuccess=async (res:any)=>{
		console.log(res?.profileObj);
		const userInfo=await axios.post('http://localhost:5000/api/v1/user/login',{...res?.profileObj});
		dispatch(login(userInfo.data.user))
	}

	const googleFaliure=async ()=>{
		console.log("Failure");
	}
	return (
		<div className="loginPage">
			<img src="./google.svg" alt="google_img" />
			<GoogleLogin
				clientId="888508261648-bbunkh3tcfhihior79at9hk1gv6j2fnm.apps.googleusercontent.com"
				render={(props)=>{
					return <Link className="button" onClick={props.onClick} to="/">
				Login
				</Link>
				}}
				onSuccess={googleSuccess}
				onFailure={googleFaliure}
				cookiePolicy="single_host_origin"
			/>
			<label>
				Powered By <b>OAuth 2.0</b>
			</label>
		</div>
	);
};

export default LoginPage;
