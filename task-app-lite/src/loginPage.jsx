import React from 'react';

export default function LoginPage({dispatch,login}){
	return (
		<div className="loginPage">
			<img src="./google.svg" alt="google_img"/>
			<button onClick={()=>dispatch(login())} >Login</button>
			<label >Powered By <b>OAuth 2.0</b></label>
		</div>
		);
}