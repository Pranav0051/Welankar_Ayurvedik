import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getKnowledgeBase, getProducts, getLanguage } from "../services/store";
import { MEDICAL_ESCALATION_KEYWORDS } from "../data/knowledgeBase";
import type { Product } from "../data/products";
import type { KnowledgeEntry } from "../data/knowledgeBase";
import { Language } from "../data/i18n";

interface ChatbotWidgetProps {
  onAddToCart?: (product: Product, quantity?: number) => void;
}

interface Message {
  id: string;
  role: "user" | "bot";
  userText?: string;
  textMap: Record<Language, string>;
  diseaseNameMap?: Record<Language, string>;
  category?: string;
  doshaInvolved?: string;
  homeRemediesMap?: Record<Language, string>;
  matchedProducts?: Product[];
  escalated?: boolean;
}

const PROMPT_CHIPS = [
  "🔥 Acidity & GERD",
  "🌙 Insomnia & Stress",
  "✨ Acne & Blood Detox",
  "💇 Hair Fall & Scalp Care",
  "🛡️ Cold, Cough & Ojas",
  "🦴 Joint Pain & Arthritis",
  "⚖️ Weight Loss & Agni",
  "🌸 PCOD & Period Care",
];

const greetings: Record<Language, string> = {
  EN: "Namaste 🙏 I am your Vaidya AI Wellness Guide, grounded in classical Ayurvedic texts. Ask me about any disease, symptom, or wellness goal (e.g., acidity, joint pain, hair fall, insomnia, PCOD) in English, Hindi, Marathi, or Marathlish/Hinglish!",
  HI: "नमस्ते 🙏 मैं आपका वैद्य AI स्वास्थ्य मार्गदर्शक हूँ। किसी भी बीमारी, लक्षण या उपाय के बारे में पूछें (जैसे: एसिडिटी, जोड़ों का दर्द, बाल झड़ना, अनिद्रा, PCOD)।",
  MR: "नमस्कार 🙏 मी तुमचा वैद्य AI आरोग्य मार्गदर्शक आहे. कोणत्याही आजाराबद्दल, लक्षणाबद्दल वा उपायाबद्दल विचारा (उदा: ॲसिडीटी, सांधेदुखी, केस गळती, झोप, PCOD).",
};

const escalationMessage: Record<Language, string> = {
  EN: "⚠️ For questions involving specific prescription dosages, drug interactions, pregnancy, or chronic/serious emergency conditions, classical safety protocols require direct evaluation. Please visit a certified Ayurvedic clinic or consult a registered Vaidya.",
  HI: "⚠️ विशेष खुराक, दवाओं के पारस्परिक प्रभाव, गर्भावस्था या गंभीर बीमारियों के लिए, शास्त्रीय सुरक्षा नियमों के अनुसार आपको किसी पंजीकृत आयुर्वेदिक चिकित्सक से परामर्श करना चाहिए।",
  MR: "⚠️ विशेष डोस, औषधांमधील प्रतिक्रिया, गरोदरपण किंवा गंभीर आजारांच्या बाबतीत शास्त्रीय सुरक्षिततेनुसार कृपया अधिकृत वैद्यांचा प्रत्यक्ष सल्ला घ्या.",
};

const noMatchMessage: Record<Language, string> = {
  EN: "I do not have a grounded classical entry matching your exact query. For personalized health advice, please consult an Ayurvedic practitioner or try searching for general concerns like digestion, sleep, stress, skin, or immunity.",
  HI: "मेरे शास्त्रीय डेटाबेस में आपकी इस विशिष्ट समस्या का सटीक उत्तर नहीं है। व्यक्तिगत परामर्श के लिए कृपया किसी आयुर्वेदिक चिकित्सक से संपर्क करें।",
  MR: "माझ्या शास्त्रीय डेटाबेसमध्ये तुमच्या या विशिष्ट प्रश्नाचे थेट उत्तर नाही. अधिक माहितीसाठी कृपया आयुर्वेदिक वैद्यांचा सल्ला घ्या.",
};

/**
 * Phonetic Transliteration dictionary for Romanized Marathi (Marathlish) & Romanized Hindi (Hinglish).
 * Maps phonetic n-grams and colloquial terms to canonical symptom concepts.
 */
