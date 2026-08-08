import { Link } from "react-router-dom";
import LeafDivider from "./LeafDivider";

export default function Footer() {
  return (
    <footer style={{ background: "#2C4A3B" }}>
      <LeafDivider color="#D9A404" className="opacity-40" />
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "48px 24px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 26,
              color: "#EFE6D0",
              letterSpacing: "0.06em",
              fontStyle: "italic",
              marginBottom: 12,
            }}
          >
            Vaidya
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(239,230,208,0.6)", lineHeight: 1.7, maxWidth: 220 }}>
            Hand-prepared Ayurvedic formulations from traditional apothecary recipes. Small batches. No shortcuts.
          </p>
          <p style={{ fontFamily: "var(--font-accent)", fontSize: 15, color: "#D9A404", marginTop: 16 }}>
            Est. 1947 · Pune, Maharashtra
          </p>
        </div>

        {/* Products */}
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,230,208,0.4)", marginBottom: 16 }}>Products</p>
          {["Ashwagandha Root Powder", "Haldi Kesar Churna", "Triphala Gut Tonic", "Chyawanprash Reserve"].map(name => (
            <Link
              key={name}
              to="/products"
              style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(239,230,208,0.65)", marginBottom: 10, textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#D9A404")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(239,230,208,0.65)")}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Concerns */}
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,230,208,0.4)", marginBottom: 16 }}>Concerns</p>
          {["Headache & Stress", "Digestion", "Immunity", "Skin", "Sleep"].map(c => (
            <Link
              key={c}
              to="/products"
              style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(239,230,208,0.65)", marginBottom: 10, textDecoration: "none" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#D9A404")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(239,230,208,0.65)")}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Trust */}
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(239,230,208,0.4)", marginBottom: 16 }}>Certifications</p>
          {["AYUSH Certified", "GMP Compliant", "100% Natural Ingredients", "No Synthetic Additives", "Cruelty Free"].map(t => (
            <p key={t} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(239,230,208,0.65)", marginBottom: 10 }}>
              — {t}
            </p>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(239,230,208,0.1)", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(239,230,208,0.35)", letterSpacing: "0.04em" }}>
          © 2024 Vaidya Ayurvedic Apothecary · These statements have not been evaluated by a regulatory authority. Not intended to diagnose, treat, cure, or prevent disease.
        </p>
      </div>
    </footer>
  );
}
