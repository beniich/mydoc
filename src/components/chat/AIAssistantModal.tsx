import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  FileText, 
  Image, 
  // Activity, 
  Brain,
  Send,
  Sparkles,
  AlertCircle,
  FileBarChart,
  Stethoscope,
  Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}

const aiCapabilities = [
  { icon: FileText, label: 'Analyser ordonnance', color: 'text-success' },
  { icon: Image, label: 'Scanner / ECG', color: 'text-info' },
  { icon: FileBarChart, label: 'Résumer dossier', color: 'text-primary' },
  { icon: Stethoscope, label: 'Diagnostic assisté', color: 'text-warning' },
  { icon: Pill, label: 'Recommandations', color: 'text-accent' },
  { icon: Brain, label: 'Explication patient', color: 'text-destructive' },
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  patientName,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let responseContent = `Analyse IA pour ${patientName || 'le patient'} :\n\n`;

    if (prompt.startsWith('Analyser ordonnance')) {
        responseContent += `📋 **Analyse de l'ordonnance**\n\n• **Médicaments chiffrés** : Amlodipine 5mg, Aspirine 100mg\n• **Interactions** : Aucune interaction majeure détectée.\n• **Posologie** : Conforme aux standards pour l'hypertension.\n• **Vigilance** : Surveiller la fonction rénale dans 3 mois.`;
    } else if (prompt.startsWith('Scanner / ECG')) {
        responseContent += `🖼️ **Analyse d'Imagerie / ECG**\n\n• **Observations** : Rythme sinusal régulier. Absence de signes d'ischémie aiguë.\n• **Anomalies** : Légère hypertrophie ventriculaire gauche suggérée.\n• **Recommandation** : Échocardiographie de contrôle conseillée.`;
    } else if (prompt.startsWith('Résumer dossier')) {
        responseContent += `📂 **Résumé du Dossier Patient**\n\n• **Antécédents** : Hypertension (2020), Diabète type 2 (2018).\n• **Dernière consultation** : 15/10/2025 - Motif : Suivi trimestriel.\n• **Traitement actuel** : Metformine, Amlodipine.\n• **Statut** : Stable.`;
    } else if (prompt.startsWith('Diagnostic assisté')) {
        responseContent += `🩺 **Aide au Diagnostic**\n\nBasé sur les symptômes décrits :\n1. **Hypothèse principale** : Migraine ophtalmique (Probabilité : 85%)\n2. **Diagnostic différentiel** : Algie vasculaire de la face.\n• **Suggestion** : Vérifier la tension oculaire et prescrire un triptan si confirmé.`;
    } else {
        responseContent += `Basé sur les informations fournies, voici mon analyse :\n\n• Les symptômes décrits sont cohérents avec le diagnostic actuel\n• Le traitement en cours semble approprié\n• Recommandation : continuer le suivi régulier`;
    }

    responseContent += `\n\n⚠️ Cette analyse est fournie à titre indicatif. Le diagnostic final appartient au médecin.`;
    
    setResponse(responseContent);
    setIsLoading(false);
  };

  const handleCapabilityClick = (label: string) => {
    setPrompt(`${label} pour ${patientName || 'ce patient'} : `);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="gradient-accent p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-accent-foreground">Assistant IA Médical</h2>
              <p className="text-xs text-accent-foreground/70">
                {patientName ? `Patient : ${patientName}` : 'Aucun patient sélectionné'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-accent-foreground/70 hover:text-accent-foreground hover:bg-background/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Capabilities */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Capacités de l'assistant :</p>
            <div className="grid grid-cols-3 gap-2">
              {aiCapabilities.map((cap) => (
                <button
                  key={cap.label}
                  onClick={() => handleCapabilityClick(cap.label)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                >
                  <cap.icon className={cn('w-4 h-4', cap.color)} />
                  <span className="text-xs text-foreground">{cap.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <Textarea
              placeholder="Décrivez votre demande à l'assistant IA..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] bg-secondary/30 border-border/50 focus:border-accent resize-none"
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              className="w-full gradient-accent text-accent-foreground gap-2"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyser
                </>
              )}
            </Button>
          </div>

          {/* Response */}
          {response && (
            <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground whitespace-pre-line">{response}</p>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-4 flex items-start gap-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-warning">
              L'IA assiste le médecin. Le diagnostic final et les décisions thérapeutiques appartiennent exclusivement au professionnel de santé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
