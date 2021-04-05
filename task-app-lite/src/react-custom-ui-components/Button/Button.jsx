import * as React from 'react';
import { createUseStyles } from "react-jss";
import "./Button.css";
var Button = function (_a) {
    var icon = _a.icon, title = _a.title, _b = _a.variant, variant = _b === void 0 ? "default" : _b, type = _a.type, iconPosition = _a.iconPosition, color = _a.color, disabled = _a.disabled, _c = _a.fontSize, fontSize = _c === void 0 ? 13 : _c, _d = _a.iconSize, iconSize = _d === void 0 ? 20 : _d, onClick = _a.onClick;
    //types of colors
    var types = {
        default: "#5a5a5a",
        primary: "#558DFF",
        secondary: "#F48FB1",
        success: "#04D8AC",
        error: "#FF4B67",
    };
    //determining the color
    var selectedColor = type ? types[type] : color ? color : types.default;
    //Creating styles
    var classes = createUseStyles({
        button: {
            padding: "5px 8px",
            fontSize: 14,
            color: variant === "contained" ? "#fff" : type ? types[type] : color ? color : types.default,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: variant === "outlined" ? "2px solid " + selectedColor : "",
            cursor: "pointer",
            borderRadius: 5,
            width:"fit-content",
            backgroundColor: variant === "contained" ? selectedColor : "",
            "&:hover": {
                backgroundColor: variant === "contained" ? selectedColor + "c9" : selectedColor + "20",
            },
            "&:active": {
                backgroundColor: variant === "contained" ? selectedColor + "f5" : selectedColor + "50",
            },
            "& > svg": {
                height: iconSize,
                width:iconSize,
                fill: variant === "contained" ? "#fff" : selectedColor,
            }
        },
        button__title: {
            margin: "0px 5px",
            "user-select": "none",
            fontSize: fontSize,
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
                fill: "#bfbfbf"
            }
        },
    })();
    return (<div onClick={onClick} className={disabled ? classes.button + " " + classes.disabled : classes.button}>
			{iconPosition === "right" ? null : icon}
			<p className={classes.button__title}>{title}</p>
			{iconPosition === "right" ? icon : null}
		</div>);
};
export default Button;
//# sourceMappingURL=Button.jsx.map