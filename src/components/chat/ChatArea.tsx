import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Image,
  FileText,
  Bot,
  Calendar,
  RefreshCw,
  FileBarChart,
  Receipt,
  Check,
  CheckCheck,
  ArrowLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Message, Conversation, MessageStatus } from '@/types/chat';

interface ChatAreaProps {
  conversation?: Conversation;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onOpenAI: () => void;
  onBack?: () => void;
}

const statusIcons: Record<MessageStatus, React.ReactNode> = {
  sent: <Check className="w-3.5 h-3.5 text-muted-foreground" />,
  delivered: <CheckCheck className="w-3.5 h-3.5 text-muted-foreground" />,
  read: <CheckCheck className="w-3.5 h-3.5 text-primary" />,
};

export const ChatArea: React.FC<ChatAreaProps> = ({
  conversation,
  messages,
  onSendMessage,
  onOpenAI,
  onBack,
}) => {
  const [input, setInput] = useState('');
  // const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const participant = conversation?.participants[0];

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background h-full">
        <div className="text-center animate-fade-in p-4">
          <div className="w-20 h-20 rounded-full gradient-primary/20 flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Sélectionnez une conversation
          </h3>
          <p className="text-sm text-muted-foreground">
            Choisissez un patient pour commencer à échanger
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden -ml-2 text-muted-foreground hover:text-foreground"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <Avatar className="w-10 h-10">
            <AvatarImage src={participant?.avatar} />
            <AvatarFallback className="bg-secondary text-foreground font-medium">
              {participant?.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-foreground">{participant?.name}</h3>
            <p className="text-xs text-primary">En ligne</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((message, index) => {
          const isDoctor = message.senderRole === 'doctor' && !message.isAI;
          const isAI = message.isAI;
          const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;

          return (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 animate-fade-in',
                isDoctor || isAI ? 'justify-end' : 'justify-start'
              )}
            >
              {!isDoctor && !isAI && showAvatar && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-secondary text-foreground text-xs">
                    {participant?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  'max-w-[70%] px-4 py-3',
                  isAI
                    ? 'message-bubble-ai text-accent-foreground'
                    : isDoctor
                    ? 'message-bubble-doctor text-primary-foreground'
                    : 'message-bubble-patient text-foreground'
                )}
              >
                {isAI && (
                  <div className="flex items-center gap-2 mb-2 text-xs opacity-80">
                    <Bot className="w-4 h-4" />
                    <span>Assistant IA</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={cn(
                  'flex items-center gap-1 mt-2 text-xs',
                  isDoctor || isAI ? 'justify-end' : 'justify-start',
                  'opacity-70'
                )}>
                  <span>{formatTime(message.timestamp)}</span>
                  {(isDoctor || isAI) && statusIcons[message.status]}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-secondary text-foreground text-xs">
                {participant?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="message-bubble-patient px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0s' }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-thin border-t border-border/50">
        <button className="action-button whitespace-nowrap">
          <Calendar className="w-4 h-4" />
          <span>Rendez-vous</span>
        </button>
        <button className="action-button whitespace-nowrap">
          <RefreshCw className="w-4 h-4" />
          <span>Suivi</span>
        </button>
        <button className="action-button whitespace-nowrap">
          <FileBarChart className="w-4 h-4" />
          <span>Rapport</span>
        </button>
        <button className="action-button whitespace-nowrap">
          <Receipt className="w-4 h-4" />
          <span>Ordonnance</span>
        </button>
        <button onClick={onOpenAI} className="action-button-accent whitespace-nowrap">
          <Bot className="w-4 h-4" />
          <span>Assistant IA</span>
        </button>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="chat-input-area flex items-center gap-2 p-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Smile className="w-5 h-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Paperclip className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover border-border">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Image className="w-4 h-4 text-primary" />
                <span>Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FileText className="w-4 h-4 text-info" />
                <span>Document PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Receipt className="w-4 h-4 text-success" />
                <span>Ordonnance</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FileBarChart className="w-4 h-4 text-warning" />
                <span>Rapport médical</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            placeholder="Écrivez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
          />

          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Mic className="w-5 h-5" />
          </Button>

          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="gradient-primary text-primary-foreground rounded-xl px-4 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
