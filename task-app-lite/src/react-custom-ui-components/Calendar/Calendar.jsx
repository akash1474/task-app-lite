import * as React from 'react';
import IconButton from '../IconButton/IconButton';
import './Calendar.css';
var Calendar = function (_a) {
    var onChange = _a.onChange;
    var _b = React.useState(new Date()), date = _b[0], setDate = _b[1];
    var _c = React.useState(new Date().getDate()), selectDate = _c[0], setSelectDate = _c[1];
    date.setDate(1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var firstDayIndex = date.getDay();
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    function renderWeekDays() {
        return weekDays.map(function (el) { return <div key={el} className="weekDay">{el}</div>; });
    }
    function createPrevDate() {
        var days = [];
        for (var x = firstDayIndex; x > 0; x--) {
            days.push(<div key={x} className="invisible"> </div>);
        }
        return days;
    }
    function renderDays() {
        var days = [];
        for (var i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()
                && date.getFullYear() === new Date().getFullYear()) {
                days.push(<div key={i} onClick={function (e) { return setSelectDate(parseInt(e.target.innerHTML)); }} className="day today">{i}</div>);
            }
            else if (i === selectDate) {
                days.push(<div key={i} className="day selected">
                        {i}
                    </div>);
            }
            else {
                days.push(<div className="day" key={i} onClick={function (e) { return setSelectDate(parseInt(e.target.innerHTML)); }}>{i}</div>);
            }
        }
        return days;
    }
    if (!onChange) {
        throw (new Error("Calendar must have an 'onChange' property!!!"));
    }
    React.useEffect(function () {
        onChange(new Date(date.getFullYear(), date.getMonth(), selectDate));
    }, [selectDate, date, onChange]);
    return (<div className="calendar">
            <div className="calendar__header">
                <IconButton color="#ffffff" size="large" onClick={function () {
        setDate(function (prev) {
            return new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate());
        });
    }}><svg viewBox="0 0 24 24">
  <path d="M9.929,12l3.821-3.821c0.414-0.414,0.414-1.086,0-1.5l0,0c-0.414-0.414-1.086-0.414-1.5,0l-4.614,4.614 c-0.391,0.391-0.391,1.024,0,1.414l4.614,4.614c0.414,0.414,1.086,0.414,1.5,0h0c0.414-0.414,0.414-1.086,0-1.5L9.929,12z"/>
    </svg></IconButton>
                
                {months[date.getMonth()]} {date.getFullYear()}
                <IconButton color="#ffffff" size="large" onClick={function () {
        setDate(function (prev) {
            return new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate());
        });
    }}><svg viewBox="0 0 24 24">
  <path d="M13.071,12L9.25,8.179c-0.414-0.414-0.414-1.086,0-1.5l0,0c0.414-0.414,1.086-0.414,1.5,0l4.614,4.614 c0.391,0.391,0.391,1.024,0,1.414l-4.614,4.614c-0.414,0.414-1.086,0.414-1.5,0h0c-0.414-0.414-0.414-1.086,0-1.5L13.071,12z"/>
    </svg></IconButton>
            </div>
            <div className="calendar__weekDays">
                {renderWeekDays()}
            </div>
            <div className="calendar__daysContainer">
                {createPrevDate()}
                {renderDays()}
            </div>
        </div>);
};
export default Calendar;
//# sourceMappingURL=Calendar.jsx.map