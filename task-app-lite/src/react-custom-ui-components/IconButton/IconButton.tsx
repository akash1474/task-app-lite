import React from "react";
import "./IconButton.css";
import { createUseStyles } from "react-jss";

interface Props {
  disabled?: boolean;
  className?: string;
  customSize?: number;
  color?: string;
  onClick?: () => void;
  children?: any;
  size?: string;
  type?: string;
  label?: string;
  labelPosition?: string;
  iconSize?: number;
  labelWidth?: number;
}

const IconButton: React.FC<Props> = ({
  disabled = false,
  className,
  iconSize,
  labelPosition,
  customSize,
  color,
  label,
  type = "default",
  size = "medium",
  children,
  onClick,
  labelWidth,
}) => {
  interface Sizes {
    [key: string]: {
      [key: string]: number;
    };
  }

  interface Types {
    [key: string]: string;
  }

  const types: Types = {
    default: "#5a5a5a",
    primary: "#558DFF",
    secondary: "#F48FB1",
    success: "#04D8AC",
    error: "#FF4B67",
  };

  const sizes: Sizes = {
    small: {
      iconSize: 17,
      padding: 7,
    },
    medium: {
      iconSize: 19,
      padding: 10,
    },
    large: {
      iconSize: 23,
      padding: 13,
    },
    xlarge: {
      iconSize: 28,
      padding: 15,
    },
  };

  interface LabelPosition {
    [key: string]: {
      [key: string]: string;
    };
  }

  const labelP: LabelPosition = {
    top: {
      bottom: "120%",
      left: "50%",
      transform: "translate(-50%,0%)",
    },
    right: {
      top: "50%",
      left: "190%",
      transform: "translate(-50%,-50%)",
    },
    bottom: {
      top: "120%",
      left: "50%",
      transform: "translate(-50%,0%)",
    },
    left: {
      top: "50%",
      right: "120%",
      transform: "translate(0%,-50%)",
    },
  };

  if (!label && labelPosition) {
    throw new Error(
      "IconButton must have a 'label' property for using 'labelPosition'!!!!"
    );
  }

  const useStyles = createUseStyles({
    iconButton__ripple: {
      backgroundColor: `${color ? color : types[type]}3d`,
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      borderRadius: "50%",
      position: "absolute",
    },
    iconButton: {
      height: "fit-content",
      width: "fit-content",
      color: "rgba(0, 0, 0, 0.54)",
      overflow: "visible",
      textAlign: "center",
      transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderRadius: "50%",
      cursor: "pointer",
      padding: customSize ? customSize : sizes[size].padding,
      position: "relative",
      "&:hover": {
        backgroundColor: disabled
          ? `transparent`
          : `${color ? color : types[type]}26`,
      },
      "&:active": {
        backgroundColor: disabled
          ? `transparent`
          : `${color ? color : types[type]}4f`,
      },
      "&:hover > $iconButton__label": {
        visibility: "visible",
        opacity: 1,
      },
    },
    iconButton__icon: {
      height: `${iconSize ? iconSize : sizes[size].iconSize}px`,
      width: `${iconSize ? iconSize : sizes[size].iconSize}px`,
      fill: color ? color : types[type],
    },
    iconButton__label: {
      padding: "2px 5px",
      fontSize: "12px",
      color: " #fff",
      width: labelWidth ? labelWidth : "auto",
      backgroundColor: "#555",
      position: "absolute",
      ...labelP[labelPosition || "top"],
      visibility: "hidden",
      borderRadius: "5px",
      zIndex: 2,
      transitionDuration: "0.25s",
      opacity: 0,
      pointerEvents: "none",
    },
  });
  const classes = useStyles();
  return (
    <div onClick={onClick} className={className}>
      <div id="iconButton" className={classes.iconButton}>
        {label ? (
          <label id="iconButton__label" className={classes.iconButton__label}>
            {label}
          </label>
        ) : null}
        <div className={classes.iconButton__icon}>{children}</div>
        <div
          id="iconButton__ripple"
          className={classes.iconButton__ripple}
        ></div>
      </div>
    </div>
  );
};

export default IconButton;
