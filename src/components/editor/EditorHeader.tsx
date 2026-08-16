import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  FolderOpen,
  UserCircle,
  Undo2,
  Redo2,
  MoreVertical,
  LogIn,
  LogOut,
  Sparkles,
  Ratio,
  Check,
} from 'lucide-react';
import { CollageState, UserAccount } from '../../types';
import { ASPECT_RATIOS } from '../../core/layoutEngine';

interface EditorHeaderProps {
  state: CollageState;
  onChangeState: (updater: (prev: CollageState) => CollageState) => void;
  onBackToLanding: () => void;
  onOpenExport: () => void;
  onOpenProjects: () => void;
  onOpenAuth: () => void;
  user: UserAccount;
  onLogout: () => void;
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
  onLogout,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(state.name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRatiosDropdown, setShowRatiosDropdown] = useState(false);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    onChangeState(prev => ({ ...prev, name: title || 'Untitled Collage' }));
  };

  return (
    <header className="h-12 sm:h-14 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-2 sm:px-4 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left section: Back Button, Logo & Project Name */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          onClick={onBackToLanding}
          className="p-1.5 sm:p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Brand Icon Logo */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        {/* Desktop CollaGenie Title */}
        <span className="font-heading font-bold text-xs sm:text-sm text-white hidden md:inline">
          CollaGenie
        </span>

        {/* Project Name Editor (Hidden on small mobile screens to keep header clean, visible on sm+) */}
        <div className="hidden sm:flex items-center gap-1.5 ml-1 border-l border-neutral-800 pl-2 sm:pl-3">
          {isEditingTitle ? (
            <input
              type="text"
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={e => e.key === 'Enter' && handleTitleSubmit()}
              className="bg-neutral-950 border border-indigo-500 text-xs text-white rounded-lg px-2 py-0.5 focus:outline-none max-w-[140px] md:max-w-[200px]"
            />
          ) : (
            <button
              onClick={() => {
                setTitle(state.name);
                setIsEditingTitle(true);
              }}
              className="text-xs font-semibold text-neutral-300 hover:text-indigo-400 px-1.5 py-0.5 rounded-md hover:bg-neutral-800 transition-colors max-w-[130px] md:max-w-[200px] truncate text-left cursor-pointer"
              title="Click to rename project"
            >
              {state.name || 'Collage'}
            </button>
          )}
        </div>
      </div>

      {/* Center section: Undo/Redo and Desktop Aspect Ratio Picker */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Undo / Redo */}
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

        {/* Aspect Ratio Selector Dropdown (Shown on Desktop md+) */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowRatiosDropdown(!showRatiosDropdown)}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-[11px] sm:text-xs font-medium text-neutral-300 transition-colors cursor-pointer"
          >
            <Ratio className="w-3.5 h-3.5 text-indigo-400" />
            <span>{state.aspectRatio}</span>
          </button>

          {showRatiosDropdown && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in">
              <div className="text-[10px] uppercase font-bold text-neutral-500 px-2 py-1">
                Aspect Ratios
              </div>
              {ASPECT_RATIOS.map(ratio => (
                <button
                  key={ratio.id}
                  onClick={() => {
                    onChangeState(prev => ({ ...prev, aspectRatio: ratio.id }));
                    setShowRatiosDropdown(false);
                  }}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="text-left">
                    <span className="font-semibold text-white">{ratio.label}</span>
                    <span className="text-[10px] text-neutral-500 ml-1.5">{ratio.sublabel}</span>
                  </div>
                  {state.aspectRatio === ratio.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right section: Desktop Quick Actions + Mobile 3-dots */}
      <div className="flex items-center gap-1.5 sm:gap-2 relative">
        {/* Desktop Sign In / User Profile */}
        <div className="hidden md:flex items-center gap-2">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-4 h-4 rounded-full" />
              ) : (
                <UserCircle className="w-4 h-4 text-indigo-400" />
              )}
              <span className="font-medium max-w-[100px] truncate text-xs">{user.name}</span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-indigo-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Desktop Saved Projects Button */}
          <button
            onClick={onOpenProjects}
            className="p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 transition-colors cursor-pointer"
            title="Saved Projects"
          >
            <FolderOpen className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Prominent Extract Button (Both Mobile & Desktop) */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-md transition-all cursor-pointer hover:scale-105"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Extract</span>
        </button>

        {/* 3-dots Menu for Mobile (md:hidden) */}
        <div className="relative md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 sm:p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 transition-colors cursor-pointer"
            title="More Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* 3-dots Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenProjects();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-200 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
              >
                <FolderOpen className="w-4 h-4 text-purple-400" />
                <span>Saved Projects</span>
              </button>

              <div className="my-1 border-t border-neutral-800" />

              {user.isLoggedIn ? (
                <>
                  <div className="px-3 py-1.5 flex items-center gap-2 text-xs text-neutral-400">
                    <UserCircle className="w-4 h-4 text-indigo-400" />
                    <span className="truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 rounded-xl transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
