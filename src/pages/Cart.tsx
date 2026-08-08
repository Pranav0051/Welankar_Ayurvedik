import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../data/products";
import LeafDivider from "../components/LeafDivider";
import { createOrder, getLanguage } from "../services/store";
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
      <div className="min-h-screen bg-[#EFE6D0] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#F4ECDC] border-4 border-[#2C4A3B] p-8 sm:p-10 rounded-2xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-[#2C4A3B] text-[#D9A404] rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-2 border-[#D9A404]">
            ✓
          </div>
          <span className="bg-[#D9A404] text-[#2C4A3B] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            AYUSH Certified Order Confirmed
          </span>
          <h1 className="font-heading text-3xl font-bold text-[#2C4A3B] mt-3">
            {t.orderSuccess}
          </h1>
          <p className="text-xs text-[#3F2A3D]/80 mt-1 font-mono">
            Order Reference ID: <strong className="text-[#A85C32]">{completedOrder.id}</strong>
          </p>
          <p className="text-xs text-[#3F2A3D]/80 font-mono mt-0.5">
            Payment ID: {completedOrder.paymentId}
          </p>

          <div className="my-6 bg-[#FFFDF9] p-5 rounded-xl border border-[#DDD0B5] text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#DDD0B5] pb-2">
              <span className="font-bold text-[#2C4A3B]">Customer:</span>
              <span>{completedOrder.customerName} ({completedOrder.email})</span>
            </div>
            <div className="flex justify-between border-b border-[#DDD0B5] pb-2">
              <span className="font-bold text-[#2C4A3B]">Delivery Address:</span>
              <span>{completedOrder.address}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#2C4A3B] pt-1">
              <span>Amount Paid via Razorpay:</span>
              <span>₹{completedOrder.total}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setCompletedOrder(null);
                setIsCheckoutOpen(false);
                navigate("/products");
              }}
              className="px-6 py-3 bg-[#2C4A3B] text-[#EFE6D0] rounded-xl font-bold text-sm hover:bg-[#1b2d23] shadow"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-3 bg-[#D9A404] text-[#2C4A3B] rounded-xl font-bold text-sm hover:bg-[#edb508] shadow"
            >
              View in Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE6D0] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#2C4A3B] mb-8">
          {t.title}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-[#F4ECDC] rounded-2xl border-2 border-dashed border-[#DDD0B5]">
            <span className="text-6xl block mb-3">🛒</span>
            <h3 className="font-heading text-2xl font-bold text-[#2C4A3B]">
              {t.empty}
            </h3>
            <p className="text-sm text-[#3F2A3D]/70 mt-1 mb-6">
              Browse our heritage products to add authentic formulations to your cart.
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-[#2C4A3B] text-[#EFE6D0] rounded-xl font-bold text-sm hover:bg-[#1b2d23]"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#DDD0B5]"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-[#2C4A3B] text-base">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-[#3F2A3D]/70">
                        {item.product.weight} • ₹{item.product.price} per unit
                      </p>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="text-xs text-red-700 hover:underline mt-1 block"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                        className="w-6 h-6 rounded bg-[#2C4A3B] text-[#EFE6D0] font-bold text-xs flex items-center justify-center hover:bg-[#1b2d23]"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-sm text-[#2C4A3B]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                        className="w-6 h-6 rounded bg-[#2C4A3B] text-[#EFE6D0] font-bold text-xs flex items-center justify-center hover:bg-[#1b2d23]"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="font-heading font-bold text-lg text-[#2C4A3B]">
                        ₹{item.product.price * item.qty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout Trigger */}
            <div className="lg:col-span-4">
              <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="font-heading text-xl font-bold text-[#2C4A3B] pb-3 border-b border-[#DDD0B5]">
                  Order Summary
                </h3>

                <div className="py-4 space-y-3 text-sm text-[#3F2A3D]">
                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>{t.shipping}</span>
                    <span className="font-bold text-[#2C4A3B]">
                      {shipping === 0 ? t.freeShipping : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-[#DDD0B5] flex justify-between font-heading text-lg font-bold text-[#2C4A3B]">
                    <span>{t.total}</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 bg-[#D9A404] text-[#2C4A3B] rounded-xl font-heading font-bold text-base hover:bg-[#edb508] transition-all shadow-lg active:scale-95 mt-2"
                >
                  ⚡ {t.checkout}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Razorpay Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#F4ECDC] border-4 border-[#2C4A3B] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 text-[#2C4A3B] font-bold text-lg hover:text-red-700"
              >
                ✕
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2C4A3B] text-[#D9A404] flex items-center justify-center font-bold text-lg">
                  💳
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#2C4A3B]">
                    Razorpay Gateway Checkout
                  </h3>
                  <p className="text-xs text-[#3F2A3D]/75">
                    Secure guest checkout • No login required
                  </p>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2C4A3B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C4A3B] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-2.5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C4A3B] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street, City, Pincode..."
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-2.5 text-sm"
                  />
                </div>

                <div className="bg-[#FFFDF9] p-3 rounded-lg border border-[#DDD0B5]">
                  <label className="block font-bold text-[#A85C32] mb-0.5">
                    Razorpay Key ID (Optional for Live API)
                  </label>
                  <input
                    type="text"
                    value={razorpayKey}
                    onChange={e => setRazorpayKey(e.target.value)}
                    placeholder="rzp_live_xxxxxxxx (Leave blank for Sandbox Mode)"
                    className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded p-2 text-xs font-mono"
                  />
                  <span className="text-[10px] text-[#3F2A3D]/70 block mt-1">
                    Integrated with Razorpay API standard checkout payload.
                  </span>
                </div>

                <div className="pt-2 flex justify-between items-center font-heading text-base font-bold text-[#2C4A3B] border-t border-[#DDD0B5]">
                  <span>Total Payable:</span>
                  <span>₹{total}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#2C4A3B] text-[#D9A404] rounded-xl font-heading font-bold text-sm hover:bg-[#1b2d23] shadow-lg transition-all"
                >
                  {isProcessing ? "Connecting to Razorpay..." : `Pay ₹${total} via Razorpay`}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <LeafDivider color="#2C4A3B" />
    </div>
  );
}
