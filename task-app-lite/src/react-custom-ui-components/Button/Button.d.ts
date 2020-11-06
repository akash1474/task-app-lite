import * as React from 'react';
import "./Button.css";
interface ButtonProps {
    icon?: JSX.Element;
    title: string;
    variant?: string;
    disabled?: boolean;
    type?: string;
    iconPosition?: string;
    color?: string;
    fontSize?: number;
    iconSize?: number;
    onClick: () => void;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
