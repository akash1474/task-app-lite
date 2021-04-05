import React from "react";
import { useDispatch } from "react-redux";
import { provider, auth } from "./firebase.js";

import { login } from "./features/userSlice";
import * as API from "./api/index";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    async function handleGoogleAuth() {
        const result = await auth.signInWithPopup(provider);
        const res = result.user!;
        const customObj = {
            name: res.displayName,
            email: res.email,
            imageUrl: res.photoURL,
            googleId: res.providerData[0]!.uid,
        };
        const userInfo = await API.login(customObj);
        localStorage.setItem("userSettings",JSON.stringify(userInfo.data.user.settings));
        localStorage.setItem("token", userInfo.data.token);
        dispatch(login(userInfo.data.user));
    }

    return (
        <div className="loginPage">
            <img src="./google.svg" alt="google_img" />
            <button className="button" onClick={handleGoogleAuth}>
                Login
            </button>
            <label>
                Powered By <b>OAuth 2.0</b>
            </label>
        </div>
    );
};

export default LoginPage;
