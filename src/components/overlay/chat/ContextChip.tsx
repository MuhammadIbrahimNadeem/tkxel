import React from 'react';
import { Occasion } from '../../../types/occasion';
import { useOccasion } from '../../../context/OccasionContext';
import { Sparkles } from 'lucide-react';

interface ContextChipProps {
  occasion: Occasion;
}

export const ContextChip: React.FC<ContextChipProps> = ({ occasion }) => {
  const { activeTrackType } = useOccasion();

  const formatDateDisplay = (start: string) => {
    const s = new Date(start + 'T00:00:00');
    return s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const trackLabel = activeTrackType === 'external' ? 'External (Formal Protocol)' : 'Internal (Staff Note)';

  return (
    <div className="context-chip" title="Agent memory is scoped to this specific occasion and track">
      <Sparkles size={13} className="context-chip-icon" style={{ color: 'var(--brand-accent)' }} />
      <span>
        Talking about: <strong>{occasion.name}</strong> — <span className="tabular-nums">{formatDateDisplay(occasion.startDate)}</span> • <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{trackLabel}</span>
      </span>
    </div>
  );
};
