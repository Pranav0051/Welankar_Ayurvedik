import { useState, useEffect } from "react";
import type { Product } from "../data/products";
import { getLanguage, subscribeStore } from "../services/store";
import { translations, Language } from "../data/i18n";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [lang, setLang] = useState<Language>(getLanguage());
  const [activeTab, setActiveTab] = useState<"overview" | "ingredients" | "dosha" | "anupana">("overview");
  const [qty, setQty] = useState(1);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    return subscribeStore(() => {
      setLang(getLanguage());
    });
  }, []);

  if (!product) return null;

  const t = translations[lang];

  const handleAdd = () => {
    onAddToCart(product, qty);
    setStamped(true);
    setTimeout(() => setStamped(false), 900);
  };

  const displayName =
    lang === "MR" && product.name_mr
      ? product.name_mr
      : lang === "HI" && product.name_hi
      ? product.name_hi
      : product.name;

  const displayDesc =
    lang === "MR" && product.description_mr
      ? product.description_mr
      : lang === "HI" && product.description_hi
      ? product.description_hi
      : product.description;

  return (
    <div className="fixed inset-0 z-50 bg-[#071C15]/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#1A2421]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0D2C22] text-[#D4AF37] flex items-center justify-center font-bold text-sm hover:bg-[#184234] transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          {/* Product Image Frame */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <div className="relative w-full h-64 bg-white rounded-2xl border-2 border-[#D4AF37]/40 p-3 flex flex-col items-center justify-center shadow-inner">
              <img
                src={product.image}
                alt={displayName}
                className="w-full h-full object-contain rounded-xl"
              />
              <span className="absolute bottom-3 right-3 bg-[#C85A32] text-[#FDFBF7] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]">
                {product.weight}
              </span>
            </div>

            <div className="mt-3 text-[10px] text-[#0D2C22]/70 font-mono text-center">
              {t.products.batchCertNo} <strong className="text-[#C85A32]">{product.batchNo}</strong>
            </div>
          </div>

          {/* Details & Tabs Column */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-[#0D2C22] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {product.concern}
                </span>
                <span className="text-xs text-[#D4AF37] font-bold">
                  ★ {product.rating} ({product.reviewsCount} {t.products.reviews})
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#0D2C22]">
                {displayName}
              </h3>
              <p className="text-xs text-[#C85A32] font-accent italic">
                "{product.tagline}"
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#D4AF37]/30 text-xs font-bold gap-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 transition-all ${
                  activeTab === "overview"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                {t.quickView.overviewTab}
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`pb-2 transition-all ${
                  activeTab === "ingredients"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                {t.quickView.ingredientsTab}
              </button>
              <button
                onClick={() => setActiveTab("dosha")}
                className={`pb-2 transition-all ${
                  activeTab === "dosha"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                {t.quickView.doshaTab}
              </button>
              <button
                onClick={() => setActiveTab("anupana")}
                className={`pb-2 transition-all ${
                  activeTab === "anupana"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                {t.quickView.anupanaTab}
              </button>
            </div>

            {/* Tab Body */}
            <div className="min-h-[100px] text-xs leading-relaxed text-[#1A2421]/90 font-sans bg-[#F7F3EB] p-3.5 rounded-xl border border-[#D4AF37]/20">
              {activeTab === "overview" && <p>{displayDesc}</p>}
              {activeTab === "ingredients" && (
                <div className="space-y-1">
                  <span className="font-bold text-[#0D2C22] block">
                    🌿 {t.products.ingredients}:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {product.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "dosha" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>Vata:</span>
                    <strong className="text-[#0D2C22]">{product.doshaEffect?.vata || "Pacifies"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pitta:</span>
                    <strong className="text-[#0D2C22]">{product.doshaEffect?.pitta || "Neutral"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Kapha:</span>
                    <strong className="text-[#0D2C22]">{product.doshaEffect?.kapha || "Pacifies"}</strong>
                  </div>
                </div>
              )}
              {activeTab === "anupana" && (
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-[#0D2C22] block">
                      🥣 {t.products.intakeVehicle}:
                    </span>
                    <p>{product.anupana || "Warm water or milk"}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0D2C22] block">
                      📋 {t.quickView.dosageLabel}
                    </span>
                    <p>{product.dosage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Add to Cart Controls */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#1A2421]/60 block">{t.hero.mrp}</span>
                <span className="font-heading text-2xl font-bold text-[#0D2C22]">₹{product.price}</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-lg px-2 py-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-6 h-6 rounded bg-[#0D2C22] text-[#FDFBF7] font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-[#0D2C22]">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-6 h-6 rounded bg-[#0D2C22] text-[#FDFBF7] font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="px-5 py-2.5 bg-[#0D2C22] text-[#D4AF37] hover:bg-[#184234] font-bold text-xs rounded-xl shadow transition-all border border-[#D4AF37]/40"
                >
                  {stamped ? t.products.added : `🛒 ${t.products.addToCart}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
