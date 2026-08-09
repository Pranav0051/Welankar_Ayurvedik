import { useState } from "react";
import type { Product } from "../data/products";
import { getLanguage } from "../services/store";
import { translations } from "../data/i18n";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "ingredients" | "dosha" | "anupana">("overview");
  const [qty, setQty] = useState(1);
  const [stamped, setStamped] = useState(false);
  const lang = getLanguage();
  const t = translations[lang].products;

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    setStamped(true);
    setTimeout(() => setStamped(false), 900);
  };

  const displayName =
    lang === "HI" && product.name_hi
      ? product.name_hi
      : lang === "MR" && product.name_mr
      ? product.name_mr
      : product.name;

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
          {/* Product Jar Frame */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <div className="relative w-full h-64 bg-[#F7F3EB] rounded-2xl border-2 border-[#D4AF37]/40 p-4 flex flex-col items-center justify-center shadow-inner">
              <div className="absolute top-2 w-16 h-3 bg-[#8B5A2B] rounded-t shadow"></div>
              <img
                src={product.image}
                alt={displayName}
                onError={e => {
                  const fallbackKey = product.slug ? product.slug.split("-")[0] : "ashwagandha";
                  e.currentTarget.src = `/images/${fallbackKey}.png`;
                }}
                className="w-40 h-48 object-cover rounded-xl shadow-md border"
              />
              <span className="absolute bottom-3 right-3 bg-[#C85A32] text-[#FDFBF7] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D4AF37]">
                {product.weight}
              </span>
            </div>

            <div className="mt-3 text-[10px] text-[#0D2C22]/70 font-mono text-center">
              Batch Cert: <strong className="text-[#C85A32]">{product.batchNo}</strong>
            </div>
          </div>

          {/* Details & Tabs Column */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-[#0D2C22] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {product.concern}
                </span>
                <span className="text-xs text-[#D4AF37] font-bold">★ {product.rating} ({product.reviewsCount} reviews)</span>
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
                Overview
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`pb-2 transition-all ${
                  activeTab === "ingredients"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab("dosha")}
                className={`pb-2 transition-all ${
                  activeTab === "dosha"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                Dosha Balance
              </button>
              <button
                onClick={() => setActiveTab("anupana")}
                className={`pb-2 transition-all ${
                  activeTab === "anupana"
                    ? "text-[#0D2C22] border-b-2 border-[#D4AF37]"
                    : "text-[#1A2421]/60 hover:text-[#0D2C22]"
                }`}
              >
                Anupana (Intake)
              </button>
            </div>

            {/* Tab Body */}
            <div className="min-h-[100px] text-xs leading-relaxed text-[#1A2421]/90 font-sans bg-[#F7F3EB] p-3.5 rounded-xl border border-[#D4AF37]/20">
              {activeTab === "overview" && <p>{product.description}</p>}
              {activeTab === "ingredients" && (
                <div className="space-y-1">
                  <span className="font-bold text-[#0D2C22] block">Botanical Synergists:</span>
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
                    <span>Vata Dosha:</span>
                    <strong className="text-[#0D2C22]">{product.doshaEffect?.vata || "Pacifies"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pitta Dosha:</span>
                    <strong className="text-[#0D2C22]">{product.doshaEffect?.pitta || "Neutral"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Kapha Dosha:</span>
                    <strong className="text-[#0D2C22]">{product.doshaEffect?.kapha || "Pacifies"}</strong>
                  </div>
                </div>
              )}
              {activeTab === "anupana" && (
                <div>
                  <span className="font-bold text-[#0D2C22] block">Recommended Vehicle (Anupana):</span>
                  <p>{product.anupana}</p>
                </div>
              )}
            </div>

            {/* Price & Add to Cart Controls */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#1A2421]/60 block">MRP</span>
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
                  className="px-5 py-2.5 bg-[#0D2C22] text-[#D4AF37] rounded-xl font-bold text-xs hover:bg-[#184234] shadow-md transition-all active:scale-95"
                >
                  {stamped ? "✔ Added to Cart!" : `🛒 Add to Cart (₹${product.price * qty})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
