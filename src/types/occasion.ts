export type OccasionStatus = 'not_started' | 'drafting' | 'in_review' | 'sent';

export type Audience = 'internal' | 'external' | 'both';

export type AudienceTrackType = 'internal' | 'external';

export type UserRole = 'drafter' | 'reviewer';

export interface Recipient {
  id: string;
  name: string;
  email: string;
  role: string;
  track: 'internal' | 'external';
  organization?: string;
  isPrimary?: boolean;
}

export interface DraftVersion {
  id: string;
  content: string;
  savedAt: string;
  author: string;
  note?: string;
  label?: string; // e.g. "2025 approved version — sent Dec 2, 2025"
}

export interface Draft {
  content: string;
  lastEditedAt: string;
  lastEditedBy: string;
  history: DraftVersion[];
  basedOnVersionId?: string | null;
  basedOnLabel?: string | null;
  basedOnContent?: string | null;
}

export interface ReviewAction {
  id: string;
  action: 'approved' | 'sent_back';
  byUserId: string;
  byUserName: string;
  comment?: string;
  timestamp: string;
}

export interface AudienceTrack {
  trackType: AudienceTrackType;
  status: OccasionStatus;
  languages: string[];
  drafts: Record<string, Draft>;
  reviewerId: string;
  reviewerName: string;
  reviewHistory: ReviewAction[];
}

export interface ChatMessage {
  id: string;
  occasionId: string;
  trackType?: AudienceTrackType;
  role: 'user' | 'agent' | 'system' | 'reviewer';
  content: string;
  timestamp: string;
  actionType?: 'draft_updated' | 'translation_added' | 'share_prompt' | 'share_confirmed' | 'status_changed' | 'review_comment' | 'info';
  actionData?: {
    language?: string;
    email?: string;
    diffSummary?: string;
    previousStatus?: OccasionStatus;
    newStatus?: OccasionStatus;
    reviewerComment?: string;
  };
}

export interface Occasion {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD if multi-day
  audience: Audience;
  country?: string;
  region?: string;
  toneDescription?: string;
  tracks: {
    internal?: AudienceTrack;
    external?: AudienceTrack;
  };
  lastUpdated: string;
  chatHistory: ChatMessage[];
  sharedWith?: string[];
  recipients?: Recipient[];
}

export interface AppNotification {
  id: string;
  occasionId: string;
  trackType?: AudienceTrackType;
  type: 'draft_ready' | 'due_soon' | 'sent_confirmation' | 'review_requested';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export type ViewTab = 'calendar' | 'notifications' | 'connectors';

export interface FilterState {
  search: string;
  status: 'all' | OccasionStatus;
  audience: 'all' | Audience;
  language: string;
}

// Utility function to compute least complete status
export function getOccasionOverallStatus(occasion: Occasion): OccasionStatus {
  const statusRank: Record<OccasionStatus, number> = {
    not_started: 0,
    drafting: 1,
    in_review: 2,
    sent: 3
  };

  const statuses: OccasionStatus[] = [];
  if (occasion.tracks.external) statuses.push(occasion.tracks.external.status);
  if (occasion.tracks.internal) statuses.push(occasion.tracks.internal.status);

  if (statuses.length === 0) return 'not_started';

  statuses.sort((a, b) => statusRank[a] - statusRank[b]);
  return statuses[0];
}
