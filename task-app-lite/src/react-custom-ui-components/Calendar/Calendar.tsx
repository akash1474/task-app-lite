import React, { useState, useEffect, useRef } from "react";
import IconButton from "../IconButton/IconButton";
import { ReactComponent as Back } from "./back.svg";
import { ReactComponent as Forward } from "./forward.svg";
import { ReactComponent as Icon } from './icon.svg';
import "./Calendar.css";

interface Props {
    onChange: (val: Date) => void;
    showRelativeDate?: boolean;
    showDate?: boolean;
    float?: string;
    defaultDate?: Date | undefined,
}

const Calendar: React.FC<Props> = ({ onChange, showRelativeDate, showDate, float, defaultDate }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectDate, setSelectDate] = useState<number>(defaultDate?.getDate() || new Date().getDate());
    date.setDate(1);

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const firstDayIndex = date.getDay();


    const months: string[] = [
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

    function createPrevDate() {
        const days = [];
        for (let x = firstDayIndex; x > 0; x--) {
            days.push(
                <div key={x} className="invisible">
                    {" "}
                </div>
            );
        }
        return days;
    }

    const weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    function renderWeekDays() {
        return weekDays.map((el) => (
            <div key={el} className="weekDay">
                {el}
            </div>
        ));
    }

    function renderDays() {
        const days: JSX.Element[] = [];
        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
            ) {
                days.push(
                    <div
                        key={i}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            setSelectDate(
                                parseInt(
                                    (e.target as HTMLDivElement).innerHTML!
                                )
                            )
                            setIsOpen(false);
                        }
                        }
                        className="day today"
                    >
                        {i}
                    </div>
                );
            } else if (i === selectDate) {
                days.push(
                    <div key={i} className="day selected">
                        {i}
                    </div>
                );
            } else {
                days.push(
                    <div
                        className="day"
                        key={i}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            setSelectDate(
                                parseInt(
                                    (e.target as HTMLDivElement).innerHTML!
                                )
                            )
                            setIsOpen(false);
                        }
                        }
                    >
                        {i}
                    </div>
                );
            }
        }
        return days;
    }

    if (!onChange) {
        throw new Error("Calendar must have an 'onChange' property!!!");
    }

    useEffect(() => {
        onChange(new Date(date.getFullYear(), date.getMonth(), selectDate));
    }, [selectDate, onChange, date]);

    let ref = useRef<HTMLDivElement>(null);



    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains((e.target as HTMLElement))) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref])




    function generateDateString() {
        if (showRelativeDate) {
            const newDate = new Date();
            if (newDate.getMonth() === date.getMonth() && date.getFullYear() === newDate.getFullYear()) {
                if (newDate.getDate() === selectDate) {
                    return 'Today'
                } else if (newDate.getDate() + 1 === selectDate) {
                    return 'Tomorrow'
                } else if (newDate.getDate() - 1 === selectDate) {
                    return 'Yestarday'
                }
            }
            return `${selectDate}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        return `${selectDate}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }


    function getPosition(float: string | undefined) {
        if (float === "top") {
            return {
                transform: "translateY(-180px)",
                transformOrigin:"bottom center",
            }
        } else if (float === "right") {
            return {
                transform: "translate(50px,-130px)",
                transformOrigin: "bottom left",
            }
        } else if (float === "left") {
            return {
                transform: "translate(-320px,-122px)",
                transformOrigin: "bottom right",
            }
        } else {
            return {}
        }
    }

    return (
        <>
            {showDate ?
                <div
                    onClick={() => setIsOpen(prev => !prev)}
                    className="calendar__status">
                    <Icon fill="#90caf9"  className="calendar__icon" />
                    <div
                        className="calendar__pickedDate">
                        {generateDateString()}
                    </div>
                </div> :
                <IconButton onClick={() => setIsOpen((prev) => !prev)}><Icon fill="#90caf9" /></IconButton>
            }
            {isOpen && <div ref={ref} style={getPosition(float)} className="calendar">
                <div className="calendar__header">
                    <IconButton
                        color="#ffffff"
                        size="large"
                        onClick={() => {
                            setDate(
                                (prev) =>
                                    new Date(
                                        prev.getFullYear(),
                                        prev.getMonth() - 1,
                                        prev.getDate()
                                    )
                            );
                        }}
                    >
                        <Back />
                    </IconButton>
                    {months[date.getMonth()]} {date.getFullYear()}
                    <IconButton
                        color="#ffffff"
                        size="large"
                        onClick={() => {
                            setDate(
                                (prev) =>
                                    new Date(
                                        prev.getFullYear(),
                                        prev.getMonth() + 1,
                                        prev.getDate()
                                    )
                            );
                        }}
                    >
                        <Forward />
                    </IconButton>
                </div>
                <div className="calendar__weekDays">{renderWeekDays()}</div>
                <div className="calendar__daysContainer">
                    {createPrevDate()}
                    {renderDays()}
                </div>
            </div>}
        </>
    );
};

export default Calendar;
