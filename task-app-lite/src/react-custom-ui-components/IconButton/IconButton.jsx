import * as React from "react";
import "./IconButton.css";
import { createUseStyles } from "react-jss";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var IconButton = function (_a) {
    var _b = _a.disabled, disabled = _b === void 0 ? false : _b, className = _a.className, iconSize = _a.iconSize, labelPosition = _a.labelPosition, customSize = _a.customSize, color = _a.color, label = _a.label, _c = _a.type, type = _c === void 0 ? "default" : _c, _d = _a.size, size = _d === void 0 ? "medium" : _d, children = _a.children, onClick = _a.onClick, labelWidth = _a.labelWidth;
    var types = {
        default: "#5a5a5a",
        primary: "#558DFF",
        secondary: "#F48FB1",
        success: "#04D8AC",
        error: "#FF4B67",
    };
    var sizes = {
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
    var labelP = {
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
        throw new Error("IconButton must have a 'label' property for using 'labelPosition'!!!!");
    }
    console.log(color);
    var useStyles = createUseStyles({
        iconButton__ripple: {
            backgroundColor: (color ? color : types[type]) + "3d",
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
                    ? "transparent"
                    : (color ? color : types[type]) + "26",
            },
            "&:active": {
                backgroundColor: disabled
                    ? "transparent"
                    : (color ? color : types[type]) + "4f",
            },
            "&:hover > $iconButton__label": {
                visibility: "visible",
                opacity: 1,
            },
        },
        iconButton__icon: {
            height: (iconSize ? iconSize : sizes[size].iconSize) + "px",
            width: (iconSize ? iconSize : sizes[size].iconSize) + "px",
            "& > svg":{
                fill: color ? color : types[type],
            }
        },
        iconButton__label: __assign(__assign({ padding: "2px 5px", fontSize: "12px", color: " #fff", width: labelWidth ? labelWidth : "auto", backgroundColor: "#555", position: "absolute" }, labelP[labelPosition || "top"]), { visibility: "hidden", borderRadius: "5px", zIndex: 2, transitionDuration: "0.25s", opacity: 0, pointerEvents: "none" }),
    });
    var classes = useStyles();
    return (<div onClick={onClick} className={className}>
			<div id="iconButton" className={classes.iconButton}>
				{label ? (<label id="iconButton__label" className={classes.iconButton__label}>
						{label}
					</label>) : null}
				<div className={classes.iconButton__icon}>{children}</div>
				<div id="iconButton__ripple" className={classes.iconButton__ripple}></div>
			</div>
		</div>);
};
export default IconButton;
//# sourceMappingURL=IconButton.jsx.map