const PHONETIC_MAP: Record<string, string[]> = {
  acidity: ["acidity", "pitta", "ambat", "dhekar", "jalan", "gerd", "chattit", "chest burn", "acid", "sour"],
  digestion: ["potat", "potaat", "gas", "pet", "paachan", "pachan", "ann", "fullness", "bloating", "apachan", "gut", "stomach"],
  constipation: ["kabz", "kabj", "kaddak", "saf", "shouchas", "vibandha", "bowel", "pot saf"],
  hairfall: ["kes", "galat", "jhadna", "galati", "hairfall", "hair loss", "hair", "baal", "konda", "dandruff", "thinning"],
  acne: ["pimples", "pimple", "purad", "muhase", "daag", "daag dhabbe", "zits", "acne", "blemish"],
  glow: ["tajeldarpana", "chamak", "noor", "rangat", "glow", "fairness", "complexion", "radiance"],
  insomnia: ["jhop", "zop", "zope", "jhope", "neend", "nidra", "sleepless", "anidra", "raat", "jagran", "sleep"],
  stress: ["taan", "tanav", "tension", "chinta", "ghabraghat", "panic", "overthinking", "worry", "stress"],
  memory: ["smaranshakti", "abhyas", "yaadgari", "brain", "fog", "smriti", "focus", "memory"],
  headache: ["doke", "dok", "dukhat", "dukhi", "sir", "dard", "sirdard", "migraine", "headache", "head pain"],
  immunity: ["sardi", "khokla", "khansi", "ghasa", "kaf", "phlegm", "sinus", "cold", "cough", "flu"],
  jointpain: ["sandhe", "gudghe", "gathiya", "jodo", "joints", "joint pain", "stiffness", "arthritis"],
  backpain: ["kambar", "kamar", "path", "sciatica", "back pain", "lumbar", "spasm"],
  weightloss: ["wajan", "vajan", "fat", "charbi", "lathhapan", "obesity", "weight loss"],
  diabetes: ["sakhar", "blood sugar", "madhumeh", "diabetes", "sugar"],
  pcod: ["pali", "period", "periods", "pcod", "pcos", "masik", "cramps"],
  stamina: ["takad", "shakti", "stamina", "energy", "weakness", "ashaktapana", "thakva", "fatigue"]
};

