import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, setAdminAuth, subscribeStore } from "../../services/store";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminBulkImport from "./AdminBulkImport";
import AdminOrders from "./AdminOrders";
import AdminKnowledgeBase from "./AdminKnowledgeBase";

type AdminTab = "dashboard" | "products" | "bulk-import" | "orders" | "knowledge-base";

export default function AdminLayout() {
  const [authed, setAuthed] = useState(isAdminAuthenticated());
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    return subscribeStore(() => {
      setAuthed(isAdminAuthenticated());
    });
  }, []);

  if (!authed) {
    return <AdminLogin onLoginSuccess={() => setAuthed(true)} />;
  }

  const handleLogout = () => {
    setAdminAuth(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#EFE6D0] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#2C4A3B] text-[#EFE6D0] p-6 border-r-2 border-[#D9A404] flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#D9A404] text-[#2C4A3B] flex items-center justify-center font-bold text-lg">
              ⚙️
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#EFE6D0] leading-none">
                Velankar Admin
              </h2>
              <span className="text-[10px] text-[#D9A404] font-mono">
                System Control v2.4
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 text-xs font-semibold">
            {[
              { id: "dashboard", label: "📊 Dashboard Metrics", icon: "📊" },
              { id: "products", label: "🌿 Product Manager", icon: "🌿" },
              { id: "bulk-import", label: "📁 Bulk CSV Import (400+)", icon: "📁" },
              { id: "orders", label: "📦 Orders & Logistics", icon: "📦" },
              { id: "knowledge-base", label: "🤖 Chatbot RAG Knowledge", icon: "🤖" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-[#D9A404] text-[#2C4A3B] font-bold shadow-md"
                    : "text-[#EFE6D0]/80 hover:bg-[#1b2d23] hover:text-[#EFE6D0]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Storefront Link & Logout */}
        <div className="pt-6 border-t border-[#EFE6D0]/10 space-y-3">
          <Link
            to="/"
            className="block text-center py-2 px-3 bg-[#1b2d23] text-[#D9A404] rounded-lg text-xs font-bold border border-[#D9A404]/30 hover:bg-[#2C4A3B]"
          >
            🏪 View Storefront
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-red-950 text-red-200 rounded-lg text-xs font-bold hover:bg-red-900 transition-colors"
          >
            🔒 Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {activeTab === "dashboard" && <AdminDashboard onNavigateTab={tab => setActiveTab(tab)} />}
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "bulk-import" && <AdminBulkImport />}
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "knowledge-base" && <AdminKnowledgeBase />}
      </main>
    </div>
  );
}
