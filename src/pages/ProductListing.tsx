import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import LeafDivider from "../components/LeafDivider";
import QuickViewModal from "../components/QuickViewModal";
import { getProducts, getLanguage, subscribeStore } from "../services/store";
import { translations, Language } from "../data/i18n";

interface ProductListingProps {
  onAddToCart: (product: Product, qty?: number) => void;
}

export default function ProductListing({ onAddToCart }: ProductListingProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [lang, setLangState] = useState<Language>(getLanguage());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const initialConcern = searchParams.get("concern") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedConcern, setSelectedConcern] = useState(initialConcern);
  const [selectedForm, setSelectedForm] = useState("all");
  const [sortBy, setSortBy] = useState("bestselling");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  useEffect(() => {
    return subscribeStore(() => {
      setProducts(getProducts());
      setLangState(getLanguage());
    });
  }, []);

  useEffect(() => {
    const c = searchParams.get("concern");
    const s = searchParams.get("search");
    if (c) setSelectedConcern(c);
    if (s !== null) setSearchQuery(s);
  }, [searchParams]);

  const t = translations[lang].products;

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (!p.active) return false;
      const matchesConcern =
        selectedConcern === "all" || p.concern === selectedConcern;
      const matchesForm =
        selectedForm === "all" || (p.form && p.form.toLowerCase().includes(selectedForm.toLowerCase()));
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.name_hi && p.name_hi.includes(searchQuery)) ||
        (p.name_mr && p.name_mr.includes(searchQuery));
      const matchesPrice = p.price <= maxPrice;
      return matchesConcern && matchesForm && matchesSearch && matchesPrice;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    }

    return result;
  }, [products, selectedConcern, selectedForm, searchQuery, maxPrice, sortBy]);

  const handleConcernChange = (concern: string) => {
    setSelectedConcern(concern);
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set("concern", concern);
      return p;
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0D2C22]">
            Classical Apothecary Catalog
          </h1>
          <p className="text-sm text-[#1A2421]/75 font-sans mt-2">
            Authentic Ayurvedic formulations, stone-ground powders & medicated oils
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#F7F3EB] border border-[#D4AF37]/30 p-6 rounded-2xl mb-10 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Box */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-bold text-[#0D2C22] uppercase mb-1">
                {t.searchProducts}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search herbs, formulations..."
                className="w-full bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#1A2421] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Concern Tabs */}
            <div className="md:col-span-5">
              <label className="block text-[11px] font-bold text-[#0D2C22] uppercase mb-1">
                {t.filterByConcern}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: t.allConcerns },
                  { id: "stress", label: "Stress" },
                  { id: "digestion", label: "Digestion" },
                  { id: "immunity", label: "Immunity" },
                  { id: "skin", label: "Skin" },
                  { id: "sleep", label: "Sleep" },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleConcernChange(c.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      selectedConcern === c.id
                        ? "bg-[#0D2C22] text-[#D4AF37] shadow"
                        : "bg-[#FDFBF7] text-[#0D2C22] hover:bg-[#0D2C22]/10"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="md:col-span-3">
              <div className="flex justify-between items-center text-[11px] font-bold text-[#0D2C22] mb-1">
                <span>{t.priceRange}</span>
                <span className="text-[#C85A32]">Max ₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0D2C22] cursor-pointer"
              />
            </div>
          </div>

          {/* Form & Sort Row */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#D4AF37]/20 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[#0D2C22]">Formulation Type:</span>
              {(["all", "Churna", "Taila", "Avaleha", "Vati"] as string[]).map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedForm(f)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    selectedForm === f
                      ? "bg-[#D4AF37] text-[#0D2C22] font-bold"
                      : "text-[#1A2421]/70 hover:text-[#0D2C22]"
                  }`}
                >
                  {f === "all" ? "All Forms" : f}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <span className="font-bold text-[#0D2C22]">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-lg px-2 py-1 font-bold text-xs text-[#0D2C22]"
              >
                <option value="bestselling">Bestselling</option>
                <option value="rating">Top Rated (★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F7F3EB] rounded-2xl border-2 border-dashed border-[#D4AF37]/30">
            <span className="text-5xl block mb-3">🌿</span>
            <h3 className="font-heading text-xl font-bold text-[#0D2C22]">
              No Ayurvedic Remedies Found
            </h3>
            <p className="text-sm text-[#1A2421]/70 mt-1">
              Try adjusting your search terms or price filter constraints.
            </p>
            <button
              onClick={() => {
                setSelectedConcern("all");
                setSelectedForm("all");
                setSearchQuery("");
                setMaxPrice(1000);
              }}
              className="mt-4 px-5 py-2.5 bg-[#0D2C22] text-[#D4AF37] rounded-xl text-xs font-bold shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty) => {
          for (let i = 0; i < qty; i++) onAddToCart(p);
          setQuickViewProduct(null);
        }}
      />

      <LeafDivider color="#0D2C22" />
    </div>
  );
}
