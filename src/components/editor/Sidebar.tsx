import React from 'react';
import {
  Ratio,
  LayoutGrid,
  Palette,
  Image as ImageIcon,
  Wand2,
  Tag,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { CollageState } from '../../types';
import { RatioTab } from './tabs/RatioTab';
import { LayoutTab } from './tabs/LayoutTab';
import { StyleTab } from './tabs/StyleTab';
import { ImagesTab } from './tabs/ImagesTab';
import { AiComposerTab } from './tabs/AiComposerTab';
import { TextBadgesTab } from './tabs/TextBadgesTab';
import { Language, TRANSLATIONS } from '../../core/i18n';

export type SidebarTabId = 'ratios' | 'layouts' | 'styles' | 'images' | 'ai' | 'badges';

interface SidebarProps {
  state: CollageState;
  activeTab: SidebarTabId;
  setActiveTab: (tab: SidebarTabId) => void;
  selectedCellId: string | null;
  selectedBadgeId: string | null;
  onSelectCell: (id: string | null) => void;
  onSelectBadge: (id: string | null) => void;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  state,
  activeTab,
  setActiveTab,
  selectedBadgeId,
  onSelectCell,
  onSelectBadge,
  onChangeState,
  isOpen,
  onToggleOpen,
  language,
}) => {
  const t = TRANSLATIONS[language];

  // Tabs for navigation
  const tabsList = [
    { id: 'ratios' as SidebarTabId, label: t.tabCanvas, icon: Ratio },
    { id: 'layouts' as SidebarTabId, label: t.tabGrid, icon: LayoutGrid },
    { id: 'styles' as SidebarTabId, label: t.tabStyle, icon: Palette },
    { id: 'images' as SidebarTabId, label: t.tabPhotos, icon: ImageIcon },
    { id: 'ai' as SidebarTabId, label: t.tabAi, icon: Wand2, highlight: true },
    { id: 'badges' as SidebarTabId, label: t.tabBadges, icon: Tag },
  ];

  const handleMobileTabClick = (tabId: SidebarTabId) => {
    if (activeTab === tabId && isOpen) {
      onToggleOpen();
    } else {
      setActiveTab(tabId);
      if (!isOpen) onToggleOpen();
    }
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP SIDEBAR (md:flex)
          Permanent Full-Height Left-Hand Navigation Panel with Smooth Scroll
          ───────────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex w-80 lg:w-96 bg-neutral-900/95 border-r border-neutral-800 flex-col shrink-0 h-full select-none z-20 overflow-hidden">
        {/* Desktop Tab Selector Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-2 bg-neutral-950/60 shrink-0">
          {tabsList.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? tab.highlight
                      ? 'bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40'
                      : 'bg-neutral-800 text-white font-bold border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? tab.highlight
                        ? 'text-pink-400'
                        : 'text-indigo-400'
                      : 'text-neutral-400'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Tab Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 overscroll-contain pb-20" style={{ WebkitOverflowScrolling: 'touch' }}>
          {activeTab === 'ratios' && <RatioTab state={state} onChangeState={onChangeState} language={language} />}
          {activeTab === 'layouts' && <LayoutTab state={state} onChangeState={onChangeState} language={language} />}
          {activeTab === 'styles' && <StyleTab state={state} onChangeState={onChangeState} language={language} />}
          {activeTab === 'images' && <ImagesTab state={state} onChangeState={onChangeState} onSelectCell={onSelectCell} language={language} />}
          {activeTab === 'ai' && <AiComposerTab state={state} onChangeState={onChangeState} language={language} />}
          {activeTab === 'badges' && <TextBadgesTab state={state} selectedBadgeId={selectedBadgeId} onSelectBadge={onSelectBadge} onChangeState={onChangeState} language={language} />}
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────────
          MOBILE BOTTOM DOCK (md:hidden)
          Collapsible Upward-Opening Drawer with 1-click open / 2-click close
          ───────────────────────────────────────────────────────────────── */}
      <aside
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/98 backdrop-blur-2xl border-t border-neutral-800 shadow-2xl flex flex-col shrink-0 select-none transition-all duration-300 ease-out ${
          isOpen ? 'h-[75vh] sm:h-[65vh]' : 'h-14'
        } overflow-hidden`}
      >
        {/* Mobile bottom dock bar */}
        <div className="h-14 flex items-center px-2 sm:px-4 bg-neutral-950/95 border-b border-neutral-800 shrink-0 gap-1">
          <div className="flex-1 flex items-center justify-around overflow-x-auto">
            {tabsList.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && isOpen;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleMobileTabClick(tab.id)}
                  className={`flex items-center gap-1.5 py-1.5 px-2 sm:px-3 rounded-xl font-semibold transition-all cursor-pointer ${
                    isActive
                      ? tab.highlight
                        ? 'bg-pink-500/20 text-pink-300 border border-pink-500/50'
                        : 'bg-neutral-800 text-white border border-neutral-700'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? (tab.highlight ? 'text-pink-400' : 'text-indigo-400') : 'text-neutral-500'}`} />
                  <span className="text-[11px] sm:text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onToggleOpen}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors shrink-0 ml-1"
            title={isOpen ? 'Collapse panel' : 'Expand panel'}
          >
            {isOpen
              ? <ChevronDown className="w-4 h-4 text-neutral-300" />
              : <ChevronUp className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>

        {/* Mobile Drawer content */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto p-4 overscroll-contain pb-28">
            {activeTab === 'ratios' && <RatioTab state={state} onChangeState={onChangeState} language={language} />}
            {activeTab === 'layouts' && <LayoutTab state={state} onChangeState={onChangeState} language={language} />}
            {activeTab === 'styles' && <StyleTab state={state} onChangeState={onChangeState} language={language} />}
            {activeTab === 'images' && <ImagesTab state={state} onChangeState={onChangeState} onSelectCell={onSelectCell} language={language} />}
            {activeTab === 'ai' && <AiComposerTab state={state} onChangeState={onChangeState} language={language} />}
            {activeTab === 'badges' && <TextBadgesTab state={state} selectedBadgeId={selectedBadgeId} onSelectBadge={onSelectBadge} onChangeState={onChangeState} language={language} />}
          </div>
        )}
      </aside>
    </>
  );
};
