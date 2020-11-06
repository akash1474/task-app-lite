import * as React from 'react';
import "./Circular.css";
interface Props {
    color?: string;
    size?: string;
    rounded?: boolean;
    value?: number;
}
declare const CircularProgress: React.FC<Props>;
export default CircularProgress;
