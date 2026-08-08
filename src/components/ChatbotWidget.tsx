import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getKnowledgeBase, getProducts, getLanguage } from "../services/store";
import { MEDICAL_ESCALATION_KEYWORDS } from "../data/knowledgeBase";
import type { Product } from "../data/products";
import type { KnowledgeEntry } from "../data/knowledgeBase";
import { Language } from "../data/i18n";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  matchedProducts?: Product[];
  escalated?: boolean;
}

const PROMPT_CHIPS = [
  "🌿 What helps with indigestion & bloating?",
  "🌙 Remedies for Vata insomnia & stress",
  "✨ Natural blood purification for pimples",
  "🛡️ How to boost immune Ojas daily?",
];

const greetings: Record<Language, string> = {
  EN: "Namaste 🙏 I am your Vaidya AI Wellness Guide, grounded in classical Ayurvedic texts. Tell me your symptom or concern (e.g. digestion, sleep, stress, skin).",
  HI: "नमस्ते 🙏 मैं आपका वैद्य AI स्वास्थ्य मार्गदर्शक हूँ। शास्त्रीय आयुर्वेदिक ग्रंथों पर आधारित अपनी समस्या बताएं (जैसे: पाचन, नींद, तनाव)।",
  MR: "नमस्कार 🙏 मी तुमचा वैद्य AI आरोग्य मार्गदर्शक आहे। शास्त्रीय आयुर्वेद ग्रंथांवर आधारित आपली समस्या सांगा (उदा: पचन, झोप, ताण).",
};

const escalationMessage: Record<Language, string> = {
  EN: "⚠️ For questions involving specific prescription dosages, drug interactions, pregnancy, or chronic/serious conditions, classical safety protocols require direct evaluation. Please visit a certified Ayurvedic clinic or consult a registered Vaidya.",
  HI: "⚠️ विशेष खुराक, दवाओं के पारस्परिक प्रभाव, गर्भावस्था या गंभीर बीमारियों से संबंधित प्रश्नों के लिए, शास्त्रीय सुरक्षा नियमों के अनुसार आपको किसी पंजीकृत आयुर्वेदिक चिकित्सक या पास के क्लिनिक से परामर्श करना चाहिए।",
  MR: "⚠️ विशेष डोस, औषधांमधील प्रतिक्रिया, गरोदरपण किंवा गंभीर आजारांच्या बाबतीत शास्त्रीय सुरक्षिततेनुसार कृपया जवळच्या अधिकृत आयुर्वेदिक क्लिनिक किंवा वैद्यांचा प्रत्यक्ष सल्ला घ्या.",
};

