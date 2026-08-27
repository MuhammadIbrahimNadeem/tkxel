import React, { useEffect } from 'react';
import { useOccasion } from '../../context/OccasionContext';
import { OccasionHeader } from './OccasionHeader';
import { AudienceTrackToggle } from './AudienceTrackToggle';
import { DraftEditor } from './DraftEditor';
import { OccasionChat } from './chat/OccasionChat';

export const OccasionOverlay: React.FC = () => {
  const { selectedOccasion, selectOccasion } = useOccasion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectOccasion(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectOccasion]);

  if (!selectedOccasion) return null;

  return (
    <>
      <div
        className="overlay-backdrop"
        onClick={() => selectOccasion(null)}
        aria-hidden="true"
      />

      <aside
        className="overlay-panel animate-slide-in"
        role="dialog"
        aria-modal="true"
        aria-label={`Occasion details for ${selectedOccasion.name}`}
      >
        <OccasionHeader
          occasion={selectedOccasion}
          onClose={() => selectOccasion(null)}
        />

        <div className="overlay-scroll-body">
          {/* Dual-Audience Track Toggle */}
          <AudienceTrackToggle occasion={selectedOccasion} />

          {/* Main Expansive Draft Editor */}
          <DraftEditor occasion={selectedOccasion} />
        </div>

        {/* Fixed Minimal AI Chat at Bottom */}
        <div className="overlay-fixed-chat">
          <OccasionChat occasion={selectedOccasion} />
        </div>
      </aside>
    </>
  );
};
