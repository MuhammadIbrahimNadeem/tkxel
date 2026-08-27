import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Occasion,
  OccasionStatus,
  AppNotification,
  ViewTab,
  FilterState,
  ChatMessage,
  AudienceTrackType,
  UserRole,
  ReviewAction,
  Recipient
} from '../types/occasion';
import { INITIAL_OCCASIONS } from '../data/initialOccasions';
import { INITIAL_NOTIFICATIONS } from '../data/initialNotifications';

interface OccasionContextType {
  occasions: Occasion[];
  notifications: AppNotification[];
  selectedOccasion: Occasion | null;
  selectedOccasionId: string | null;
  activeTrackType: AudienceTrackType;
  currentDate: Date;
  activeView: ViewTab;
  filters: FilterState;
  activeLanguage: string;
  unreadCount: number;
  currentUserRole: UserRole;
  currentUserName: string;

  // Actions
  selectOccasion: (id: string | null) => void;
  setActiveTrackType: (track: AudienceTrackType) => void;
  setActiveLanguage: (lang: string) => void;
  setCurrentUserRole: (role: UserRole) => void;
  updateDraft: (occasionId: string, trackType: AudienceTrackType, lang: string, content: string, author?: string, note?: string) => void;
  updateStatus: (occasionId: string, trackType: AudienceTrackType, status: OccasionStatus) => void;
  performReviewAction: (occasionId: string, trackType: AudienceTrackType, action: 'approved' | 'sent_back', comment?: string) => void;
  sendChatMessage: (occasionId: string, userMessage: string) => Promise<void>;
  addLanguageVersion: (occasionId: string, trackType: AudienceTrackType, lang: string, initialContent?: string) => void;
  shareOccasionViaEmail: (occasionId: string, email: string) => void;
  addRecipient: (occasionId: string, recipient: Omit<Recipient, 'id'>) => void;
  removeRecipient: (occasionId: string, recipientId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setActiveView: (view: ViewTab) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const OccasionContext = createContext<OccasionContextType | undefined>(undefined);

export const OccasionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [occasions, setOccasions] = useState<Occasion[]>(() => {
    try {
      const saved = localStorage.getItem('occasion_letters_v2_data');
      return saved ? JSON.parse(saved) : INITIAL_OCCASIONS;
    } catch {
      return INITIAL_OCCASIONS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('occasion_notifications_v2_data');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [selectedOccasionId, setSelectedOccasionId] = useState<string | null>(null);
  const [activeTrackType, setActiveTrackType] = useState<AudienceTrackType>('external');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1)); // August 2026
  const [activeView, setActiveView] = useState<ViewTab>('calendar');
  const [activeLanguage, setActiveLanguage] = useState<string>('en');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('drafter');

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    audience: 'all',
    language: 'all'
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('occasion_letters_v2_data', JSON.stringify(occasions));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
  }, [occasions]);

