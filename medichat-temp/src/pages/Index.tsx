import MedicalChat from '@/components/MedicalChat';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MediChat Pro - Messagerie Médicale Sécurisée</title>
        <meta name="description" content="Plateforme de chat médical sécurisée pour professionnels de santé. Communication patient-médecin avec assistant IA intégré." />
      </Helmet>
      <MedicalChat />
    </>
  );
};

export default Index;
