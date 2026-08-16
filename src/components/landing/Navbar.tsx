import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, UserCircle, LogOut, Menu, X, LogIn, Globe } from 'lucide-react';
import { UserAccount } from '../../types';
import { Language, TRANSLATIONS } from '../../core/i18n';

interface NavbarProps {
  onOpenEditor: () => void;
  onOpenAuth: () => void;
  user: UserAccount;
  onLogout: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEditor,
  onOpenAuth,
  user,
  onLogout,
  language,
  onSelectLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[language];

  // Lock body scroll when mobile hamburger is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇺🇸' },
    { id: 'ru', label: 'Русский', flag: '🇷🇺' },
    { id: 'ua', label: 'Українська', flag: '🇺🇦' },
  ];

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
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white">
              CollaGenie
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors">
            {t.features}
          </a>
          <a href="#ai-generator" className="hover:text-white transition-colors flex items-center gap-1">
            <span>{t.aiComposer}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          </a>
          <a href="#live-demo" className="hover:text-white transition-colors">
            {t.livePreview}
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            {t.faqAndGuide}
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 transition-colors cursor-pointer"
              title="Change language"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-1 z-50 animate-in fade-in">
                {languages.map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      onSelectLanguage(l.id);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                      language === l.id
                        ? 'bg-indigo-600/20 text-indigo-300 font-bold'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-sm">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sign In */}
          {user.isLoggedIn ? (
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
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
                title={t.signOut}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.signIn}</span>
            </button>
          )}

          {/* Open Studio Button */}
          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>{t.openStudio}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 md:hidden transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 bg-neutral-950/98 backdrop-blur-2xl px-6 py-8 flex flex-col justify-between animate-in fade-in duration-200 md:hidden">
          <nav className="space-y-5">
            {/* Mobile language picker pill */}
            <div className="flex items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl mb-4">
              {languages.map(l => (
                <button
                  key={l.id}
                  onClick={() => onSelectLanguage(l.id)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                    language === l.id ? 'bg-indigo-600 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="uppercase">{l.id}</span>
                </button>
              ))}
            </div>

            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-neutral-200 hover:text-white py-1"
            >
              {t.features}
            </a>
            <a
              href="#ai-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-pink-400 hover:text-pink-300 py-1"
            >
              {t.aiComposer}
            </a>
            <a
              href="#live-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-neutral-200 hover:text-white py-1"
            >
              {t.livePreview}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-neutral-200 hover:text-white py-1"
            >
              {t.faqAndGuide}
            </a>
          </nav>

          <div className="pt-6 border-t border-neutral-800/80 space-y-3">
            {user.isLoggedIn ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-900 border border-neutral-800">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserCircle className="w-8 h-8 text-indigo-400" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-white">{user.name}</div>
                    <div className="text-xs text-neutral-400 truncate max-w-[200px]">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-3 px-4 bg-rose-950/40 border border-rose-900/50 text-rose-300 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.signOut}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-3.5 px-4 bg-neutral-900 border border-neutral-800 text-indigo-400 font-semibold rounded-2xl text-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.signIn}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditor();
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{t.launchStudio}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
