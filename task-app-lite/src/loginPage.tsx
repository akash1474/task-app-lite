import React from 'react';

interface LoginPage{
	dispatch:(fn:Function)=>void;
	login:Function;
}

const LoginPage:React.FC<LoginPage>=({dispatch,login})=>{
	return (
		<div className="loginPage">
			<img src="./google.svg" alt="google_img"/>
			<button onClick={()=>dispatch(login())} >Login</button>
			<label >Powered By <b>OAuth 2.0</b></label>
		</div>
		);
}

export default LoginPage;