export default function ChatbotWidget({ onAddToCart }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>(getLanguage());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      role: "bot",
      textMap: greetings,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping, lang]);

  const handleLangChange = (l: Language) => {
    setLang(l);
  };

  /**
   * Phonetic and Transliteration Matcher
   */
  const processUserQuery = (userText: string): Message => {
    const lowQuery = userText.toLowerCase().trim();

    // 1. Check Safety & Medical Escalation Keywords
    const requiresEscalation = MEDICAL_ESCALATION_KEYWORDS.some(kw => lowQuery.includes(kw.toLowerCase()));
    if (requiresEscalation) {
      return {
        id: `msg-${Date.now()}`,
        role: "bot",
        textMap: escalationMessage,
        escalated: true,
      };
    }

    // 2. Perform Weighted Search across Knowledge Base
    const kbEntries = getKnowledgeBase().filter(e => e.active);
    let matchedEntry: KnowledgeEntry | null = null;
    let maxMatchScore = 0;

    // Extract phonetic concept tokens from query
    const matchedPhoneticConcepts: string[] = [];
    Object.entries(PHONETIC_MAP).forEach(([concept, terms]) => {
      if (terms.some(t => lowQuery.includes(t))) {
        matchedPhoneticConcepts.push(concept);
      }
    });

    kbEntries.forEach(entry => {
      let score = 0;

      // Check disease name match (weight: 6)
      if (entry.diseaseName) {
        if (entry.diseaseName.EN.toLowerCase().includes(lowQuery)) score += 6;
        if (entry.diseaseName.HI.toLowerCase().includes(lowQuery)) score += 6;
        if (entry.diseaseName.MR.toLowerCase().includes(lowQuery)) score += 6;
      }

      // Check direct symptomTags match (weight: 5 per tag)
      entry.symptomTags.forEach(tag => {
        const lowTag = tag.toLowerCase();
        if (lowQuery.includes(lowTag)) {
          score += 5;
        } else if (lowTag.includes(lowQuery) && lowQuery.length > 3) {
          score += 3;
        }
      });

      // Check Phonetic Concept Overlaps (weight: 4 per matched concept)
      matchedPhoneticConcepts.forEach(concept => {
        const conceptTerms = PHONETIC_MAP[concept] || [];
        const hasTagOverlap = entry.symptomTags.some(tag =>
          conceptTerms.some(term => tag.toLowerCase().includes(term))
        );
        if (hasTagOverlap) {
          score += 4;
        }
      });

      // Check category match (weight: 2)
      if (entry.category && lowQuery.includes(entry.category.toLowerCase())) {
        score += 2;
      }

      if (score > maxMatchScore) {
        maxMatchScore = score;
        matchedEntry = entry;
      }
    });

    if (!matchedEntry || maxMatchScore === 0) {
      return {
        id: `msg-${Date.now()}`,
        role: "bot",
        textMap: noMatchMessage,
      };
    }

    const activeEntry: KnowledgeEntry = matchedEntry;

    // 3. Match Real Products
    const allProducts = getProducts().filter(p => p.active);
    let matchedProducts = allProducts.filter(p =>
      activeEntry.productTags.includes(p.concern) ||
      activeEntry.productTags.includes(p.slug)
    );

    if (matchedProducts.length === 0) {
      matchedProducts = allProducts.slice(0, 2);
    } else {
      matchedProducts = matchedProducts.slice(0, 3);
    }

    return {
      id: `msg-${Date.now()}`,
      role: "bot",
      textMap: activeEntry.infoText,
      diseaseNameMap: activeEntry.diseaseName,
      category: activeEntry.category,
      doshaInvolved: activeEntry.doshaInvolved,
      homeRemediesMap: activeEntry.homeRemedies,
      matchedProducts,
    };
  };

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      userText: textToSend,
      textMap: { EN: textToSend, HI: textToSend, MR: textToSend },
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = processUserQuery(textToSend);
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleAddToCartClick = (p: Product) => {
    if (onAddToCart) {
      onAddToCart(p, 1);
      setToastMsg(
        lang === "MR" ? `${p.name} कार्टमध्ये समाविष्ट केले!` : lang === "HI" ? `${p.name} कार्ट में जोड़ा गया!` : `Added ${p.name} to cart!`
      );
      setTimeout(() => setToastMsg(null), 2500);
    }
  };

  return (
    <>
      {/* Floating Mortar and Pestle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open Vaidya AI Wellness Guide"
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#0D2C22] border-2 border-[#D4AF37] shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <div className="relative flex items-center justify-center">
          <span className="text-2xl">🌿</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-[#0D2C22] animate-pulse"></span>
        </div>
      </button>

      {/* Floating Chat Modal */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[410px] max-h-[640px] h-[580px] bg-[#FDFBF7] border-4 border-[#0D2C22] rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans">
          
          {/* Toast Notification */}
          {toastMsg && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-[#0D2C22] text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-50 border border-[#D4AF37] animate-bounce">
              ✓ {toastMsg}
            </div>
          )}

          {/* Header */}
          <div className="bg-[#0D2C22] text-[#FDFBF7] p-3.5 flex items-center justify-between border-b-2 border-[#D4AF37]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D2C22] flex items-center justify-center font-bold text-sm shadow-inner">
                🩺
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#FDFBF7] leading-none">
                  Vaidya AI Guide
                </h3>
                <span className="text-[10px] text-[#D4AF37] font-accent">
                  Real-Time Multilingual (EN / HI / MR / Marathlish)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={lang}
                onChange={e => handleLangChange(e.target.value as Language)}
                className="bg-[#071C15] text-[#D4AF37] text-xs font-bold px-2 py-1 rounded border border-[#D4AF37]/40 focus:outline-none cursor-pointer hover:border-[#D4AF37]"
                aria-label="Select Chat Language"
              >
                <option value="EN">English</option>
                <option value="HI">हिन्दी (Hindi)</option>
                <option value="MR">मराठी (Marathi)</option>
              </select>

              <button
                onClick={() => setOpen(false)}
                className="text-[#FDFBF7] hover:text-[#D4AF37] font-bold text-base px-1 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Categorized Prompt Chips Bar */}
          <div className="bg-[#F7F3EB] p-2 overflow-x-auto whitespace-nowrap flex gap-1.5 border-b border-[#D4AF37]/20 text-[10px] font-semibold text-[#0D2C22] scrollbar-none">
            {PROMPT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="bg-[#FDFBF7] border border-[#D4AF37]/40 px-2.5 py-1 rounded-full hover:bg-[#0D2C22] hover:text-[#D4AF37] transition-all shrink-0 active:scale-95 shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FDFBF7]">
            {messages.map(m => {
              if (m.role === "user") {
                return (
                  <div key={m.id} className="flex flex-col items-end">
                    <div className="max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm bg-[#0D2C22] text-[#FDFBF7] rounded-br-none">
                      {m.userText}
                    </div>
                  </div>
                );
              }

              // Bot Message: Dynamically reads active selected language (lang)
              const displayText = m.textMap[lang] || m.textMap["EN"];
              const diseaseTitle = m.diseaseNameMap ? (m.diseaseNameMap[lang] || m.diseaseNameMap["EN"]) : undefined;
              const remedyText = m.homeRemediesMap ? (m.homeRemediesMap[lang] || m.homeRemediesMap["EN"]) : undefined;

              return (
                <div key={m.id} className="flex flex-col items-start">
                  <div
                    className={`max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      m.escalated
                        ? "bg-[#FFF2E8] border-2 border-[#C85A32] text-[#1A2421] rounded-bl-none"
                        : "bg-[#F7F3EB] border border-[#D4AF37]/30 text-[#1A2421] rounded-bl-none"
                    }`}
                  >
                    {/* Disease Title & Dosha Header */}
                    {diseaseTitle && (
                      <div className="mb-2 pb-1.5 border-b border-[#D4AF37]/30 flex flex-wrap items-center gap-1.5">
                        <span className="font-heading font-bold text-[#0D2C22] text-[13px]">
                          {diseaseTitle}
                        </span>
                        {m.doshaInvolved && (
                          <span className="bg-[#0D2C22] text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded-full">
                            {m.doshaInvolved}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Main Info Body */}
                    <p>{displayText}</p>

                    {/* Home Remedies / Pathya Box */}
                    {remedyText && (
                      <div className="mt-2.5 p-2 bg-[#F0E8D8] border-l-2 border-[#D4AF37] rounded text-[11px] text-[#0D2C22]">
                        <span className="font-bold block mb-0.5">
                          🌿 {lang === "MR" ? "घरगुती उपाय व पथ्य:" : lang === "HI" ? "घरेलू उपाय एवं पथ्य:" : "Home Remedy & Pathya Tip:"}
                        </span>
                        <span>{remedyText}</span>
                      </div>
                    )}
                  </div>

                  {/* Linked Store Formulations */}
                  {m.matchedProducts && m.matchedProducts.length > 0 && (
                    <div className="mt-2.5 space-y-2 w-full max-w-[90%]">
                      <span className="text-[10px] font-bold text-[#0D2C22] uppercase tracking-wider block">
                        💊 {lang === "MR" ? "औषधी उत्पादने:" : lang === "HI" ? "अनुशंसित उत्पाद:" : "Recommended Formulations:"}
                      </span>
                      {m.matchedProducts.map(p => (
                        <div
                          key={p.id}
                          className="bg-[#F7F3EB] border border-[#D4AF37]/40 hover:border-[#0D2C22] rounded-xl p-2.5 flex items-center justify-between text-xs transition-colors shadow-sm"
                        >
                          <div className="flex items-center space-x-2.5 flex-1 min-w-0 pr-2">
                            <img
                              src={p.image}
                              alt={p.name}
                              onError={e => {
                                const fallbackKey = p.slug ? p.slug.split("-")[0] : "ashwagandha";
                                e.currentTarget.src = `/images/${fallbackKey}.png`;
                              }}
                              className="w-10 h-10 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-[#0D2C22] truncate block text-[11px]">
                                {lang === "MR" && p.name_mr ? p.name_mr : lang === "HI" && p.name_hi ? p.name_hi : p.name}
                              </span>
                              <div className="flex items-center space-x-2 text-[10px]">
                                <span className="text-[#C85A32] font-bold">₹{p.price}</span>
                                <span className="text-[#1A2421]/60">{p.weight}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            {onAddToCart && (
                              <button
                                onClick={() => handleAddToCartClick(p)}
                                className="bg-[#0D2C22] hover:bg-[#184234] text-[#D4AF37] text-[10px] font-bold px-2 py-1 rounded-lg transition-colors shadow"
                                title="Add directly to cart"
                              >
                                + Cart
                              </button>
                            )}
                            <Link
                              to={`/products/${p.slug}`}
                              onClick={() => setOpen(false)}
                              className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-[#0D2C22] text-[10px] font-bold px-2 py-1 rounded-lg transition-colors"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-[#0D2C22]/70 font-mono bg-[#F7F3EB] p-2.5 rounded-xl border border-[#D4AF37]/20 w-fit">
                <span className="animate-bounce">🌿</span>
                <span>
                  {lang === "MR" ? "वैद्य ग्रंथ शोधत आहे..." : lang === "HI" ? "वैद्य ग्रंथों का विश्लेषण..." : "Consulting classical Ayurvedic Samhitas..."}
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#F7F3EB] border-t border-[#D4AF37]/20">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder={
                  lang === "MR"
                    ? "तुमची समस्या सांगा (उदा: acidity, kes galat ahet, jhop nahi et)..."
                    : lang === "HI"
                    ? "अपनी समस्या बताएं (उदा: acidity, pet me gas, jhop nahi et)..."
                    : "Ask Vaidya about symptoms (e.g. acidity, kes galat ahet, jhop nahi)..."
                }
                className="flex-1 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0D2C22]"
              />
              <button
                onClick={() => handleSend()}
                className="bg-[#0D2C22] text-[#D4AF37] px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#184234] transition-colors shadow"
              >
                {lang === "MR" ? "पाठवा" : lang === "HI" ? "भेजें" : "Send"}
              </button>
            </div>
            <p className="text-[9px] text-[#1A2421]/60 text-center mt-2 font-mono leading-tight">
              General wellness advice grounded in classical texts. Not a medical diagnosis.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
