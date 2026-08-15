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
    { id: 'ratios' as SidebarTabId, label: 'Размер', icon: Ratio },
    { id: 'layouts' as SidebarTabId, label: 'Сетка', icon: LayoutGrid },
    { id: 'styles' as SidebarTabId, label: 'Стили', icon: Palette },
    { id: 'images' as SidebarTabId, label: 'Фото', icon: ImageIcon },
    { id: 'ai' as SidebarTabId, label: 'AI Magic', icon: Wand2, highlight: true },
    { id: 'badges' as SidebarTabId, label: 'Бейджи', icon: Tag },
  ];

  // 1 click opens / switches, 2nd click on active tab closes
  const handleTabClick = (tabId: SidebarTabId) => {
    if (activeTab === tabId && isOpen) {
      onToggleOpen(); // Double click on same tab closes it
    } else {
      setActiveTab(tabId);
      if (!isOpen) {
        onToggleOpen(); // 1 click opens
      }
    }
  };

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 shadow-2xl transition-all duration-300 flex flex-col shrink-0 select-none ${
        isOpen ? 'h-[54vh] sm:h-[48vh] md:h-[420px]' : 'h-14'
      } overflow-hidden`}
    >
      {/* Bottom Dock Bar with Tab Names */}
      <div className="h-14 flex items-center justify-between px-2 sm:px-4 bg-neutral-950/90 border-b border-neutral-800 shrink-0 gap-1">
        <div className="flex-1 flex items-center justify-around sm:justify-center gap-1 sm:gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && isOpen;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 py-1.5 px-2 sm:px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? tab.highlight
                      ? 'bg-pink-500/25 text-pink-300 border border-pink-500/50 shadow-md'
                      : 'bg-neutral-800 text-white border border-neutral-700 shadow-md'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    isActive
                      ? tab.highlight
                        ? 'text-pink-400'
                        : 'text-indigo-400'
                      : 'text-neutral-400'
                  }`}
                />
                <span className="text-[11px] sm:text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Expand/Collapse Toggle Button */}
        <button
          onClick={onToggleOpen}
          className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors shrink-0"
          title={isOpen ? 'Скрыть панель (2 клика)' : 'Открыть настройки (1 клик)'}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-pink-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-indigo-400" />
          )}
        </button>
      </div>

      {/* Pop-up Drawer Content */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
          {activeTab === 'ratios' && (
            <RatioTab state={state} onChangeState={onChangeState} />
          )}
          {activeTab === 'layouts' && (
            <LayoutTab state={state} onChangeState={onChangeState} />
          )}
          {activeTab === 'styles' && (
            <StyleTab state={state} onChangeState={onChangeState} />
          )}
          {activeTab === 'images' && (
            <ImagesTab
              state={state}
              onChangeState={onChangeState}
              onSelectCell={onSelectCell}
            />
          )}
          {activeTab === 'ai' && (
            <AiComposerTab state={state} onChangeState={onChangeState} />
          )}
          {activeTab === 'badges' && (
            <TextBadgesTab
              state={state}
              selectedBadgeId={selectedBadgeId}
              onSelectBadge={onSelectBadge}
              onChangeState={onChangeState}
            />
          )}
        </div>
      )}
    </aside>
  );
};
