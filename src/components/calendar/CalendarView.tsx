import React from 'react';
import { CalendarGrid } from './CalendarGrid';
import { MonthEventsRail } from './MonthEventsRail';
import { useOccasion } from '../../context/OccasionContext';

export const CalendarView: React.FC = () => {
  const { occasions, currentDate } = useOccasion();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthOccasions = occasions.filter(occ => {
    const start = new Date(occ.startDate + 'T00:00:00');
    return start.getFullYear() === currentYear && start.getMonth() === currentMonth;
  });

  return (
    <main className="calendar-view" aria-label="Observances Calendar">
      <div className="calendar-split-container">
        <MonthEventsRail monthOccasions={monthOccasions} />
        <div className="calendar-grid-area">
          <CalendarGrid />
        </div>
      </div>
    </main>
  );
};
