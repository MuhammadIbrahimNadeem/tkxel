import React from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { ChevronLeft, ChevronRight, Search, Bell } from 'lucide-react';
import { OccasionStatus, Audience } from '../../types/occasion';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const TopBar: React.FC = () => {
  const {
    currentDate,
    setCurrentDate,
    filters,
    setFilters,
    activeView,
    setActiveView,
    unreadCount
  } = useOccasion();

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleJumpToToday = () => {
    setCurrentDate(new Date(2026, 7, 1));
  };

  const currentMonthName = MONTH_NAMES[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const getHeaderTitle = () => {
    if (activeView === 'calendar') {
      return (
        <div className="month-selector">
          <h1 className="month-title">
            {currentMonthName} <span className="tabular-nums" style={{ color: 'var(--text-tertiary)' }}>{currentYear}</span>
          </h1>
          <button
            className="month-nav-btn"
            onClick={handlePrevMonth}
            title="Previous month"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="month-nav-btn"
            onClick={handleNextMonth}
            title="Next month"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      );
    } else if (activeView === 'connectors') {
      return <h1 className="month-title">Connectors & Context</h1>;
    } else {
      return <h1 className="month-title">Comms Notifications</h1>;
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        {getHeaderTitle()}
        {activeView === 'calendar' && (
          <button className="today-btn" onClick={handleJumpToToday}>
            Aug 2026 (Today)
          </button>
        )}
      </div>

      <div className="topbar-right">
        {activeView === 'calendar' && (
          <>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={14} />
              <input
                type="text"
                className="search-input"
                placeholder="Search occasions..."
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                aria-label="Search occasions"
              />
            </div>

            <select
              className="filter-select"
              value={filters.status}
              onChange={e => setFilters(prev => ({ ...prev, status: e.target.value as 'all' | OccasionStatus }))}
              aria-label="Filter by status"
            >
              <option value="all">All statuses</option>
              <option value="not_started">Not started</option>
              <option value="drafting">Drafting</option>
              <option value="in_review">In review</option>
              <option value="sent">Sent</option>
            </select>

            <select
              className="filter-select"
              value={filters.audience}
              onChange={e => setFilters(prev => ({ ...prev, audience: e.target.value as 'all' | Audience }))}
              aria-label="Filter by audience"
            >
              <option value="all">All audiences</option>
              <option value="external">External</option>
              <option value="internal">Internal</option>
              <option value="both">Both</option>
            </select>
          </>
        )}

        {/* TopBar Notification Bell with Small Insert Digit */}
        <button
          className={`topbar-bell-btn ${activeView === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveView(activeView === 'notifications' ? 'calendar' : 'notifications')}
          title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
          aria-label="Notifications"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span className="bell-badge-digit tabular-nums">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
