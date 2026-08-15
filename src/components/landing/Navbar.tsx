import React from 'react';
import { Sparkles, ArrowRight, UserCircle, LogOut } from 'lucide-react';
import { UserAccount } from '../../types';

interface NavbarProps {
  onOpenEditor: () => void;
  onOpenAuth: () => void;
  user: UserAccount;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEditor,
  onOpenAuth,
  user,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-neutral-950/75 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              CollaGenie
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI Studio
              </span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#ai-generator" className="hover:text-white transition-colors flex items-center gap-1">
            <span>AI Composer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          </a>
          <a href="#live-demo" className="hover:text-white transition-colors">
            Live Preview
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ & SEO
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-5 h-5 rounded-full" />
                ) : (
                  <UserCircle className="w-4 h-4 text-indigo-400" />
                )}
                <span className="font-medium max-w-[100px] truncate">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-sm font-medium text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-800/80 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
