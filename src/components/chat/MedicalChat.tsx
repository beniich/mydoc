import React, { useState, useEffect } from 'react';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatArea } from '@/components/chat/ChatArea';
import { PatientPanel } from '@/components/chat/PatientPanel';
import { AIAssistantModal } from '@/components/chat/AIAssistantModal';
import { mockConversations, mockMessages, mockPatientFile, mockPatients } from '@/data/mockData';
import { Message } from '@/types/chat';
import { useAuth } from '@/libs/AuthContext';
import { cn } from '@/lib/utils';

const MedicalChat: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string>('conv-p1');
  const [filter, setFilter] = useState('all');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Filter conversations based on user role (Mock logic adaptable to real data)
  const filteredConversations = mockConversations.filter(_conv => {
    if (!user) return false;
    // Provide a default role if user.role is undefined (e.g., during development/testing)
    const userRole = user.role || 'doctor'; 
    
    if (userRole === 'doctor') return true; // Doctors see all
    if (userRole === 'patient') {
       // Secure Access: Patients only see their own conversations
       // Matching logic: Check if participant ID matches user ID OR (for demo) if email contains patient name
       return _conv.participants.some(p => 
         p.id === user.id || 
         (user.email && user.email.toLowerCase().includes(p.name && p.name.split(' ')[0] ? p.name.split(' ')[0].toLowerCase() : ''))
       );
    }
    return true; 
  });

  const selectedConversation = filteredConversations.find(c => c.id === selectedConversationId);
  // Default to first if selected not found in filtered list
  const activeConversation = selectedConversation || filteredConversations[0];
  
  const conversationMessages = messages.filter(m => m.conversationId === (activeConversation?.id || ''));

  useEffect(() => {
    if (!selectedConversation && filteredConversations.length > 0) {
        setSelectedConversationId(filteredConversations[0]?.id || '');
    }
  }, [filteredConversations, selectedConversation]);

  const handleSendMessage = (content: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: user?.id || 'current-user', // Use real user ID
      senderRole: (user?.role as 'doctor' | 'patient') || 'doctor',
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
    if (!activeConversation) return undefined;
    const patient = mockPatients.find(p => `conv-${p.id}` === activeConversation.id);
    if (!patient) return undefined;
    return { ...mockPatientFile, patient };
  };

  const patientFile = getPatientFile();

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-background w-full overflow-hidden relative"> 
      {/* Modified height and overflow handling to ensuring it stays within bounds */}
      
      {/* Conversation List - Hidden on mobile if conversation is selected */}
      <div className={cn(
        "w-full md:w-80 flex-shrink-0 border-r bg-background h-full absolute inset-0 md:static z-20 md:z-auto transition-transform duration-300 md:translate-x-0",
        activeConversation && selectedConversationId ? "-translate-x-full md:translate-x-0" : "translate-x-0"
      )}>
        <ConversationList
          conversations={filteredConversations}
          selectedId={activeConversation?.id || ''}
          onSelect={(id) => setSelectedConversationId(id)}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Chat Area - Full width on mobile, taking remaining space on desktop */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 bg-background h-full absolute inset-0 md:static z-10 md:z-auto transition-transform duration-300 md:translate-x-0",
        activeConversation && selectedConversationId ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        {activeConversation ? (
            <ChatArea
                conversation={activeConversation}
                messages={conversationMessages}
                onSendMessage={handleSendMessage}
                onOpenAI={() => setIsAIOpen(true)}
                onBack={() => setSelectedConversationId('')}
            />
        ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground hidden md:flex">
                Select a conversation
            </div>
        )}
      </div>

      {/* Patient Panel - Only show if we have a patient file and user is a doctor - Hidden on small screens */}
      {(user?.role === 'doctor' || !user?.role) && (
          <div className="hidden xl:block w-80 border-l h-full flex-shrink-0">
            <PatientPanel
                patientFile={patientFile}
                onOpenAI={() => setIsAIOpen(true)}
            />
          </div>
      )}

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
