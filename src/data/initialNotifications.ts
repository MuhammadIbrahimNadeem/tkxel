import { AppNotification } from '../types/occasion';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    occasionId: 'occ-uae-national-day',
    type: 'review_requested',
    title: 'Review requested',
    message: 'Sarah Jenkins requested review on UAE National Day (Arabic & English drafts).',
    timestamp: '2026-11-28T14:35:00Z',
    read: false
  },
  {
    id: 'notif-2',
    occasionId: 'occ-saudi-national-day',
    type: 'draft_ready',
    title: 'Draft ready for review',
    message: 'AI agent completed the initial bilingual draft for Saudi National Day.',
    timestamp: '2026-08-25T11:16:00Z',
    read: false
  },
  {
    id: 'notif-3',
    occasionId: 'occ-uzbek-independence',
    type: 'due_soon',
    title: 'Observance approaching',
    message: 'Uzbekistan Independence Day is approaching in 5 days. Uzbek localization is in progress.',
    timestamp: '2026-08-26T09:00:00Z',
    read: false
  },
  {
    id: 'notif-4',
    occasionId: 'occ-singapore-national-day',
    type: 'review_requested',
    title: 'Ready for final sign-off',
    message: 'Singapore National Day draft moved to In Review.',
    timestamp: '2026-08-04T15:15:00Z',
    read: true
  },
  {
    id: 'notif-5',
    occasionId: 'occ-swiss-national-day',
    type: 'sent_confirmation',
    title: 'Letter sent successfully',
    message: 'Swiss National Day greeting letters (EN, FR, DE) were dispatched to Bern embassy & partners.',
    timestamp: '2026-07-30T16:05:00Z',
    read: true
  },
  {
    id: 'notif-6',
    occasionId: 'occ-lunar-new-year',
    type: 'sent_confirmation',
    title: 'Dispatched to 48 partner institutions',
    message: 'Year of the Horse greetings sent to all regional contacts.',
    timestamp: '2026-02-16T18:05:00Z',
    read: true
  }
];
