import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Trash2,
  Link,
  ShieldCheck,
  Globe,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import {
  GoogleCalendarIcon,
  GoogleSheetsIcon,
  ContextDocsIcon,
  AudienceRosterIcon
} from './BrandIcons';

interface InstitutionalFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  tags: string[];
}

type ConnectorDetailId = 'files' | 'gcal' | 'sheets' | 'rosters' | null;

export const ConnectorsView: React.FC = () => {
  const [activeDetail, setActiveDetail] = useState<ConnectorDetailId>(null);

  // State for GCal
  const [gcalConnected] = useState(true);
  const [gcalSyncing, setGcalSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');

  // State for Sheets
  const [spreadsheetUrl, setSpreadsheetUrl] = useState('https://docs.google.com/spreadsheets/d/1X9a...observances_2026');
  const [sheetSyncing, setSheetSyncing] = useState(false);
  const [sheetStatus, setSheetStatus] = useState<'connected' | 'idle'>('connected');

  // State for Context Files
  const [files, setFiles] = useState<InstitutionalFile[]>([
    {
      id: 'f-1',
      name: 'Executive_Diplomatic_Protocol_Handbook_2026.pdf',
      size: '2.4 MB',
      type: 'Protocol Guideline',
      uploadedAt: 'Aug 14, 2026',
      tags: ['Protocol', 'Honorifics', 'Diplomatic']
    },
    {
      id: 'f-2',
      name: 'Approved_Occasion_Letters_Archive_2024_2025.docx',
      size: '1.8 MB',
      type: 'Archive History',
      uploadedAt: 'Aug 18, 2026',
      tags: ['Historical', 'Provenance', 'Past Letters']
    },
    {
      id: 'f-3',
      name: 'Corporate_Tone_Voice_Standards_v3.pdf',
      size: '840 KB',
      type: 'Branding Guidelines',
      uploadedAt: 'Aug 22, 2026',
      tags: ['Tone', 'Voice', 'Internal/External']
    }
  ]);

  // State for Rosters
  const [distributionGroups] = useState([
    { id: 'g-1', name: 'Global Diplomatic Missions & Embassies', track: 'external', membersCount: 142, email: 'diplomatic-roster@globalinvest.com' },
    { id: 'g-2', name: 'Executive Leadership & C-Suite', track: 'internal', membersCount: 18, email: 'exec-council@globalinvest.com' },
    { id: 'g-3', name: 'All Global Staff (Internal Announcements)', track: 'internal', membersCount: 3850, email: 'all-staff@globalinvest.com' },
    { id: 'g-4', name: 'APAC Regional Partners & Ministers', track: 'external', membersCount: 64, email: 'apac-partners@globalinvest.com' }
  ]);

  const handleSyncGCal = () => {
    setGcalSyncing(true);
    setTimeout(() => {
      setGcalSyncing(false);
      setLastSynced('Just now');
    }, 1000);
  };

  const handleSyncSheet = (e: React.FormEvent) => {
    e.preventDefault();
    setSheetSyncing(true);
    setTimeout(() => {
      setSheetSyncing(false);
      setSheetStatus('connected');
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      const newFile: InstitutionalFile = {
        id: `f-${Date.now()}`,
        name: uploaded.name,
        size: `${(uploaded.size / (1024 * 1024)).toFixed(1)} MB`,
        type: 'Context Document',
        uploadedAt: 'Just now',
        tags: ['Context', 'Custom']
      };
      setFiles([newFile, ...files]);
    }
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  // --- Render Individual Dedicated Detail Pages ---
  if (activeDetail === 'files') {
    return (
      <div className="connectors-detail-page">
        <div className="connectors-detail-header">
          <button className="back-link-btn" onClick={() => setActiveDetail(null)}>
            <ArrowLeft size={16} />
            <span>Back to Connectors Hub</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            <ContextDocsIcon size={32} />
            <h1 className="connectors-detail-title">Context & Institutional Policy Files</h1>
          </div>
          <p className="connectors-detail-desc">
            Upload institutional guidelines, past approved letters, and protocol policies to ground the AI drafting engine.
          </p>
        </div>

        <div className="detail-page-content">
          <label className="upload-dropzone large">
            <UploadCloud size={32} style={{ color: 'var(--brand-accent)' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Click to upload context files or drag and drop
            </span>
            <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
              PDF, DOCX, TXT (Honorific handbooks, past letters archive, brand tone guidelines)
            </span>
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <div className="file-list-container">
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              Active Knowledge Documents ({files.length})
            </div>

            {files.map(f => (
              <div key={f.id} className="file-item-row">
                <FileText size={18} style={{ color: 'var(--text-secondary)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="file-name truncate">{f.name}</div>
                  <div className="file-meta">
                    <span>{f.size}</span>
                    <span>•</span>
                    <span>{f.uploadedAt}</span>
                    <span>•</span>
                    <span className="file-tag">{f.type}</span>
                  </div>
                </div>
                <button
                  className="icon-action-btn small"
                  onClick={() => handleDeleteFile(f.id)}
                  title="Remove document"
                  aria-label="Remove document"
                >
                  <Trash2 size={13} style={{ color: '#dc2626' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeDetail === 'gcal') {
    return (
      <div className="connectors-detail-page">
        <div className="connectors-detail-header">
          <button className="back-link-btn" onClick={() => setActiveDetail(null)}>
            <ArrowLeft size={16} />
            <span>Back to Connectors Hub</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GoogleCalendarIcon size={32} />
              <h1 className="connectors-detail-title">Google Calendar Workspace Sync</h1>
            </div>
            <span className={`status-pill ${gcalConnected ? 'sent' : 'not_started'}`}>
              {gcalConnected ? 'Connected & Active' : 'Disconnected'}
            </span>
          </div>
          <p className="connectors-detail-desc">
            Automatically ingest national observances, state visits, and executive holidays directly from your enterprise Google Calendar.
          </p>
        </div>

        <div className="detail-page-content">
          <div className="connector-info-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Connected Account:</span>
              <span style={{ fontSize: '12.5px', color: 'var(--brand-accent)', fontFamily: 'var(--font-mono)' }}>
                corp.comms@globalinvest.com
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
              Syncing 3 primary calendar feeds: <em>Diplomatic Observances</em>, <em>Executive Travel</em>, and <em>Corporate Anniversaries</em>.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-default)' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              Last synchronized: <strong className="tabular-nums">{lastSynced}</strong>
            </span>
            <button
              className="connector-action-btn primary"
              onClick={handleSyncGCal}
              disabled={gcalSyncing}
            >
              <RefreshCw size={13} className={gcalSyncing ? 'animate-spin' : ''} />
              <span>{gcalSyncing ? 'Synchronizing Feeds...' : 'Sync Calendar Now'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeDetail === 'sheets') {
    return (
      <div className="connectors-detail-page">
        <div className="connectors-detail-header">
          <button className="back-link-btn" onClick={() => setActiveDetail(null)}>
            <ArrowLeft size={16} />
            <span>Back to Connectors Hub</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GoogleSheetsIcon size={32} />
              <h1 className="connectors-detail-title">Google Sheets & Observance Importer</h1>
            </div>
            <span className={`status-pill ${sheetStatus === 'connected' ? 'sent' : 'not_started'}`}>
              {sheetStatus === 'connected' ? 'Synced & Live' : 'Not Linked'}
            </span>
          </div>
          <p className="connectors-detail-desc">
            Sync Google Sheets or Excel spreadsheets containing annual occasion calendars, country mappings, and assigned reviewers.
          </p>
        </div>

        <div className="detail-page-content">
          <form onSubmit={handleSyncSheet} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Google Sheet Live Link
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="url"
                className="connector-input"
                value={spreadsheetUrl}
                onChange={e => setSpreadsheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                required
              />
              <button
                type="submit"
                className="connector-action-btn primary"
                disabled={sheetSyncing}
              >
                <Link size={13} />
                <span>{sheetSyncing ? 'Linking...' : 'Update Connection'}</span>
              </button>
            </div>
          </form>

          <div className="connector-info-box">
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Auto-Detected Column Mappings
            </div>
            <div className="connector-tag-preview">
              <span className="file-tag">Occasion_Name</span>
              <span className="file-tag">Start_Date</span>
              <span className="file-tag">Audience_Track</span>
              <span className="file-tag">Primary_Languages</span>
              <span className="file-tag">Assigned_Reviewer</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeDetail === 'rosters') {
    return (
      <div className="connectors-detail-page">
        <div className="connectors-detail-header">
          <button className="back-link-btn" onClick={() => setActiveDetail(null)}>
            <ArrowLeft size={16} />
            <span>Back to Connectors Hub</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            <AudienceRosterIcon size={32} />
            <h1 className="connectors-detail-title">Audience & Distribution Rosters</h1>
          </div>
          <p className="connectors-detail-desc">
            Manage verified audience rosters and institutional email lists to ensure dispatches reach the correct diplomatic or internal groups.
          </p>
        </div>

        <div className="detail-page-content">
          <div className="file-list-container">
            {distributionGroups.map(g => (
              <div key={g.id} className="file-item-row" style={{ padding: '12px 14px' }}>
                <Globe size={18} style={{ color: g.track === 'external' ? '#0284c7' : '#64748b' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="file-name" style={{ fontSize: '13px' }}>{g.name}</div>
                  <div className="file-meta" style={{ marginTop: '4px' }}>
                    <span className="tabular-nums">{g.membersCount} recipients</span>
                    <span>•</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{g.email}</span>
                    <span>•</span>
                    <span className={`audience-badge ${g.track}`} style={{ fontSize: '9.5px' }}>
                      {g.track}
                    </span>
                  </div>
                </div>
                <div title="Verified delivery route">
                  <ShieldCheck size={16} style={{ color: '#10b981' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Connectors Hub (Spacious Big Cards with Brand Icons) ---
  return (
    <div className="connectors-view">
      <div className="connectors-header">
        <h1 className="connectors-title">Workspace Connectors</h1>
        <p className="connectors-subtitle">
          Manage integrations, policy knowledge files, calendar sync feeds, and audience rosters.
        </p>
      </div>

      <div className="connectors-big-grid">
        {/* Card 1: Context Files */}
        <div className="connector-big-card" onClick={() => setActiveDetail('files')} role="button" tabIndex={0}>
          <div className="connector-big-card-top">
            <div className="connector-icon-box file">
              <ContextDocsIcon size={26} />
            </div>
            <span className="status-pill sent">
              {files.length} Files Active
            </span>
          </div>

          <div className="connector-big-card-body">
            <h3 className="connector-big-title">Context & Institutional Guidelines</h3>
            <p className="connector-big-desc">
              Upload honorific handbooks, past letters archive, and brand voice guidelines to ground AI drafting in protocol.
            </p>
          </div>

          <div className="connector-big-card-footer">
            <span>Manage Context Files</span>
            <ChevronRight size={15} />
          </div>
        </div>

        {/* Card 2: Google Calendar */}
        <div className="connector-big-card" onClick={() => setActiveDetail('gcal')} role="button" tabIndex={0}>
          <div className="connector-big-card-top">
            <div className="connector-icon-box calendar">
              <GoogleCalendarIcon size={26} />
            </div>
            <span className={`status-pill ${gcalConnected ? 'sent' : 'not_started'}`}>
              {gcalConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="connector-big-card-body">
            <h3 className="connector-big-title">Google Calendar Workspace</h3>
            <p className="connector-big-desc">
              Automatically ingest national observances, state diplomatic visits, and executive travel schedules.
            </p>
          </div>

          <div className="connector-big-card-footer">
            <span>Configure Calendar Feeds</span>
            <ChevronRight size={15} />
          </div>
        </div>

        {/* Card 3: Google Sheets Sync */}
        <div className="connector-big-card" onClick={() => setActiveDetail('sheets')} role="button" tabIndex={0}>
          <div className="connector-big-card-top">
            <div className="connector-icon-box sheet">
              <GoogleSheetsIcon size={26} />
            </div>
            <span className={`status-pill ${sheetStatus === 'connected' ? 'sent' : 'not_started'}`}>
              {sheetStatus === 'connected' ? 'Linked' : 'Not Linked'}
            </span>
          </div>

          <div className="connector-big-card-body">
            <h3 className="connector-big-title">Google Sheets & Observances</h3>
            <p className="connector-big-desc">
              Sync live Google Sheets or Excel tables with annual observance schedules, country mappings, and reviewer assignments.
            </p>
          </div>

          <div className="connector-big-card-footer">
            <span>Manage Spreadsheet Sync</span>
            <ChevronRight size={15} />
          </div>
        </div>

        {/* Card 4: Audience Rosters */}
        <div className="connector-big-card" onClick={() => setActiveDetail('rosters')} role="button" tabIndex={0}>
          <div className="connector-big-card-top">
            <div className="connector-icon-box audience">
              <AudienceRosterIcon size={26} />
            </div>
            <span className="status-pill sent">
              4 Lists Active
            </span>
          </div>

          <div className="connector-big-card-body">
            <h3 className="connector-big-title">Audience & Distribution Rosters</h3>
            <p className="connector-big-desc">
              Manage institutional recipient directories for global diplomatic missions, embassies, and internal staff lists.
            </p>
          </div>

          <div className="connector-big-card-footer">
            <span>Manage Audience Rosters</span>
            <ChevronRight size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};
