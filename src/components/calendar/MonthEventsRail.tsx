import React from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { Occasion, getOccasionOverallStatus } from '../../types/occasion';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

interface MonthEventsRailProps {
  monthOccasions: Occasion[];
}

export const MonthEventsRail: React.FC<MonthEventsRailProps> = ({ monthOccasions }) => {
  const { selectOccasion, selectedOccasionId, currentDate } = useOccasion();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'short' });

  const formatShortDate = (start: string, end?: string) => {
    const s = new Date(start + 'T00:00:00');
    const day = s.getDate();
    if (!end || start === end) {
      return `${day}`;
    }
    const e = new Date(end + 'T00:00:00');
    return `${day}–${e.getDate()}`;
  };

  const sortedOccasions = [...monthOccasions].sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <aside className="events-rail" aria-label="Month Events Quick List">
      <div className="events-rail-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={15} style={{ color: 'var(--brand-primary)' }} />
          <span className="events-rail-title">{currentDate.toLocaleDateString('en-US', { month: 'long' })} Schedule</span>
        </div>
        <span className="events-count-badge tabular-nums">
          {sortedOccasions.length}
        </span>
      </div>

      <div className="events-rail-scroll">
        {sortedOccasions.length === 0 ? (
          <div className="events-rail-empty">
            <Sparkles size={16} style={{ color: 'var(--text-muted)', marginBottom: '4px' }} />
            <span>No observances this month</span>
          </div>
        ) : (
          sortedOccasions.map(occ => {
            const isSelected = selectedOccasionId === occ.id;
            const status = getOccasionOverallStatus(occ);

            const allLangs = Array.from(
              new Set([
                ...(occ.tracks.external?.languages || []),
                ...(occ.tracks.internal?.languages || [])
              ])
            );

            const initialLang = allLangs[0]?.toUpperCase() || 'EN';
            const extraLangCount = allLangs.length - 1;

            return (
              <button
                key={occ.id}
                className={`rail-event-item ${status} ${isSelected ? 'selected' : ''}`}
                onClick={() => selectOccasion(occ.id)}
                title={`Open ${occ.name}`}
              >
                <div className="rail-date-badge">
                  <span className="rail-date-month">{monthName.toUpperCase()}</span>
                  <span className="rail-date-day tabular-nums">{formatShortDate(occ.startDate, occ.endDate)}</span>
                </div>

                <div className="rail-event-info">
                  <div className="rail-event-name truncate">{occ.name}</div>
                  <div className="rail-event-meta">
                    <span className={`status-pill ${status}`}>
                      {status.replace('_', ' ')}
                    </span>
                    <span className="rail-langs tabular-nums">
                      {initialLang}{extraLangCount > 0 ? ` +${extraLangCount}` : ''}
                    </span>
                  </div>
                </div>

                <ChevronRight size={14} className="rail-chevron" />
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
