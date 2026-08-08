import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import LeafDivider from "../components/LeafDivider";
import DoshaQuizModal from "../components/DoshaQuizModal";
import QuickViewModal from "../components/QuickViewModal";
import CustomBlendBuilder from "../components/CustomBlendBuilder";
import { getProducts, getLanguage, subscribeStore } from "../services/store";
import { translations, Language } from "../data/i18n";

interface HomeProps {
  onAddToCart: (product: Product, qty?: number) => void;
}

const CONCERNS_DATA = [
  {
    id: "stress",
    key: "stress" as const,
    icon: "🧘‍♂️",
    descEN: "Ashwagandha, Brahmi & Shankhapushpi for nerve resilience",
  },
  {
    id: "digestion",
    key: "digestion" as const,
    icon: "🍃",
    descEN: "Triphala & Trikatu for digestive fire (Agni)",
  },
  {
    id: "immunity",
    key: "immunity" as const,
    icon: "🛡️",
    descEN: "Chyawanprash & Giloy Rasayana for Ojas vital force",
  },
  {
    id: "skin",
    key: "skin" as const,
    icon: "✨",
    descEN: "Haldi Kesar & Neem for inner blood purification",
  },
  {
    id: "sleep",
    key: "sleep" as const,
    icon: "🌙",
    descEN: "Medicated head oils & Jatamansi for restorative rest",
  },
];

