import * as React from "react";
import "./IconButton.css";
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
declare const IconButton: React.FC<Props>;
export default IconButton;
