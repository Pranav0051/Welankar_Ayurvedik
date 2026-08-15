import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, getLanguage, subscribeStore } from "../services/store";
import type { Product } from "../data/products";
import { translations, Language } from "../data/i18n";

interface DoshaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function DoshaQuizModal({ isOpen, onClose, onAddToCart }: DoshaQuizModalProps) {
  const [lang, setLang] = useState<Language>(getLanguage());
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [resultDosha, setResultDosha] = useState<"vata" | "pitta" | "kapha" | null>(null);

  useEffect(() => {
    return subscribeStore(() => {
      setLang(getLanguage());
    });
  }, []);

  if (!isOpen) return null;

  const t = translations[lang].doshaQuiz;
  const questions = t.questions;

  const handleOptionSelect = (dosha: "vata" | "pitta" | "kapha") => {
    const updated = { ...scores, [dosha]: scores[dosha] + 1 };
    setScores(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant dosha
      const dominant = (Object.keys(updated) as Array<keyof typeof updated>).reduce((a, b) =>
        updated[a] > updated[b] ? a : b
      );
      setResultDosha(dominant);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setResultDosha(null);
  };

  const allProds = getProducts().filter(p => p.active);
  const recommendedProds = resultDosha
    ? allProds.filter(p => p.doshaEffect && p.doshaEffect[resultDosha] === "Pacifies").slice(0, 3)
    : [];

  const currentProfile = resultDosha ? t.doshaProfiles[resultDosha] : null;

  return (
    <div className="fixed inset-0 z-50 bg-[#071C15]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#1A2421]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0D2C22] text-[#D4AF37] flex items-center justify-center font-bold text-sm hover:bg-[#184234] transition-colors"
        >
          ✕
        </button>

        {!resultDosha ? (
          <div>
            <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              <span>🌿 {t.modalTitle}</span>
              <span>•</span>
              <span>
                {t.step} {currentStep + 1} / {questions.length}
              </span>
            </div>

            <div className="w-full bg-[#EFE6D0] h-1.5 rounded-full overflow-hidden mb-6">
              <div
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                className="h-full bg-[#D4AF37] transition-all duration-300"
              ></div>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0D2C22] mb-6">
              {questions[currentStep]?.text}
            </h3>

            <div className="space-y-3">
              {questions[currentStep]?.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt.dosha)}
                  className="w-full text-left p-4 rounded-xl border border-[#D4AF37]/30 bg-[#F7F3EB] hover:bg-[#0D2C22] hover:text-[#FDFBF7] hover:border-[#D4AF37] transition-all duration-200 text-xs font-semibold shadow-sm flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <span className="text-[#C85A32] group-hover:text-[#D4AF37] font-bold">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="bg-[#D4AF37] text-[#0D2C22] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
                {t.resultTitle}
              </span>
              <h3 className="font-heading text-3xl font-bold text-[#0D2C22]">
                {currentProfile?.title}
              </h3>
              <p className="text-xs text-[#1A2421]/80 font-sans leading-relaxed max-w-md mx-auto">
                {currentProfile?.desc}
              </p>
            </div>

            <div className="bg-[#F7F3EB] p-4 rounded-2xl border border-[#D4AF37]/40 space-y-3">
              <h4 className="font-heading text-xs font-bold text-[#0D2C22] uppercase tracking-wider">
                🌿 {t.recommendedTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {recommendedProds.map(p => {
                  const pName =
                    lang === "MR" && p.name_mr
                      ? p.name_mr
                      : lang === "HI" && p.name_hi
                      ? p.name_hi
                      : p.name;
                  return (
                    <div
                      key={p.id}
                      className="bg-[#FDFBF7] p-2.5 rounded-xl border border-[#D4AF37]/30 text-center flex flex-col justify-between"
                    >
                      <img
                        src={p.image}
                        alt={pName}
                        className="w-12 h-12 object-contain mx-auto rounded-lg mb-1 bg-white"
                      />
                      <span className="font-bold text-[11px] text-[#0D2C22] line-clamp-1 block">
                        {pName}
                      </span>
                      <span className="text-[10px] text-[#C85A32] font-mono block">
                        ₹{p.price}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(p);
                          onClose();
                        }}
                        className="mt-2 w-full py-1 bg-[#0D2C22] text-[#D4AF37] text-[10px] font-bold rounded-lg hover:bg-[#184234] transition-colors"
                      >
                        + {translations[lang].products.addToCart}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 bg-[#F7F3EB] border border-[#D4AF37]/40 text-[#0D2C22] text-xs font-bold rounded-xl hover:bg-[#0D2C22]/10 transition-colors"
              >
                {t.retakeBtn}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-[#0D2C22] text-[#D4AF37] text-xs font-bold rounded-xl hover:bg-[#184234] transition-colors shadow"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
