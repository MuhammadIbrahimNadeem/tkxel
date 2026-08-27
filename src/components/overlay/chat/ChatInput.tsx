import React, { useState } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  suggestedPrompts?: string[];
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, suggestedPrompts = [] }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handlePromptClick = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <div className="chat-input-wrapper">
      {suggestedPrompts.length > 0 && (
        <div className="quick-prompts-row" aria-label="Suggested agent actions">
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              type="button"
              className="quick-prompt-pill"
              onClick={() => handlePromptClick(prompt)}
            >
              <Sparkles size={11} className="pill-sparkle" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-box">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask AI agent to adjust tone, translate, draft..."
          value={text}
          onChange={e => setText(e.target.value)}
          aria-label="Prompt the Comms AI Agent"
        />
        <button
          type="submit"
          className="chat-send-btn ocean-accent"
          disabled={!text.trim()}
          title="Send instruction to AI Agent"
          aria-label="Send"
        >
          <ArrowUp size={15} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
};
