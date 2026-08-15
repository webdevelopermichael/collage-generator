import React from 'react';
import {
  LayoutGrid,
  Palette,
  Image as ImageIcon,
  Wand2,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CollageState } from '../../types';
import { LayoutTab } from './tabs/LayoutTab';
import { StyleTab } from './tabs/StyleTab';
import { ImagesTab } from './tabs/ImagesTab';
import { AiComposerTab } from './tabs/AiComposerTab';
import { TextBadgesTab } from './tabs/TextBadgesTab';

export type SidebarTabId = 'layouts' | 'styles' | 'images' | 'ai' | 'badges';

interface SidebarProps {
  state: CollageState;
  activeTab: SidebarTabId;
  setActiveTab: (tab: SidebarTabId) => void;
  selectedCellId: string | null;
  selectedBadgeId: string | null;
  onSelectCell: (id: string | null) => void;
  onSelectBadge: (id: string | null) => void;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  state,
  activeTab,
  setActiveTab,
  selectedCellId,
  selectedBadgeId,
  onSelectCell,
  onSelectBadge,
  onChangeState,
}) => {
  const tabs = [
    { id: 'layouts' as SidebarTabId, label: 'Layouts', icon: LayoutGrid },
    { id: 'styles' as SidebarTabId, label: 'Styles', icon: Palette },
    { id: 'images' as SidebarTabId, label: 'Images', icon: ImageIcon },
    { id: 'ai' as SidebarTabId, label: 'AI Magic', icon: Wand2, highlight: true },
    { id: 'badges' as SidebarTabId, label: 'Badges', icon: Tag },
  ];

  return (
    <aside className="w-80 md:w-96 bg-neutral-900/95 border-r border-neutral-800 flex flex-col shrink-0 h-full select-none z-20">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-neutral-800 p-2 bg-neutral-950/40">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                isActive
                  ? tab.highlight
                    ? 'bg-pink-500/20 text-pink-300 font-bold'
                    : 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
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

      {/* Tab Content Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
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
    </aside>
  );
};
