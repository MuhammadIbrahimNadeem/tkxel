import React from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { Bell, Clock, FileCheck, CheckCircle2, AlertCircle, CheckCheck } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, selectOccasion, unreadCount } = useOccasion();

  const handleNotificationClick = (notifId: string, occasionId: string) => {
    markNotificationRead(notifId);
    selectOccasion(occasionId);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'review_requested':
        return <FileCheck size={16} />;
      case 'draft_ready':
        return <Clock size={16} />;
      case 'due_soon':
        return <AlertCircle size={16} />;
      case 'sent_confirmation':
        return <CheckCircle2 size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  return (
    <main className="notifications-container-full" aria-label="Notifications center">
      <div className="notifications-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 className="notifications-heading">Notifications</h2>
          {unreadCount > 0 && (
            <span className="unread-count-pill tabular-nums">
              {unreadCount} unread
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            className="mark-read-btn"
            onClick={markAllNotificationsRead}
            title="Mark all notifications as read"
          >
            <CheckCheck size={14} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      <div className="gmail-notifications-list" role="feed" aria-label="Notifications stream">
        {notifications.length === 0 ? (
          <div className="empty-notifications-state">
            <Bell size={24} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
            <span>All caught up! No active notifications.</span>
          </div>
        ) : (
          notifications.map(notif => (
            <div
              key={notif.id}
              className={`gmail-notif-row ${!notif.read ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notif.id, notif.occasionId)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNotificationClick(notif.id, notif.occasionId);
                }
              }}
              title="Click to view occasion draft"
            >
              {/* Left: Colorful Icon */}
              <div className={`gmail-notif-icon-circle ${notif.type}`}>
                {getIcon(notif.type)}
              </div>

              {/* Sender / Title */}
              <div className="gmail-notif-sender">
                {notif.title}
              </div>

              {/* Message Snippet */}
              <div className="gmail-notif-message-snippet truncate">
                {notif.message}
              </div>

              {/* Right: Timestamp & Unread Dot */}
              <div className="gmail-notif-right-meta">
                <span className="gmail-notif-time tabular-nums">
                  {formatTimestamp(notif.timestamp)}
                </span>
                {!notif.read && (
                  <span className="gmail-unread-dot" title="Unread" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};