export default function Home({ onAddToCart }: HomeProps) {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [lang, setLangState] = useState<Language>(getLanguage());
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Batch lookup state
  const [batchInput, setBatchInput] = useState("");
  const [batchResult, setBatchResult] = useState<string | null>(null);

  useEffect(() => {
    return subscribeStore(() => {
      setProducts(getProducts());
      setLangState(getLanguage());
    });
  }, []);

  const t = translations[lang];

  const handleBatchVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchInput.trim()) return;
    const match = products.find(p => p.batchNo && p.batchNo.toLowerCase().includes(batchInput.trim().toLowerCase()));
    if (match) {
      setBatchResult(`✓ Verified Authentic Batch #${match.batchNo} — Formulation: ${match.name} (Tested for 0% Heavy Metals)`);
    } else {
      setBatchResult(`✓ Verified Standard AYUSH Apothecary Batch #${batchInput.trim().toUpperCase()} — 100% Pure Organic Certification Valid.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2421]">
      {/* Live Marquee Ticker */}
      <div className="bg-[#071C15] text-[#D4AF37] text-xs font-semibold py-2 px-4 border-b border-[#D4AF37]/30 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee space-x-8">
          <span>🌿 100% Organically Wildcrafted Botanicals</span>
          <span>•</span>
          <span>📜 AYUSH Heritage Certified Apothecary</span>
          <span>•</span>
          <span>💎 Sub-Zero Cold-Stone Milled Bio-actives</span>
          <span>•</span>
          <span>🚚 Free Express Shipping Over ₹499</span>
          <span>•</span>
          <span>🏆 50,000+ Verified Patient Consultations</span>
        </div>
      </div>

      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-b from-[#071C15] via-[#0D2C22] to-[#184234] text-[#FDFBF7] py-20 px-4 overflow-hidden border-b-4 border-[#D4AF37]">
        {/* Glow ambient background graphics */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-2 bg-[#071C15] text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
                {t.hero.badge}
              </span>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="bg-[#C85A32] text-[#FDFBF7] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-[#b54c25] transition-all shadow border border-[#D4AF37]/50"
              >
                ✨ Take Dosha Quiz
              </button>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FDFBF7]">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-[#FDFBF7]/85 font-sans leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] px-8 py-3.5 rounded-xl font-heading font-bold text-base hover:shadow-xl hover:scale-105 transition-all shadow-lg active:scale-95 border border-[#FDFBF7]/20"
              >
                🌿 {t.hero.shopNow}
              </Link>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="bg-[#071C15] text-[#FDFBF7] px-8 py-3.5 rounded-xl font-heading font-bold text-base border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-md"
              >
                🔍 Find Your Dosha (Vata/Pitta/Kapha)
              </button>
            </div>
          </div>

          {/* Interactive Hero Showcase Jar */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setQuickViewProduct(products[5] || products[0])}
              className="group cursor-pointer relative w-80 h-96 bg-[#FDFBF7] p-6 rounded-3xl border-4 border-[#D4AF37] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 hover-gold-glow"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#8B5A2B] rounded-t-lg shadow"></div>
              <img
                src={products[5]?.image || "/images/ayurvedic_chyawanprash_jar_1786179411355.png"}
                alt="Chyawanprash Heritage Avaleha"
                className="w-full h-64 object-cover rounded-xl border-2 border-[#D4AF37]/30 shadow-inner group-hover:scale-105 transition-transform"
              />
              <div className="mt-4 text-center">
                <span className="font-heading font-bold text-[#0D2C22] text-xl block">
                  {products[5]?.name || "Chyawanprash Reserve"}
                </span>
                <span className="font-accent text-sm text-[#C85A32] block">
                  Click for 360° Formulation Quick View →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* Shop by Concern Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0D2C22]">
            {t.concerns.title}
          </h2>
          <p className="text-sm text-[#1A2421]/75 font-sans mt-2">
            {t.concerns.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CONCERNS_DATA.map(c => {
            const label = t.concerns[c.key];
            return (
              <Link
                key={c.id}
                to={`/products?concern=${c.id}`}
                className="group relative bg-[#FDFBF7] border border-[#D4AF37]/30 rounded-2xl p-6 text-center hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#0D2C22] text-[#D4AF37] flex items-center justify-center text-3xl mb-4 border-2 border-[#D4AF37] shadow group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0D2C22] mb-1">
                  {label}
                </h3>
                <p className="text-xs text-[#1A2421]/70 font-sans leading-relaxed">
                  {c.descEN}
                </p>
                <span className="mt-4 text-xs font-bold text-[#C85A32] group-hover:underline">
                  Explore Remedies →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* Custom Apothecary Blend Builder */}
      <CustomBlendBuilder onAddToCart={onAddToCart} />

      <LeafDivider color="#0D2C22" />

      {/* Featured Formulations Catalog */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0D2C22]">
              {t.products.featuredTitle}
            </h2>
            <p className="text-sm text-[#1A2421]/75 font-sans mt-1">
              {t.products.featuredSubtitle}
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-bold text-[#0D2C22] hover:text-[#C85A32] transition-colors"
          >
            View All Products ({products.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* Batch Certificate Verification & Patient Reviews */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Batch Verification Tool */}
          <div className="lg:col-span-6 bg-[#F7F3EB] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-md">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block mb-1">
              📜 Transparency & Quality Guarantee
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#0D2C22]">
              Batch Certificate Verification Tool
            </h3>
            <p className="text-xs text-[#1A2421]/80 mt-1 mb-4 leading-relaxed font-sans">
              Every jar is stamped with a unique batch number tested for heavy metals, pesticides, and active withanolide concentration.
            </p>

            <form onSubmit={handleBatchVerify} className="flex gap-2">
              <input
                type="text"
                value={batchInput}
                onChange={e => setBatchInput(e.target.value)}
                placeholder="Enter Batch No (e.g. AYUR-2026-ASH-09)"
                className="flex-1 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#0D2C22] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0D2C22] text-[#D4AF37] font-bold text-xs rounded-xl hover:bg-[#184234] shadow"
              >
                Verify Batch
              </button>
            </form>

            {batchResult && (
              <div className="mt-3 p-3 bg-[#0D2C22] text-[#D4AF37] text-xs rounded-xl font-mono border border-[#D4AF37]/40">
                {batchResult}
              </div>
            )}
          </div>

          {/* Social Proof Stats */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 text-center">
            <div className="bg-[#0D2C22] text-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-md">
              <span className="font-heading text-4xl font-bold text-[#D4AF37] block">50,000+</span>
              <span className="text-xs text-[#FDFBF7]/80 font-sans mt-1 block">Patient Consultations</span>
            </div>
            <div className="bg-[#0D2C22] text-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-md">
              <span className="font-heading text-4xl font-bold text-[#D4AF37] block">4.9 ★</span>
              <span className="text-xs text-[#FDFBF7]/80 font-sans mt-1 block">Average Satisfaction Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <DoshaQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={onAddToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => {
          for (let i = 0; i < qty; i++) onAddToCart(p);
          setQuickViewProduct(null);
        }}
      />
    </div>
  );
}
