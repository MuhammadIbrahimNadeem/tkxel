import React from 'react';
import { DraftVersion } from '../../types/occasion';
import { X, History, RotateCcw } from 'lucide-react';

interface VersionHistoryModalProps {
  history: DraftVersion[];
  onClose: () => void;
  onRestore: (content: string) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ history, onClose, onRestore }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-history-title">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} style={{ color: 'var(--text-tertiary)' }} />
            <h3 id="modal-history-title" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Draft Revision History</h3>
          </div>
          <button className="overlay-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
              No previous revisions saved for this language yet. Edits made during this session will be recorded here.
            </div>
          ) : (
            history.map((ver, i) => (
              <div key={ver.id || i} className="version-item">
                <div className="version-meta">
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>{ver.author || 'Elena Rostova'}</strong>
                    <span style={{ marginLeft: '8px', color: 'var(--text-muted)' }}>
                      {new Date(ver.savedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <button
                    className="draft-action-btn"
                    onClick={() => {
                      onRestore(ver.content);
                      onClose();
                    }}
                    title="Restore this version"
                  >
                    <RotateCcw size={12} />
                    <span>Revert</span>
                  </button>
                </div>

                {ver.note && (
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    Note: {ver.note}
                  </div>
                )}

                <div className="version-text-preview">{ver.content}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
