import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LeafDivider from "./LeafDivider";
import { getLanguage, subscribeStore } from "../services/store";
import { translations, Language } from "../data/i18n";

export default function Footer() {
  const [lang, setLang] = useState<Language>(getLanguage());

  useEffect(() => {
    return subscribeStore(() => {
      setLang(getLanguage());
    });
  }, []);

  const t = translations[lang].footer;
  const tConcerns = translations[lang].concerns;

  return (
    <footer className="bg-[#071C15] text-[#FDFBF7]">
      <LeafDivider color="#D4AF37" className="opacity-40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Clinic Profile */}
        <div>
          <p className="font-heading font-bold text-2xl text-[#D4AF37] tracking-wide mb-1">
            {t.companyTitle}
          </p>
          <p className="font-heading font-semibold text-base text-[#FDFBF7] mb-3">
            {t.companySubtitle}
          </p>
          <p className="font-sans text-xs text-[#FDFBF7]/70 leading-relaxed">
            {t.companyDesc}
          </p>
          <p className="font-accent text-xs text-[#D4AF37] mt-3 leading-relaxed">
            {t.clinicAddress}
          </p>
        </div>

        {/* Signature Formulations */}
        <div>
          <p className="font-sans font-bold text-xs tracking-wider uppercase text-[#D4AF37] mb-4">
            {t.formulationsHeading}
          </p>
          {[
            { name: "SneeZona Capsules", slug: "sneezona-capsules" },
            { name: "Acimint Antacid Tablet", slug: "acimint-herbal-antacid-tablet" },
            { name: "Noni Gold Juice", slug: "noni-gold-juice" },
            { name: "Stonil Kidney Stone Combo", slug: "stonil-syrup-tablet-combo" },
            { name: "Ruma Cal Joint Tablets", slug: "ruma-cal-tablets" },
            { name: "Velco Kachvardhini Oil", slug: "velco-kachvardhini-hair-oil" },
            { name: "Dibona Diabetic Tablets", slug: "dibona-diabetic-care-tablets" },
            { name: "Mgrena Migraine Tablets", slug: "mgrena-migraine-headache-tablets" },
          ].map(item => (
            <Link
              key={item.slug}
              to={`/products/${item.slug}`}
              className="block font-sans text-xs text-[#FDFBF7]/75 hover:text-[#D4AF37] mb-2 transition-colors"
            >
              • {item.name}
            </Link>
          ))}
        </div>

        {/* Health Concerns */}
        <div>
          <p className="font-sans font-bold text-xs tracking-wider uppercase text-[#D4AF37] mb-4">
            {t.categoriesHeading}
          </p>
          {[
            { label: tConcerns.digestion, id: "digestion" },
            { label: tConcerns.respiratory, id: "respiratory" },
            { label: tConcerns.kidney, id: "kidney" },
            { label: tConcerns.joints, id: "joints" },
            { label: tConcerns.headache, id: "headache" },
            { label: tConcerns.immunity, id: "immunity" },
            { label: tConcerns.hair, id: "hair" },
            { label: tConcerns.diabetes, id: "diabetes" },
          ].map(c => (
            <Link
              key={c.id}
              to={`/products?concern=${c.id}`}
              className="block font-sans text-xs text-[#FDFBF7]/75 hover:text-[#D4AF37] mb-2 transition-colors"
            >
              • {c.label}
            </Link>
          ))}
        </div>

        {/* Clinic Timings & Contacts */}
        <div>
          <p className="font-sans font-bold text-xs tracking-wider uppercase text-[#D4AF37] mb-4">
            {t.consultationHeading}
          </p>
          <div className="font-sans text-xs text-[#FDFBF7]/75 space-y-2">
            <p>
              {t.helplineLabel} <strong className="text-[#D4AF37] block text-sm">+91 9075042727</strong>
            </p>
            <p>
              {t.whatsappLabel} <strong className="text-[#D4AF37] block text-sm">+91 7030742727</strong>
            </p>
            <p>
              {t.websiteLabel} <span className="text-[#D4AF37] block">www.drvelankars.com</span>
            </p>
            <div className="pt-2">
              <span className="inline-block bg-[#184234] text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/40">
                {t.pharmacyBadge}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D4AF37]/20 py-6 text-center text-xs text-[#FDFBF7]/60">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}
