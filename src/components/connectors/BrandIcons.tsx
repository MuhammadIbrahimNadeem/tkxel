import React from 'react';

export const GoogleCalendarIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="36" height="32" rx="4" fill="#FFFFFF" />
    <path d="M38 10H34V6H30V10H18V6H14V10H10C7.79 10 6 11.79 6 14V18H42V14C42 11.79 40.21 10 38 10Z" fill="#EA4335" />
    <path d="M6 18H18V42H10C7.79 42 6 40.21 6 38V18Z" fill="#4285F4" />
    <path d="M18 18H42V38C42 40.21 40.21 42 38 42H18V18Z" fill="#34A853" />
    <path d="M42 18H34V30H42V18Z" fill="#FBBC05" />
    <text x="28" y="34" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">31</text>
  </svg>
);

export const GoogleSheetsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37 6H17C14.79 6 13 7.79 13 10V38C13 40.21 14.79 42 17 42H37C39.21 42 41 40.21 41 38V10C41 7.79 39.21 6 37 6Z" fill="#0F9D58" />
    <path d="M19 16H35V32H19V16Z" fill="#FFFFFF" />
    <path d="M21 18H26V23H21V18ZM28 18H33V23H28V18ZM21 25H26V30H21V25ZM28 25H33V30H28V25Z" fill="#0F9D58" />
    <path d="M13 10C13 7.79 14.79 6 17 6H31L41 16V38C41 40.21 39.21 42 37 42H17C14.79 42 13 40.21 13 38V10Z" fill="url(#sheets_gradient)" fillOpacity="0.05" />
    <defs>
      <linearGradient id="sheets_gradient" x1="13" y1="6" x2="41" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#0B8043" />
      </linearGradient>
    </defs>
  </svg>
);

export const ContextDocsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="26" height="34" rx="3" fill="#0284C7" />
    <rect x="14" y="10" width="26" height="34" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
    <path d="M18 16H32" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 22H32" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 28H28" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 34H25" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AudienceRosterIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="18" r="7" fill="#0F172A" />
    <path d="M8 38C8 31.37 13.37 26 20 26C26.63 26 32 31.37 32 38V40H8V38Z" fill="#0F172A" />
    <circle cx="34" cy="16" r="5" fill="#0284C7" />
    <path d="M26 38C26.35 34.02 28.53 30.63 31.7 28.69C32.44 28.57 33.21 28.5 34 28.5C38.97 28.5 43 32.53 43 37.5V40H26V38Z" fill="#0284C7" opacity="0.85" />
  </svg>
);
