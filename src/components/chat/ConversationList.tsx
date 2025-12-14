// @ts-nocheck
import React from 'react';
import { Search, Filter, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Conversation, ConversationStatus } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const statusConfig: Record<ConversationStatus, { label: string; className: string }> = {
  online: { label: 'En ligne', className: 'status-online' },
  consultation: { label: 'En consultation', className: 'status-consultation' },
  followup: { label: 'Suivi requis', className: 'status-followup' },
  offline: { label: 'Hors ligne', className: 'bg-muted-foreground/50 w-3 h-3 rounded-full' },
};

const filters = [
  { id: 'all', label: 'Tous' },
  { id: 'today', label: "Aujourd'hui" },
  { id: 'pending', label: 'En attente' },
  { id: 'followup', label: 'Suivi' },
  { id: 'unread', label: 'Non lus' },
];

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
}) => {
  const [search, setSearch] = React.useState('');

  const filteredConversations = conversations.filter((conv) => {
    const participant = conv.participants[0];
    const matchesSearch = participant.name.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filter) {
      case 'unread':
        return conv.unreadCount > 0;
      case 'followup':
        return conv.status === 'followup';
      case 'pending':
        return conv.status === 'consultation';
      default:
        return true;
    }
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) return 'À l\'instant';
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-3 overflow-x-auto scrollbar-thin border-b border-sidebar-border">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200',
              filter === f.id
                ? 'gradient-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.map((conversation) => {
          const participant = conversation.participants[0];
          const status = statusConfig[conversation.status];
          const isSelected = selectedId === conversation.id;

          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={cn(
                'w-full p-4 flex items-start gap-3 transition-all duration-200 border-b border-sidebar-border/50',
                isSelected
                  ? 'bg-primary/10 border-l-2 border-l-primary'
                  : 'hover:bg-secondary/50'
              )}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback className="bg-secondary text-foreground font-medium">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={cn('absolute -bottom-0.5 -right-0.5', status.className)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground truncate">
                    {participant.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage?.content}
                </p>
              </div>

              {/* Unread badge */}
              {conversation.unreadCount > 0 && (
                <Badge className="gradient-primary text-primary-foreground border-0 rounded-full min-w-[24px] h-6 flex items-center justify-center">
                  {conversation.unreadCount}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
