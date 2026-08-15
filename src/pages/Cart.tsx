import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../data/products";
import LeafDivider from "../components/LeafDivider";
import { createOrder, getLanguage, subscribeStore } from "../services/store";
import { translations, Language } from "../data/i18n";

interface CartProps {
  items: CartItem[];
  onUpdateQty: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
  onClearCart?: () => void;
}

export default function Cart({ items, onUpdateQty, onRemove, onClearCart }: CartProps) {
  const navigate = useNavigate();
  const [lang, setLangState] = useState<Language>(getLanguage());
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [razorpayKey, setRazorpayKey] = useState("");

  useEffect(() => {
    return subscribeStore(() => {
      setLangState(getLanguage());
    });
  }, []);

  const t = translations[lang].cart;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 70;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !address) {
      alert("Please fill in all required customer details.");
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay Gateway processing delay
    setTimeout(() => {
      const order = createOrder({
        customerName,
        email,
        phone,
        address,
        items: items.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          qty: i.qty,
        })),
        total,
        paymentStatus: "paid",
        orderStatus: "Processing",
        paymentId: razorpayKey ? `rzp_live_${Date.now()}` : `rzp_test_${Math.floor(100000 + Math.random() * 900000)}`,
      });

      setIsProcessing(false);
      setCompletedOrder(order);
      if (onClearCart) onClearCart();
    }, 1200);
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#F7F3EB] border-4 border-[#0D2C22] p-8 sm:p-10 rounded-3xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-[#0D2C22] text-[#D4AF37] rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-2 border-[#D4AF37]">
            ✓
          </div>
          <span className="bg-[#D4AF37] text-[#0D2C22] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            {t.orderConfirmedBadge}
          </span>
          <h1 className="font-heading text-3xl font-bold text-[#0D2C22] mt-3">
            {t.orderSuccess}
          </h1>
          <p className="text-xs text-[#1A2421]/80 mt-1 font-mono">
            {t.orderRefId} <strong className="text-[#C85A32]">{completedOrder.id}</strong>
          </p>
          <p className="text-xs text-[#1A2421]/80 font-mono mt-0.5">
            {t.paymentRefId} {completedOrder.paymentId}
          </p>

          <div className="my-6 bg-white p-5 rounded-2xl border border-[#D4AF37]/30 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
              <span className="font-bold text-[#0D2C22]">{t.customerLabel}</span>
              <span>{completedOrder.customerName} ({completedOrder.email})</span>
            </div>
            <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
              <span className="font-bold text-[#0D2C22]">{t.deliveryAddressLabel}</span>
              <span>{completedOrder.address}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#0D2C22] pt-1">
              <span>{t.amountPaidLabel}</span>
              <span className="text-[#C85A32]">₹{completedOrder.total}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setCompletedOrder(null);
                setIsCheckoutOpen(false);
                navigate("/products");
              }}
              className="px-6 py-3 bg-[#0D2C22] text-[#D4AF37] rounded-xl font-bold text-sm hover:bg-[#184234] shadow"
            >
              {t.returnToShopBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#0D2C22] mb-8">
          {t.title}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#F7F3EB] rounded-3xl border-2 border-dashed border-[#D4AF37]/40">
            <span className="text-6xl block mb-3">🛒</span>
            <h3 className="font-heading text-2xl font-bold text-[#0D2C22]">
              {t.empty}
            </h3>
            <Link
              to="/products"
              className="mt-6 inline-block px-6 py-3 bg-[#0D2C22] text-[#D4AF37] rounded-xl font-bold text-sm hover:bg-[#184234] shadow"
            >
              {t.exploreBtn}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map(item => {
                const displayName =
                  lang === "HI" && item.product.name_hi
                    ? item.product.name_hi
                    : lang === "MR" && item.product.name_mr
                    ? item.product.name_mr
                    : item.product.name;

                return (
                  <div
                    key={item.product.id}
                    className="bg-[#F7F3EB] border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={displayName}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl border border-[#D4AF37]/30 bg-white p-1"
                      />
                      <div>
                        <h3 className="font-heading font-bold text-[#0D2C22] text-base">
                          {displayName}
                        </h3>
                        <p className="text-xs text-[#1A2421]/70">
                          {item.product.weight} • ₹{item.product.price}
                        </p>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="text-xs text-[#C85A32] hover:underline mt-1 block font-bold"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-2 py-1">
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                          className="w-6 h-6 rounded bg-[#0D2C22] text-[#FDFBF7] font-bold text-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-sm text-[#0D2C22]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                          className="w-6 h-6 rounded bg-[#0D2C22] text-[#FDFBF7] font-bold text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="font-heading font-bold text-lg text-[#0D2C22]">
                          ₹{item.product.price * item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary & Checkout Trigger */}
            <div className="lg:col-span-4">
              <div className="bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-2xl p-6 shadow-md sticky top-24">
                <h3 className="font-heading text-xl font-bold text-[#0D2C22] pb-3 border-b border-[#D4AF37]/30">
                  {t.title}
                </h3>

                <div className="py-4 space-y-3 text-sm text-[#1A2421]">
                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{t.shipping}</span>
                    <span className="font-bold text-[#0D2C22]">
                      {shipping === 0 ? t.freeShipping : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#D4AF37]/30 flex justify-between font-heading text-lg font-bold text-[#0D2C22]">
                    <span>{t.total}</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 bg-[#0D2C22] text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl font-heading font-bold text-base hover:bg-[#184234] transition-all shadow-lg active:scale-95 mt-2"
                >
                  ⚡ {t.checkout}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Razorpay Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-[#071C15]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FDFBF7] border-4 border-[#D4AF37] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#1A2421]">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-lg"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2 text-[#C85A32] text-xs font-bold uppercase tracking-wider mb-2">
                <span>🔒 Secure Checkout</span>
                <span>•</span>
                <span>Razorpay Gateway</span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-[#0D2C22] mb-1">
                {t.customerDetails}
              </h2>
              <p className="text-xs text-[#1A2421]/70 mb-6">
                Total Payable: <strong className="text-[#0D2C22] text-sm">₹{total}</strong>
              </p>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0D2C22] uppercase mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#1A2421] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0D2C22] uppercase mb-1">
                      {t.emailAddress} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ramesh@gmail.com"
                      className="w-full bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#1A2421] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D2C22] uppercase mb-1">
                      {t.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#1A2421] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2C22] uppercase mb-1">
                    {t.shippingAddress} *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street, Landmark, City, State, Pincode"
                    className="w-full bg-[#F7F3EB] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#1A2421] focus:outline-none focus:border-[#D4AF37]"
                  ></textarea>
                </div>

                <div className="p-3 bg-[#0D2C22] text-[#FDFBF7] rounded-xl text-xs space-y-1 border border-[#D4AF37]/40">
                  <div className="font-bold text-[#D4AF37]">{t.paymentMethod}</div>
                  <div className="text-[11px] text-[#FDFBF7]/80">{t.razorpaySim}</div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] rounded-xl font-heading font-bold text-sm hover:shadow-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? t.processing : `${t.payNowBtn} (₹${total})`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <LeafDivider color="#0D2C22" />
    </div>
  );
}
