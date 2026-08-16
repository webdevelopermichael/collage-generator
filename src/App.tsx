import React, { useState, useEffect } from 'react';
import { CollageState, UserAccount } from './types';
import {
  loadCurrentProject,
  saveCurrentProject,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  DEFAULT_INITIAL_STATE,
} from './core/storage';
import { applyPopularTemplate } from './core/aiComposerEngine';
import { LAYOUT_PRESETS } from './core/layoutEngine';
import { Language } from './core/i18n';

// Landing Page Components
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { LiveDemo } from './components/landing/LiveDemo';
import { Features } from './components/landing/Features';
import { AiSection } from './components/landing/AiSection';
import { SeoContent } from './components/landing/SeoContent';
import { Faq } from './components/landing/Faq';
import { Footer } from './components/landing/Footer';

// Editor Components
import { EditorHeader } from './components/editor/EditorHeader';
import { CanvasStage } from './components/editor/CanvasStage';
import { Sidebar, SidebarTabId } from './components/editor/Sidebar';
import { ExportModal } from './components/editor/ExportModal';
import { ProjectsModal } from './components/editor/ProjectsModal';
import { AuthModal } from './components/auth/AuthModal';

// Helpers to parse route and language from URL path
// Supported paths: /, /ru, /ua, /editor, /ru/editor, /ua/editor
function parseRouteAndLang(pathname: string): { view: 'landing' | 'editor'; lang: Language } {
  let lang: Language = 'en';
  const clean = pathname.toLowerCase();

  if (clean.startsWith('/ru')) {
    lang = 'ru';
  } else if (clean.startsWith('/ua') || clean.startsWith('/uk')) {
    lang = 'ua';
  }

  const isEditor = clean.includes('/editor');
  return { view: isEditor ? 'editor' : 'landing', lang };
}

function constructPath(view: 'landing' | 'editor', lang: Language): string {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  if (view === 'editor') {
    return `${langPrefix}/editor`;
  }
  return langPrefix || '/';
}

