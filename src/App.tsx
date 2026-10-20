import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { SurveyForm } from './components/SurveyForm';
import { Dashboard } from './components/Dashboard';
import { AboutModal } from './components/AboutModal';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { ShareModal } from './components/ShareModal';
import { StorageService } from './services/storage';
import { SurveyFormData, SurveyResponseRecord } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'form' | 'dashboard' | 'about'>('form');
  const [responses, setResponses] = useState<SurveyResponseRecord[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [successSubmission, setSuccessSubmission] = useState<{
    open: boolean;
    protocol: string;
    data: SurveyFormData | null;
  }>({
    open: false,
    protocol: '',
    data: null,
  });

  const loadResponses = async () => {
    // Carrega dados locais imediatamente e busca atualizações do servidor
    const initialList = StorageService.getResponses();
    setResponses(initialList);

    const serverList = await StorageService.fetchServerResponses();
    if (serverList && serverList.length > 0) {
      setResponses(serverList);
    }
  };

  useEffect(() => {
    loadResponses();
  }, []);

  const handleFormSubmitted = (data: SurveyFormData, protocol: string) => {
    loadResponses();
    setSuccessSubmission({
      open: true,
      protocol,
      data,
    });
  };

  const handleResetForNewSurvey = () => {
    setSuccessSubmission({ open: false, protocol: '', data: null });
    setCurrentView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenShare={() => setIsShareModalOpen(true)}
        responseCount={responses.length}
      />

      {/* Hero Banner Oficial (Apenas visível na aba formulário) */}
      {currentView === 'form' && (
        <BannerHero onOpenShare={() => setIsShareModalOpen(true)} />
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {currentView === 'form' && (
          <SurveyForm onSubmitSuccess={handleFormSubmitted} />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            responses={responses}
            onRefresh={loadResponses}
            onNewSurvey={() => {
              setCurrentView('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'about' && (
          <AboutModal
            onBackToForm={() => {
              setCurrentView('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Modal de Sucesso após envio */}
      {successSubmission.open && successSubmission.data && (
        <SubmissionSuccessModal
          protocolNumber={successSubmission.protocol}
          data={successSubmission.data}
          onReset={handleResetForNewSurvey}
          onGoToDashboard={() => {
            setSuccessSubmission({ open: false, protocol: '', data: null });
            setCurrentView('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Modal de Compartilhamento / QR Code */}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}

      {/* Rodapé Institucional */}
      <footer className="no-print mt-auto bg-stone-900 text-stone-400 border-t border-stone-800 py-8 px-4 text-center text-xs">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-serif text-stone-300 font-semibold tracking-wide">
            Simpósio da Seção de Veteranos e Pensionistas — SVP / DAP 2026
          </p>
          <p className="text-stone-400">
            Diretoria de Assistência ao Pessoal · Departamento-Geral do Pessoal · Comando Militar do Planalto
          </p>
          <div className="pt-3 text-[11px] text-stone-400 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>Brasília - DF</span>
            <span>·</span>
            <span>19 a 22 de Outubro de 2026</span>
            <span>·</span>
            <span>Auditório CMP</span>
            <span>·</span>
            <span>1ª a 12ª RM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
