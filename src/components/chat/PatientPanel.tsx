import React from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Activity,
  Pill,
  Heart,
  AlertTriangle,
  Video,
  FileBarChart,
  Bot,
  Send,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { PatientFile } from '@/types/chat';

interface PatientPanelProps {
  patientFile?: PatientFile;
  onOpenAI: () => void;
}

export const PatientPanel: React.FC<PatientPanelProps> = ({ patientFile, onOpenAI }) => {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    info: true,
    history: true,
    prescriptions: false,
    reports: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (!patientFile) {
    return (
      <div className="w-80 bg-card border-l border-border flex items-center justify-center">
        <div className="text-center p-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Sélectionnez un patient pour voir son dossier
          </p>
        </div>
      </div>
    );
  }

  const { patient, consultations, prescriptions, reports } = patientFile;

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full overflow-hidden">
      {/* Patient Header */}
      <div className="p-4 border-b border-border gradient-card">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={patient.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-medium">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{patient.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{patient.age} ans</span>
              <span>•</span>
              <span>{patient.gender === 'M' ? 'Homme' : 'Femme'}</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-secondary/50 rounded-lg p-2.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Heart className="w-3.5 h-3.5 text-destructive" />
              <span>Groupe sanguin</span>
            </div>
            <p className="text-sm font-medium text-foreground">{patient.bloodType || 'N/A'}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-2.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Dernière visite</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Allergies & Conditions */}
        {(patient.allergies?.length || patient.conditions?.length) && (
          <div className="p-4 border-b border-border/50">
            {patient.allergies && patient.allergies.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 text-xs text-destructive mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="font-medium">Allergies</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="destructive" className="text-xs bg-destructive/20 text-destructive border-destructive/30">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {patient.conditions && patient.conditions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs text-warning mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="font-medium">Antécédents</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {patient.conditions.map((condition, i) => (
                    <Badge key={i} className="text-xs bg-warning/20 text-warning border-warning/30">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Consultations */}
        <Collapsible open={openSections.history}>
          <CollapsibleTrigger 
            onClick={() => toggleSection('history')}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="w-4 h-4 text-info" />
              <span>Historique consultations</span>
            </div>
            <ChevronDown className={cn(
              'w-4 h-4 text-muted-foreground transition-transform',
              openSections.history && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-2">
              {consultations.map((consultation) => (
                <div key={consultation.id} className="bg-secondary/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      {new Date(consultation.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{consultation.diagnosis}</p>
                  <p className="text-xs text-muted-foreground mt-1">{consultation.notes}</p>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Prescriptions */}
        <Collapsible open={openSections.prescriptions}>
          <CollapsibleTrigger 
            onClick={() => toggleSection('prescriptions')}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors border-t border-border/50"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Pill className="w-4 h-4 text-success" />
              <span>Ordonnances</span>
            </div>
            <ChevronDown className={cn(
              'w-4 h-4 text-muted-foreground transition-transform',
              openSections.prescriptions && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-2">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="bg-secondary/30 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(rx.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <ul className="mt-2 space-y-1">
                    {rx.medications.map((med, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                        {med}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Reports */}
        <Collapsible open={openSections.reports}>
          <CollapsibleTrigger 
            onClick={() => toggleSection('reports')}
            className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors border-t border-border/50"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              <span>Rapports</span>
            </div>
            <ChevronDown className={cn(
              'w-4 h-4 text-muted-foreground transition-transform',
              openSections.reports && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-2">
              {reports.map((report) => (
                <div key={report.id} className="bg-secondary/30 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button className="w-full gradient-primary text-primary-foreground gap-2">
          <Video className="w-4 h-4" />
          Lancer visioconférence
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" className="gap-2 text-sm">
            <FileBarChart className="w-4 h-4" />
            Rapport
          </Button>
          <Button onClick={onOpenAI} className="gap-2 text-sm gradient-accent text-accent-foreground">
            <Bot className="w-4 h-4" />
            IA
          </Button>
        </div>
        <Button variant="outline" className="w-full gap-2 border-border text-muted-foreground hover:text-foreground">
          <Send className="w-4 h-4" />
          Envoyer au patient
        </Button>
      </div>
    </div>
  );
};
