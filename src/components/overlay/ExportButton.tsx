import React, { useState } from 'react';
import { Occasion, AudienceTrackType } from '../../types/occasion';
import { Download, FileText, Printer, Check, X } from 'lucide-react';

interface ExportButtonProps {
  occasion: Occasion;
  activeTrackType: AudienceTrackType;
  language: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ occasion, activeTrackType, language }) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exported, setExported] = useState(false);

  const track = occasion.tracks[activeTrackType];
  const draftContent = track?.drafts[language]?.content || '';

  const filename = `${occasion.name.replace(/\s+/g, '_')}_${activeTrackType.toUpperCase()}_${language.toUpperCase()}_Official`;

  const handleDownloadDoc = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${occasion.name}</title>
<style>
  body { font-family: 'Times New Roman', Georgia, serif; margin: 40px; color: #111; line-height: 1.6; }
  .letterhead { border-bottom: 2px solid #0f172a; padding-bottom: 15px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
  .logo { font-size: 20px; font-weight: bold; letter-spacing: 1px; color: #0f172a; }
  .meta { font-size: 12px; color: #555; text-align: right; }
  .track-tag { display: inline-block; padding: 3px 8px; background: #eee; font-size: 11px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; }
  .body-text { font-size: 15px; white-space: pre-wrap; margin-bottom: 40px; }
  .signoff { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 15px; font-size: 13px; color: #444; }
</style>
</head>
<body>
  <div class="letterhead">
    <div class="logo">GLOBAL INVESTMENT MANAGEMENT GROUP</div>
    <div class="meta">
      <strong>Corporate Communications & Institutional Affairs</strong><br>
      Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
    </div>
  </div>
  <div class="track-tag">${occasion.name} — ${activeTrackType.toUpperCase()} DRAFT (${language.toUpperCase()})</div>
  <div class="body-text">${draftContent}</div>
  <div class="signoff">
    <strong>Executive Council & Global Communications</strong><br>
    Confidential & Proprietary Institutional Correspondence
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExported(true);
    setTimeout(() => {
      setExported(false);
      setShowExportModal(false);
    }, 1500);
  };

  const handlePrintPreview = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${occasion.name} - Letterhead</title>
          <style>
            @page { margin: 20mm; }
            body { font-family: 'Newsreader', Georgia, serif; font-size: 15px; line-height: 1.7; color: #18181b; padding: 40px; }
            .header { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 28px; display: flex; justify-content: space-between; }
            .title { font-family: sans-serif; font-size: 18px; font-weight: 700; letter-spacing: 0.5px; }
            .date { font-family: sans-serif; font-size: 12px; color: #71717a; }
            .content { white-space: pre-wrap; min-height: 400px; }
            .footer { margin-top: 50px; border-top: 1px solid #e4e4e7; padding-top: 12px; font-family: sans-serif; font-size: 11px; color: #71717a; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">GLOBAL INVESTMENT MANAGEMENT GROUP</div>
            <div class="date">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
          <div class="content">${draftContent}</div>
          <div class="footer">Official Corporate Correspondence • Track: ${activeTrackType.toUpperCase()} (${language.toUpperCase()})</div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
    setShowExportModal(false);
  };

  return (
    <>
      <button
        className="icon-action-btn"
        onClick={() => setShowExportModal(true)}
        title="Export letter on corporate letterhead (Word/PDF)"
        aria-label="Export letter"
      >
        <Download size={16} />
      </button>

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div
            className="modal-card"
            style={{ maxWidth: '500px' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-modal-title"
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--brand-primary)' }} />
                <h3 id="export-modal-title" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  Export Letter on Letterhead
                </h3>
              </div>
              <button className="icon-action-btn" onClick={() => setShowExportModal(false)} aria-label="Close export modal">
                <X size={16} />
              </button>
            </div>

            <div className="modal-body" style={{ gap: '14px' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Exporting <strong>{occasion.name}</strong> as an official corporate document on standardized executive letterhead.
              </div>

              <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '10px', borderRadius: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <div><strong>Track:</strong> {activeTrackType.toUpperCase()} ({activeTrackType === 'external' ? 'Diplomatic & Partners' : 'Staff Internal'})</div>
                <div><strong>Language:</strong> {language.toUpperCase()}</div>
                <div><strong>Stage:</strong> {track?.status.replace('_', ' ')}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="export-choice-btn"
                  onClick={handleDownloadDoc}
                >
                  <div className="export-choice-icon">
                    {exported ? <Check size={18} style={{ color: 'var(--status-sent-bg)' }} /> : <Download size={18} />}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                      {exported ? 'Downloaded Document!' : 'Download Word Doc (.doc)'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      Letterhead-ready formatted document with executive header & styling
                    </div>
                  </div>
                </button>

                <button
                  className="export-choice-btn"
                  onClick={handlePrintPreview}
                >
                  <div className="export-choice-icon">
                    <Printer size={18} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                      Print / Save as PDF Letterhead
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      Opens browser print dialog with formal typography margins
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
