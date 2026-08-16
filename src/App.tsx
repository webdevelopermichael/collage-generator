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

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'editor'>('landing');
  const [user, setUser] = useState<UserAccount>(getStoredUser());
  const [collageState, setCollageState] = useState<CollageState>(loadCurrentProject());

  // Editor UI state
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTabId>('ratios');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default hidden at bottom
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

  // Autosave whenever collageState changes
  useEffect(() => {
    saveCurrentProject(collageState);
  }, [collageState]);

  // State update wrapper with history tracking
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

  // Create new project with empty initial state & save current into list
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
    setCurrentView('editor');
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
    setCurrentView('editor');
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
    setCurrentView('editor');
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
      name: 'Guest Creator',
      isLoggedIn: false,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {currentView === 'landing' ? (
        <>
          <Navbar
            onOpenEditor={() => setCurrentView('editor')}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            onLogout={handleLogout}
          />

          <main className="flex-1 overflow-x-hidden">
            <Hero
              onOpenEditor={() => setCurrentView('editor')}
              onOpenAiTab={() => {
                setActiveSidebarTab('ai');
                setIsSidebarOpen(true);
                setCurrentView('editor');
              }}
            />
            <LiveDemo onOpenEditorWithPreset={handleOpenPresetFromLanding} />
            <Features />
            <AiSection onSelectAiPreset={handleOpenAiWithPreset} />
            <SeoContent />
            <Faq />
          </main>

          <Footer onOpenEditor={() => setCurrentView('editor')} />
        </>
      ) : (
        <div
          className="flex flex-col bg-neutral-950"
          style={{ height: '100dvh', overflow: 'hidden', position: 'fixed', inset: 0 }}
        >
          <EditorHeader
            state={collageState}
            onChangeState={handleUpdateCollageState}
            onBackToLanding={() => setCurrentView('landing')}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenProjects={() => setIsProjectsOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onUndo={handleUndo}
            onRedo={handleRedo}
          />

          {/* Canvas Viewport Area — pb-14 clears the fixed bottom dock */}
          <div className="flex-1 overflow-hidden relative" style={{ paddingBottom: '3.5rem' }}>
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

          {/* Bottom Dock Toolbar (Opens upwards, default collapsed) */}
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
          />
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
      />

      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        onSelectProject={proj => {
          setCollageState(proj);
          setHistory([proj]);
          setHistoryIndex(0);
        }}
        onNewProject={handleNewProject}
      />
    </div>
  );
}

export default App;
