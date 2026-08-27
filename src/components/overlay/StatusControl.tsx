import React, { useState } from 'react';
import { OccasionStatus, AudienceTrackType } from '../../types/occasion';
import { useOccasion } from '../../context/OccasionContext';
import { CheckCircle2, RotateCcw, Lock, UserCheck, Send, MessageSquare } from 'lucide-react';

interface StatusControlProps {
  occasionId: string;
  trackType: AudienceTrackType;
  currentStatus: OccasionStatus;
  reviewerName: string;
}

const STATUS_STEPS: Array<{ key: OccasionStatus; label: string }> = [
  { key: 'not_started', label: 'Not started' },
  { key: 'drafting', label: 'Drafting' },
  { key: 'in_review', label: 'In review' },
  { key: 'sent', label: 'Sent' }
];

export const StatusControl: React.FC<StatusControlProps> = ({
  occasionId,
  trackType,
  currentStatus,
  reviewerName
}) => {
  const { updateStatus, performReviewAction, currentUserRole } = useOccasion();
  const [showSendBackModal, setShowSendBackModal] = useState(false);
  const [reviewComment, setReviewComment] = useState('');

  const isReviewer = currentUserRole === 'reviewer';

  const handleStepClick = (stepKey: OccasionStatus) => {
    if (!isReviewer && stepKey === 'sent') {
      return;
    }
    updateStatus(occasionId, trackType, stepKey);
  };

  const handleApprove = () => {
    performReviewAction(occasionId, trackType, 'approved', 'Approved for immediate dispatch.');
  };

  const handleSendBack = (e: React.FormEvent) => {
    e.preventDefault();
    performReviewAction(occasionId, trackType, 'sent_back', reviewComment.trim() || 'Please adjust the tone and salutations before resubmitting.');
    setShowSendBackModal(false);
    setReviewComment('');
  };

  // Clean reviewer short name (e.g. Sarah Jenkins)
  const shortReviewerName = reviewerName.replace(/\s*\(.*?\)\s*/g, '');

  return (
    <div className="status-control-container">
      <div className="status-control-label-row">
        <div className="status-label-group">
          <span className="status-label-title">Workflow Stage</span>
          <span className="status-track-badge">
            {trackType === 'external' ? 'External Track' : 'Internal Track'}
          </span>
        </div>

        <div className="status-reviewer-badge" title={`Assigned Reviewer: ${reviewerName}`}>
          <UserCheck size={12} />
          <span>Reviewer: <strong>{shortReviewerName}</strong></span>
        </div>
      </div>

      <div className="status-stepper" role="group" aria-label="Workflow status steps">
        {STATUS_STEPS.map(step => {
          const isActive = currentStatus === step.key;
          const isSentGated = !isReviewer && step.key === 'sent' && currentStatus !== 'sent';

          return (
            <button
              key={step.key}
              className={`stepper-btn ${isActive ? `active ${step.key}` : ''} ${isSentGated ? 'disabled' : ''}`}
              onClick={() => handleStepClick(step.key)}
              title={isSentGated ? 'Gated: Sent requires assigned reviewer sign-off' : `Set status to ${step.label}`}
              disabled={isSentGated}
              aria-pressed={isActive}
            >
              <span className="stepper-label-text">
                {isSentGated && <Lock size={10} style={{ marginRight: '3px' }} />}
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reviewer Action Bar when in Reviewer Mode */}
      {isReviewer && (
        <div className="reviewer-action-bar">
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--brand-accent)' }}>
            Reviewer Decision:
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="reviewer-btn approve"
              onClick={handleApprove}
              title="Approve draft and mark as Sent"
            >
              <CheckCircle2 size={13} />
              <span>Approve & Dispatch</span>
            </button>
            <button
              className="reviewer-btn reject"
              onClick={() => setShowSendBackModal(true)}
              title="Send draft back with comments"
            >
              <RotateCcw size={13} />
              <span>Send Back</span>
            </button>
          </div>
        </div>
      )}

      {/* Send Back Modal */}
      {showSendBackModal && (
        <div className="modal-overlay" onClick={() => setShowSendBackModal(false)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} style={{ color: '#dc2626' }} />
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Send Back with Reviewer Comments</h3>
              </div>
            </div>
            <form onSubmit={handleSendBack} className="modal-body" style={{ gap: '12px' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                This will move the <strong>{trackType}</strong> draft back to <em>Drafting</em> and post your feedback directly into the team chat.
              </p>
              <textarea
                className="draft-textarea"
                style={{
                  minHeight: '100px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '10px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px'
                }}
                placeholder="Specify what needs revision..."
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                autoFocus
                required
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  className="connector-action-btn"
                  onClick={() => setShowSendBackModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="reviewer-btn reject"
                  style={{ padding: '6px 12px' }}
                >
                  <Send size={13} />
                  <span>Send Feedback to Chat</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
