import * as React from "react";
import { createUseStyles } from "react-jss";
import "./Button.css";

interface ButtonProps {
  icon?: JSX.Element;
  title: string;
  variant?: string; //contained outlined
  disabled?: boolean;
  type?: string;
  iconPosition?: string;
  color?: string;
  fontSize?: number;
  iconSize?: number;
  onClick: () => void;
  id?:string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  title,
  variant = "default",
  type,
  iconPosition,
  color,
  disabled,
  fontSize = 13,
  iconSize = 20,
  onClick,
  id,
}) => {
  //type interface
  interface Types {
    [key: string]: string;
  }

  //types of colors
  const types: Types = {
    default: "#5a5a5a",
    primary: "#558DFF",
    secondary: "#F48FB1",
    success: "#04D8AC",
    error: "#FF4B67",
  };

  //determining the color
  const selectedColor: string = type
    ? types[type]
    : color
    ? color
    : types.default;

  //Creating styles
  const classes = createUseStyles({
    button: {
      padding: "5px 8px",
      fontSize: 14,
      color:
        variant === "contained"
          ? "#fff"
          : type
          ? types[type]
          : color
          ? color
          : types.default,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: variant === "outlined" ? `2px solid ${selectedColor}` : "",
      cursor: "pointer",
      borderRadius: 5,
      width: "fit-content",
      backgroundColor: variant === "contained" ? selectedColor : "",
      "&:hover": {
        backgroundColor:
          variant === "contained" ? `${selectedColor}c9` : `${selectedColor}20`,
      },
      "&:active": {
        backgroundColor:
          variant === "contained" ? `${selectedColor}f5` : `${selectedColor}50`,
      },
      "& > svg": {
        height: iconSize,
        width: iconSize,
        fill: variant === "contained" ? "#fff" : selectedColor,
      },
    },

    button__title: {
      margin: "0px 5px",
      "user-select": "none",
      fontSize,
    },
    disabled: {
      backgroundColor: "#3535358c",
      cursor: "initial",
      border: "none",

      "&:hover": {
        backgroundColor: "#3535358c",
      },
      "&:active": {
        backgroundColor: "#3535358c",
      },
      "& >p,svg": {
        color: "#bfbfbf",
        fill: "#bfbfbf",
      },
    },
  })();

  return (
    <div
      onClick={onClick}
      id={id}
      className={
        disabled ? `${classes.button} ${classes.disabled}` : classes.button
      }
    >
      {iconPosition === "right" ? null : icon}
      <p className={classes.button__title}>{title}</p>
      {iconPosition === "right" ? icon : null}
    </div>
  );
};

export default Button;
