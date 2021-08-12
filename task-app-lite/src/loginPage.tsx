import React from "react";
import { COLORS } from "./utils";
import { useDispatch } from "react-redux";
import { provider, auth } from "./firebase.js";
import left from "./assets/img/welcome-left.png";
import right from "./assets/img/welcome-right.png";
import { ReactComponent as Logo } from "./assets/icons/logo.svg";
import { ReactComponent as Google } from "./assets/icons/google.svg";
import { ReactComponent as Secutiry } from "./assets/icons/shield.svg";
import { ReactComponent as UI } from "./assets/icons/ui.svg";
import StatsContainer from "./Stats";

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
    localStorage.setItem(
      "userSettings",
      JSON.stringify(userInfo.data.user.settings || {})
    );
    localStorage.setItem("token", userInfo.data.token);
    dispatch(login(userInfo.data.user));
  }

  return (
    <div className="loginPage">
      <Logo style={{ marginTop: 100 }} height={70} width={70} />
      <p className="loginPage__title">Task App Lite</p>
      <img src={left} alt="welcome_left" />
      <img src={right} alt="welcome_right" />
      <button className="button" onClick={handleGoogleAuth}>
        Google Login
      </button>
      <div style={{ marginTop: "auto" }} className="statsContainer">
        <StatsContainer
          padding={"4px 10px"}
          color={COLORS.green}
          title="Login Method"
          value={"Secured Google Login"}
          icon={<Google width={25} height={25} />}
        />
        <StatsContainer
          padding={"4px 10px"}
          color={COLORS.yellow}
          title="Secutiry"
          value={"SHA256 Encryption"}
          icon={<Secutiry width={25} height={25} />}
        />
      </div>
      <StatsContainer
        padding={"4px 10px"}
        color={COLORS.default}
        title="UI Design"
        value={"Minimal and distraction free UI Design"}
        icon={<UI width={25} height={25} />}
        style={{
          width: "-webkit-fill-available",
          marginTop: 10,
          marginBottom: 25,
        }}
      />
      <label>
        Powered By <b>OAuth 2.0</b>
      </label>
    </div>
  );
};

export default LoginPage;
