import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const nextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (): void => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = (): React.JSX.Element => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={nextMonth}>&gt;</button>
      </div>
    );
  };

  const renderDays = (): React.JSX.Element => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="calendar-days">
        {days.map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = (): React.JSX.Element => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="calendar-cells">
        {days.map(day => (
          <div key={day.toString()} className="calendar-cell">
            <span className="day-number">{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-widget">
      <h2>Calendar</h2>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;