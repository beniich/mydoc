import React, { useState } from 'react';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatArea } from '@/components/chat/ChatArea';
import { PatientPanel } from '@/components/chat/PatientPanel';
import { AIAssistantModal } from '@/components/chat/AIAssistantModal';
import { mockConversations, mockMessages, mockPatientFile, mockPatients } from '@/data/mockData';
import { Message } from '@/types/chat';

const MedicalChat: React.FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string>('conv-p1');
  const [filter, setFilter] = useState('all');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
  const conversationMessages = messages.filter(m => m.conversationId === selectedConversationId);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: 'doctor',
      senderRole: 'doctor',
      type: 'text',
      content,
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => m.id === newMessage.id ? { ...m, status: 'delivered' } : m)
      );
    }, 500);
  };

  const getPatientFile = () => {
    if (!selectedConversation) return undefined;
    const patient = mockPatients.find(p => `conv-${p.id}` === selectedConversationId);
    if (!patient) return undefined;
    return { ...mockPatientFile, patient };
  };

  const patientFile = getPatientFile();

  return (
    <div className="h-screen flex bg-background">
      {/* Conversation List */}
      <div className="w-80 flex-shrink-0">
        <ConversationList
          conversations={mockConversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Chat Area */}
      <ChatArea
        conversation={selectedConversation}
        messages={conversationMessages}
        onSendMessage={handleSendMessage}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Patient Panel */}
      <PatientPanel
        patientFile={patientFile}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        patientName={patientFile?.patient.name}
      />
    </div>
  );
};

export default MedicalChat;
