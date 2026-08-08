import { useState } from "react";
import { setAdminAuth } from "../../services/store";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("admin@ayurveda.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@ayurveda.com" && password === "admin123") {
      setAdminAuth(true);
      onLoginSuccess();
    } else {
      setError("Invalid credentials. Default: admin@ayurveda.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-[#2C4A3B] flex items-center justify-center p-4">
      <div className="bg-[#F4ECDC] border-4 border-[#D9A404] rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#2C4A3B] text-[#D9A404] rounded-full flex items-center justify-center text-3xl mx-auto mb-3 border-2 border-[#D9A404]">
            ⚙️
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#2C4A3B]">
            Welankar Ayurvedik Admin Portal
          </h1>
          <p className="text-xs text-[#3F2A3D]/75 mt-1">
            Manage products, bulk CSV imports, orders & chatbot knowledge base
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-xs p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-bold text-[#2C4A3B] uppercase mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-3 text-sm focus:outline-none focus:border-[#2C4A3B]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2C4A3B] uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#EFE6D0] border border-[#DDD0B5] rounded-lg p-3 text-sm focus:outline-none focus:border-[#2C4A3B]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#2C4A3B] text-[#D9A404] rounded-xl font-heading font-bold text-sm hover:bg-[#1b2d23] shadow-lg transition-all"
          >
            🔐 Authenticate Admin Session
          </button>
        </form>

        <div className="text-[11px] text-[#3F2A3D]/70 bg-[#EFE6D0] p-3 rounded-lg text-center border border-[#DDD0B5]">
          Default Credentials: <strong className="text-[#2C4A3B]">admin@ayurveda.com</strong> / <strong className="text-[#2C4A3B]">admin123</strong>
        </div>
      </div>
    </div>
  );
}
