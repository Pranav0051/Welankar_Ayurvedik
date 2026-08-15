import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getKnowledgeBase, getProducts, getLanguage, setLanguage, subscribeStore } from "../services/store";
import { MEDICAL_ESCALATION_KEYWORDS } from "../data/knowledgeBase";
import type { Product } from "../data/products";
import type { KnowledgeEntry } from "../data/knowledgeBase";
import { translations, Language } from "../data/i18n";

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

const PROMPT_CHIPS: Record<Language, string[]> = {
  EN: [
    "🔥 Acidity & Heartburn (Acimint)",
    "🫁 Cold, Cough & Sneezing (SneeZona)",
    "💧 Kidney Stones & UTI (Stonil)",
    "🦴 Joint Pain & Arthritis (Ruma Cal)",
    "🧠 Migraine & Severe Headache (Mgrena)",
    "🛡️ Immunity & Detox (Noni Gold)",
    "💇 Hair Fall & Dandruff (Velco)",
    "🩸 Diabetes & Sugar (Dibona)",
  ],
  HI: [
    "🔥 एसिडिटी और सीने की जलन (ॲसिमिंट)",
    "🫁 सर्दी, खांसी व छींकें (स्नीझोना)",
    "💧 गुर्दे की पथरी व मूत्रदाह (स्टोनिल)",
    "🦴 जोड़ों का दर्द व गठिया (रुमाकैल)",
    "🧠 माइग्रेन व सिरदर्द (एमग्रेना)",
    "🛡️ रोग प्रतिरोधक क्षमता (नोनी गोल्ड)",
    "💇 बाल झड़ना व डैंड्रफ (वेलको)",
    "🩸 मधुमेह व ब्लड शुगर (डायबोना)",
  ],
  MR: [
    "🔥 आम्लपित्त व ॲसिडीटी (ॲसिमिंट)",
    "🫁 सर्दी, शिंका व खोकला (स्नीझोना)",
    "💧 मुतखडा व मुत्रदाह (स्टोनिल)",
    "🦴 सांधेदुखी व संधिवात (रुमाकॅल)",
    "🧠 मायग्रेन व डोकेदुखी (एमग्रेना)",
    "🛡️ रोगप्रतिकारक शक्ती (नोनी गोल्ड)",
    "💇 केस गळणे व कोंडा (वेलको)",
    "🩸 मधुमेह नियंत्रण (डायबोना)",
  ],
};

const greetings: Record<Language, string> = {
  EN: "Namaste 🙏 I am Dr. Velankar's AI Vaidya Guide from The Herbal Shopee. Ask me about your health symptoms (acidity, kidney stone, cold/sneezing, arthritis, migraine, hair fall, diabetes) in English, Hindi, or Marathi!",
  HI: "नमस्ते 🙏 मैं डॉ. वेलणकर का AI वैद्य मार्गदर्शक हूँ। अपनी किसी भी समस्या (एसिडिटी, पथरी, सर्दी-जुकाम, जोड़ों का दर्द, माइग्रेन, डैंड्रफ, डायबिटीज) के बारे में पूछें।",
  MR: "नमस्कार 🙏 मी डॉ. वेलणकर यांचा AI आरोग्य मार्गदर्शक आहे. आपल्या कोणत्याही तक्रारीबाबत (उदा. ॲसिडीटी, मुतखडा, सर्दी-शिंका, सांधेदुखी, मायग्रेन, केस गळणे, मधुमेह) विचारा.",
};

const escalationMessage: Record<Language, string> = {
  EN: "⚠️ For emergency medical conditions, severe chest pain, pregnancy, or acute trauma, immediate clinical care is recommended. Please contact Dr. Velankar's clinic directly at +91 9075042727 or visit an emergency care facility.",
  HI: "⚠️ आपातकालीन स्थितियों, सीने में तेज दर्द, गर्भावस्था या गंभीर समस्याओं के लिए तत्काल डॉक्टरी सहायता लें। डॉ. वेलणकर क्लिनिक से सीधे +91 9075042727 पर संपर्क करें।",
  MR: "⚠️ तातडीच्या वैद्यकीय समस्या, छातीत तीव्र वेदना किंवा गरोदरपणाच्या काळात तात्काळ डॉक्टरांशी संपर्क साधा. डॉ. वेलणकर यांच्या क्लिनिकशी +91 9075042727 वर थेट संपर्क करा.",
};

