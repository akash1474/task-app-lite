import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as Logo } from "./assets/icons/logo.svg";
import Overlay from "./overlay";
import UpdatesComponent from "./UpdateInfo";
import Stats from "./Stats";
import { COLORS } from "./utils";
import { ReactComponent as ReleaseDate } from "./assets/icons/release.svg";
import { ReactComponent as Email } from "./assets/icons/email.svg";
import { ReactComponent as Update } from "./assets/icons/update.svg";
import { ReactComponent as Product } from "./assets/icons/product.svg";
import { ReactComponent as Changes } from "./assets/icons/changes.svg";
import { IconButton } from "./react-custom-ui-components/main";
import IconProvider from "./iconsProvider";

interface AboutPageProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const updates = [
    "Redesigned Fonts",
    "New About Page",
    "Settings Page Redesign",
    "New Icons Integration",
  ];

  const working = [
    "Abitlity to create lists",
    "Weekly Work time bar graph in profile page",
  ];

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => setIsOpen(false)} />
      <div className="aboutPage">
        <IconButton
          onClick={() => {
            setIsOpen(false);
          }}
          className="taskPage__cross"
          color="#FF3C64"
        >
          {IconProvider("cross")}
        </IconButton>
        <Logo height={70} width={70} />
        <p className="aboutPage__title">Task App Lite</p>
        <p className="aboutPage__version">(Version 1.01.23)</p>
        <div className="statsContainer">
          <Stats
            padding={"4px 10px"}
            color={COLORS.green}
            title="Release Date"
            value={"April 10, 2021"}
            icon={<ReleaseDate width={25} height={25} />}
          />
          <Stats
            padding={"4px 10px"}
            color={COLORS.blue}
            title="Updated On"
            value={"August 15, 2021"}
            icon={<Update height={25} />}
          />
        </div>
        <UpdatesComponent
          icon={<Changes height={25} />}
          updates={updates}
          color={COLORS.yellow}
          title={"Recent Updates Information"}
        />
        <Stats
          padding={"4px 10px"}
          color={COLORS.darkPurple}
          title="Akash Pandit"
          value={"panditakash38@gmail.com"}
          icon={<Email height={25} />}
          style={{ width: "-webkit-fill-available" }}
        />
        <UpdatesComponent
          icon={<Product height={25} />}
          updates={working}
          color={COLORS.red}
          title={"Work in progress"}
        />
      </div>
    </>,
    document.body
  );
};

export default AboutPage;
