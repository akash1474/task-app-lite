import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as API from "./api/index";
import { logout, syncSettings, selectUser } from "./features/userSlice";
import Toggler from "./Toggler/Toggler";
import { ReactComponent as InfoIcon } from "./assets/icons/info1.svg";
import { auth } from "./firebase.js";
import AboutPage from "./AboutPage";
interface Props {
  showSetting: (v: boolean) => void;
}

interface StateProps {
  isDark?: boolean;
  showCompleted?: boolean;
  bgColor?: string;
  useGradient?: boolean;
}

const SettingContainer: React.FC<Props> = ({ showSetting }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const user = useSelector(selectUser);
  const settings = user.userSettings;
  const [showAbout, setShowAbout] = React.useState(false);
  const [userSettings, setUserSettings] = useState<StateProps>(settings);

  const syncToServer = () => {
    API.updateSettings(user.userData.id, userSettings);
  };

  React.useEffect(() => {
    dispatch(syncSettings(userSettings));
    const time = setTimeout(syncToServer, 500);
    return () => {
      window.clearTimeout(time);
    };
  }, [userSettings, dispatch]);

  const handleLogout = () => {
    auth.signOut();
    API.logout();
    dispatch(logout());
  };

  const handleColorUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSettings((prev) => {
      return {
        ...prev,
        bgColor: e.target.value,
      };
    });
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        !(ref.current! as HTMLElement).contains(e.target as HTMLElement)
      ) {
        showSetting(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, showSetting]);

  return (
    <>
      <AboutPage isOpen={showAbout} setIsOpen={setShowAbout} />
      <div
        style={{ display: showAbout ? "none" : "block" }}
        ref={ref}
        className="settingContainer"
      >
        <Toggler
          defaultState={userSettings!.showCompleted}
          title="Show Completed Tasks"
          margin="0 0 5px 0"
          onChange={(val) =>
            setUserSettings((prev) => {
              return { ...prev, showCompleted: val };
            })
          }
        />
        <Toggler
          defaultState={userSettings!.useGradient}
          title="Gradient"
          margin="0 0 5px 0"
          onChange={(val) =>
            setUserSettings((prev) => {
              return { ...prev, useGradient: val };
            })
          }
        />
        <div className="settingContainer__bgColor">
          <p>Background Color</p>
          <input
            value={userSettings!.bgColor}
            type="color"
            onChange={handleColorUpdate}
          />
        </div>
        <div className="settingContainer__utils">
          <button
            onClick={() => {
              setShowAbout(true);
              // showSetting(false);
            }}
            className="btn__about"
          >
            <InfoIcon />
            <p>About</p>
          </button>
          <Link
            to="/auth"
            onClick={handleLogout}
            className="settingContainer__logout"
          >
            <img
              className="settingContainer__google"
              src="./google.svg"
              alt="google"
            />
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SettingContainer;
