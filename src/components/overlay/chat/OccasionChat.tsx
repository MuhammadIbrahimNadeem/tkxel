import React from 'react';
import { Occasion } from '../../../types/occasion';
import { useOccasion } from '../../../context/OccasionContext';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';

interface OccasionChatProps {
  occasion: Occasion;
}

export const OccasionChat: React.FC<OccasionChatProps> = ({ occasion }) => {
  const { sendChatMessage } = useOccasion();

  const suggestedPrompts = [
    'Make tone warmer & more personal',
    'Elevate diplomatic protocol',
    'Translate into Arabic',
    'Translate into French',
    'Make draft concise',
    'Share with sarah.jenkins@company.com'
  ];

  return (
    <div className="chat-section">
      <ChatHistory messages={occasion.chatHistory || []} />
      <ChatInput
        onSendMessage={text => sendChatMessage(occasion.id, text)}
        suggestedPrompts={suggestedPrompts}
      />
    </div>
  );
};
