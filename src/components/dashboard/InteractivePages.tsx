
import React, { useState } from 'react';
import { Mail, Search, Paperclip, Send, MoreVertical, FileText, Image, Film, Upload, Trash2, Bell, User, Moon, Sun, Monitor, CreditCard } from 'lucide-react';
import { useTheme } from 'next-themes';

// --- Shared Components ---
const PageHeader = ({ title, description, action }: { title: string, description: string, action?: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
        </div>
        {action}
    </div>
);

// --- Messages Page ---
export function MessagesContent() {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I noticed the new dashboard layout. Looks great!", sender: 'them', time: '10:00 AM' },
        { id: 2, text: "Thanks! We just pushed the update. Let me know if you find any bugs.", sender: 'me', time: '10:05 AM' }
    ]);

    const chats = [
        { id: 1, name: "Alice Johnson", preview: "Hey, can we check the sales report?", time: "2m ago", unread: true, avatar: "AJ" },
        { id: 2, name: "Bob Smith", preview: "Meeting rescheduled to 3 PM.", time: "1h ago", unread: false, avatar: "BS" },
        { id: 3, name: "Carol White", preview: "The new design assets are ready.", time: "1d ago", unread: false, avatar: "CW" },
    ];

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        
        const newMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-300">
            <PageHeader title="Messages" description="Team communication and updates." />
            
            <div className="flex-1 flex border border-border rounded-xl overflow-hidden bg-card shadow-sm">
                {/* Sidebar List */}
                <div className="w-full md:w-80 border-r border-border flex flex-col">
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                                placeholder="Search messages..." 
                                className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {chats.map(chat => (
                            <button 
                                key={chat.id}
                                onClick={() => setSelectedChat(chat.id)}
                                className={`w-full text-left p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border/50 ${selectedChat === chat.id ? 'bg-muted' : ''}`}
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                    {chat.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold truncate">{chat.name}</p>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${chat.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                        {chat.preview}
                                    </p>
                                </div>
                                {chat.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="hidden md:flex flex-1 flex-col bg-muted/10">
                    {selectedChat ? (
                        <>
                            <div className="p-4 border-b border-border flex justify-between items-center bg-card">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {chats.find(c => c.id === selectedChat)?.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold">{chats.find(c => c.id === selectedChat)?.name}</p>
                                        <p className="text-xs text-green-500 flex items-center gap-1">● Online</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-muted rounded-full text-muted-foreground"><MoreVertical className="w-5 h-5" /></button>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'}`}>
                                            {msg.text}
                                            <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-card border-t border-border">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-muted-foreground hover:bg-muted rounded-full"><Paperclip className="w-5 h-5" /></button>
                                    <input 
                                        className="flex-1 bg-muted px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Type a message..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button 
                                        onClick={handleSendMessage}
                                        className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-transform active:scale-95"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                            <Mail className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Library Page ---
export function LibraryContent() {
    const files = [
        { name: "Project_Specs.pdf", type: "pdf", size: "2.4 MB", date: "Oct 24, 2024" },
        { name: "Dashboard_Mockup.png", type: "image", size: "1.8 MB", date: "Oct 23, 2024" },
        { name: "Q4_Financials.xlsx", type: "sheet", size: "850 KB", date: "Oct 20, 2024" },
        { name: "Team_Offsite.mp4", type: "video", size: "450 MB", date: "Sep 15, 2024" },
        { name: "Logo_Assets.zip", type: "zip", size: "12 MB", date: "Sep 10, 2024" },
    ];

    const getIcon = (type: string) => {
        switch(type) {
            case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
            case 'image': return <Image className="w-8 h-8 text-blue-500" />;
            case 'video': return <Film className="w-8 h-8 text-purple-500" />;
            default: return <FileText className="w-8 h-8 text-gray-500" />;
        }
    };

    return (
        <div className="animate-in fade-in duration-300">
            <PageHeader 
                title="Library" 
                description="Manage your documents and assets." 
                action={
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                        <Upload className="w-4 h-4" /> Upload File
                    </button>
                }
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {files.map((file, idx) => (
                    <div key={idx} className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center relative">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md"><Trash2 className="w-4 h-4" /></button>
                        </div>
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            {getIcon(file.type)}
                        </div>
                        <h3 className="font-semibold text-foreground truncate w-full">{file.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{file.size} • {file.date}</p>
                    </div>
                ))}
                {/* Upload Placeholder */}
                <div className="border-2 border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer min-h-[160px]">
                    <Upload className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">Drop files to upload</p>
                </div>
            </div>
        </div>
    );
}

// --- Settings Page ---
export function SettingsContent({ onAction }: { onAction?: (message: string) => void }) {
    const { theme, setTheme } = useTheme();

    return (
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader title="Settings" description="Manage your preferences and account settings." />

            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Profile Information</h3>
                            <p className="text-sm text-muted-foreground">Update your photo and personal details.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" defaultValue="john.doe@example.com" />
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500">
                            <Sun className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Appearance</h3>
                            <p className="text-sm text-muted-foreground">Customize the interface theme.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button 
                            onClick={() => setTheme('light')}
                            className={`p-4 border rounded-xl flex flex-col items-center gap-2 hover:bg-muted/50 transition-all ${theme === 'light' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                        >
                            <Sun className="w-6 h-6" />
                            <span className="text-sm font-medium">Light</span>
                        </button>
                        <button 
                            onClick={() => setTheme('dark')}
                            className={`p-4 border rounded-xl flex flex-col items-center gap-2 hover:bg-muted/50 transition-all ${theme === 'dark' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                        >
                            <Moon className="w-6 h-6" />
                            <span className="text-sm font-medium">Dark</span>
                        </button>
                        <button 
                            onClick={() => setTheme('system')}
                            className={`p-4 border rounded-xl flex flex-col items-center gap-2 hover:bg-muted/50 transition-all ${theme === 'system' ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                        >
                            <Monitor className="w-6 h-6" />
                            <span className="text-sm font-medium">System</span>
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-card border border-border rounded-xl p-6">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <p className="text-sm text-muted-foreground">Choose what you want to be notified about.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Alerts</p>
                                <p className="text-xs text-muted-foreground">Receive daily summaries</p>
                            </div>
                            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-xs text-muted-foreground">Real-time alerts on your device</p>
                            </div>
                             <div className="w-10 h-6 bg-muted rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Billing */}
                <div className="bg-card border border-border rounded-xl p-6">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Billing & Plans</h3>
                            <p className="text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
                            <div>
                                <p className="font-semibold">Current Plan: <span className="text-primary">Free</span></p>
                                <p className="text-xs text-muted-foreground">Basic features for personal use.</p>
                            </div>
                            <button 
                                onClick={() => onAction && onAction("Redirecting to payment provider...")}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Upgrade Plan
                            </button>
                        </div>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">No payment method added</span>
                            </div>
                            <button className="text-sm text-primary hover:underline">Add Method</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