const noMatchMessage: Record<Language, string> = {
  EN: "I do not have a grounded classical entry matching your exact query. For personalized health advice, please visit a nearby Ayurvedic clinic or certified doctor.",
  HI: "मेरे शास्त्रीय डेटाबेस में आपकी इस विशिष्ट समस्या का सटीक उत्तर नहीं है। व्यक्तिगत परामर्श के लिए कृपया किसी नजदीकी आयुर्वेदिक क्लिनिक या डॉक्टर से संपर्क करें।",
  MR: "माझ्या शास्त्रीय डेटाबेसमध्ये तुमच्या या विशिष्ट प्रश्नाचे थेट उत्तर नाही. अधिक माहितीसाठी कृपया जवळच्या आयुर्वेदिक क्लिनिक किंवा डॉक्टरांचा सल्ला घ्या.",
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>(getLanguage());
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-1", role: "bot", text: greetings[getLanguage()] },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping]);

  const handleLangChange = (l: Language) => {
    setLang(l);
    setMessages(prev => [...prev, { id: `msg-${Date.now()}`, role: "bot", text: greetings[l] }]);
  };

  const processUserQuery = (userText: string): Message => {
    const lowQuery = userText.toLowerCase();

    // 1. Check Safety / Medical Escalation Triggers
    const requiresEscalation = MEDICAL_ESCALATION_KEYWORDS.some(kw => lowQuery.includes(kw));
    if (requiresEscalation) {
      return {
        id: `msg-${Date.now()}`,
        role: "bot",
        text: escalationMessage[lang],
        escalated: true,
      };
    }

    // 2. Perform RAG Knowledge Base Matching
    const kbEntries = getKnowledgeBase().filter(e => e.active);
    let matchedEntry: KnowledgeEntry | null = null;
    let maxMatchCount = 0;

    kbEntries.forEach(entry => {
      let count = 0;
      entry.symptomTags.forEach(tag => {
        if (lowQuery.includes(tag.toLowerCase())) {
          count++;
        }
      });
      if (count > maxMatchCount) {
        maxMatchCount = count;
        matchedEntry = entry;
      }
    });

    if (!matchedEntry || maxMatchCount === 0) {
      return {
        id: `msg-${Date.now()}`,
        role: "bot",
        text: noMatchMessage[lang],
      };
    }

    const activeMatchedEntry: KnowledgeEntry = matchedEntry;

    // 3. Match Real Products from Database
    const allProducts = getProducts().filter(p => p.active);
    const matchedProducts = allProducts.filter(p =>
      activeMatchedEntry.productTags.includes(p.concern)
    ).slice(0, 3);

    const answerText = activeMatchedEntry.infoText[lang] || activeMatchedEntry.infoText["EN"];

    return {
      id: `msg-${Date.now()}`,
      role: "bot",
      text: answerText,
      matchedProducts,
    };
  };

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend) return;

    const userMsg: Message = { id: `msg-${Date.now()}-u`, role: "user", text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = processUserQuery(textToSend);
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
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
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-96 max-h-[600px] h-[540px] bg-[#FDFBF7] border-4 border-[#0D2C22] rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-[#0D2C22] text-[#FDFBF7] p-4 flex items-center justify-between border-b-2 border-[#D4AF37]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D2C22] flex items-center justify-center font-bold text-sm">
                🩺
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#FDFBF7] leading-none">
                  Vaidya AI Guide
                </h3>
                <span className="text-[10px] text-[#D4AF37] font-accent">
                  Grounded Classical Knowledge
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={lang}
                onChange={e => handleLangChange(e.target.value as Language)}
                className="bg-[#071C15] text-[#D4AF37] text-xs font-bold px-2 py-1 rounded border border-[#D4AF37]/30 focus:outline-none"
              >
                <option value="EN">EN</option>
                <option value="HI">HI</option>
                <option value="MR">MR</option>
              </select>

              <button
                onClick={() => setOpen(false)}
                className="text-[#FDFBF7] hover:text-[#D4AF37] font-bold text-base px-1"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Prompt Chips Bar */}
          <div className="bg-[#F7F3EB] p-2 overflow-x-auto whitespace-nowrap flex gap-1.5 border-b border-[#D4AF37]/20 text-[10px] font-semibold text-[#0D2C22]">
            {PROMPT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="bg-[#FDFBF7] border border-[#D4AF37]/40 px-2.5 py-1 rounded-full hover:bg-[#0D2C22] hover:text-[#D4AF37] transition-all shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFBF7]">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-[#0D2C22] text-[#FDFBF7] rounded-br-none"
                      : m.escalated
                      ? "bg-[#FFF2E8] border-2 border-[#C85A32] text-[#1A2421] rounded-bl-none"
                      : "bg-[#F7F3EB] border border-[#D4AF37]/30 text-[#1A2421] rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>

                {/* Linked Real Product Recommendations */}
                {m.matchedProducts && m.matchedProducts.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full max-w-[85%]">
                    <span className="text-[10px] font-bold text-[#0D2C22] uppercase tracking-wider block">
                      🌿 Recommended Formulations:
                    </span>
                    {m.matchedProducts.map(p => (
                      <Link
                        key={p.id}
                        to={`/products/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="bg-[#F7F3EB] border border-[#D4AF37]/40 hover:border-[#0D2C22] rounded-xl p-2 flex items-center justify-between text-xs transition-colors group block"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-8 h-8 rounded object-cover border"
                          />
                          <div>
                            <span className="font-bold text-[#0D2C22] group-hover:underline block text-[11px]">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#C85A32] font-semibold">
                              ₹{p.price}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#0D2C22]">View →</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-[#0D2C22]/70 font-mono bg-[#F7F3EB] p-2.5 rounded-xl border border-[#D4AF37]/20 w-fit">
                <span className="animate-bounce">🌿</span>
                <span>Consulting classical Ayurvedic Samhitas...</span>
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
                placeholder="Ask Vaidya about symptoms..."
                className="flex-1 bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0D2C22]"
              />
              <button
                onClick={() => handleSend()}
                className="bg-[#0D2C22] text-[#D4AF37] px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#184234] transition-colors"
              >
                Send
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
