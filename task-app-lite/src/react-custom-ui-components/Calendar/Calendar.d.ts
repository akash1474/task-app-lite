import * as React from 'react';
import './Calendar.css';
interface Props {
    onChange: (val: Date) => void;
}
declare const Calendar: React.FC<Props>;
export default Calendar;
