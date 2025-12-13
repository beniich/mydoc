import { Conversation, Message, PatientFile, Patient } from '@/types/chat';

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Emma Wilson',
    role: 'patient',
    status: 'online',
    age: 34,
    gender: 'F',
    bloodType: 'A+',
    allergies: ['Pénicilline'],
    conditions: ['Hypertension légère'],
    lastVisit: '2025-10-15',
  },
  {
    id: 'p2',
    name: 'Lucas Martin',
    role: 'patient',
    status: 'consultation',
    age: 45,
    gender: 'M',
    bloodType: 'O-',
    allergies: [],
    conditions: ['Diabète type 2'],
    lastVisit: '2025-11-20',
  },
  {
    id: 'p3',
    name: 'Sophie Bernard',
    role: 'patient',
    status: 'followup',
    age: 28,
    gender: 'F',
    bloodType: 'B+',
    allergies: ['Aspirine'],
    conditions: [],
    lastVisit: '2025-12-01',
  },
  {
    id: 'p4',
    name: 'Antoine Dubois',
    role: 'patient',
    status: 'offline',
    age: 52,
    gender: 'M',
    bloodType: 'AB+',
    allergies: [],
    conditions: ['Arthrite'],
    lastVisit: '2025-11-10',
  },
  {
    id: 'p5',
    name: 'Marie Leroy',
    role: 'patient',
    status: 'online',
    age: 41,
    gender: 'F',
    bloodType: 'A-',
    allergies: ['Latex'],
    conditions: ['Asthme'],
    lastVisit: '2025-12-05',
  },
];

export const mockConversations: Conversation[] = mockPatients.map((patient, index) => ({
  id: `conv-${patient.id}`,
  participants: [patient],
  unreadCount: index === 0 ? 3 : index === 2 ? 1 : 0,
  status: patient.status,
  lastMessage: {
    id: `msg-last-${patient.id}`,
    conversationId: `conv-${patient.id}`,
    senderId: patient.id,
    senderRole: 'patient',
    type: 'text',
    content: index === 0 
      ? 'Bonjour Docteur, j\'ai une question concernant mon traitement...'
      : index === 1 
      ? 'Merci pour la consultation'
      : index === 2
      ? 'J\'ai reçu mes résultats d\'analyses'
      : 'D\'accord, à bientôt',
    timestamp: new Date(Date.now() - (index * 3600000)),
    status: 'delivered',
  },
}));

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-p1',
    senderId: 'p1',
    senderRole: 'patient',
    type: 'text',
    content: 'Bonjour Docteur, je me sens beaucoup mieux depuis le nouveau traitement.',
    timestamp: new Date(Date.now() - 7200000),
    status: 'read',
  },
  {
    id: 'msg-2',
    conversationId: 'conv-p1',
    senderId: 'doctor',
    senderRole: 'doctor',
    type: 'text',
    content: 'Excellent ! Continuez le traitement pendant encore 2 semaines. N\'hésitez pas si vous avez des questions.',
    timestamp: new Date(Date.now() - 6800000),
    status: 'read',
  },
  {
    id: 'msg-3',
    conversationId: 'conv-p1',
    senderId: 'p1',
    senderRole: 'patient',
    type: 'text',
    content: 'D\'accord, merci beaucoup ! J\'ai juste une petite question : est-ce normal d\'avoir des maux de tête légers ?',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
  },
  {
    id: 'msg-4',
    conversationId: 'conv-p1',
    senderId: 'doctor',
    senderRole: 'doctor',
    type: 'text',
    content: 'C\'est un effet secondaire possible mais temporaire. Si ça persiste plus de 48h, prévenez-moi.',
    timestamp: new Date(Date.now() - 3000000),
    status: 'read',
  },
  {
    id: 'msg-5',
    conversationId: 'conv-p1',
    senderId: 'ai',
    senderRole: 'doctor',
    type: 'text',
    content: '🤖 Analyse IA : Les maux de tête légers sont un effet secondaire courant (15% des patients) et disparaissent généralement en 3-5 jours. Recommandation : hydratation accrue.',
    timestamp: new Date(Date.now() - 2500000),
    status: 'read',
    isAI: true,
  },
  {
    id: 'msg-6',
    conversationId: 'conv-p1',
    senderId: 'p1',
    senderRole: 'patient',
    type: 'text',
    content: 'Bonjour Docteur, j\'ai une question concernant mon traitement...',
    timestamp: new Date(Date.now() - 1800000),
    status: 'delivered',
  },
];

export const mockPatientFile: PatientFile = {
  patient: mockPatients[0]!,
  consultations: [
    {
      id: 'c1',
      date: '2025-12-10',
      diagnosis: 'Hypertension légère',
      notes: 'Tension artérielle stabilisée sous traitement',
      doctorId: 'doctor',
    },
    {
      id: 'c2',
      date: '2025-10-15',
      diagnosis: 'Bilan annuel',
      notes: 'Tous les paramètres dans la norme',
      doctorId: 'doctor',
    },
  ],
  prescriptions: [
    {
      id: 'rx1',
      date: '2025-12-10',
      medications: ['Amlodipine 5mg - 1x/jour', 'Aspirine 100mg - 1x/jour'],
      doctorId: 'doctor',
    },
  ],
  reports: [
    {
      id: 'r1',
      date: '2025-12-08',
      type: 'Analyses sanguines',
      title: 'Bilan lipidique complet',
    },
    {
      id: 'r2',
      date: '2025-11-20',
      type: 'ECG',
      title: 'Électrocardiogramme de contrôle',
    },
  ],
};
