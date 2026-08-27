import React, { useState } from 'react';
import { Occasion, AudienceTrackType } from '../../types/occasion';
import { useOccasion } from '../../context/OccasionContext';
import { Users, Plus, Trash2, X, Mail, ShieldCheck } from 'lucide-react';

interface AudienceSettingsModalProps {
  occasion: Occasion;
  activeTrackType: AudienceTrackType;
  onClose: () => void;
}

const DESIGNATION_PRESETS = [
  'Ambassador / Diplomatic Envoy',
  'Ministry Protocol Official',
  'Regional Partner Director',
  'Executive Reviewer (C-Suite)',
  'Internal Comms Lead',
  'General Staff Recipient'
];

const ORGANIZATION_PRESETS = [
  'Ministry of Foreign Affairs',
  'Diplomatic Corps & Embassy',
  'Regional Trade Council',
  'Executive Office',
  'Global Investment Management'
];

export const AudienceSettingsModal: React.FC<AudienceSettingsModalProps> = ({
  occasion,
  activeTrackType,
  onClose
}) => {
  const { addRecipient, removeRecipient } = useOccasion();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState(DESIGNATION_PRESETS[0]);
  const [selectedOrg, setSelectedOrg] = useState(ORGANIZATION_PRESETS[0]);
  const [track, setTrack] = useState<'internal' | 'external'>(activeTrackType);

  const occasionRecipients = occasion.recipients || [
    {
      id: 'rec-1',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@globalinvest.com',
      role: 'Director of Communications (Reviewer)',
      track: 'internal',
      organization: 'Global Investment Management',
      isPrimary: true
    },
    {
      id: 'rec-2',
      name: 'Elena Rostova',
      email: 'elena.rostova@globalinvest.com',
      role: 'Communications Lead (Drafter)',
      track: 'internal',
      organization: 'Global Investment Management'
    },
    {
      id: 'rec-3',
      name: 'Diplomatic Mission / Protocol Office',
      email: 'protocol.affairs@embassy.gov',
      role: 'Official State Partner',
      track: 'external',
      organization: occasion.country ? `${occasion.country} Ministry of Foreign Affairs` : 'State Diplomatic Corps'
    }
  ];

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addRecipient(occasion.id, {
      name: name.trim(),
      email: email.trim(),
      role: selectedRole,
      organization: selectedOrg,
      track
    });

    setName('');
    setEmail('');
  };

  const filteredRecipients = occasionRecipients.filter(r => r.track === activeTrackType || occasion.audience === 'both');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '540px' }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="audience-settings-title"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} style={{ color: 'var(--brand-accent)' }} />
            <div>
              <h3 id="audience-settings-title" style={{ fontSize: '13.5px', fontWeight: 700 }}>
                Audience & Recipients
              </h3>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                {occasion.name} ({activeTrackType.toUpperCase()})
              </div>
            </div>
          </div>
          <button className="icon-action-btn" onClick={onClose} aria-label="Close audience settings">
            <X size={15} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '14px', padding: '16px 20px' }}>
          {/* Compact Add Recipient Form with Dropdowns */}
          <form onSubmit={handleAddRecipient} className="audience-add-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
                Add Recipient
              </span>
              <select
                className="filter-select"
                style={{ padding: '3px 8px', fontSize: '11px' }}
                value={track}
                onChange={e => setTrack(e.target.value as 'internal' | 'external')}
              >
                <option value="external">External Track</option>
                <option value="internal">Internal Track</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <input
                type="text"
                className="connector-input"
                placeholder="Full Name (e.g. H.E. Amb. Lee)"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="connector-input"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>
                  Designation / Role:
                </label>
                <select
                  className="connector-input"
                  style={{ width: '100%' }}
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                >
                  {DESIGNATION_PRESETS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-tertiary)', display: 'block', marginBottom: '2px' }}>
                  Organization:
                </label>
                <select
                  className="connector-input"
                  style={{ width: '100%' }}
                  value={selectedOrg}
                  onChange={e => setSelectedOrg(e.target.value)}
                >
                  {ORGANIZATION_PRESETS.map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
              <button type="submit" className="connector-action-btn primary" style={{ padding: '4px 10px', fontSize: '11px' }}>
                <Plus size={12} />
                <span>Save Recipient</span>
              </button>
            </div>
          </form>

          {/* Current Recipient List */}
          <div className="file-list-container">
            <div style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery List ({filteredRecipients.length})</span>
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{activeTrackType.toUpperCase()}</span>
            </div>

            {filteredRecipients.map(rec => (
              <div key={rec.id} className="file-item-row" style={{ padding: '6px 10px' }}>
                <Mail size={14} style={{ color: rec.track === 'external' ? '#0284c7' : '#64748b' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {rec.name}
                    </span>
                    <span className={`audience-badge ${rec.track}`} style={{ fontSize: '9px', padding: '1px 4px' }}>
                      {rec.track}
                    </span>
                    {rec.isPrimary && (
                      <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        <ShieldCheck size={10} /> Reviewer
                      </span>
                    )}
                  </div>
                  <div className="file-meta">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{rec.email}</span>
                    <span>•</span>
                    <span>{rec.role}</span>
                    {rec.organization && (
                      <>
                        <span>•</span>
                        <span>{rec.organization}</span>
                      </>
                    )}
                  </div>
                </div>

                {!rec.isPrimary && (
                  <button
                    className="icon-action-btn small"
                    onClick={() => removeRecipient(occasion.id, rec.id)}
                    title="Remove recipient"
                    aria-label="Remove recipient"
                  >
                    <Trash2 size={12} style={{ color: '#dc2626' }} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
