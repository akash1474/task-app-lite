import * as React from 'react';
import './DropDown.css';
interface Props {
    title?: string;
    children: JSX.Element[];
    onChange: (val: string) => void;
}
export declare const DropDown: React.FC<Props>;
interface DropDownProps {
    title: string;
    value: string;
}
export declare const DropDownItem: React.FC<DropDownProps>;
export {};
