import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  FolderOpen,
  UserCircle,
  Undo2,
  Redo2,
  Sparkles,
} from 'lucide-react';
import { CollageState, UserAccount } from '../../types';

interface EditorHeaderProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  onBackToLanding: () => void;
  onOpenExport: () => void;
  onOpenProjects: () => void;
  onOpenAuth: () => void;
  user: UserAccount;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  state,
  onChangeState,
  onBackToLanding,
  onOpenExport,
  onOpenProjects,
  onOpenAuth,
  user,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(state.name);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    onChangeState(prev => ({ ...prev, name: title || 'Untitled Collage' }));
  };

  return (
    <header className="h-12 sm:h-14 bg-neutral-900 border-b border-neutral-800 px-2 sm:px-4 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left section: Back, Logo, Project Name */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={onBackToLanding}
          className="p-1.5 sm:p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 pr-1.5 sm:pr-2 border-r border-neutral-800">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <span className="font-heading font-bold text-xs sm:text-sm text-white hidden lg:inline">
            CollaGenie
          </span>
        </div>

        {/* Project Name Editor */}
        <div className="flex items-center gap-1.5">
          {isEditingTitle ? (
            <input
              type="text"
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={e => e.key === 'Enter' && handleTitleSubmit()}
              className="bg-neutral-950 border border-indigo-500 text-[11px] sm:text-xs text-white rounded-lg px-2 py-0.5 focus:outline-none max-w-[100px] sm:max-w-[160px]"
            />
          ) : (
            <button
              onClick={() => {
                setTitle(state.name);
                setIsEditingTitle(true);
              }}
              className="text-[11px] sm:text-xs font-semibold text-neutral-200 hover:text-indigo-400 px-1.5 py-0.5 rounded-md hover:bg-neutral-800 transition-colors max-w-[90px] sm:max-w-[160px] truncate text-left"
              title="Click to rename project"
            >
              {state.name || 'Collage'}
            </button>
          )}
        </div>
      </div>

      {/* Center section: Undo / Redo only */}
      <div className="flex items-center">
        <div className="flex items-center bg-neutral-950 p-0.5 rounded-xl border border-neutral-800">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo"
            className="p-1 sm:p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Undo2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo"
            className="p-1 sm:p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Right section: Auth / User, Projects, Export */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Auth / Account Profile Button */}
        {user.isLoggedIn ? (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-200 transition-colors cursor-pointer"
            title="Account Settings"
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-4 h-4 rounded-full" />
            ) : (
              <UserCircle className="w-4 h-4 text-indigo-400" />
            )}
            <span className="text-[11px] sm:text-xs font-medium max-w-[70px] truncate hidden sm:inline">
              {user.name}
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-indigo-300 hover:text-white text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer"
          >
            <UserCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sign In</span>
          </button>
        )}

        <button
          onClick={onOpenProjects}
          className="p-1.5 sm:px-2.5 sm:py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 transition-colors cursor-pointer"
          title="Saved Projects"
        >
          <FolderOpen className="w-3.5 h-3.5 text-purple-400" />
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 rounded-xl shadow-md transition-all cursor-pointer hover:scale-105"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Export</span>
        </button>
      </div>
    </header>
  );
};
