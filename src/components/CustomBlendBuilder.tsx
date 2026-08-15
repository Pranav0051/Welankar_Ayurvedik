import { useState, useEffect } from "react";
import { getProducts, getLanguage, subscribeStore } from "../services/store";
import type { Product } from "../data/products";
import { translations, Language } from "../data/i18n";

interface CustomBlendBuilderProps {
  onAddToCart: (product: Product) => void;
}

export default function CustomBlendBuilder({ onAddToCart }: CustomBlendBuilderProps) {
  const [lang, setLang] = useState<Language>(getLanguage());
  const [allProds, setAllProds] = useState<Product[]>(getProducts().filter(p => p.active));
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 3]);
  const [customName, setCustomName] = useState("");
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    return subscribeStore(() => {
      setLang(getLanguage());
      setAllProds(getProducts().filter(p => p.active));
    });
  }, []);

  const t = translations[lang].customBlend;

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedProds = allProds.filter(p => selectedIds.includes(p.id));
  const totalPrice = Math.round(
    selectedProds.reduce((acc, p) => acc + p.price, 0) * 0.85
  ); // 15% custom blend discount

  const handleAddCustom = () => {
    const defaultName = t.defaultBlendName;
    const finalName = customName.trim() || defaultName;

    const customProduct: Product = {
      id: Date.now(),
      name: finalName,
      slug: `custom-blend-${Date.now()}`,
      concern: selectedProds[0]?.concern || "digestion",
      form: "Churna (Powder)",
      price: totalPrice,
      stock: 10,
      weight: "150g Custom Jar",
      image: selectedProds[0]?.image || "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&h=400&fit=crop&auto=format",
      rating: 5.0,
      reviewsCount: 1,
      batchNo: `CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`,
      tag: "Hand-Blended",
      tagline: `Custom formulation of ${selectedProds.map(p => p.name).join(" + ")}`,
      doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Pacifies" },
      anupana: "Warm milk or water as per individual Vaidya advice",
      ingredients: selectedProds.flatMap(p => p.ingredients),
      dosage: "1 tsp twice daily after meals",
      description: `Bespoke apothecary jar handcrafted by blending ${selectedProds.map(p => p.name).join(", ")}.`,
      longDescription: "Personalized Ayurvedic formulation custom stone-milled and packed upon order placement.",
      active: true,
    };

    onAddToCart(customProduct);
    setStamped(true);
    setTimeout(() => setStamped(false), 900);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-[#071C15] via-[#0D2C22] to-[#184234] text-[#FDFBF7] rounded-3xl p-8 sm:p-12 border-4 border-[#D4AF37] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="bg-[#D4AF37] text-[#0D2C22] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-widest inline-block">
            {t.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#FDFBF7]/80 font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Ingredient Selector Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allProds.map(p => {
              const isSelected = selectedIds.includes(p.id);
              const pName =
                lang === "MR" && p.name_mr
                  ? p.name_mr
                  : lang === "HI" && p.name_hi
                  ? p.name_hi
                  : p.name;

              return (
                <div
                  key={p.id}
                  onClick={() => toggleSelect(p.id)}
                  className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "bg-[#184234] border-[#D4AF37] shadow-lg text-[#FDFBF7]"
                      : "bg-[#071C15]/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-[#FDFBF7]/70"
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    <img
                      src={p.image}
                      alt={pName}
                      className="w-10 h-10 object-contain rounded-lg border border-[#D4AF37]/40 bg-white p-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-bold text-xs block text-[#FDFBF7] truncate">{pName}</span>
                      <span className="text-[10px] text-[#D4AF37] font-mono">₹{p.price} • {p.weight}</span>
                    </div>
                  </div>

                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? "bg-[#D4AF37] text-[#0D2C22] border-[#D4AF37]" : "border-[#D4AF37]/40"
                    }`}
                  >
                    {isSelected ? "✓" : "+"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Custom Jar Preview Box */}
          <div className="lg:col-span-4 bg-[#071C15] p-6 rounded-2xl border-2 border-[#D4AF37] space-y-4 shadow-xl">
            <h3 className="font-heading text-lg font-bold text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2">
              {t.jarTitle}
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-[#FDFBF7]/80 uppercase mb-1">
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={customName}
                placeholder={t.defaultBlendName}
                onChange={e => setCustomName(e.target.value)}
                className="w-full bg-[#0D2C22] text-[#FDFBF7] text-xs px-3 py-2 rounded-xl border border-[#D4AF37]/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <span className="block text-[11px] font-bold text-[#FDFBF7]/80 uppercase mb-1">
                {t.selectedIngredients} ({selectedProds.length}/3):
              </span>
              <div className="space-y-1">
                {selectedProds.map((p, i) => {
                  const pName =
                    lang === "MR" && p.name_mr
                      ? p.name_mr
                      : lang === "HI" && p.name_hi
                      ? p.name_hi
                      : p.name;
                  return (
                    <div key={i} className="text-xs bg-[#0D2C22] px-3 py-1.5 rounded-lg border border-[#D4AF37]/20 flex justify-between">
                      <span className="truncate pr-2">{pName}</span>
                      <span className="text-[#D4AF37] font-bold shrink-0">₹{p.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-[#D4AF37]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#FDFBF7]/60 block">{t.discountLabel}</span>
                <span className="font-heading text-2xl font-bold text-[#D4AF37]">₹{totalPrice}</span>
              </div>

              <button
                onClick={handleAddCustom}
                className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] font-bold text-xs rounded-xl hover:shadow-lg transition-all"
              >
                {stamped ? t.addedBtn : t.addBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