  useEffect(() => {
    try {
      localStorage.setItem('occasion_notifications_v2_data', JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed saving notifications', e);
    }
  }, [notifications]);

  const selectedOccasion = occasions.find(o => o.id === selectedOccasionId) || null;

  // Sync active track & language when occasion selection changes
  useEffect(() => {
    if (selectedOccasion) {
      if (selectedOccasion.audience === 'internal') {
        setActiveTrackType('internal');
      } else if (selectedOccasion.audience === 'external') {
        setActiveTrackType('external');
      } else {
        if (!selectedOccasion.tracks[activeTrackType]) {
          setActiveTrackType(selectedOccasion.tracks.external ? 'external' : 'internal');
        }
      }
    }
  }, [selectedOccasionId]);

  useEffect(() => {
    if (selectedOccasion) {
      const currentTrack = selectedOccasion.tracks[activeTrackType];
      if (currentTrack) {
        if (!currentTrack.languages.includes(activeLanguage)) {
          setActiveLanguage(currentTrack.languages[0] || 'en');
        }
      }
    }
  }, [activeTrackType, selectedOccasionId]);

  const selectOccasion = (id: string | null) => {
    setSelectedOccasionId(id);
    if (id) {
      const occ = occasions.find(o => o.id === id);
      if (occ) {
        const defaultTrack: AudienceTrackType = occ.tracks.external ? 'external' : 'internal';
        setActiveTrackType(defaultTrack);
        const languages = occ.tracks[defaultTrack]?.languages || ['en'];
        setActiveLanguage(languages[0] || 'en');
      }
    }
  };

  const currentUserName = currentUserRole === 'reviewer' ? 'Sarah Jenkins (Director of Comms)' : 'Elena Rostova (Comms Lead)';

  const updateDraft = (
    occasionId: string,
    trackType: AudienceTrackType,
    lang: string,
    content: string,
    author = currentUserName,
    note?: string
  ) => {
    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;

      const track = occ.tracks[trackType];
      if (!track) return occ;

      const currentDraft = track.drafts[lang] || {
        content: '',
        lastEditedAt: '',
        lastEditedBy: '',
        history: []
      };

      const now = new Date().toISOString();
      const newHistory = [...(currentDraft.history || [])];

      if (currentDraft.content && currentDraft.content !== content) {
        newHistory.unshift({
          id: `ver-${Date.now()}`,
          content: currentDraft.content,
          savedAt: currentDraft.lastEditedAt || now,
          author: currentDraft.lastEditedBy || author,
          note: note || 'Draft edit'
        });
      }

      return {
        ...occ,
        lastUpdated: now,
        tracks: {
          ...occ.tracks,
          [trackType]: {
            ...track,
            drafts: {
              ...track.drafts,
              [lang]: {
                ...currentDraft,
                content,
                lastEditedAt: now,
                lastEditedBy: author,
                history: newHistory
              }
            }
          }
        }
      };
    }));
  };

  const updateStatus = (occasionId: string, trackType: AudienceTrackType, newStatus: OccasionStatus) => {
    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;

      const track = occ.tracks[trackType];
      if (!track) return occ;

      const oldStatus = track.status;
      const statusMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        occasionId,
        trackType,
        role: 'system',
        content: `[${trackType.toUpperCase()}] Workflow stage moved from ${formatStatus(oldStatus)} to ${formatStatus(newStatus)}.`,
        timestamp: new Date().toISOString(),
        actionType: 'status_changed',
        actionData: { previousStatus: oldStatus, newStatus }
      };

      return {
        ...occ,
        lastUpdated: new Date().toISOString(),
        tracks: {
          ...occ.tracks,
          [trackType]: {
            ...track,
            status: newStatus
          }
        },
        chatHistory: [...occ.chatHistory, statusMsg]
      };
    }));

    if (newStatus === 'in_review') {
      const occ = occasions.find(o => o.id === occasionId);
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        occasionId,
        trackType,
        type: 'review_requested',
        title: 'Review Requested',
        message: `${occ?.name || 'Letter'} (${trackType}) submitted for executive review.`,
        timestamp: new Date().toISOString(),
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const performReviewAction = (
    occasionId: string,
    trackType: AudienceTrackType,
    action: 'approved' | 'sent_back',
    comment?: string
  ) => {
    const now = new Date().toISOString();
    const reviewActionObj: ReviewAction = {
      id: `rev-${Date.now()}`,
      action,
      byUserId: 'sarah-jenkins',
      byUserName: 'Sarah Jenkins (Director of Comms)',
      comment,
      timestamp: now
    };

    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;
      const track = occ.tracks[trackType];
      if (!track) return occ;

      const nextStatus: OccasionStatus = action === 'approved' ? 'sent' : 'drafting';

      const reviewChatMsg: ChatMessage = {
        id: `msg-rev-${Date.now()}`,
        occasionId,
        trackType,
        role: 'reviewer',
        content: action === 'approved'
          ? (comment ? `Approved for dispatch. Reviewer note: "${comment}"` : `Approved & marked as Sent. Dispatched to final recipients.`)
          : `Sent back for revision: "${comment || 'Please address feedback before final approval.'}"`,
        timestamp: now,
        actionType: 'review_comment',
        actionData: {
          previousStatus: track.status,
          newStatus: nextStatus,
          reviewerComment: comment
        }
      };

      return {
        ...occ,
        lastUpdated: now,
        tracks: {
          ...occ.tracks,
          [trackType]: {
            ...track,
            status: nextStatus,
            reviewHistory: [reviewActionObj, ...(track.reviewHistory || [])]
          }
        },
        chatHistory: [...occ.chatHistory, reviewChatMsg]
      };
    }));

    const occ = occasions.find(o => o.id === occasionId);
    if (action === 'approved') {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          occasionId,
          trackType,
          type: 'sent_confirmation',
          title: 'Letter Dispatched',
          message: `${occ?.name || 'Letter'} (${trackType}) approved & dispatched.`,
          timestamp: now,
          read: false
        },
        ...prev
      ]);
    } else {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          occasionId,
          trackType,
          type: 'draft_ready',
          title: 'Revision Requested',
          message: `${occ?.name || 'Letter'} (${trackType}) sent back by reviewer: "${comment || 'Needs revision'}"`,
          timestamp: now,
          read: false
        },
        ...prev
      ]);
    }
  };

  const addLanguageVersion = (occasionId: string, trackType: AudienceTrackType, lang: string, initialContent = '') => {
    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;
      const track = occ.tracks[trackType];
      if (!track) return occ;

      const updatedLanguages = track.languages.includes(lang) ? track.languages : [...track.languages, lang];
      return {
        ...occ,
        tracks: {
          ...occ.tracks,
          [trackType]: {
            ...track,
            languages: updatedLanguages,
            drafts: {
              ...track.drafts,
              [lang]: track.drafts[lang] || {
                content: initialContent,
                lastEditedAt: new Date().toISOString(),
                lastEditedBy: 'Comms AI Agent (Translator)',
                history: []
              }
            }
          }
        }
      };
    }));
    setActiveLanguage(lang);
  };

  const shareOccasionViaEmail = (occasionId: string, email: string) => {
    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;
      const existing = occ.sharedWith || [];
      const updatedShared = existing.includes(email) ? existing : [...existing, email];
      const shareMsg: ChatMessage = {
        id: `share-${Date.now()}`,
        occasionId,
        trackType: activeTrackType,
        role: 'agent',
        content: `Letter (${activeTrackType}) successfully shared with ${email}. A link with review access has been dispatched.`,
        timestamp: new Date().toISOString(),
        actionType: 'share_confirmed',
        actionData: { email }
      };
      return {
        ...occ,
        sharedWith: updatedShared,
        chatHistory: [...occ.chatHistory, shareMsg]
      };
    }));
  };

  const addRecipient = (occasionId: string, recipientData: Omit<Recipient, 'id'>) => {
    const newRecipient: Recipient = {
      ...recipientData,
      id: `rec-${Date.now()}`
    };

    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;
      const existing = occ.recipients || [];
      return {
        ...occ,
        recipients: [...existing, newRecipient]
      };
    }));
  };

  const removeRecipient = (occasionId: string, recipientId: string) => {
    setOccasions(prev => prev.map(occ => {
      if (occ.id !== occasionId) return occ;
      return {
        ...occ,
        recipients: (occ.recipients || []).filter(r => r.id !== recipientId)
      };
    }));
  };

  const sendChatMessage = async (occasionId: string, userText: string) => {
    const occ = occasions.find(o => o.id === occasionId);
    if (!occ) return;

    const currentTrack = occ.tracks[activeTrackType];
    if (!currentTrack) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      occasionId,
      trackType: activeTrackType,
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString()
    };

    setOccasions(prev => prev.map(o => o.id === occasionId ? { ...o, chatHistory: [...o.chatHistory, userMsg] } : o));

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let responseText = '';
      let actionType: ChatMessage['actionType'] = undefined;
      let actionData: ChatMessage['actionData'] = undefined;

      const currentLang = activeLanguage || currentTrack.languages[0] || 'en';
      const currentDraftText = currentTrack.drafts[currentLang]?.content || '';

      if (lower.includes('warmer') || lower.includes('warm')) {
        const revised = currentDraftText
          .replace(/With highest regards and esteem/g, 'With our warmest personal regards and friendship')
          .replace(/Respectfully yours/g, 'Warmly and with deep gratitude')
          .replace(/Sincerely/g, 'With heartfelt best wishes');

        const newText = revised !== currentDraftText ? revised : currentDraftText + '\n\nWe extend our warmest personal wishes for your continued happiness and good health.';
        updateDraft(occasionId, activeTrackType, currentLang, newText, 'Comms AI Agent (Tone: Warm)', 'Adjusted tone to be warmer and more personal');
        responseText = `I’ve revised the ${activeTrackType} ${currentLang.toUpperCase()} draft to adopt a warmer, more personable tone.`;
        actionType = 'draft_updated';
      } else if (lower.includes('formal') || lower.includes('diplomatic') || lower.includes('protocol')) {
        const revised = `Your Excellencies, Distinguished Partners, and Esteemed Colleagues,\n\n${currentDraftText.replace(/^.*?\n\n/, '')}`;
        updateDraft(occasionId, activeTrackType, currentLang, revised, 'Comms AI Agent (Tone: Diplomatic Protocol)', 'Elevated diplomatic phrasing and honorifics');
        responseText = `I’ve refined the ${activeTrackType} draft with elevated protocol honorifics suitable for ministerial partners.`;
        actionType = 'draft_updated';
      } else if (lower.includes('arabic') || lower.includes('translate to ar') || lower.includes('عربي')) {
        const arText = currentTrack.drafts['ar']?.content || `أصحاب السمو والمعالي والشركاء الكرام،\n\nبمناسبة ${occ.name}، نتشرف بأن نرفع أسمى آيات التهاني والتبريكات إلى مقامكم الكريم.\n\nوتفضلوا بقبول فائق الاحترام والتقدير،\nالإدارة التنفيذية`;
        addLanguageVersion(occasionId, activeTrackType, 'ar', arText);
        responseText = `I’ve generated the official Arabic version for the ${activeTrackType} track. Added to the AR tab.`;
        actionType = 'translation_added';
        actionData = { language: 'ar' };
      } else if (lower.includes('french') || lower.includes('français')) {
        const frText = `Excellences, chers partenaires et amis,\n\nÀ l'occasion de ${occ.name}, nous vous adressons nos félicitations les plus chaleureuses.\n\nAvec nos salutations les plus distinguées,\nLe Comité Exécutif`;
        addLanguageVersion(occasionId, activeTrackType, 'fr', frText);
        responseText = `I’ve localized the letter into French for the ${activeTrackType} track.`;
        actionType = 'translation_added';
        actionData = { language: 'fr' };
      } else if (lower.includes('share') || lower.includes('email') || lower.includes('send to') || lower.includes('recipient')) {
        const emailMatch = userText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emailMatch && emailMatch[0]) {
          shareOccasionViaEmail(occasionId, emailMatch[0]);
          return;
        } else {
          responseText = `Who would you like to add to the ${activeTrackType} audience or distribution list? You can enter their email or manage recipients via the Audience menu.`;
          actionType = 'share_prompt';
        }
      } else if (lower.includes('shorter') || lower.includes('concise')) {
        const paragraphs = currentDraftText.split('\n\n');
        const shortened = paragraphs.length > 2 ? [paragraphs[0], paragraphs[1], paragraphs[paragraphs.length - 1]].join('\n\n') : currentDraftText;
        updateDraft(occasionId, activeTrackType, currentLang, shortened, 'Comms AI Agent (Concise mode)', 'Condensed draft');
        responseText = `I have condensed the ${activeTrackType} draft to its core diplomatic greeting.`;
        actionType = 'draft_updated';
      } else {
        responseText = `Noted for ${occ.name} (${activeTrackType} track). I can adjust the tone, generate regional translations, or help share with reviewers.`;
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        occasionId,
        trackType: activeTrackType,
        role: 'agent',
        content: responseText,
        timestamp: new Date().toISOString(),
        actionType,
        actionData
      };

      setOccasions(prev => prev.map(o => o.id === occasionId ? { ...o, chatHistory: [...o.chatHistory, agentMsg] } : o));
    }, 450);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <OccasionContext.Provider
      value={{
        occasions,
        notifications,
        selectedOccasion,
        selectedOccasionId,
        activeTrackType,
        currentDate,
        activeView,
        filters,
        activeLanguage,
        unreadCount,
        currentUserRole,
        currentUserName,
        selectOccasion,
        setActiveTrackType,
        setActiveLanguage,
        setCurrentUserRole,
        updateDraft,
        updateStatus,
        performReviewAction,
        sendChatMessage,
        addLanguageVersion,
        shareOccasionViaEmail,
        addRecipient,
        removeRecipient,
        markNotificationRead,
        markAllNotificationsRead,
        setCurrentDate,
        setActiveView,
        setFilters
      }}
    >
      {children}
    </OccasionContext.Provider>
  );
};

export const useOccasion = () => {
  const context = useContext(OccasionContext);
  if (!context) {
    throw new Error('useOccasion must be used within an OccasionProvider');
  }
  return context;
};

function formatStatus(s: OccasionStatus): string {
  switch (s) {
    case 'not_started': return 'Not started';
    case 'drafting': return 'Drafting';
    case 'in_review': return 'In review';
    case 'sent': return 'Sent';
  }
}
