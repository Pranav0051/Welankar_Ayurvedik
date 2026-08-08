import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { Product } from "../data/products";
import LeafDivider from "../components/LeafDivider";
import { getProducts, getLanguage, subscribeStore } from "../services/store";
import { translations, Language } from "../data/i18n";

interface ProductDetailProps {
  onAddToCart: (product: Product, qty?: number) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [lang, setLangState] = useState<Language>(getLanguage());
  const [stamped, setStamped] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    return subscribeStore(() => {
      setProducts(getProducts());
      setLangState(getLanguage());
    });
  }, []);

  const product = products.find(p => p.slug === slug);
  const t = translations[lang].products;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-20 px-4 text-center">
        <span className="text-6xl block mb-4">📜</span>
        <h2 className="font-heading text-2xl font-bold text-[#0D2C22]">
          Product Not Found
        </h2>
        <p className="text-sm text-[#1A2421]/70 mt-1 mb-6">
          The requested Ayurvedic formulation could not be located in our apothecary archives.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-2.5 bg-[#0D2C22] text-[#D4AF37] rounded-xl font-bold text-sm"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

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

  const handleAdd = () => {
    onAddToCart(product, qty);
    setStamped(true);
    setTimeout(() => setStamped(false), 900);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-[#C85A32] mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:underline">Products</Link>
          <span>/</span>
          <span className="text-[#0D2C22]">{displayName}</span>
        </nav>

        {/* Detail Card */}
        <div className="bg-[#F7F3EB] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Jar Image Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm h-96 bg-[#FDFBF7] rounded-2xl border-2 border-[#D4AF37]/40 p-6 shadow-inner flex flex-col items-center justify-center">
              <div className="absolute top-2 w-20 h-4 bg-[#8B5A2B] rounded-t-sm shadow"></div>
              <img
                src={product.image}
                alt={displayName}
                className="w-full h-80 object-cover rounded-xl shadow-md border"
              />
              <div className="absolute bottom-4 right-4 bg-[#C85A32] text-[#FDFBF7] text-xs font-bold px-3 py-1 rounded-full shadow border border-[#D4AF37]">
                {product.weight}
              </div>
            </div>

            <div className="mt-3 text-xs text-[#0D2C22]/70 font-mono text-center">
              Batch Cert No: <strong className="text-[#C85A32]">{product.batchNo || "AYUR-2026-CERT"}</strong>
            </div>
          </div>

          {/* Description & Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-[#0D2C22] text-[#D4AF37] text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                  {product.concern}
                </span>
                {product.tag && (
                  <span className="bg-[#C85A32] text-[#FDFBF7] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                )}
                <span className="text-xs text-[#D4AF37] font-bold">
                  ★ {product.rating || 4.9} ({product.reviewsCount || 84} reviews)
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0D2C22] leading-tight">
                {displayName}
              </h1>
              <p className="font-accent text-[#C85A32] text-base mt-1">
                "{product.tagline}"
              </p>
            </div>

            {/* Price & Stock */}
            <div className="flex items-center space-x-6 pb-4 border-b border-[#D4AF37]/20">
              <div>
                <span className="text-xs text-[#1A2421]/60 block">M.R.P. (Inclusive of all taxes)</span>
                <span className="font-heading text-3xl font-bold text-[#0D2C22]">
                  ₹{product.price}
                </span>
              </div>
              <div className="pl-6 border-l border-[#D4AF37]/20">
                {product.stock > 0 ? (
                  <span className="text-xs font-bold text-[#0D2C22] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    In Stock ({product.stock} units available)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    Currently Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Dosha Effect Badges */}
            <div className="bg-[#FDFBF7] p-3 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between text-xs font-semibold">
              <span className="text-[#0D2C22] font-bold">Tridosha Effect:</span>
              <div className="flex space-x-2 text-[11px]">
                <span className="px-2.5 py-0.5 rounded bg-[#0D2C22] text-[#D4AF37]">
                  Vata: {product.doshaEffect?.vata || "Pacifies"}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#0D2C22] text-[#D4AF37]">
                  Pitta: {product.doshaEffect?.pitta || "Neutral"}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#0D2C22] text-[#D4AF37]">
                  Kapha: {product.doshaEffect?.kapha || "Pacifies"}
                </span>
              </div>
            </div>

            {/* Descriptions */}
            <p className="text-sm text-[#1A2421] leading-relaxed">
              {displayDesc}
            </p>
            <p className="text-xs text-[#1A2421]/80 leading-relaxed font-sans italic bg-[#FDFBF7] p-4 rounded-xl border border-[#D4AF37]/30">
              {product.longDescription}
            </p>

            {/* Key Ingredients */}
            <div>
              <h4 className="font-heading text-xs font-bold text-[#0D2C22] uppercase tracking-wider mb-2">
                🌿 {t.ingredients}
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="bg-[#FDFBF7] text-[#0D2C22] text-xs font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/30"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Anupana & Dosage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#D4AF37]/30">
                <h4 className="font-heading text-xs font-bold text-[#0D2C22] uppercase mb-1">
                  🥣 Intake Vehicle (Anupana)
                </h4>
                <p className="text-xs text-[#1A2421] leading-normal">
                  {product.anupana || "Warm milk or water after meals"}
                </p>
              </div>
              <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#D4AF37]/30">
                <h4 className="font-heading text-xs font-bold text-[#0D2C22] uppercase mb-1">
                  📋 {t.dosage}
                </h4>
                <p className="text-xs text-[#1A2421] leading-normal">
                  {product.dosage}
                </p>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3 py-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded bg-[#0D2C22] text-[#FDFBF7] font-bold text-xs"
                >
                  -
                </button>
                <span className="font-bold text-base text-[#0D2C22] px-2">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded bg-[#0D2C22] text-[#FDFBF7] font-bold text-xs"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className={`flex-1 py-4 rounded-xl font-heading font-bold text-base shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2 border ${
                  product.stock <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                    : "bg-[#0D2C22] text-[#D4AF37] border-[#D4AF37]/40 hover:bg-[#184234] hover:shadow-xl"
                }`}
              >
                {stamped ? (
                  <span className="stamp-enter text-[#D4AF37] text-base">
                    ✔ Added to Cart!
                  </span>
                ) : (
                  <span>🛒 Add {displayName} (₹{product.price * qty})</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeafDivider color="#0D2C22" />
    </div>
  );
}
