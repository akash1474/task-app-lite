import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as Logo } from "./assets/icons/logo.svg";
import left from "./assets/img/welcome-left.png";
import right from "./assets/img/welcome-right.png";
import Overlay from "./overlay";
import Stats from "./Stats";
import { COLORS } from "./utils";
import { ReactComponent as Check } from "./assets/icons/check.svg";

interface AboutPageProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => setIsOpen(false)} />
      <div className="aboutPage">
        <Logo height={70} width={70} />
        <p className="aboutPage__title">Task App Lite</p>
        <p className="aboutPage__version">(Version 1.01.23)</p>
        <div className="statsContainer">
          <Stats
            padding={"4px 14px"}
            color={COLORS.green}
            title="Version"
            value={"1.02.23"}
            icon={<Check height={25} />}
          />
          <Stats
            padding={"4px 14px"}
            color={COLORS.blue}
            title="Version"
            value={"1.02.23"}
            icon={<Check height={25} />}
          />
        </div>
      </div>
    </>,
    document.body
  );
};

export default AboutPage;

