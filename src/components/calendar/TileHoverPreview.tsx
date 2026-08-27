import React from 'react';
import { Occasion, getOccasionOverallStatus } from '../../types/occasion';

interface TileHoverPreviewProps {
  occasion: Occasion;
  position: { x: number; y: number };
}

export const TileHoverPreview: React.FC<TileHoverPreviewProps> = ({ occasion, position }) => {
  const formatDateDisplay = (start: string, end?: string) => {
    const s = new Date(start + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    if (!end || start === end) {
      return s.toLocaleDateString('en-US', options);
    }
    const e = new Date(end + 'T00:00:00');
    return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', options)}`;
  };

  const overallStatus = getOccasionOverallStatus(occasion);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'not_started': return 'Not started';
      case 'drafting': return 'Drafting';
      case 'in_review': return 'In review';
      case 'sent': return 'Sent';
      default: return status;
    }
  };

  const allLanguages = Array.from(
    new Set([
      ...(occasion.tracks.external?.languages || []),
      ...(occasion.tracks.internal?.languages || [])
    ])
  );

  return (
    <div
      className="tile-hover-popover"
      style={{
        left: `${Math.min(position.x + 12, window.innerWidth - 280)}px`,
        top: `${Math.min(position.y + 12, window.innerHeight - 200)}px`
      }}
    >
      <div className="popover-header">
        <span className={`status-pill ${overallStatus}`}>
          {getStatusLabel(overallStatus)}
        </span>
        <span className={`audience-badge ${occasion.audience}`}>
          {occasion.audience === 'both' ? 'Internal & External' : occasion.audience}
        </span>
      </div>

      <div className="popover-title">{occasion.name}</div>
      <div className="popover-date tabular-nums">{formatDateDisplay(occasion.startDate, occasion.endDate)}</div>

      {occasion.audience === 'both' && (
        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
          <div>External: <strong style={{ textTransform: 'capitalize' }}>{occasion.tracks.external?.status.replace('_', ' ')}</strong></div>
          <div>Internal: <strong style={{ textTransform: 'capitalize' }}>{occasion.tracks.internal?.status.replace('_', ' ')}</strong></div>
        </div>
      )}

      <div className="popover-tags">
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Languages:</span>
        {allLanguages.map(l => (
          <span
            key={l}
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              backgroundColor: 'var(--bg-subtle)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 600
            }}
          >
            {l}
          </span>
        ))}
      </div>

      {occasion.toneDescription && (
        <div className="popover-tone">
          <strong>Tone:</strong> {occasion.toneDescription}
        </div>
      )}
    </div>
  );
};
