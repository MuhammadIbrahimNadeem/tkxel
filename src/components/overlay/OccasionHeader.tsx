import React, { useState, useRef, useEffect } from 'react';
import { Occasion, OccasionStatus } from '../../types/occasion';
import { useOccasion } from '../../context/OccasionContext';
import {
  X,
  Globe,
  Calendar as CalendarIcon,
  Check,
  Copy,
  ChevronDown,
  Lock,
  UserCheck,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { ExportButton } from './ExportButton';

interface OccasionHeaderProps {
  occasion: Occasion;
  onClose: () => void;
}

const STATUS_OPTIONS: Array<{ key: OccasionStatus; label: string }> = [
  { key: 'not_started', label: 'Not started' },
  { key: 'drafting', label: 'Drafting' },
  { key: 'in_review', label: 'In review' },
  { key: 'sent', label: 'Sent' }
];

export const OccasionHeader: React.FC<OccasionHeaderProps> = ({ occasion, onClose }) => {
  const {
    activeLanguage,
    activeTrackType,
    updateStatus,
    currentUserRole,
    performReviewAction
  } = useOccasion();

  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isReviewer = currentUserRole === 'reviewer';
  const currentTrack = occasion.tracks[activeTrackType] || occasion.tracks.external || occasion.tracks.internal;
  const currentStatus = currentTrack?.status || 'not_started';
  const reviewerName = currentTrack?.reviewerName || 'Sarah Jenkins (Director)';
  const shortReviewer = reviewerName.replace(/\s*\(.*?\)\s*/g, '');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateDisplay = (start: string, end?: string) => {
    const s = new Date(start + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    if (!end || start === end) {
      return s.toLocaleDateString('en-US', options);
    }
    const e = new Date(end + 'T00:00:00');
    return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', options)}`;
  };

  const handleCopyLetter = () => {
    const currentDraft = currentTrack?.drafts[activeLanguage]?.content || '';
    if (currentDraft) {
      navigator.clipboard.writeText(currentDraft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelectStatus = (status: OccasionStatus) => {
    if (!isReviewer && status === 'sent') return;
    updateStatus(occasion.id, activeTrackType, status);
    setDropdownOpen(false);
  };

  const formatStatus = (s: OccasionStatus) => {
    switch (s) {
      case 'not_started': return 'Not started';
      case 'drafting': return 'Drafting';
      case 'in_review': return 'In review';
      case 'sent': return 'Sent';
    }
  };

  return (
    <div className="overlay-header">
      <div className="overlay-header-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <h2 className="overlay-title">{occasion.name}</h2>
          <span className={`audience-badge ${occasion.audience}`}>
            {occasion.audience === 'both' ? 'Int / Ext' : occasion.audience}
          </span>

          {/* Compact Header Status Dropdown */}
          <div className="status-dropdown-wrapper" ref={dropdownRef}>
            <button
              className={`status-dropdown-trigger ${currentStatus}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Change workflow status"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className={`status-dot-indicator ${currentStatus}`} />
              <span>{formatStatus(currentStatus)}</span>
              <ChevronDown size={12} className={dropdownOpen ? 'rotate-180' : ''} />
            </button>

            {dropdownOpen && (
              <div className="status-dropdown-menu" role="listbox">
                <div className="status-dropdown-header">
                  <span>Workflow Stage</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{activeTrackType.toUpperCase()}</span>
                </div>
                {STATUS_OPTIONS.map(opt => {
                  const isSelected = currentStatus === opt.key;
                  const isLocked = !isReviewer && opt.key === 'sent' && currentStatus !== 'sent';
                  return (
                    <button
                      key={opt.key}
                      className={`status-dropdown-item ${isSelected ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                      onClick={() => handleSelectStatus(opt.key)}
                      disabled={isLocked}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className={`status-dot-indicator ${opt.key}`} />
                      <span style={{ flex: 1, textAlign: 'left' }}>{opt.label}</span>
                      {isSelected && <Check size={12} style={{ color: 'var(--brand-accent)' }} />}
                      {isLocked && <Lock size={11} style={{ color: 'var(--text-muted)' }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="overlay-meta">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CalendarIcon size={12} style={{ color: 'var(--text-muted)' }} />
            <span className="tabular-nums">{formatDateDisplay(occasion.startDate, occasion.endDate)}</span>
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={12} style={{ color: 'var(--text-muted)' }} />
            <span>{occasion.country || occasion.region || 'Global'}</span>
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <UserCheck size={12} style={{ color: 'var(--text-muted)' }} />
            <span>Reviewer: {shortReviewer}</span>
          </span>
        </div>
      </div>

      <div className="overlay-header-actions">
        {isReviewer && currentStatus === 'in_review' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <button
              className="reviewer-header-btn approve"
              onClick={() => performReviewAction(occasion.id, activeTrackType, 'approved')}
              title="Approve & Dispatch letter"
            >
              <CheckCircle2 size={13} />
              <span>Approve</span>
            </button>
            <button
              className="reviewer-header-btn reject"
              onClick={() => performReviewAction(occasion.id, activeTrackType, 'sent_back', 'Please adjust phrasing.')}
              title="Send back for revisions"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        )}

        <button
          className="icon-action-btn"
          onClick={handleCopyLetter}
          title={copied ? 'Draft copied to clipboard' : 'Copy draft to clipboard'}
          aria-label="Copy draft"
        >
          {copied ? <Check size={15} style={{ color: 'var(--status-sent-bg)' }} /> : <Copy size={15} />}
        </button>

        <ExportButton
          occasion={occasion}
          activeTrackType={activeTrackType}
          language={activeLanguage}
        />

        <button
          className="icon-action-btn close"
          onClick={onClose}
          title="Close panel (Esc)"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
