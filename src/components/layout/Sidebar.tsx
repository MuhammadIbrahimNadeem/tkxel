import React, { useState } from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { Calendar as CalendarIcon, PlugZap, ChevronLeft, ChevronRight, ShieldAlert, UserCheck } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, currentUserRole, setCurrentUserRole } = useOccasion();
  const [collapsed, setCollapsed] = useState(false);

  const toggleRole = () => {
    setCurrentUserRole(currentUserRole === 'drafter' ? 'reviewer' : 'drafter');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Main Navigation">
      <div>
        <div className="sidebar-header">
          {!collapsed ? (
            <>
              <div className="sidebar-brand">
                <div className="brand-logo-container" title="Cloud Comm">
                  <img
                    src="/cloud_comm_logo.svg"
                    alt="Cloud Comm Logo"
                    className="brand-logo-img"
                  />
                </div>
                <div className="brand-text">
                  <span className="brand-title">Occasion Letters</span>
                  <span className="brand-subtitle">Cloud Comms</span>
                </div>
              </div>
              <button
                className="sidebar-collapse-btn"
                onClick={() => setCollapsed(true)}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={16} />
              </button>
            </>
          ) : (
            <div className="collapsed-header-stack">
              <div className="brand-logo-container collapsed" title="Cloud Comm">
                <img
                  src="/cloud_comm_logo.svg"
                  alt="Cloud Comm Logo"
                  className="brand-logo-img collapsed"
                />
              </div>
              <button
                className="sidebar-expand-pill"
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeView === 'calendar' ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
            onClick={() => setActiveView('calendar')}
            title="Calendar & Chart"
          >
            <div className="nav-item-content">
              <CalendarIcon size={18} />
              {!collapsed && <span>Calendar & Chart</span>}
            </div>
          </button>

          <button
            className={`nav-item ${activeView === 'connectors' ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
            onClick={() => setActiveView('connectors')}
            title="Connectors & Context"
          >
            <div className="nav-item-content">
              <PlugZap size={18} />
              {!collapsed && <span>Connectors</span>}
            </div>
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        {!collapsed && (
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: '6px' }}>
              Active Persona
            </div>
            <button
              className="role-toggle-pill"
              onClick={toggleRole}
              title="Click to switch persona between Drafter and Reviewer"
            >
              {currentUserRole === 'reviewer' ? (
                <>
                  <ShieldAlert size={13} style={{ color: '#4f46e5' }} />
                  <span>Reviewer Mode</span>
                </>
              ) : (
                <>
                  <UserCheck size={13} style={{ color: '#059669' }} />
                  <span>Drafter Mode</span>
                </>
              )}
            </button>
          </div>
        )}

        <div
          className={`user-profile ${collapsed ? 'collapsed' : ''}`}
          title={currentUserRole === 'reviewer' ? 'Sarah Jenkins (Director of Comms) — Click to switch' : 'Elena Rostova (Comms Lead) — Click to switch'}
          onClick={toggleRole}
          style={{ cursor: 'pointer' }}
        >
          <div className="user-avatar">
            {currentUserRole === 'reviewer' ? 'SJ' : 'ER'}
          </div>
          {!collapsed && (
            <div className="user-details">
              <span className="user-name">
                {currentUserRole === 'reviewer' ? 'Sarah Jenkins' : 'Elena Rostova'}
              </span>
              <span className="user-role">
                {currentUserRole === 'reviewer' ? 'Director (Reviewer)' : 'Comms Lead (Drafter)'}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