export function App() {
  const initial = parseRouteAndLang(window.location.pathname);

  const [currentView, setCurrentView] = useState<'landing' | 'editor'>(initial.view);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('collagenie_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ru' || saved === 'ua')) {
      return initial.lang !== 'en' ? initial.lang : saved;
    }
    return initial.lang;
  });

  const [user, setUser] = useState<UserAccount>(getStoredUser());
  const [collageState, setCollageState] = useState<CollageState>(loadCurrentProject());

  // Editor UI state
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTabId>('layouts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Undo / Redo stacks
  const [history, setHistory] = useState<CollageState[]>([collageState]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // Navigation with URL updates
  const navigateTo = (view: 'landing' | 'editor', nextLang: Language = language) => {
    setCurrentView(view);
    const targetPath = constructPath(view, nextLang);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('collagenie_lang', newLang);
    const targetPath = constructPath(currentView, newLang);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  // Listen to popstate (browser Back / Forward buttons)
  useEffect(() => {
    const onPopState = () => {
      const parsed = parseRouteAndLang(window.location.pathname);
      setCurrentView(parsed.view);
      setLanguage(parsed.lang);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Autosave whenever collageState changes
  useEffect(() => {
    saveCurrentProject(collageState);
  }, [collageState]);

  // State update wrapper with history tracking & autosave
  const handleUpdateCollageState = (updater: (prev: CollageState) => CollageState) => {
    setCollageState(prev => {
      const nextState = updater(prev);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(nextState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      return nextState;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCollageState(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCollageState(history[historyIndex + 1]);
    }
  };

  // Create new project
  const handleNewProject = () => {
    const freshState: CollageState = {
      ...DEFAULT_INITIAL_STATE,
      id: `proj-${Date.now()}`,
      name: `Collage #${Date.now().toString().slice(-4)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      cells: [
        { id: `c-${Date.now()}-1`, x: 0, y: 0, w: 0.5, h: 0.5, imageUrl: undefined, zoom: 1, offsetX: 0, offsetY: 0, rotate: 0, filter: 'none' },
        { id: `c-${Date.now()}-2`, x: 0.5, y: 0, w: 0.5, h: 0.5, imageUrl: undefined, zoom: 1, offsetX: 0, offsetY: 0, rotate: 0, filter: 'none' },
        { id: `c-${Date.now()}-3`, x: 0, y: 0.5, w: 0.5, h: 0.5, imageUrl: undefined, zoom: 1, offsetX: 0, offsetY: 0, rotate: 0, filter: 'none' },
        { id: `c-${Date.now()}-4`, x: 0.5, y: 0.5, w: 0.5, h: 0.5, imageUrl: undefined, zoom: 1, offsetX: 0, offsetY: 0, rotate: 0, filter: 'none' },
      ],
      badges: [],
    };
    saveCurrentProject(freshState);
    setCollageState(freshState);
    setHistory([freshState]);
    setHistoryIndex(0);
    setSelectedCellId(null);
    setSelectedBadgeId(null);
    navigateTo('editor');
  };

  const handleOpenAiWithPreset = (templateId: string) => {
    const existingImages = collageState.cells.map(c => c.imageUrl).filter(Boolean) as string[];
    const synthesized = applyPopularTemplate(templateId, existingImages);
    handleUpdateCollageState(prev => ({
      ...prev,
      ...synthesized,
    }));
    setActiveSidebarTab('ai');
    setIsSidebarOpen(true);
    navigateTo('editor');
  };

  const handleOpenPresetFromLanding = (presetId: string) => {
    const preset = LAYOUT_PRESETS.find(p => p.id === presetId);
    if (preset) {
      handleUpdateCollageState(prev => ({
        ...prev,
        layoutTemplateId: preset.id,
        cells: preset.cells.map((cg, i) => ({
          id: `cell-${Date.now()}-${i}`,
          ...cg,
          imageUrl: prev.cells[i]?.imageUrl,
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          filter: 'none',
        })),
      }));
    }
    setActiveSidebarTab('layouts');
    setIsSidebarOpen(true);
    navigateTo('editor');
  };

  const handleAuthSuccess = (authUser: UserAccount) => {
    setUser(authUser);
    setStoredUser(authUser);
  };

  const handleLogout = () => {
    clearStoredUser();
    setUser({
      id: 'guest',
      email: '',
      name: 'Creator',
      isLoggedIn: false,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {currentView === 'landing' ? (
        <>
          <Navbar
            onOpenEditor={() => navigateTo('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />

          <main className="flex-1 overflow-x-hidden">
            <Hero
              onOpenEditor={() => navigateTo('editor')}
              onOpenAiTab={() => {
                setActiveSidebarTab('ai');
                setIsSidebarOpen(true);
                navigateTo('editor');
              }}
              language={language}
            />
            <LiveDemo onOpenEditorWithPreset={handleOpenPresetFromLanding} language={language} />
            <Features language={language} />
            <AiSection onSelectAiPreset={handleOpenAiWithPreset} language={language} />
            <SeoContent language={language} />
            <Faq language={language} />
          </main>

          <Footer onOpenEditor={() => navigateTo('editor')} language={language} />
        </>
      ) : (
        <div
          className="flex flex-col bg-neutral-950"
          style={{ height: '100dvh', overflow: 'hidden', position: 'fixed', inset: 0 }}
        >
          <EditorHeader
            state={collageState}
            onChangeState={handleUpdateCollageState}
            onBackToLanding={() => navigateTo('landing')}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenProjects={() => setIsProjectsOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />

          {/* Main Workspace: Desktop Left Sidebar + Canvas, Mobile Canvas + Bottom Dock */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
            <Sidebar
              state={collageState}
              activeTab={activeSidebarTab}
              setActiveTab={setActiveSidebarTab}
              selectedCellId={selectedCellId}
              selectedBadgeId={selectedBadgeId}
              onSelectCell={setSelectedCellId}
              onSelectBadge={setSelectedBadgeId}
              onChangeState={handleUpdateCollageState}
              isOpen={isSidebarOpen}
              onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
              language={language}
            />

            <div className="flex-1 overflow-hidden relative pb-14 md:pb-0 h-full">
              <CanvasStage
                state={collageState}
                selectedCellId={selectedCellId}
                selectedBadgeId={selectedBadgeId}
                onSelectCell={setSelectedCellId}
                onSelectBadge={setSelectedBadgeId}
                onChangeState={handleUpdateCollageState}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        state={collageState}
        language={language}
      />

      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        currentProjectId={collageState.id}
        onSelectProject={proj => {
          setCollageState(proj);
          setHistory([proj]);
          setHistoryIndex(0);
        }}
        onNewProject={handleNewProject}
        language={language}
      />
    </div>
  );
}

export default App;
