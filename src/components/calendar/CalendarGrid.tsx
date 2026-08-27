import React, { useState } from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { Occasion, getOccasionOverallStatus } from '../../types/occasion';
import { TileHoverPreview } from './TileHoverPreview';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid: React.FC = () => {
  const { currentDate, occasions, filters, selectOccasion, selectedOccasionId } = useOccasion();
  const [hoveredOccasion, setHoveredOccasion] = useState<{ occasion: Occasion; pos: { x: number; y: number } } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const simulatedTodayStr = '2026-08-27';

  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const filteredOccasions = occasions.filter(occ => {
    const overallStatus = getOccasionOverallStatus(occ);
    if (filters.status !== 'all' && overallStatus !== filters.status) return false;
    if (filters.audience !== 'all' && occ.audience !== filters.audience) return false;
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const matchName = occ.name.toLowerCase().includes(q);
      const matchCountry = (occ.country || '').toLowerCase().includes(q);
      const allLangs = [
        ...(occ.tracks.external?.languages || []),
        ...(occ.tracks.internal?.languages || [])
      ];
      const matchLang = allLangs.some(l => l.toLowerCase().includes(q));
      if (!matchName && !matchCountry && !matchLang) return false;
    }
    return true;
  });

  const getOccasionsForDate = (dateStr: string): Occasion[] => {
    return filteredOccasions.filter(occ => {
      if (occ.startDate === dateStr) return true;
      if (occ.endDate && dateStr >= occ.startDate && dateStr <= occ.endDate) return true;
      return false;
    });
  };

  const cells: Array<{
    date: Date;
    dateStr: string;
    dayNum: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    occasions: Occasion[];
  }> = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const d = new Date(year, month - 1, day);
    const dateStr = formatDateString(d);
    cells.push({
      date: d,
      dateStr,
      dayNum: day,
      isCurrentMonth: false,
      isToday: dateStr === simulatedTodayStr,
      occasions: getOccasionsForDate(dateStr)
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateStr = formatDateString(d);
    cells.push({
      date: d,
      dateStr,
      dayNum: day,
      isCurrentMonth: true,
      isToday: dateStr === simulatedTodayStr,
      occasions: getOccasionsForDate(dateStr)
    });
  }

  const remainingCells = (cells.length <= 35 ? 35 : 42) - cells.length;
  for (let day = 1; day <= remainingCells; day++) {
    const d = new Date(year, month + 1, day);
    const dateStr = formatDateString(d);
    cells.push({
      date: d,
      dateStr,
      dayNum: day,
      isCurrentMonth: false,
      isToday: dateStr === simulatedTodayStr,
      occasions: getOccasionsForDate(dateStr)
    });
  }

  return (
    <div className="calendar-frame">
      <div className="weekday-header">
        {WEEKDAYS.map(day => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid immersive-grid">
        {cells.map((cell, idx) => {
          const primaryOccasion = cell.occasions[0];
          const hasEvent = Boolean(primaryOccasion);
          const status = primaryOccasion ? getOccasionOverallStatus(primaryOccasion) : '';
          const isSelected = primaryOccasion && selectedOccasionId === primaryOccasion.id;

          const allLangs = primaryOccasion
            ? Array.from(
                new Set([
                  ...(primaryOccasion.tracks.external?.languages || []),
                  ...(primaryOccasion.tracks.internal?.languages || [])
                ])
              )
            : [];

          const initialLang = allLangs[0]?.toUpperCase() || 'EN';
          const extraLangCount = allLangs.length - 1;

          return (
            <div
              key={cell.dateStr + '-' + idx}
              className={`calendar-day-cell immersive-day-cell ${cell.isCurrentMonth ? '' : 'other-month'} ${cell.isToday ? 'is-today' : ''} ${hasEvent ? `has-event ${status}` : 'empty-day'} ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                if (primaryOccasion) {
                  selectOccasion(primaryOccasion.id);
                }
              }}
              onMouseEnter={e => {
                if (primaryOccasion) {
                  setHoveredOccasion({ occasion: primaryOccasion, pos: { x: e.clientX, y: e.clientY } });
                }
              }}
              onMouseMove={e => {
                if (primaryOccasion) {
                  setHoveredOccasion({ occasion: primaryOccasion, pos: { x: e.clientX, y: e.clientY } });
                }
              }}
              onMouseLeave={() => setHoveredOccasion(null)}
              role={hasEvent ? 'button' : undefined}
              tabIndex={hasEvent ? 0 : undefined}
              onKeyDown={e => {
                if (hasEvent && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  selectOccasion(primaryOccasion.id);
                }
              }}
              aria-label={hasEvent ? `${cell.dayNum} ${primaryOccasion.name}, status ${status.replace('_', ' ')}` : `${cell.dayNum}`}
            >
              <div className="day-header-row">
                <span className="day-number tabular-nums">
                  {cell.dayNum}
                </span>
                {cell.isToday && (
                  <span className="today-badge">
                    Today
                  </span>
                )}
                {hasEvent && (
                  <span className={`status-pill ${status}`}>
                    {status.replace('_', ' ')}
                  </span>
                )}
              </div>

              {hasEvent ? (
                <div className="immersive-event-content">
                  <div className="immersive-event-title truncate">
                    {primaryOccasion.name}
                  </div>
                  
                  <div className="immersive-event-footer">
                    <span className={`audience-badge ${primaryOccasion.audience}`}>
                      {primaryOccasion.audience === 'both' ? 'Int/Ext' : primaryOccasion.audience}
                    </span>
                    <span className="immersive-langs tabular-nums">
                      {initialLang}{extraLangCount > 0 ? ` +${extraLangCount}` : ''}
                    </span>
                  </div>

                  {cell.occasions.length > 1 && (
                    <div className="more-events-indicator">
                      +{cell.occasions.length - 1} more
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {hoveredOccasion && (
        <TileHoverPreview
          occasion={hoveredOccasion.occasion}
          position={hoveredOccasion.pos}
        />
      )}
    </div>
  );
};

function formatDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
