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
}) => {
  const tabs = [
    { id: 'ratios' as SidebarTabId, label: 'Canvas', icon: Ratio },
    { id: 'layouts' as SidebarTabId, label: 'Grid', icon: LayoutGrid },
    { id: 'styles' as SidebarTabId, label: 'Style', icon: Palette },
    { id: 'images' as SidebarTabId, label: 'Photos', icon: ImageIcon },
    { id: 'ai' as SidebarTabId, label: 'AI', icon: Wand2, highlight: true },
    { id: 'badges' as SidebarTabId, label: 'Badges', icon: Tag },
  ];

  const handleTabClick = (tabId: SidebarTabId) => {
    if (activeTab === tabId && isOpen) {
      onToggleOpen(); // 2nd click on same → close
    } else {
      setActiveTab(tabId);
      if (!isOpen) onToggleOpen(); // 1st click → open
    }
  };

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/97 backdrop-blur-xl border-t border-neutral-800 shadow-2xl flex flex-col shrink-0 select-none transition-all duration-300 ease-out ${
        isOpen ? 'h-[52vh] sm:h-[46vh] md:h-[400px]' : 'h-14'
      } overflow-hidden`}
    >
      {/* Bottom dock bar */}
      <div className="h-14 flex items-center px-2 sm:px-4 bg-neutral-950/90 border-b border-neutral-800 shrink-0 gap-1">
        <div className="flex-1 flex items-center justify-around sm:justify-start sm:gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && isOpen;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
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

      {/* Drawer content */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
          {activeTab === 'ratios' && <RatioTab state={state} onChangeState={onChangeState} />}
          {activeTab === 'layouts' && <LayoutTab state={state} onChangeState={onChangeState} />}
          {activeTab === 'styles' && <StyleTab state={state} onChangeState={onChangeState} />}
          {activeTab === 'images' && <ImagesTab state={state} onChangeState={onChangeState} onSelectCell={onSelectCell} />}
          {activeTab === 'ai' && <AiComposerTab state={state} onChangeState={onChangeState} />}
          {activeTab === 'badges' && <TextBadgesTab state={state} selectedBadgeId={selectedBadgeId} onSelectBadge={onSelectBadge} onChangeState={onChangeState} />}
        </div>
      )}
    </aside>
  );
};