const noMatchMessage: Record<Language, string> = {
  EN: "I do not have a grounded classical entry matching your exact query. For personalized health advice, you can consult Dr. Velankar directly on WhatsApp at +91 9075042727 or search for products above.",
  HI: "मेरे डेटाबेस में इस समस्या का सटीक उत्तर नहीं है। व्यक्तिगत परामर्श के लिए आप डॉ. वेलणकर से सीधे व्हाट्सएप (+91 9075042727) पर संपर्क कर सकते हैं।",
  MR: "माझ्या डेटाबेसमध्ये या तक्रारीचे थेट उत्तर नाही. योग्य सल्ला मिळवण्यासाठी तुम्ही डॉ. वेलणकर यांच्याशी थेट व्हॉट्सॲपवर (+91 9075042727) संपर्क साधू शकता.",
};

const PHONETIC_MAP: Record<string, string[]> = {
  acidity: ["acidity", "pitta", "ambat", "dhekar", "jalan", "gerd", "chattit", "chest burn", "acid", "sour", "heartburn", "ulcer"],
  digestion: ["potat", "potaat", "gas", "pet", "paachan", "pachan", "ann", "fullness", "bloating", "apachan", "gut", "stomach"],
  hairfall: ["kes", "galat", "jhadna", "galati", "hairfall", "hair loss", "hair", "baal", "konda", "dandruff", "thinning"],
  headache: ["doke", "dok", "dukhat", "dukhi", "sir", "dard", "sirdard", "migraine", "headache", "head pain"],
  immunity: ["sardi", "khokla", "khansi", "ghasa", "kaf", "phlegm", "sinus", "cold", "cough", "flu", "sneezing", "sneezona", "shinka"],
  jointpain: ["sandhe", "gudghe", "gathiya", "jodo", "joints", "joint pain", "stiffness", "arthritis", "rumacal", "ruma cal", "hade"],
  kidney: ["mutkhada", "pathari", "stone", "kidney", "mutrashmari", "mutradaha", "burning urine", "uti", "stonil"],
  diabetes: ["sakhar", "blood sugar", "madhumeh", "diabetes", "sugar", "dibona"],
  skin: ["aloe", "korfad", "gel", "face", "skin", "glow", "dry skin", "sunburn", "pimple", "pimples"],
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
    return subscribeStore(() => {
      setLang(getLanguage());
    });
  }, []);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping, lang]);

  const handleLangChange = (l: Language) => {
    setLanguage(l);
    setLang(l);
  };

  const t = translations[lang].chatbot;

  const processUserQuery = (userText: string): Message => {
    const lowQuery = userText.toLowerCase().trim();

    // 1. Check Safety & Medical Escalation Keywords
    const requiresEscalation = MEDICAL_ESCALATION_KEYWORDS.some((kw: string) => lowQuery.includes(kw.toLowerCase()));
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

    const matchedPhoneticConcepts: string[] = [];
    Object.entries(PHONETIC_MAP).forEach(([concept, terms]) => {
      if (terms.some(t => lowQuery.includes(t))) {
        matchedPhoneticConcepts.push(concept);
      }
    });

    kbEntries.forEach(entry => {
      let score = 0;

      if (entry.diseaseName) {
        if (entry.diseaseName.EN.toLowerCase().includes(lowQuery)) score += 6;
        if (entry.diseaseName.HI.toLowerCase().includes(lowQuery)) score += 6;
        if (entry.diseaseName.MR.toLowerCase().includes(lowQuery)) score += 6;
      }

      entry.symptomTags.forEach(tag => {
        const lowTag = tag.toLowerCase();
        if (lowQuery.includes(lowTag)) {
          score += 5;
        } else if (lowTag.includes(lowQuery) && lowQuery.length > 3) {
          score += 3;
        }
      });

      matchedPhoneticConcepts.forEach(concept => {
        const conceptTerms = PHONETIC_MAP[concept] || [];
        const hasTagOverlap = entry.symptomTags.some(tag =>
          conceptTerms.some(term => tag.toLowerCase().includes(term))
        );
        if (hasTagOverlap) {
          score += 4;
        }
      });

      if (score > maxMatchScore) {
        maxMatchScore = score;
        matchedEntry = entry;
      }
    });

    if (matchedEntry && maxMatchScore > 0) {
      const entry = matchedEntry as KnowledgeEntry;
      const allProducts = getProducts();
      const matchedProducts = allProducts.filter(p =>
        entry.productTags.some(tag =>
          p.name.toLowerCase().includes(tag.toLowerCase()) ||
          p.slug.toLowerCase().includes(tag.toLowerCase()) ||
          (p.tagline && p.tagline.toLowerCase().includes(tag.toLowerCase()))
        )
      );

      return {
        id: `msg-${Date.now()}`,
        role: "bot",
        textMap: entry.infoText,
        diseaseNameMap: entry.diseaseName,
        category: entry.category,
        doshaInvolved: entry.doshaInvolved,
        homeRemediesMap: entry.homeRemedies,
        matchedProducts,
      };
    }

    return {
      id: `msg-${Date.now()}`,
      role: "bot",
      textMap: noMatchMessage,
    };
  };

  const handleSend = (overrideQuery?: string) => {
    const query = overrideQuery || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      userText: query,
      textMap: { EN: query, HI: query, MR: query },
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideQuery) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = processUserQuery(query);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleAddToCartClick = (p: Product) => {
    if (onAddToCart) {
      onAddToCart(p, 1);
      const name = lang === "MR" && p.name_mr ? p.name_mr : lang === "HI" && p.name_hi ? p.name_hi : p.name;
      setToastMsg(`✔ ${name} ${translations[lang].products.added}`);
      setTimeout(() => setToastMsg(null), 2500);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#0D2C22] to-[#184234] text-[#D4AF37] p-4 rounded-full shadow-2xl border-2 border-[#D4AF37] hover:scale-105 transition-all duration-300 flex items-center space-x-2 group hover-gold-glow"
        >
          <span className="text-2xl animate-pulse">🌿</span>
          <span className="font-heading font-bold text-xs pr-1 hidden sm:inline text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors">
            {t.title}
          </span>
        </button>
      )}

      {/* Floating Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#0D2C22] text-[#D4AF37] text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl border border-[#D4AF37]/50">
          {toastMsg}
        </div>
      )}

      {/* Chat Window Panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md h-[560px] bg-[#FDFBF7] border-2 border-[#D4AF37] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#1A2421]">
          {/* Header */}
          <div className="bg-[#0D2C22] text-[#FDFBF7] p-3.5 flex items-center justify-between border-b-2 border-[#D4AF37]/40">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D2C22] flex items-center justify-center font-bold text-sm shadow">
                🌿
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-[#FDFBF7]">
                  {t.title}
                </h3>
                <span className="text-[10px] text-[#D4AF37] block font-mono">
                  {t.subtitle}
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
            {PROMPT_CHIPS[lang].map((chip, idx) => (
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
                          🌿 {t.homeRemedyLabel}
                        </span>
                        <span>{remedyText}</span>
                      </div>
                    )}
                  </div>

                  {/* Linked Store Formulations */}
                  {m.matchedProducts && m.matchedProducts.length > 0 && (
                    <div className="mt-2.5 space-y-2 w-full max-w-[90%]">
                      <span className="text-[10px] font-bold text-[#0D2C22] uppercase tracking-wider block">
                        💊 {t.recommendedProductsLabel}
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
                              className="w-10 h-10 rounded-lg object-contain border border-[#D4AF37]/30 shrink-0 bg-white p-0.5"
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
                                + {translations[lang].products.addToCart}
                              </button>
                            )}
                            <Link
                              to={`/products/${p.slug}`}
                              onClick={() => setOpen(false)}
                              className="bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-[#0D2C22] text-[10px] font-bold px-2 py-1 rounded-lg transition-colors"
                            >
                              {translations[lang].products.viewDetails} →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct WhatsApp Doctor Consultation */}
                  <div className="mt-2 w-full max-w-[90%]">
                    <a
                      href="https://wa.me/919075042727?text=Hello%20Dr.%20Velankar,%20I%20would%20like%20to%20consult%20regarding%20my%20symptoms."
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center py-1.5 px-3 bg-[#184234] hover:bg-[#0D2C22] text-[#D4AF37] rounded-xl text-[10px] font-bold border border-[#D4AF37]/30 transition-all shadow-sm"
                    >
                      {t.whatsappDoctorBtn} (+91 9075042727)
                    </a>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-[#0D2C22]/70 font-mono bg-[#F7F3EB] p-2.5 rounded-xl border border-[#D4AF37]/20 w-fit">
                <span className="animate-bounce">🌿</span>
                <span>{t.typingText}</span>
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
                placeholder={t.placeholder}
                className="flex-1 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0D2C22]"
              />
              <button
                onClick={() => handleSend()}
                className="bg-[#0D2C22] text-[#D4AF37] px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#184234] transition-colors shadow"
              >
                {t.send}
              </button>
            </div>
            <p className="text-[9px] text-[#1A2421]/60 text-center mt-2 font-mono leading-tight">
              {t.disclaimer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
