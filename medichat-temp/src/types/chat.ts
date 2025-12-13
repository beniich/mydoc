export type ConversationStatus = 'online' | 'consultation' | 'followup' | 'offline';

export type MessageType = 'text' | 'audio' | 'image' | 'pdf' | 'prescription' | 'report';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export type UserRole = 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: ConversationStatus;
}

export interface Patient extends User {
  role: 'patient';
  age: number;
  gender: 'M' | 'F';
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  lastVisit?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: UserRole;
  type: MessageType;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  attachmentUrl?: string;
  isAI?: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  status: ConversationStatus;
}

export interface PatientFile {
  patient: Patient;
  consultations: Consultation[];
  prescriptions: Prescription[];
  reports: Report[];
}

export interface Consultation {
  id: string;
  date: string;
  diagnosis: string;
  notes: string;
  doctorId: string;
}

export interface Prescription {
  id: string;
  date: string;
  medications: string[];
  doctorId: string;
}

export interface Report {
  id: string;
  date: string;
  type: string;
  title: string;
  fileUrl?: string;
}
