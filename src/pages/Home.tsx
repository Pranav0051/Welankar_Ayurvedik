import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product, ConcernType } from "../data/products";
import { drVelankarImg, acimintPosterImg } from "../data/products";
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

const CONCERN_KEYS: Array<{
  id: ConcernType;
  titleKey: keyof typeof translations.EN.concerns;
  descKey: keyof typeof translations.EN.concerns;
  icon: string;
}> = [
  {
    id: "digestion",
    titleKey: "digestion",
    descKey: "digestionDesc",
    icon: "🍃",
  },
  {
    id: "respiratory",
    titleKey: "respiratory",
    descKey: "respiratoryDesc",
    icon: "🫁",
  },
  {
    id: "immunity",
    titleKey: "immunity",
    descKey: "immunityDesc",
    icon: "🛡️",
  },
  {
    id: "kidney",
    titleKey: "kidney",
    descKey: "kidneyDesc",
    icon: "💧",
  },
  {
    id: "joints",
    titleKey: "joints",
    descKey: "jointsDesc",
    icon: "🦴",
  },
  {
    id: "headache",
    titleKey: "headache",
    descKey: "headacheDesc",
    icon: "🧠",
  },
  {
    id: "hair",
    titleKey: "hair",
    descKey: "hairDesc",
    icon: "🌿",
  },
  {
    id: "diabetes",
    titleKey: "diabetes",
    descKey: "diabetesDesc",
    icon: "🩸",
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
    const match = products.find(
      p => p.batchNo && p.batchNo.toLowerCase().includes(batchInput.trim().toLowerCase())
    );
    const prodName = match
      ? lang === "MR" && match.name_mr
        ? match.name_mr
        : lang === "HI" && match.name_hi
        ? match.name_hi
        : match.name
      : "";

    if (match) {
      setBatchResult(
        `✓ ${t.batchVerification.verifiedText} #${match.batchNo} — ${prodName}`
      );
    } else {
      setBatchResult(
        `✓ ${t.batchVerification.verifiedText} #${batchInput.trim().toUpperCase()}`
      );
    }
  };

  const heroShowcaseProduct = products.find(p => p.id === 2) || products[0];
  const showcaseDisplayName =
    lang === "MR" && heroShowcaseProduct.name_mr
      ? heroShowcaseProduct.name_mr
      : lang === "HI" && heroShowcaseProduct.name_hi
      ? heroShowcaseProduct.name_hi
      : heroShowcaseProduct.name;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2421]">
      {/* Live Marquee Ticker */}
      <div className="bg-[#071C15] text-[#D4AF37] text-xs font-semibold py-2 px-4 border-b border-[#D4AF37]/30 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee space-x-8">
          {t.ticker.map((item, idx) => (
            <span key={idx} className="inline-block mr-6">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-b from-[#071C15] via-[#0D2C22] to-[#184234] text-[#FDFBF7] py-16 sm:py-20 px-4 overflow-hidden border-b-4 border-[#D4AF37]">
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
                {t.hero.doshaQuizBtn}
              </button>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#FDFBF7]">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-[#FDFBF7]/85 font-sans leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] px-8 py-3.5 rounded-xl font-heading font-bold text-base hover:shadow-xl hover:scale-105 transition-all shadow-lg active:scale-95 border border-[#FDFBF7]/20 flex items-center gap-2"
              >
                <span>🌿</span>
                <span>{t.hero.shopNow}</span>
              </Link>
              <a
                href="https://wa.me/919075042727?text=Hello%20Dr.%20Velankar,%20I%20would%20like%20to%20consult%20regarding%20Ayurvedic%20treatment."
                target="_blank"
                rel="noreferrer"
                className="bg-[#071C15] text-[#FDFBF7] px-7 py-3.5 rounded-xl font-heading font-bold text-base border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-md flex items-center gap-2"
              >
                <span>💬</span>
                <span>{t.hero.consultDoctor}</span>
              </a>
            </div>

            {/* Quick trust badges */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs text-[#FDFBF7]/80">
              {t.hero.trustPills.map((pill, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">✓</span> {pill.replace("✓ ", "")}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Hero Showcase Jar / Bottle */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={() => setQuickViewProduct(heroShowcaseProduct)}
              className="group cursor-pointer relative w-80 bg-[#FDFBF7] p-6 rounded-3xl border-4 border-[#D4AF37] shadow-2xl hover:scale-102 transition-all duration-500 hover-gold-glow"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8B5A2B] text-[#FDFBF7] rounded-full text-[11px] font-bold shadow tracking-wider uppercase">
                {heroShowcaseProduct.tag || "Signature Remedy"}
              </div>
              <div className="w-full h-64 bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border-2 border-[#D4AF37]/30 shadow-inner">
                <img
                  src={heroShowcaseProduct.image}
                  alt={showcaseDisplayName}
                  className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="font-heading font-bold text-[#0D2C22] text-lg block leading-snug">
                  {showcaseDisplayName}
                </span>
                <span className="font-sans text-xs text-[#C85A32] font-semibold block mt-1">
                  ₹{heroShowcaseProduct.price} • {heroShowcaseProduct.weight}
                </span>
                <span className="font-accent text-xs text-[#0D2C22]/80 block mt-1 underline">
                  {t.hero.quickViewHint}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* MEET DR. VELANKAR & CLINIC STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-[#0D2C22] to-[#071C15] text-[#FDFBF7] rounded-3xl p-8 sm:p-12 border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Doctor Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl p-1.5 bg-gradient-to-tr from-[#D4AF37] via-[#F5D77F] to-[#C85A32] shadow-2xl">
                <img
                  src={drVelankarImg}
                  alt="Dr. Velankar - Senior Ayurvedic Physician"
                  className="w-full h-full object-cover object-top rounded-2xl border-2 border-[#071C15]"
                />
                <div className="absolute -bottom-3 bg-[#D4AF37] text-[#0D2C22] font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  {t.doctorSection.role.split("—")[0]}
                </div>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#FDFBF7] mt-6">
                {t.doctorSection.name}
              </h3>
              <p className="text-xs text-[#D4AF37] font-semibold">
                {t.doctorSection.role}
              </p>
            </div>

            {/* Doctor & Clinic Credentials */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest bg-[#184234] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                {t.doctorSection.badge}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                {t.doctorSection.title}
              </h2>
              <p className="text-sm text-[#FDFBF7]/85 leading-relaxed font-sans">
                {t.doctorSection.quote}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#184234]/70 p-4 rounded-xl border border-[#D4AF37]/30">
                  <span className="text-xs font-bold text-[#D4AF37] block mb-1">
                    {t.doctorSection.clinicTitle}
                  </span>
                  <p className="text-xs text-[#FDFBF7]/80 leading-snug">
                    {t.doctorSection.clinicAddress}
                  </p>
                </div>

                <div className="bg-[#184234]/70 p-4 rounded-xl border border-[#D4AF37]/30">
                  <span className="text-xs font-bold text-[#D4AF37] block mb-1">
                    {t.doctorSection.helplineTitle}
                  </span>
                  <p className="text-xs text-[#FDFBF7]/80 leading-snug">
                    {t.doctorSection.appointmentsLabel} <strong className="text-[#D4AF37]">+91 9075042727</strong><br />
                    {t.doctorSection.consultationLabel} <strong className="text-[#D4AF37]">+91 7030742727</strong><br />
                    {t.doctorSection.websiteLabel} <span className="text-xs text-[#D4AF37]/90">www.drvelankars.com</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/919075042727?text=Namaste%20Dr.%20Velankar,%20I%20would%20like%20to%20book%20an%20online%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] px-6 py-2.5 rounded-xl font-bold text-xs hover:shadow-lg transition-all flex items-center gap-1.5 shadow"
                >
                  <span>💬</span>
                  <span>{t.doctorSection.whatsappBtn}</span>
                </a>
                <Link
                  to="/products"
                  className="bg-[#071C15] text-[#FDFBF7] px-6 py-2.5 rounded-xl font-bold text-xs border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all"
                >
                  {t.doctorSection.viewCatalogBtn} ({products.length}) →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* Shop by Concern Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0D2C22]">
            {t.concerns.title}
          </h2>
          <p className="text-sm text-[#1A2421]/75 font-sans mt-2">
            {t.concerns.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONCERN_KEYS.map(c => {
            const title = t.concerns[c.titleKey] as string;
            const desc = t.concerns[c.descKey] as string;
            return (
              <Link
                key={c.id}
                to={`/products?concern=${c.id}`}
                className="group relative bg-[#FDFBF7] border border-[#D4AF37]/30 rounded-2xl p-6 text-center hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#0D2C22] text-[#D4AF37] flex items-center justify-center text-2xl mb-4 border-2 border-[#D4AF37] shadow group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-[#0D2C22] mb-1">
                  {title}
                </h3>
                <p className="text-xs text-[#1A2421]/70 font-sans leading-relaxed">
                  {desc}
                </p>
                <span className="mt-4 text-xs font-bold text-[#C85A32] group-hover:underline">
                  {t.concerns.exploreBtn}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

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
            {t.products.viewAllCatalog} ({products.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* Interactive Antacid & Infographic Spotlight */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <img
              src={acimintPosterImg}
              alt="Acimint Herbal Antacid Infographic"
              className="max-h-96 rounded-2xl border-2 border-[#D4AF37]/50 shadow-xl object-contain bg-white"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider bg-[#0D2C22]/10 px-3 py-1 rounded-full">
              {t.spotlight.badge}
            </span>
            <h3 className="font-heading text-3xl font-bold text-[#0D2C22]">
              {t.spotlight.title}
            </h3>
            <p className="text-sm text-[#1A2421]/80 leading-relaxed font-sans">
              {t.spotlight.desc}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#0D2C22]">
              {t.spotlight.points.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white/70 p-2.5 rounded-lg border border-[#D4AF37]/30">
                  <span>{idx === 0 ? "🔥" : idx === 1 ? "✨" : idx === 2 ? "🍃" : "🛡️"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex gap-3">
              <Link
                to="/products/acimint-herbal-antacid-tablet"
                className="bg-[#0D2C22] text-[#D4AF37] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#184234] shadow"
              >
                {t.spotlight.btnText} (₹240) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LeafDivider color="#0D2C22" />

      {/* Custom Apothecary Blend Builder */}
      <CustomBlendBuilder onAddToCart={onAddToCart} />

      <LeafDivider color="#0D2C22" />

      {/* Batch Certificate Verification & Clinic Trust */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Batch Verification Tool */}
          <div className="lg:col-span-6 bg-[#F7F3EB] border border-[#D4AF37]/30 rounded-3xl p-8 shadow-md">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block mb-1">
              {t.batchVerification.badge}
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#0D2C22]">
              {t.batchVerification.title}
            </h3>
            <p className="text-xs text-[#1A2421]/80 mt-1 mb-4 leading-relaxed font-sans">
              {t.batchVerification.subtitle}
            </p>

            <form onSubmit={handleBatchVerify} className="flex gap-2">
              <input
                type="text"
                value={batchInput}
                onChange={e => setBatchInput(e.target.value)}
                placeholder={t.batchVerification.placeholder}
                className="flex-1 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2.5 text-xs text-[#0D2C22] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0D2C22] text-[#D4AF37] font-bold text-xs rounded-xl hover:bg-[#184234] shadow"
              >
                {t.batchVerification.verifyBtn}
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
              <span className="font-heading text-4xl font-bold text-[#D4AF37] block">
                {t.batchVerification.statsPatients}
              </span>
              <span className="text-xs text-[#FDFBF7]/80 font-sans mt-1 block">
                {t.batchVerification.statsPatientsLabel}
              </span>
            </div>
            <div className="bg-[#0D2C22] text-[#FDFBF7] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-md">
              <span className="font-heading text-4xl font-bold text-[#D4AF37] block">
                {t.batchVerification.statsRating}
              </span>
              <span className="text-xs text-[#FDFBF7]/80 font-sans mt-1 block">
                {t.batchVerification.statsRatingLabel}
              </span>
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
