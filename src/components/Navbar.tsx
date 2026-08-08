import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../data/products";
import { getLanguage, setLanguage, subscribeStore, isAdminAuthenticated } from "../services/store";
import { translations, Language } from "../data/i18n";

interface NavbarProps {
  cartItems: CartItem[];
}

export default function Navbar({ cartItems }: NavbarProps) {
  const [lang, setLangState] = useState<Language>(getLanguage());
  const [isAdmin, setIsAdmin] = useState(isAdminAuthenticated());
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return subscribeStore(() => {
      setLangState(getLanguage());
      setIsAdmin(isAdminAuthenticated());
    });
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const t = translations[lang].nav;

  const handleLangChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-[#D4AF37]/25 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D77F] flex items-center justify-center text-[#0D2C22] shadow-lg border-2 border-[#FDFBF7] group-hover:scale-105 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-8h2v8zm-2-11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </div>
          <div>
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#FDFBF7] block group-hover:text-[#D4AF37] transition-colors leading-none">
              Welankar Ayurvedik
            </span>
            <span className="font-accent text-xs text-[#D4AF37] tracking-widest block mt-0.5">
              AYUSH Certified Classical Apothecary
            </span>
          </div>
        </Link>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#071C15]/80 text-[#FDFBF7] text-xs px-4 py-2.5 pr-10 rounded-full border border-[#D4AF37]/35 focus:outline-none focus:border-[#D4AF37] placeholder-[#FDFBF7]/50 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#D4AF37] text-[#0D2C22] rounded-full flex items-center justify-center hover:bg-[#F5D77F] transition-colors text-xs font-bold"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Desktop Links, Language Switcher, Admin Login, & Cart */}
        <div className="hidden lg:flex items-center space-x-5 shrink-0">
          <Link to="/" className="text-[#FDFBF7]/90 hover:text-[#D4AF37] font-medium text-xs tracking-wide transition-colors">
            {t.home}
          </Link>
          <Link to="/products" className="text-[#FDFBF7]/90 hover:text-[#D4AF37] font-medium text-xs tracking-wide transition-colors">
            {t.products}
          </Link>
          <Link to="/products?concern=all" className="text-[#FDFBF7]/90 hover:text-[#D4AF37] font-medium text-xs tracking-wide transition-colors">
            {t.concerns}
          </Link>

          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-[#071C15] p-1 rounded-lg border border-[#D4AF37]/30">
            {(["EN", "HI", "MR"] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => handleLangChange(l)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  lang === l
                    ? "bg-[#D4AF37] text-[#0D2C22] shadow"
                    : "text-[#FDFBF7]/60 hover:text-[#FDFBF7]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Admin Login Button inside main Navbar */}
          <Link
            to="/admin"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 border ${
              isAdmin
                ? "bg-[#184234] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#071C15]"
                : "bg-[#071C15] text-[#FDFBF7] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            }`}
          >
            <span>{isAdmin ? "⚙️ Dashboard" : "🔐 Admin Login"}</span>
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] px-4 py-2 rounded-full font-bold text-xs hover:shadow-lg hover:scale-105 transition-all shadow-md active:scale-95 border border-[#FDFBF7]/20"
          >
            <span>🛒 {t.cart}</span>
            {totalCartCount > 0 && (
              <span className="w-5 h-5 bg-[#C85A32] text-[#FDFBF7] rounded-full text-[10px] flex items-center justify-center font-bold shadow">
                {totalCartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center space-x-2 lg:hidden">
          <Link
            to="/cart"
            className="bg-[#D4AF37] text-[#0D2C22] px-3 py-1.5 rounded-full font-bold text-xs flex items-center space-x-1"
          >
            <span>🛒</span>
            <span>({totalCartCount})</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#FDFBF7] p-2 text-xl focus:outline-none"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071C15] border-t border-[#D4AF37]/25 px-4 py-4 space-y-3 text-xs">
          <form onSubmit={handleSearchSubmit} className="mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#0D2C22] text-[#FDFBF7] px-3 py-2 rounded-lg border border-[#D4AF37]/30"
            />
          </form>

          <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/15">
            <span className="text-[#D4AF37] font-bold">Language:</span>
            <div className="flex space-x-2">
              {(["EN", "HI", "MR"] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    lang === l ? "bg-[#D4AF37] text-[#0D2C22]" : "text-[#FDFBF7]/60"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FDFBF7] hover:text-[#D4AF37] font-semibold py-1"
          >
            {t.home}
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#FDFBF7] hover:text-[#D4AF37] font-semibold py-1"
          >
            {t.products}
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#D4AF37] font-bold py-1 bg-[#184234] px-3 rounded-lg border border-[#D4AF37]/30 text-center mt-2"
          >
            {isAdmin ? "⚙️ Admin Dashboard" : "🔐 Admin Login"}
          </Link>
        </div>
      )}
    </header>
  );
}
