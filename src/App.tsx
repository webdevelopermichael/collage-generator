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

// Dedicated Content Pages
import { AboutPage } from './components/pages/AboutPage';
import { PlatformHubPage } from './components/pages/PlatformHubPage';
import { GuidesPage } from './components/pages/GuidesPage';
import { LegalPages } from './components/pages/LegalPages';
import { AdminDashboard } from './components/admin/AdminDashboard';

export type AppView =
  | 'landing'
  | 'editor'
  | 'about'
  | 'guides'
  | 'platform-instagram'
  | 'platform-tiktok'
  | 'platform-saas-mockup'
  | 'platform-pinterest'
  | 'privacy'
  | 'terms'
  | 'dmca'
  | 'contact'
  | 'admin';

function parseRouteAndLang(pathname: string): { view: AppView; lang: Language; guideSlug?: string } {
  let lang: Language = 'en';
  const clean = pathname.toLowerCase();

  if (clean.startsWith('/ru')) {
    lang = 'ru';
  } else if (clean.startsWith('/ua') || clean.startsWith('/uk')) {
    lang = 'ua';
  }

  if (clean.includes('/admin')) return { view: 'admin', lang };
  if (clean.includes('/editor')) return { view: 'editor', lang };
  if (clean.includes('/about')) return { view: 'about', lang };
  if (clean.includes('/privacy')) return { view: 'privacy', lang };
  if (clean.includes('/terms')) return { view: 'terms', lang };
  if (clean.includes('/dmca')) return { view: 'dmca', lang };
  if (clean.includes('/contact')) return { view: 'contact', lang };
  if (clean.includes('/platforms/instagram') || clean.includes('platform-instagram')) return { view: 'platform-instagram', lang };
  if (clean.includes('/platforms/tiktok') || clean.includes('platform-tiktok')) return { view: 'platform-tiktok', lang };
  if (clean.includes('/platforms/saas') || clean.includes('platform-saas-mockup')) return { view: 'platform-saas-mockup', lang };
  if (clean.includes('/platforms/pinterest') || clean.includes('platform-pinterest')) return { view: 'platform-pinterest', lang };
  
  if (clean.includes('/guides') || clean.includes('/blog')) {
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    const guideSlug = (lastPart !== 'guides' && lastPart !== 'blog' && lastPart !== 'ru' && lastPart !== 'ua') ? lastPart : undefined;
    return { view: 'guides', lang, guideSlug };
  }

  return { view: 'landing', lang };
}

function constructPath(view: AppView, lang: Language, guideSlug?: string): string {
  const langPrefix = lang === 'en' ? '' : `/${lang}`;
  if (view === 'admin') return '/admin';
  if (view === 'editor') return `${langPrefix}/editor`;
  if (view === 'about') return `${langPrefix}/about`;
  if (view === 'privacy') return `${langPrefix}/privacy-policy`;
  if (view === 'terms') return `${langPrefix}/terms-of-service`;
  if (view === 'dmca') return `${langPrefix}/dmca`;
  if (view === 'contact') return `${langPrefix}/contact`;
  if (view === 'platform-instagram') return `${langPrefix}/platforms/instagram-collages`;
  if (view === 'platform-tiktok') return `${langPrefix}/platforms/tiktok-mosaic`;
  if (view === 'platform-saas-mockup') return `${langPrefix}/platforms/saas-mockups`;
  if (view === 'platform-pinterest') return `${langPrefix}/platforms/pinterest-grids`;
  if (view === 'guides') {
    return guideSlug ? `${langPrefix}/guides/${guideSlug}` : `${langPrefix}/guides`;
  }
  return langPrefix || '/';
}

