import sysAdd from "../style/system-admin.module.css"
import calendar from "../style/calendar.module.css"
import { useEffect, useState } from "react";

export default function Side(){
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);
    const months = [
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

    const manipulate = () => {
        const dayOne = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate(); 
        const dayEnd = new Date(year, month, lastDate).getDay();
        const monthLastDate = new Date(year, month, 0).getDate();

        let daysList = [];


        for (let i = dayOne; i > 0; i--) {
            daysList.push({ day: monthLastDate - i + 1, active: false, inactive: true });
          }
      

        for (let i = 1; i <= lastDate; i++) {
        const isToday =
            i === date.getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
        daysList.push({ day: i, active: isToday, inactive: false });
        }
      

        for (let i = dayEnd; i < 6; i++) {
        daysList.push({ day: i - dayEnd + 1, active: false, inactive: true });
        }
    
        setDays(daysList);
    };


    useEffect(() => {
        manipulate();
    }, [month, year]);

    const handlePrevNext = (direction) => {
        const newMonth = direction === "prev" ? month - 1 : month + 1;

        if (newMonth < 0 || newMonth > 11) {
        const newDate = new Date(year, newMonth, date.getDate());
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth());
        } else {
        setMonth(newMonth);
        }
    };

    return(
        <section className={sysAdd.Side}>
            <div className={calendar.calendar_container}>
                <header className="calendar-header">
                    <div className={calendar.calendar_navigation}>
                        <i id="calendar-prev" className="fa-solid fa-chevron-left" onClick={()=> handlePrevNext("prev")}></i>
                        <p className={calendar.calendar_current_date}>{months[month]} {year}</p>
                        <i id="calendar-next" className="fa-solid fa-chevron-right" onClick={()=> handlePrevNext("next")}></i>
                    </div>
                    <span className={calendar.line}></span>
                </header>

                <div className={`${calendar.calendar_body} calendar-body`}>
                    <ul className={`${calendar.calendar_weekdays} calendar-weekdays` }>
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className={`${calendar.calendar_dates} calendar-dates`}>
                        {days.map((day, index) => (
                            <li
                            key={index}
                            className={`${day.active ? `${calendar.active}` : ""} ${day.inactive ? `${calendar.inactive}` : ""}`}
                            >
                            {day.day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={sysAdd.status}></div>
            <div className={sysAdd.status}></div>
            <div className={sysAdd.status}></div>
        </section>
    )
}