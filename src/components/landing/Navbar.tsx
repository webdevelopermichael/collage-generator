import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCircle, LogOut, Menu, X, LogIn } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-neutral-950/85 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              CollaGenie
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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
        <div className="flex items-center gap-2.5 sm:gap-3">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-4 h-4 rounded-full" />
                ) : (
                  <UserCircle className="w-4 h-4 text-indigo-400" />
                )}
                <span className="font-medium max-w-[80px] sm:max-w-[120px] truncate text-[11px] sm:text-xs">
                  {user.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Sign out"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800/80 bg-neutral-950/95 px-4 py-4 space-y-3 animate-in fade-in">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1"
          >
            Features
          </a>
          <a
            href="#ai-generator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-pink-400 hover:text-pink-300 py-1"
          >
            AI Composer & Templates
          </a>
          <a
            href="#live-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1"
          >
            Live Sandbox
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1"
          >
            FAQ & Guide
          </a>
          {!user.isLoggedIn && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full text-left text-sm font-semibold text-indigo-400 py-1.5 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
