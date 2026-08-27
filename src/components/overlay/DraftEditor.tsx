import React, { useState, useEffect } from 'react';
import { Occasion } from '../../types/occasion';
import { useOccasion } from '../../context/OccasionContext';
import { History, Plus, FileText, UserPlus } from 'lucide-react';
import { VersionHistoryModal } from './VersionHistoryModal';
import { DraftProvenanceLine } from './DraftProvenanceLine';
import { AudienceSettingsModal } from './AudienceSettingsModal';

interface DraftEditorProps {
  occasion: Occasion;
}

export const DraftEditor: React.FC<DraftEditorProps> = ({ occasion }) => {
  const { activeTrackType, activeLanguage, setActiveLanguage, updateDraft, addLanguageVersion } = useOccasion();
  const [showHistory, setShowHistory] = useState(false);
  const [showAddLangMenu, setShowAddLangMenu] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);

  const currentTrack = occasion.tracks[activeTrackType] || {
    trackType: activeTrackType,
    status: 'not_started',
    languages: ['en'],
    reviewerId: 'sarah-jenkins',
    reviewerName: 'Sarah Jenkins',
    reviewHistory: [],
    drafts: {}
  };

  const currentDraftObj = currentTrack.drafts[activeLanguage] || {
    content: '',
    lastEditedAt: '',
    lastEditedBy: '',
    history: []
  };

  const [localText, setLocalText] = useState(currentDraftObj.content);

  useEffect(() => {
    setLocalText(currentDraftObj.content);
  }, [activeTrackType, activeLanguage, currentDraftObj.content]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalText(val);
    updateDraft(occasion.id, activeTrackType, activeLanguage, val, 'Elena Rostova (Direct Edit)');
  };

  const wordCount = localText.trim() ? localText.trim().split(/\s+/).length : 0;
  const charCount = localText.length;
  const isRtl = activeLanguage === 'ar';

  const formatTimeAgo = (isoString?: string) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Recently';
    }
  };

  const availableLanguagesToAdd = ['ar', 'fr', 'zh', 'ja', 'de', 'es', 'ko', 'uz', 'pt'].filter(
    l => !currentTrack.languages.includes(l)
  );

  const recipientCount = occasion.recipients?.length || 3;

  return (
    <div className="draft-editor-section">
      {/* Draft Provenance Line */}
      <DraftProvenanceLine
        draft={currentDraftObj}
        occasionName={occasion.name}
        language={activeLanguage}
      />

      <div className="draft-header-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="language-tabs" role="tablist" aria-label="Draft languages">
            {currentTrack.languages.map(lang => (
              <button
                key={lang}
                className={`lang-tab ${activeLanguage === lang ? 'active' : ''}`}
                onClick={() => setActiveLanguage(lang)}
                role="tab"
                aria-selected={activeLanguage === lang}
                aria-label={`Language ${lang.toUpperCase()}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {activeTrackType === 'external' && (
            <div style={{ position: 'relative' }}>
              <button
                className="icon-action-btn small"
                onClick={() => setShowAddLangMenu(!showAddLangMenu)}
                title="Add localized draft tab"
                aria-label="Add language version"
              >
                <Plus size={13} />
              </button>

              {showAddLangMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-panel)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    zIndex: 20,
                    minWidth: '140px'
                  }}
                >
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', padding: '2px 6px', fontWeight: 600 }}>
                    Translate to:
                  </div>
                  {availableLanguagesToAdd.slice(0, 5).map(lang => (
                    <button
                      key={lang}
                      style={{
                        textAlign: 'left',
                        padding: '5px 8px',
                        fontSize: '11px',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-subtle)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      onClick={() => {
                        addLanguageVersion(
                          occasion.id,
                          activeTrackType,
                          lang,
                          `[${lang.toUpperCase()} localized draft]\n\nDear Partners,\n\nGreetings on the occasion of ${occasion.name}.`
                        );
                        setShowAddLangMenu(false);
                      }}
                    >
                      {getLanguageName(lang)} ({lang.toUpperCase()})
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="draft-actions" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {/* Add Recipient Icon Button with Plus Sign */}
          <button
            className="icon-action-btn small audience-btn"
            onClick={() => setShowAudienceModal(true)}
            title={`Manage audience recipients (${recipientCount} active)`}
            aria-label="Add and manage recipients"
          >
            <UserPlus size={14} />
            <span className="audience-count-insert">{recipientCount}</span>
          </button>

          <button
            className="icon-action-btn small"
            onClick={() => setShowHistory(true)}
            title={`View revision history (${currentDraftObj.history?.length || 0})`}
            aria-label="Revision history"
          >
            <History size={14} />
          </button>
        </div>
      </div>

      <div className={`draft-paper-card ${isRtl ? 'rtl-text' : ''}`}>
        <textarea
          className="draft-textarea"
          value={localText}
          onChange={handleTextChange}
          placeholder="Draft content appears here. Edit directly or prompt the AI agent below..."
          aria-label="Editable draft text"
        />

        <div className="draft-metadata-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={12} style={{ color: 'var(--text-muted)' }} />
            <span>
              Last edited <strong className="tabular-nums">{formatTimeAgo(currentDraftObj.lastEditedAt)}</strong>
              {currentDraftObj.lastEditedBy && ` by ${currentDraftObj.lastEditedBy}`}
            </span>
          </div>

          <div className="tabular-nums" style={{ display: 'flex', gap: '6px' }}>
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} chars</span>
          </div>
        </div>
      </div>

      {showHistory && (
        <VersionHistoryModal
          history={currentDraftObj.history || []}
          onClose={() => setShowHistory(false)}
          onRestore={restoredContent => {
            updateDraft(occasion.id, activeTrackType, activeLanguage, restoredContent, 'Elena Rostova (Revert)');
          }}
        />
      )}

      {showAudienceModal && (
        <AudienceSettingsModal
          occasion={occasion}
          activeTrackType={activeTrackType}
          onClose={() => setShowAudienceModal(false)}
        />
      )}
    </div>
  );
};

function getLanguageName(code: string): string {
  switch (code) {
    case 'ar': return 'Arabic';
    case 'fr': return 'French';
    case 'zh': return 'Mandarin';
    case 'ja': return 'Japanese';
    case 'de': return 'German';
    case 'es': return 'Spanish';
    case 'ko': return 'Korean';
    case 'uz': return 'Uzbek';
    case 'pt': return 'Portuguese';
    default: return code.toUpperCase();
  }
}
