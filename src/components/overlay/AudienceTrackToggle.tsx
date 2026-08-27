import React from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { Occasion, OccasionStatus } from '../../types/occasion';
import { Globe, Users } from 'lucide-react';

interface AudienceTrackToggleProps {
  occasion?: Occasion;
}

export const AudienceTrackToggle: React.FC<AudienceTrackToggleProps> = ({ occasion }) => {
  const { selectedOccasion, activeTrackType, setActiveTrackType } = useOccasion();

  const currentOccasion = occasion || selectedOccasion;

  if (!currentOccasion || currentOccasion.audience !== 'both') {
    return null;
  }

  const externalStatus = currentOccasion.tracks.external?.status || 'not_started';
  const internalStatus = currentOccasion.tracks.internal?.status || 'not_started';

  const getStatusLabel = (status: OccasionStatus) => {
    switch (status) {
      case 'not_started': return 'Not started';
      case 'drafting': return 'Drafting';
      case 'in_review': return 'In review';
      case 'sent': return 'Sent';
    }
  };

  return (
    <div className="audience-track-container" role="tablist" aria-label="Audience Tracks">
      <button
        role="tab"
        aria-selected={activeTrackType === 'external'}
        className={`track-tab ${activeTrackType === 'external' ? 'active' : ''}`}
        onClick={() => setActiveTrackType('external')}
      >
        <div className="track-tab-content">
          <Globe size={14} />
          <span>External Partners</span>
          <span className={`status-pill ${externalStatus}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
            {getStatusLabel(externalStatus)}
          </span>
        </div>
      </button>

      <button
        role="tab"
        aria-selected={activeTrackType === 'internal'}
        className={`track-tab ${activeTrackType === 'internal' ? 'active' : ''}`}
        onClick={() => setActiveTrackType('internal')}
      >
        <div className="track-tab-content">
          <Users size={14} />
          <span>Internal Staff</span>
          <span className={`status-pill ${internalStatus}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
            {getStatusLabel(internalStatus)}
          </span>
        </div>
      </button>
    </div>
  );
};
