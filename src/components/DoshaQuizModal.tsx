import { useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/store";
import type { Product } from "../data/products";

interface DoshaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    dosha: "vata" | "pitta" | "kapha";
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How would you describe your body frame & metabolism?",
    options: [
      { label: "Light, slender, fast-moving; variable appetite", dosha: "vata" },
      { label: "Medium build, strong digestion; feel hot easily", dosha: "pitta" },
      { label: "Solid, broad frame, calm; slow digestive metabolism", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    text: "What is your primary stress response or mind pattern?",
    options: [
      { label: "Restless, anxious, racing thoughts, insomnia", dosha: "vata" },
      { label: "Irritable, impatient, intense, prone to acidity/heat", dosha: "pitta" },
      { label: "Calm, slow to act, attached, lethargic under stress", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    text: "How is your skin & complexion tendency?",
    options: [
      { label: "Dry, rough, thin, sensitive to cold winds", dosha: "vata" },
      { label: "Warm, prone to redness, acne, sensitivity, freckles", dosha: "pitta" },
      { label: "Smooth, soft, oily, thick, cool skin", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    text: "What is your sleep quality?",
    options: [
      { label: "Light, irregular, wake up frequently", dosha: "vata" },
      { label: "Moderate, sound sleep, but feel hot at night", dosha: "pitta" },
      { label: "Deep, heavy sleep, hard to wake up early", dosha: "kapha" },
    ],
  },
];

export default function DoshaQuizModal({ isOpen, onClose, onAddToCart }: DoshaQuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [resultDosha, setResultDosha] = useState<"vata" | "pitta" | "kapha" | null>(null);

  if (!isOpen) return null;

  const handleOptionSelect = (dosha: "vata" | "pitta" | "kapha") => {
    const updated = { ...scores, [dosha]: scores[dosha] + 1 };
    setScores(updated);

    if (currentStep < QUESTIONS.length - 1) {
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

  const doshaDetails = {
    vata: {
      title: "Vata Dominant (Air & Ether)",
      desc: "Your energy is creative and dynamic, but prone to anxiety, dryness, and sleeplessness. Warm, grounding adaptogens like Ashwagandha and Brahmi Oil nourish your nervous system.",
      tag: "Grounding & Warmth Protocol",
    },
    pitta: {
      title: "Pitta Dominant (Fire & Water)",
      desc: "Your energy is focused and intense, but prone to body heat, acidity, and skin flare-ups. Cooling formulations like Haldi Kesar and Neem restore your internal balance.",
      tag: "Cooling & Radiance Protocol",
    },
    kapha: {
      title: "Kapha Dominant (Earth & Water)",
      desc: "Your energy is steady and loyal, but prone to sluggish metabolism and heaviness. Stimulating herbs like Trikatu and Triphala ignite your inner Agni.",
      tag: "Metabolic Fire Protocol",
    },
  };

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
              <span>🌿 Ayurvedic Diagnostic</span>
              <span>•</span>
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            </div>

            <div className="w-full bg-[#EFE6D0] h-1.5 rounded-full overflow-hidden mb-6">
              <div
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                className="h-full bg-[#D4AF37] transition-all duration-300"
              ></div>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#0D2C22] mb-6">
              {QUESTIONS[currentStep].text}
            </h3>

            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt.dosha)}
                  className="w-full text-left p-4 rounded-2xl bg-[#F7F3EB] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#0D2C22] hover:text-[#FDFBF7] transition-all duration-200 text-xs font-medium flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <span className="text-[#D4AF37] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <span className="bg-[#0D2C22] text-[#D4AF37] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-widest border border-[#D4AF37]/40 inline-block">
                {doshaDetails[resultDosha].tag}
              </span>
              <h3 className="font-heading text-3xl font-bold text-[#0D2C22]">
                {doshaDetails[resultDosha].title}
              </h3>
              <p className="text-xs text-[#1A2421]/80 leading-relaxed font-sans max-w-md mx-auto">
                {doshaDetails[resultDosha].desc}
              </p>
            </div>

            <div className="border-t border-[#D4AF37]/25 pt-4">
              <h4 className="font-heading text-xs font-bold text-[#0D2C22] uppercase tracking-wider mb-3">
                🌿 Recommended Formulations for Your Dosha:
              </h4>

              <div className="space-y-2">
                {recommendedProds.map(p => (
                  <div
                    key={p.id}
                    className="bg-[#F7F3EB] border border-[#D4AF37]/30 rounded-xl p-3 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border border-[#D4AF37]/40"
                      />
                      <div>
                        <span className="font-bold text-[#0D2C22] block">{p.name}</span>
                        <span className="text-[10px] text-[#C85A32] font-semibold">₹{p.price} • {p.weight}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(p);
                      }}
                      className="px-3 py-1.5 bg-[#0D2C22] text-[#D4AF37] rounded-lg font-bold text-[11px] hover:bg-[#184234]"
                    >
                      + Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-[#0D2C22] underline font-bold"
              >
                ↻ Retake Diagnostic
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#0D2C22] rounded-xl font-bold text-xs shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