export function App() {
  const initial = parseRouteAndLang(window.location.pathname);

  const [currentView, setCurrentView] = useState<AppView>(initial.view);
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | undefined>(initial.guideSlug);

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('collagenie_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ru' || saved === 'ua')) {
      return initial.lang !== 'en' ? initial.lang : saved;
    }
    return initial.lang;
  });

  const [user, setUser] = useState<UserAccount>(getStoredUser());
  const [collageState, setCollageState] = useState<CollageState>(() => {
    const loaded = loadCurrentProject();
    const savedRatio = localStorage.getItem('collagenie_preferred_ratio') as CollageState['aspectRatio'];
    const savedW = localStorage.getItem('collagenie_custom_w');
    const savedH = localStorage.getItem('collagenie_custom_h');

    return {
      ...loaded,
      aspectRatio: savedRatio || loaded.aspectRatio || '16:9',
      customWidth: savedW ? parseInt(savedW, 10) : (loaded.customWidth || 1920),
      customHeight: savedH ? parseInt(savedH, 10) : (loaded.customHeight || 1080),
      canvasRadius: loaded.canvasRadius ?? 24,
    };
  });

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
  const navigateTo = (view: AppView, nextLang: Language = language, guideSlug?: string) => {
    setCurrentView(view);
    setActiveGuideSlug(guideSlug);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const targetPath = constructPath(view, nextLang, guideSlug);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('collagenie_lang', newLang);
    const targetPath = constructPath(currentView, newLang, activeGuideSlug);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  // Listen to popstate (browser Back / Forward buttons)
  useEffect(() => {
    const onPopState = () => {
      const parsed = parseRouteAndLang(window.location.pathname);
      setCurrentView(parsed.view);
      setActiveGuideSlug(parsed.guideSlug);
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
      if (newHistory.length > 30) newHistory.shift();
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      return nextState;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setCollageState(history[prevIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCollageState(history[nextIdx]);
    }
  };

  const handleAuthSuccess = (authUser: UserAccount) => {
    setUser(authUser);
    setStoredUser(authUser);
  };

  const handleLogout = () => {
    clearStoredUser();
    setUser({ id: 'guest', email: '', name: 'Guest Creator', isLoggedIn: false });
  };

  const handleNewProject = () => {
    const newProj: CollageState = {
      ...DEFAULT_INITIAL_STATE,
      id: `proj_${Date.now()}`,
      name: 'Untitled Collage',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      cells: LAYOUT_PRESETS[0].cells.map((c, i) => ({
        id: `c_${i + 1}`,
        x: c.x,
        y: c.y,
        w: c.w,
        h: c.h,
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        fitMode: 'contain',
      })),
      badges: [],
      textOverlays: [],
    };
    setCollageState(newProj);
    setHistory([newProj]);
    setHistoryIndex(0);
    setIsProjectsOpen(false);
  };

  return (
    <div className={`${currentView === 'editor' ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-neutral-950 text-neutral-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white`}>
      {/* ── ADMIN VIEW ────────────────────────────────────────────────────────── */}
      {currentView === 'admin' && (
        <AdminDashboard
          onNavigateHome={() => navigateTo('landing')}
          onOpenEditor={() => navigateTo('editor')}
        />
      )}

      {/* ── LANDING VIEW ──────────────────────────────────────────────────────── */}
      {currentView === 'landing' && (
        <>
          <Navbar
            onOpenEditor={() => navigateTo('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />
          <main className="flex-grow">
            <Hero
              onOpenEditor={() => navigateTo('editor')}
              onOpenAiTab={() => {
                setActiveSidebarTab('ai');
                navigateTo('editor');
              }}
              language={language}
            />
            <LiveDemo
              onOpenEditorWithPreset={presetId => {
                const preset = LAYOUT_PRESETS.find(p => p.id === presetId) || LAYOUT_PRESETS[0];
                handleUpdateCollageState(prev => ({
                  ...prev,
                  layoutTemplateId: preset.id,
                  cells: preset.cells.map((c, i) => ({
                    id: `c_${i + 1}`,
                    x: c.x,
                    y: c.y,
                    w: c.w,
                    h: c.h,
                    zoom: 1,
                    offsetX: 0,
                    offsetY: 0,
                    rotate: 0,
                    fitMode: 'contain',
                    imageUrl: prev.cells[i]?.imageUrl,
                  })),
                }));
                navigateTo('editor');
              }}
              language={language}
            />
            <Features language={language} />
            <AiSection
              onSelectAiPreset={templateId => {
                const templated = applyPopularTemplate(templateId, []);
                handleUpdateCollageState(prev => ({
                  ...prev,
                  ...templated,
                }));
                navigateTo('editor');
              }}
              language={language}
            />
            <SeoContent language={language} />
            <Faq language={language} />
          </main>
          <Footer
            onOpenEditor={() => navigateTo('editor')}
            onNavigatePage={(page: string) => navigateTo(page as AppView)}
            language={language}
          />
        </>
      )}

      {/* ── ABOUT PAGE ───────────────────────────────────────────────────────── */}
      {currentView === 'about' && (
        <>
          <Navbar
            onOpenEditor={() => navigateTo('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />
          <AboutPage
            onOpenEditor={() => navigateTo('editor')}
            onNavigateHome={() => navigateTo('landing')}
            language={language}
          />
          <Footer
            onOpenEditor={() => navigateTo('editor')}
            onNavigatePage={(page: string) => navigateTo(page as AppView)}
            language={language}
          />
        </>
      )}

      {/* ── PLATFORM HUBS ────────────────────────────────────────────────────── */}
      {(currentView === 'platform-instagram' ||
        currentView === 'platform-tiktok' ||
        currentView === 'platform-saas-mockup' ||
        currentView === 'platform-pinterest') && (
        <>
          <Navbar
            onOpenEditor={() => navigateTo('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />
          <PlatformHubPage
            platformId={
              currentView === 'platform-instagram'
                ? 'instagram'
                : currentView === 'platform-tiktok'
                ? 'tiktok'
                : currentView === 'platform-saas-mockup'
                ? 'saas-mockup'
                : 'pinterest'
            }
            onOpenEditor={() => navigateTo('editor')}
            onNavigateHome={() => navigateTo('landing')}
            language={language}
          />
          <Footer
            onOpenEditor={() => navigateTo('editor')}
            onNavigatePage={(page: string) => navigateTo(page as AppView)}
            language={language}
          />
        </>
      )}

      {/* ── GUIDES & BLOG ────────────────────────────────────────────────────── */}
      {currentView === 'guides' && (
        <>
          <Navbar
            onOpenEditor={() => navigateTo('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />
          <GuidesPage
            selectedSlug={activeGuideSlug}
            onOpenArticle={(slug: string) => navigateTo('guides', language, slug)}
            onOpenEditor={() => navigateTo('editor')}
            onNavigateHome={() => navigateTo('landing')}
            language={language}
          />
          <Footer
            onOpenEditor={() => navigateTo('editor')}
            onNavigatePage={(page: string) => navigateTo(page as AppView)}
            language={language}
          />
        </>
      )}

      {/* ── LEGAL & TRUST PAGES (Privacy, Terms, DMCA, Contact) ──────────────── */}
      {(currentView === 'privacy' || currentView === 'terms' || currentView === 'dmca' || currentView === 'contact') && (
        <>
          <Navbar
            onOpenEditor={() => navigateTo('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
            language={language}
            onSelectLanguage={handleSelectLanguage}
          />
          <LegalPages
            view={currentView}
            onNavigateHome={() => navigateTo('landing')}
            language={language}
          />
          <Footer
            onOpenEditor={() => navigateTo('editor')}
            onNavigatePage={(page: string) => navigateTo(page as AppView)}
            language={language}
          />
        </>
      )}

      {/* ── STUDIO EDITOR VIEW ────────────────────────────────────────────────── */}
      {currentView === 'editor' && (
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
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

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative min-h-0">
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
                language={language}
                onCanvasClick={() => {
                  setActiveSidebarTab('ratios');
                  setIsSidebarOpen(true);
                }}
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
