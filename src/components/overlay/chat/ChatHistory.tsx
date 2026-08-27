import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../../../types/occasion';
import { Check, Globe, Send, ShieldCheck, MessageSquareQuote } from 'lucide-react';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTimestamp = (iso?: string) => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="chat-history-container" aria-label="Conversation with Comms AI Agent">
      {messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '24px 8px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
          Ask the agent to adjust tone, add regional translations, or share with colleagues.
        </div>
      ) : (
        messages.map(msg => {
          if (msg.role === 'system') {
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: 'center',
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  margin: '4px 0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ShieldCheck size={12} />
                <span>{msg.content}</span>
              </div>
            );
          }

          if (msg.role === 'reviewer' || msg.actionType === 'review_comment') {
            return (
              <div key={msg.id} className="reviewer-chat-card">
                <div className="reviewer-chat-header">
                  <MessageSquareQuote size={13} style={{ color: '#b91c1c' }} />
                  <span>Reviewer Feedback — Sarah Jenkins</span>
                  <span className="tabular-nums" style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--text-muted)' }}>
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
                <div className="reviewer-chat-body">{msg.content}</div>
              </div>
            );
          }

          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`chat-bubble-wrapper ${isUser ? 'user' : 'agent'}`}>
              <div className={`chat-bubble ${isUser ? 'user' : 'agent'}`}>
                <div>{msg.content}</div>

                {msg.actionType === 'draft_updated' && (
                  <div className="chat-action-badge">
                    <Check size={10} />
                    <span>Draft updated live above</span>
                  </div>
                )}

                {msg.actionType === 'translation_added' && (
                  <div className="chat-action-badge">
                    <Globe size={10} />
                    <span>Added {msg.actionData?.language?.toUpperCase()} tab</span>
                  </div>
                )}

                {msg.actionType === 'share_confirmed' && (
                  <div className="chat-action-badge">
                    <Send size={10} />
                    <span>Shared with {msg.actionData?.email}</span>
                  </div>
                )}
              </div>
              <span className="chat-timestamp tabular-nums">{formatTimestamp(msg.timestamp)}</span>
            </div>
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
};
