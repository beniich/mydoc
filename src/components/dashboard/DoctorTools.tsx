// @ts-nocheck
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Video, Phone, MessageSquare, Send, FileText, Bot, Upload, User, Share2, ClipboardList, Info, Activity, Settings } from "lucide-react";

export function DoctorTools({ onAction }: { onAction?: (msg: string) => void }) {
    const [activeTab, setActiveTab] = useState("consultation");

    // Mock Data for AI
    const [aiMessages, setAiMessages] = useState([
        { role: 'ai', content: "Hello Dr. Smith. I'm ready to assist you. Upload a scan or paste patient data for analysis." }
    ]);
    const [aiInput, setAiInput] = useState("");

    const handleAiSend = () => {
        if (!aiInput.trim()) return;
        setAiMessages([...aiMessages, { role: 'user', content: aiInput }]);
        setTimeout(() => {
            setAiMessages(prev => [...prev, { role: 'ai', content: "Analyzing... I've detected a slight arrhythmia in the provided ECG data. Suggesting a follow-up stress test." }]);
        }, 1500);
        setAiInput("");
    };

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Clinical Tools</h1>
                    <p className="text-muted-foreground">Advanced tools for patient care and analysis.</p>
                </div>
            </div>

            <Tabs defaultValue="consultation" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 max-w-[800px] mb-8">
                    <TabsTrigger value="consultation" className="gap-2"><Video className="w-4 h-4" /> Telemedicine</TabsTrigger>
                    <TabsTrigger value="ai-assistant" className="gap-2"><Bot className="w-4 h-4" /> AI Assistant</TabsTrigger>
                    <TabsTrigger value="patient-manager" className="gap-2"><User className="w-4 h-4" /> Patients</TabsTrigger>
                    <TabsTrigger value="profile" className="gap-2"><Settings className="w-4 h-4" /> Settings</TabsTrigger>
                </TabsList>

                {/* --- ONLINE CONSULTATION --- */}
                <TabsContent value="consultation" className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Video Area */}
                        <Card className="md:col-span-2 overflow-hidden bg-black relative min-h-[400px] flex items-center justify-center">
                            <div className="absolute top-4 right-4 z-10">
                                <Badge variant="destructive" className="animate-pulse">Live - 12:42</Badge>
                            </div>
                            <div className="text-center text-white/50">
                                <User className="w-24 h-24 mx-auto mb-4 opacity-50" />
                                <p className="text-xl font-medium">Waiting for Patient...</p>
                                <p className="text-sm">Meeting ID: 492-492-111</p>
                            </div>
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                                <Button variant="destructive" className="rounded-full w-12 h-12 p-0" onClick={() => onAction && onAction("Call ended.")}>
                                    <Phone className="w-6 h-6 rotate-[135deg]" />
                                </Button>
                                <Button variant="secondary" className="rounded-full w-12 h-12 p-0">
                                    <Video className="w-6 h-6" />
                                </Button>
                                <Button variant="secondary" className="rounded-full w-12 h-12 p-0">
                                    <MessageSquare className="w-6 h-6" />
                                </Button>
                            </div>
                        </Card>

                        {/* Consultation Controls */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Consultation Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <textarea className="w-full min-h-[200px] p-3 rounded-md bg-muted text-sm focus:outline-none focus:ring-1 focus:ring-primary mb-4" placeholder="Type clinical notes here..." />
                                    <Button className="w-full" onClick={() => onAction && onAction("Notes saved to patient record.")}>
                                        Save Notes
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => onAction && onAction("Prescription sent to pharmacy.")}>
                                        <FileText className="w-4 h-4" /> Send Prescription
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => onAction && onAction("Shared screen with patient.")}>
                                        <Share2 className="w-4 h-4" /> Share Screen
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* --- AI ASSISTANT --- */}
                <TabsContent value="ai-assistant" className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-6 h-[500px]">
                        {/* History / Tools */}
                        <Card className="col-span-1 hidden md:flex flex-col">
                            <CardHeader>
                                <CardTitle>Analysis Tools</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 flex-1">
                                <Button variant="ghost" className="w-full justify-start gap-2"><Bot className="w-4 h-4" /> General Diagnosis</Button>
                                <Button variant="ghost" className="w-full justify-start gap-2"><Activity className="w-4 h-4" /> ECG Analysis</Button>
                                <Button variant="ghost" className="w-full justify-start gap-2"><FileText className="w-4 h-4" /> Report Summarizer</Button>
                            </CardContent>
                            <div className="p-4 border-t border-border">
                                <Button variant="secondary" className="w-full gap-2">
                                    <Upload className="w-4 h-4" /> Upload Scan
                                </Button>
                            </div>
                        </Card>

                        {/* Chat Area */}
                        <Card className="col-span-3 flex flex-col">
                            <CardHeader className="border-b border-border pb-4">
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="w-5 h-5 text-primary" />
                                    Medical AI Assistant
                                </CardTitle>
                                <CardDescription>Analyze scans, prescriptions, and diagrams.</CardDescription>
                                <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-600 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    <strong>Disclaimer:</strong> This AI report is a decision aid only. The final diagnosis remains the responsibility of the physician.
                                </div>
                            </CardHeader>
                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                {aiMessages.map((m, i) => (
                                    <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'ai' ? 'bg-muted rounded-tl-none' : 'bg-primary text-primary-foreground rounded-tr-none'}`}>
                                            {m.role === 'ai' && <p className="font-bold text-xs mb-1 opacity-70">AI Assistant</p>}
                                            {m.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-border flex gap-2">
                                <Input 
                                    placeholder="Ask for analysis or attach a file..." 
                                    value={aiInput}
                                    onChange={(e) => setAiInput(e.target.value)}
                                    // onEnter={handleAiSend} // Need explicit key handler if desired
                                    onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                                />
                                <Button onClick={handleAiSend} disabled={!aiInput.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- PATIENT MANAGER --- */}
                <TabsContent value="patient-manager">
                    <Card>
                         <CardHeader>
                            <CardTitle>Patient List</CardTitle>
                            <CardDescription>Manage appointments and communications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                                                {['JD', 'AS', 'MR'][i]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{['John Doe', 'Alice Smith', 'Michael Ross'][i]}</h4>
                                                <p className="text-sm text-muted-foreground">{['Hypertension Follow-up', 'Routine Checkup', 'Dermatology Consult'][i]}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" className="gap-2 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => onAction && onAction("WhatsApp reminder sent!")}>
                                                <MessageSquare className="w-4 h-4" /> Remind
                                            </Button>
                                            <Button variant="outline" size="sm" className="gap-2" onClick={() => onAction && onAction("Report sent to patient portal.")}>
                                                <ClipboardList className="w-4 h-4" /> Send Report
                                            </Button>
                                            <Button size="sm">Details</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- PROFILE & PRICING --- */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile & Pricing</CardTitle>
                            <CardDescription>Manage your public profile and consultation fees.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Consultation Price (Standard)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                        <Input defaultValue="150" className="pl-6" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">This price will be displayed to patients.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Online Consultation Discount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                                        <Input defaultValue="10" className="pl-6" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Percentage off for video calls.</p>
                                </div>
                            </div>
                            <Button onClick={() => onAction && onAction("Profile settings saved successfully!")}>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
