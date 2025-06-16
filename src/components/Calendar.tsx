// src/components/Calendar.tsx
import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, startOfWeek, endOfWeek } from 'date-fns';

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
      // Converted 'calendar-header' to Tailwind flex, justify-between, items-center, and margin-bottom
      <div className="flex justify-between items-center mb-4">
        {/* Buttons with basic Tailwind styling */}
        <button onClick={prevMonth} className="text-gray-600 hover:text-gray-800 font-bold text-lg">&lt;</button>
        {/* Month display with Tailwind font size, weight, and color */}
        <h3 className="text-lg font-semibold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={nextMonth} className="text-gray-600 hover:text-gray-800 font-bold text-lg">&gt;</button>
      </div>
    );
  };

  const renderDays = (): React.JSX.Element => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      // Converted 'calendar-days' to Tailwind grid, grid-cols-7, and text-center
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500">
        {days.map(day => (
          // Converted 'day-name' to Tailwind padding
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = (): React.JSX.Element => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart); // Start from the first day of the week for the calendar
    const endDate = endOfWeek(monthEnd);     // End on the last day of the week for the calendar

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      // Converted 'calendar-cells' to Tailwind grid, grid-cols-7, and text-center
      <div className="grid grid-cols-7 text-center">
        {days.map(day => (
          // Converted 'calendar-cell' to Tailwind padding and conditional styling
          <div
            key={day.toString()}
            className={`py-2 text-sm rounded-md transition-colors duration-150 ease-in-out
              ${isSameMonth(day, currentMonth) ? 'text-gray-800 font-medium' : 'text-gray-400'}
              ${day.toDateString() === new Date().toDateString() ? 'bg-blue-500 text-white rounded-full' : 'hover:bg-gray-100'}
            `}
          >
            <span className="day-number">{format(day, 'd')}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    // Converted 'calendar-widget' to Tailwind background, padding, border-radius, and shadow
    // The main container div for the calendar card
    <div className="bg-white ">
      {/* Title for the calendar, made bold and dark */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h2>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
