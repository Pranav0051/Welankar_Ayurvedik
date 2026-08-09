import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { getLanguage } from "../services/store";
import { translations } from "../data/i18n";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [stamped, setStamped] = useState(false);
  const lang = getLanguage();
  const t = translations[lang].products;

  const handleAdd = () => {
    onAddToCart(product);
    setStamped(true);
    setTimeout(() => setStamped(false), 900);
  };

  const displayName =
    lang === "HI" && product.name_hi
      ? product.name_hi
      : lang === "MR" && product.name_mr
      ? product.name_mr
      : product.name;

  const displayDesc =
    lang === "HI" && product.description_hi
      ? product.description_hi
      : lang === "MR" && product.description_mr
      ? product.description_mr
      : product.description;

  return (
    <div className="group relative bg-[#FDFBF7] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col jar-card-hover">
      {/* Scalloped Wax-Seal Price Badge */}
      <div className="absolute top-3.5 right-3.5 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#C85A32] to-[#9E3C1B] text-[#FDFBF7] flex flex-col items-center justify-center font-serif text-xs shadow-xl border-2 border-[#D4AF37] rotate-6 group-hover:rotate-0 transition-transform">
        <span className="text-[9px] leading-tight opacity-90 tracking-wider">MRP</span>
        <span className="font-bold text-sm tracking-tight text-[#F5D77F]">₹{product.price}</span>
      </div>

      {/* Tag Badge if present */}
      {product.tag && (
        <span className="absolute top-3.5 left-3.5 z-10 bg-[#0D2C22] text-[#D4AF37] text-[10px] font-bold tracking-wider px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-md">
          {product.tag}
        </span>
      )}

      {/* Jar Container Frame */}
      <div className="relative pt-8 pb-3 px-6 flex items-center justify-center bg-gradient-to-b from-[#F7F3EB] to-[#FDFBF7] min-h-[220px]">
        {/* Cork Cap Graphic */}
        <div className="absolute top-3 w-16 h-3 bg-[#8B5A2B] rounded-t border-b border-[#6E421F] shadow-sm"></div>

        {/* Jar Image */}
        <div className="relative w-36 h-44 rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-md group-hover:border-[#D4AF37] group-hover:scale-105 transition-all duration-300">
          <img
            src={product.image}
            alt={displayName}
            onError={e => {
              const fallbackKey = product.slug ? product.slug.split("-")[0] : "ashwagandha";
              e.currentTarget.src = `/images/${fallbackKey}.png`;
            }}
            className="w-full h-full object-cover filter contrast-105"
          />
          {/* Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>
        </div>
      </div>

      {/* Hand-Labeled Details */}
      <div className="p-5 flex-1 flex flex-col justify-between border-t border-[#D4AF37]/20 bg-[#FDFBF7]">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-[#C85A32] uppercase tracking-wider mb-1">
            <span>{product.concern}</span>
            <span className="text-[#0D2C22]/60">{product.weight}</span>
          </div>
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-heading text-lg font-bold text-[#0D2C22] leading-snug group-hover:text-[#C85A32] transition-colors">
              {displayName}
            </h3>
          </Link>
          <p className="text-xs text-[#0D2C22]/65 italic mt-0.5 line-clamp-1 font-sans">
            "{product.tagline}"
          </p>
          <p className="text-xs text-[#1A2421]/80 mt-2 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Action Controls & Stamp */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between">
          <div className="text-xs font-semibold">
            {product.stock > 0 ? (
              <span className="text-[#0D2C22] flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                {t.inStock} ({product.stock})
              </span>
            ) : (
              <span className="text-red-700 flex items-center gap-1 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                {t.outOfStock}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all duration-200 active:scale-95 border ${
              product.stock <= 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                : "bg-[#0D2C22] text-[#FDFBF7] border-[#D4AF37]/30 hover:bg-[#184234] hover:text-[#D4AF37] hover:border-[#D4AF37]"
            }`}
          >
            {stamped ? (
              <span className="stamp-enter inline-block text-[#D4AF37]">
                ✔ {t.added}
              </span>
            ) : (
              <span>🌿 {t.addToCart}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
