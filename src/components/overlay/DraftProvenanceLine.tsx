import React, { useState } from 'react';
import { Draft } from '../../types/occasion';
import { GitCompare, FileClock, X } from 'lucide-react';

interface DraftProvenanceLineProps {
  draft: Draft;
  occasionName: string;
  language: string;
}

export const DraftProvenanceLine: React.FC<DraftProvenanceLineProps> = ({ draft, occasionName, language }) => {
  const [showDiff, setShowDiff] = useState(false);

  const hasPriorVersion = Boolean(draft.basedOnLabel && draft.basedOnContent);

  return (
    <>
      <div className="draft-provenance-bar">
        <div className="provenance-left">
          <FileClock size={13} style={{ color: 'var(--text-tertiary)' }} />
          {hasPriorVersion ? (
            <button
              className="provenance-btn"
              onClick={() => setShowDiff(true)}
              title="Click to view line-by-line changes from prior version"
            >
              <span>Based on: <strong>{draft.basedOnLabel}</strong></span>
              <span className="diff-chip">
                <GitCompare size={11} />
                <span>Compare diff</span>
              </span>
            </button>
          ) : (
            <span className="provenance-empty">No prior version on file (initial year draft)</span>
          )}
        </div>
      </div>

      {showDiff && hasPriorVersion && (
        <DraftDiffView
          currentContent={draft.content}
          priorContent={draft.basedOnContent || ''}
          priorLabel={draft.basedOnLabel || 'Prior Year Version'}
          occasionName={occasionName}
          language={language}
          onClose={() => setShowDiff(false)}
        />
      )}
    </>
  );
};

interface DraftDiffViewProps {
  currentContent: string;
  priorContent: string;
  priorLabel: string;
  occasionName: string;
  language: string;
  onClose: () => void;
}

export const DraftDiffView: React.FC<DraftDiffViewProps> = ({
  currentContent,
  priorContent,
  priorLabel,
  occasionName,
  language,
  onClose
}) => {
  // Simple word/token diff engine for visual redlining
  const diffWords = (oldStr: string, newStr: string) => {
    const oldWords = oldStr.split(/(\s+)/);
    const newWords = newStr.split(/(\s+)/);

    // If strings are identical
    if (oldStr === newStr) {
      return [{ type: 'same', text: newStr }];
    }

    const result: Array<{ type: 'same' | 'added' | 'removed'; text: string }> = [];
    let i = 0;
    let j = 0;

    while (i < oldWords.length || j < newWords.length) {
      if (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) {
        result.push({ type: 'same', text: oldWords[i] });
        i++;
        j++;
      } else if (j < newWords.length && !oldWords.includes(newWords[j])) {
        result.push({ type: 'added', text: newWords[j] });
        j++;
      } else if (i < oldWords.length && !newWords.includes(oldWords[i])) {
        result.push({ type: 'removed', text: oldWords[i] });
        i++;
      } else {
        if (i < oldWords.length) {
          result.push({ type: 'removed', text: oldWords[i] });
          i++;
        }
        if (j < newWords.length) {
          result.push({ type: 'added', text: newWords[j] });
          j++;
        }
      }
    }
    return result;
  };

  const diffTokens = diffWords(priorContent, currentContent);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="diff-title">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitCompare size={18} style={{ color: 'var(--brand-accent)' }} />
            <div>
              <h3 id="diff-title" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                Draft Provenance & Comparison Diff
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                {occasionName} ({language.toUpperCase()}) — Comparing against <em>{priorLabel}</em>
              </p>
            </div>
          </div>
          <button className="overlay-close-btn" onClick={onClose} aria-label="Close diff modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '16px' }}>
          <div className="diff-legend-bar">
            <div className="diff-legend-item">
              <span className="diff-swatch added" />
              <span>Added in 2026</span>
            </div>
            <div className="diff-legend-item">
              <span className="diff-swatch removed" />
              <span>Removed from {priorLabel}</span>
            </div>
          </div>

          <div className="diff-redline-box">
            {diffTokens.map((token, idx) => {
              if (token.type === 'added') {
                return (
                  <span key={idx} className="diff-added">
                    {token.text}
                  </span>
                );
              }
              if (token.type === 'removed') {
                return (
                  <span key={idx} className="diff-removed">
                    {token.text}
                  </span>
                );
              }
              return <span key={idx}>{token.text}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
