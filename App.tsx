
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { ReadinessDashboard } from './components/ReadinessDashboard';
import { Roadmap } from './components/Roadmap';
import { Projects } from './components/Projects';
import { TalentDiscovery } from './components/TalentDiscovery';
import { ChatBuddy } from './components/ChatBuddy';
import { CVSculptor } from './components/CVSculptor';
import { MarketAccelerator } from './components/MarketAccelerator';
import { PricingTable } from './components/PricingTable';
import { Onboarding } from './components/Onboarding';
import { AdaptiveSurvey } from './components/AdaptiveSurvey';
import { ProfileView } from './components/ProfileView';
import { SimulationDashboard } from './components/SimulationDashboard';
import { Language, ViewType, UserProfile, SurveyData } from './types';
import { Loader2, Zap } from 'lucide-react';

const DEFAULT_USER: UserProfile = {
  name: '',
  university: '',
  major: '',
  degreeLevel: 'undergraduate',
  email: '',
  bio: '',
  skills: [],
  projects: '',
  personality: '',
  isPremium: false,
  isOnboarded: false,
  mentorGender: 'female',
  theme: 'classic',
  isDarkMode: false,
  streak: 1,
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('edubridge_user');
    if (saved) return JSON.parse(saved);
    return DEFAULT_USER;
  });
  
  const [view, setView] = useState<ViewType>(user.isOnboarded ? (user.surveyData ? 'dashboard' : 'survey') : 'onboarding');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('edubridge_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    setUser(prev => ({ 
      ...prev, 
      ...data, 
      isOnboarded: true, 
      isPremium: true 
    }));
    setView('survey');
  };

  const handleSurveyComplete = (surveyData: Partial<SurveyData>) => {
    setUser(prev => ({ ...prev, surveyData: { ...prev.surveyData, ...surveyData } as SurveyData }));
    setView('dashboard');
  };

  const handleNavigate = (newView: ViewType) => {
    setIsLoading(true);
    setTimeout(() => {
      setView(newView);
      setIsLoading(false);
    }, 250);
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 animate-turbo">
          <div className="relative">
            <Loader2 size={64} className="text-burgundy animate-spin" strokeWidth={1.5} />
            <Zap className="absolute inset-0 m-auto text-burgundy animate-pulse" size={24} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-burgundy animate-pulse text-center">
            {lang === 'en' ? 'SYNCING TURBO ENGINE' : 'مزامنة محرك التوربو'}
          </p>
        </div>
      );
    }

    switch (view) {
      case 'onboarding':
        return <Onboarding lang={lang} onComplete={handleOnboardingComplete} />;
      case 'survey':
        return <AdaptiveSurvey lang={lang} user={user} onComplete={handleSurveyComplete} />;
      case 'dashboard':
        return <ReadinessDashboard lang={lang} userName={user.name} user={user} />;
      case 'virtual-lab':
        return <SimulationDashboard lang={lang} user={user} />;
      case 'profile':
        return <ProfileView lang={lang} user={user} onUpdate={setUser} />;
      case 'roadmap':
        return <Roadmap lang={lang} user={user} onSuccess={() => {}} userIsPremium={user.isPremium} onUpgrade={() => handleNavigate('pricing')} />;
      case 'cv-sculptor':
        return <CVSculptor lang={lang} userName={user.name} userIsPremium={user.isPremium} onUpgrade={() => handleNavigate('pricing')} />;
      case 'talent':
        return <TalentDiscovery lang={lang} />;
      case 'job-market':
        return <MarketAccelerator lang={lang} userName={user.name} />;
      case 'pricing':
        return <PricingTable lang={lang} userName={user.name} onUpgrade={() => { setUser(prev => ({ ...prev, isPremium: true })); handleNavigate('dashboard'); }} />;
      default:
        return <ReadinessDashboard lang={lang} userName={user.name} user={user} />;
    }
  };

  return (
    <div className="relative">
      <Layout 
        lang={lang} 
        onToggleLang={() => setLang(prev => prev === 'en' ? 'ar' : 'en')} 
        currentView={view}
        onNavigate={handleNavigate}
        user={user}
        onUpdateUser={setUser}
        onLogout={() => { localStorage.removeItem('edubridge_user'); window.location.reload(); }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      >
        <div className="relative min-h-screen">
          {renderView()}
        </div>
        {view !== 'onboarding' && view !== 'survey' && (
          <ChatBuddy 
            lang={lang} 
            userName={user.name} 
            userIsPremium={user.isPremium} 
            mentorGender={user.mentorGender} 
          />
        )}
      </Layout>
    </div>
  );
};

export default App;
