import { useState, useEffect } from "react";
import { getProducts, getOrders, getKnowledgeBase, subscribeStore } from "../../services/store";

interface AdminDashboardProps {
  onNavigateTab: (tab: any) => void;
}

export default function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const [products, setProducts] = useState(getProducts());
  const [orders, setOrders] = useState(getOrders());
  const [kbEntries, setKbEntries] = useState(getKnowledgeBase());

  useEffect(() => {
    return subscribeStore(() => {
      setProducts(getProducts());
      setOrders(getOrders());
      setKbEntries(getKnowledgeBase());
    });
  }, []);

  // Compute Stat Metrics
  const todayStr = new Date().toISOString().split("T")[0];
  const ordersToday = orders.filter(o => o.createdAt.startsWith(todayStr));
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter(p => p.stock < 15);

  // 30-day sales mock chart data
  const salesData = [12, 19, 15, 25, 32, 28, 45, 38, 50, 42, 60, 55, 72, 68, 80, 85, 90, 78, 95, 110, 105, 120, 115, 130, 140, 125, 150, 165, 180, 195];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#DDD0B5] pb-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#2C4A3B]">
            Apothecary Executive Dashboard
          </h1>
          <p className="text-xs text-[#3F2A3D]/75 mt-0.5">
            Real-time metrics, stock alerts, and revenue telemetry
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex gap-2">
          <button
            onClick={() => onNavigateTab("products")}
            className="px-3.5 py-2 bg-[#2C4A3B] text-[#D9A404] rounded-lg font-bold text-xs hover:bg-[#1b2d23]"
          >
            + Add Product
          </button>
          <button
            onClick={() => onNavigateTab("bulk-import")}
            className="px-3.5 py-2 bg-[#D9A404] text-[#2C4A3B] rounded-lg font-bold text-xs hover:bg-[#edb508]"
          >
            📁 CSV Import
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-[#3F2A3D]/70 uppercase">
            <span>Orders Today</span>
            <span>📦</span>
          </div>
          <span className="font-heading text-4xl font-bold text-[#2C4A3B] block mt-2">
            {ordersToday.length}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            ↑ Active customer checkout stream
          </span>
        </div>

        <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-[#3F2A3D]/70 uppercase">
            <span>Monthly Revenue</span>
            <span>💰</span>
          </div>
          <span className="font-heading text-4xl font-bold text-[#2C4A3B] block mt-2">
            ₹{totalRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            ✓ Razorpay verified transactions
          </span>
        </div>

        <div className="bg-[#F4ECDC] border-2 border-[#A85C32] rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-[#A85C32] uppercase">
            <span>Low Stock Alerts</span>
            <span>⚠️</span>
          </div>
          <span className="font-heading text-4xl font-bold text-[#A85C32] block mt-2">
            {lowStockProducts.length}
          </span>
          <span className="text-[11px] text-[#A85C32] font-semibold mt-1 block">
            Items under 15 units threshold
          </span>
        </div>

        <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center text-xs font-bold text-[#3F2A3D]/70 uppercase">
            <span>Knowledge Base Entries</span>
            <span>🤖</span>
          </div>
          <span className="font-heading text-4xl font-bold text-[#2C4A3B] block mt-2">
            {kbEntries.length}
          </span>
          <span className="text-[11px] text-[#2C4A3B] font-semibold mt-1 block">
            Active RAG symptom rules
          </span>
        </div>
      </div>

      {/* 30-Day Sales Chart */}
      <div className="bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#2C4A3B]">
              30-Day Sales & Order Volume Trend
            </h3>
            <p className="text-xs text-[#3F2A3D]/75">
              Daily revenue progression across classical apothecary categories
            </p>
          </div>
          <span className="text-xs font-bold bg-[#2C4A3B] text-[#D9A404] px-3 py-1 rounded-full">
            Target: 400 Products
          </span>
        </div>

        {/* SVG Sparkline / Bar Chart */}
        <div className="h-44 w-full flex items-end justify-between gap-1 pt-4 border-b border-[#DDD0B5] pb-2">
          {salesData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div
                style={{ height: `${(val / 200) * 100}%` }}
                className="w-full bg-[#2C4A3B] group-hover:bg-[#D9A404] rounded-t transition-all duration-300"
              ></div>
              {/* Tooltip */}
              <span className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-[#3F2A3D] text-[#EFE6D0] text-[9px] px-1.5 py-0.5 rounded font-mono pointer-events-none transition-opacity">
                Day {i + 1}: ₹{val * 100}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-[#3F2A3D]/60 font-mono">
          <span>Day 1</span>
          <span>Day 15</span>
          <span>Day 30 (Today)</span>
        </div>
      </div>

      {/* Low Stock Warning Section & Recent Orders Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Low Stock Alerts */}
        <div className="lg:col-span-5 bg-[#F4ECDC] border-2 border-[#A85C32] rounded-2xl p-5 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-heading text-lg font-bold text-[#A85C32]">
              ⚠️ Low Stock Restock Needed
            </h3>
            <button
              onClick={() => onNavigateTab("products")}
              className="text-xs font-bold text-[#2C4A3B] underline"
            >
              Manage Stock
            </button>
          </div>

          <div className="space-y-2">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-[#2C4A3B] italic">All product inventory levels are healthy!</p>
            ) : (
              lowStockProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-[#FFFDF9] p-3 rounded-lg border border-[#DDD0B5] flex justify-between items-center text-xs"
                >
                  <div>
                    <span className="font-bold text-[#2C4A3B] block">{p.name}</span>
                    <span className="text-[10px] text-[#3F2A3D]/70">{p.concern} • ₹{p.price}</span>
                  </div>
                  <span className="bg-[#A85C32] text-[#EFE6D0] font-bold px-2 py-1 rounded text-xs">
                    {p.stock} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="lg:col-span-7 bg-[#F4ECDC] border-2 border-[#DDD0B5] rounded-2xl p-5 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-heading text-lg font-bold text-[#2C4A3B]">
              📦 Recent Customer Orders
            </h3>
            <button
              onClick={() => onNavigateTab("orders")}
              className="text-xs font-bold text-[#2C4A3B] underline"
            >
              View All Orders ({orders.length}) →
            </button>
          </div>

          <div className="space-y-2">
            {orders.slice(0, 3).map(o => (
              <div
                key={o.id}
                className="bg-[#FFFDF9] p-3 rounded-lg border border-[#DDD0B5] flex justify-between items-center text-xs"
              >
                <div>
                  <span className="font-bold text-[#2C4A3B] block">{o.id} - {o.customerName}</span>
                  <span className="text-[10px] text-[#3F2A3D]/70">
                    {o.items.length} items • ₹{o.total} via Razorpay
                  </span>
                </div>
                <span className="bg-[#2C4A3B] text-[#D9A404] font-bold px-2 py-1 rounded text-[11px]">
                  {o.orderStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
