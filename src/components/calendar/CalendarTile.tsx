import React, { useState } from 'react';
import { Occasion, getOccasionOverallStatus } from '../../types/occasion';
import { useOccasion } from '../../context/OccasionContext';
import { TileHoverPreview } from './TileHoverPreview';

interface CalendarTileProps {
  occasion: Occasion;
}

export const CalendarTile: React.FC<CalendarTileProps> = ({ occasion }) => {
  const { selectOccasion, selectedOccasionId } = useOccasion();
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const isSelected = selectedOccasionId === occasion.id;
  const overallStatus = getOccasionOverallStatus(occasion);

  const allLanguages = Array.from(
    new Set([
      ...(occasion.tracks.external?.languages || []),
      ...(occasion.tracks.internal?.languages || [])
    ])
  );

  const handleMouseEnter = (e: React.MouseEvent) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectOccasion(occasion.id);
  };

  return (
    <>
      <div
        className={`occasion-tile ${overallStatus} ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectOccasion(occasion.id);
          }
        }}
        aria-label={`${occasion.name}, status ${overallStatus.replace('_', ' ')}`}
      >
        <div className="tile-top-row">
          <span className="tile-name truncate">{occasion.name}</span>
          <span className={`audience-badge ${occasion.audience}`}>
            {occasion.audience === 'both' ? 'Int/Ext' : occasion.audience}
          </span>
        </div>

        <div className="tile-footer-row">
          <span className={`status-pill ${overallStatus}`} style={{ padding: '0 4px', fontSize: '10px' }}>
            <span className="status-dot" />
            {overallStatus.replace('_', ' ')}
          </span>
          <span className="tile-languages-badge">
            {allLanguages.join(' · ').toUpperCase()}
          </span>
        </div>
      </div>

      {hoverPosition && !isSelected && (
        <TileHoverPreview occasion={occasion} position={hoverPosition} />
      )}
    </>
  );
};
