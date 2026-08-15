export interface KnowledgeEntry {
  id: string;
  category?: string;
  diseaseName?: {
    EN: string;
    HI: string;
    MR: string;
  };
  symptomTags: string[];
  infoText: {
    EN: string;
    HI: string;
    MR: string;
  };
  homeRemedies?: {
    EN: string;
    HI: string;
    MR: string;
  };
  doshaInvolved?: string;
  productTags: string[];
  active: boolean;
}

export const MEDICAL_ESCALATION_KEYWORDS: string[] = [
  "pregnancy",
  "pregnant",
  "infant",
  "baby",
  "emergency",
  "chest pain",
  "heart attack",
  "cancer",
  "severe bleeding",
  "overdose",
  "गरोदर",
  "गरोदरपण",
  "गर्भावस्था",
  "हार्ट अटॅक",
  "छातीत तीव्र वेदना",
  "रक्तस्त्राव",
];

export const initialKnowledgeBase: KnowledgeEntry[] = [
  // 1. Digestive & Acidity (Acimint)
  {
    id: "kb-acidity-gerd",
    category: "Digestive & Gut Health",
    diseaseName: {
      EN: "Acidity, GERD & Heartburn (Amlapitta)",
      HI: "अम्लपित्त, एसिडिटी और सीने में जलन",
      MR: "आम्लपित्त, ॲसिडीटी आणि छातीत जळजळ",
    },
    doshaInvolved: "🔥 Pitta Imbalance",
    symptomTags: [
      "acidity", "gerd", "heartburn", "acid reflux", "chest burn", "burning stomach",
      "pitta", "sour belching", "hyperacidity", "acidic", "amlapitta", "acimint",
      "ambat dhekar", "chattit jaljal", "pet me jalan", "khatti dakkar", "acidity zali ahe", "pitta jhala",
      "अम्लता", "एसिडिटी", "सीने में जलन", "खट्टी डकार", "अम्लपित्त",
      "ॲसिडीटी", "छातीत जळजळ", "आंबट ढेकर", "पित्त", "आम्लपित्त", "ॲसिमिंट"
    ],
    infoText: {
      EN: "Amlapitta occurs when aggravated Pitta dosha impairs digestive fire (Agni), causing excess acid secretions. Dr. Velankar's Acimint Herbal Antacid Tablet cools Pitta, heals mucosal lining with Awala, Ushir and Guduchi, and normalizes acid naturally without rebound.",
      HI: "अम्लपित्त में कुपित पित्त जठराग्नि को बिगाड़कर अत्यधिक तेजाब बनाता है। डॉ. वेलणकर की ॲसिमिंट टैबलेट आंवला, उशीर व गिलोय से एसिडिटी और अल्सर को प्राकृतिक रूप से ठीक करती है।",
      MR: "कुपित झालेले पित्त जठराग्नी बिघडवून अतिरिक्त आम्ल तयार करते. डॉ. वेलणकर यांची ॲसिमिंट हर्बल अँटासिड टॅबलेट आवळा, उशीर आणि गुळवेलाच्या साह्याने आम्लपित्त, छातीतील जळजळ व अल्सरवर त्वरित आराम देते.",
    },
    homeRemedies: {
      EN: "Sip coriander seed water or cool A2 cow milk with cardamom. Take Acimint tablet after meals.",
      HI: "धनिया का पानी या इलायची के साथ ठंडा दूध पिएं। भोजन के बाद ॲसिमिंट टैबलेट लें।",
      MR: "धने सुंठ सिद्ध पाणी किंवा थंड दूध प्या. जेवणानंतर ॲसिमिंट टॅबलेट घ्या. तिखट, तेलकट पदार्थ टाळा.",
    },
    productTags: ["digestion", "acimint-herbal-antacid-tablet"],
    active: true,
  },

  // 2. Respiratory / Cold & Cough / Sneezing (SneeZona)
  {
    id: "kb-cold-cough-sneezona",
    category: "Respiratory & Immunity",
    diseaseName: {
      EN: "Cold, Sneezing, Sore Throat & Nasal Congestion (Pratishyaya)",
      HI: "सर्दी, छींकें, गले में खराश और जुकाम",
      MR: "सर्दी, शिंका, घसा खवखवणे व नाक गच्च होणे",
    },
    doshaInvolved: "🌬️ Vata-Kapha Respiratory Blockage",
    symptomTags: [
      "cold", "cough", "sneezing", "sneezona", "sore throat", "throat pain", "blocked nose",
      "running nose", "sinus", "nasal congestion", "bodyache", "pratishyaya", "sardi", "khokla",
      "shinka", "ghasa dukhne", "ghasa khavkhavne", "naak gach hone", "angdukhi", "kasa",
      "सर्दी", "जुकाम", "छींक", "गला दर्द", "खांसी", "स्नीझोना",
      "सर्दी", "शिंका", "खोकला", "घसा खवखवणे", "नाक गच्च", "अंगदुखी", "स्नीझोना"
    ],
    infoText: {
      EN: "Dr. Velankar's SneeZona Capsule is a targeted multi-symptom Ayurvedic formulation for throat pain, nasal congestion, cold, incessant sneezing, and body ache without causing sedation.",
      HI: "डॉ. वेलणकर की स्नीझोना कैप्सूल सर्दी, जुकाम, बार-बार आने वाली छींकों, गले की खराश और बदन दर्द का अचूक 'औषध एक - फायदे अनेक' फॉर्मूला है।",
      MR: "डॉ. वेलणकर यांचे युनिक फॉर्म्युलेशन 'स्नीझोना कॅप्सूल' घसा दुखणे, सर्दी, शिंका, नाक गच्च होणे व अंगदुखीवर अत्यंत गुणकारी आहे.",
    },
    homeRemedies: {
      EN: "Inhale steam with eucalyptus/ajwain, drink warm water with ginger, and take 1 SneeZona capsule twice daily.",
      HI: "अजवाइन की भाप लें, अदरक-तुलसी की चाय पिएं और स्नीझोना कैप्सूल लें।",
      MR: "तुळस-सुंठ काढा प्या, वाफ घ्या आणि दिवसातून २ वेळा १ स्नीझोना कॅप्सूल कोमट पाण्यासोबत घ्या.",
    },
    productTags: ["respiratory", "sneezona-capsules", "noni-gold-juice"],
    active: true,
  },

  // 3. Kidney Stones & UTI (Stonil)
  {
    id: "kb-kidney-stones-stonil",
    category: "Urinary & Renal Health",
    diseaseName: {
      EN: "Kidney Stones & Burning Urination (Mutrashmari & Mutrakrichhra)",
      HI: "गुर्दे की पथरी और मूत्र में जलन (UTI)",
      MR: "मुतखडा आणि लघवीची जळजळ (UTI)",
    },
    doshaInvolved: "💧 Pitta-Vata Ashmari in Mutravaha Srotas",
    symptomTags: [
      "kidney stone", "stones", "mutkhada", "pathari", "uti", "burning urination", "urine burn",
      "stonil", "mutrashmari", "lithotriptic", "alkalizer", "laghvichit jaljal", "mutradaha",
      "kidney pain", "flank pain", "renal calculus", "mutra",
      "पथरी", "गुर्दे की पथरी", "मूत्र में जलन", "स्टोनिल",
      "मुतखडा", "लघवीची जळजळ", "स्टोनिल", "मुत्रदाह", "मुत्राश्मरी"
    ],
    infoText: {
      EN: "Stonil Syrup & Tablet Combo is a classical lithotriptic and urinary alkalizer combining Pashanbhed, Varun Chal, and Gokshura to disintegrate stones and flush them painlessly.",
      HI: "स्टोनिल सिरप और टैबलेट पाषाणभेद, वरुण और गोक्षुर का दिव्य योग है, जो पथरी को तोड़कर बाहर निकालता है और मूत्र जलन शांत करता है।",
      MR: "स्टोनिल सिरप व टॅबलेट पाषाणभेद, वरुण व गोखरूच्या साहाय्याने मुतखडा विरघळवून बाहेर काढते आणि लघवीची जळजळ त्वरित थांबवते.",
    },
    homeRemedies: {
      EN: "Drink 3-4 liters of water daily, consume barley water (Yava) and tender coconut water.",
      HI: "प्रतिदिन 3-4 लीटर पानी पिएं, जौ का पानी और नारियल पानी का सेवन करें।",
      MR: "भरपूर पाणी प्या, शहाळ्याचे पाणी व कुळथाचे कढण घ्या आणि स्टोनिल सिरप २ चमचे दिवसातून ३ वेळा घ्या.",
    },
    productTags: ["kidney", "stonil-syrup-tablet-combo"],
    active: true,
  },

  // 4. Joint Pain, Arthritis & Bone Health (Ruma Cal)
  {
    id: "kb-joint-pain-rumacal",
    category: "Joints & Bone Health",
    diseaseName: {
      EN: "Joint Pain, Arthritis & Knee Stiffness (Sandhivata)",
      HI: "जोड़ों का दर्द, गठिया और घुटनों की कमजोरी",
      MR: "सांधेदुखी, गुडघेदुखी आणि संधिवात",
    },
    doshaInvolved: "🦴 Vata Aggravation in Asthi & Sandhi",
    symptomTags: [
      "joint pain", "joints", "arthritis", "sandhivata", "knee pain", "back pain", "ruma cal",
      "rumacal", "sandhedukhi", "gudghedukhi", "kambardukhi", "osteoporosis", "calcium",
      "bone strength", "joint swelling", "joint stiffness", "gathiya",
      "जोड़ों का दर्द", "गठिया", "घुटने का दर्द", "रुमाकैल",
      "सांधेदुखी", "गुडघेदुखी", "कंबरदुखी", "रुमाकॅल", "संधिवात"
    ],
    infoText: {
      EN: "Ruma Cal Tablets offer complete joint care formulated with Shallaki, Nirgundi, Yograj Guggulu, and organic Praval Pishti calcium to repair cartilage and alleviate chronic pain.",
      HI: "रुमाकैल टैबलेट शल्लाकी, निर्गुंडी और प्राकृतिक प्रवाल पिष्टी से जोड़ों के दर्द, सूजन और हड्डियों की कमजोरी को दूर करती है।",
      MR: "रुमाकॅल टॅबलेट शल्लाकी, निर्गुंडी, योगराज गुग्गुळ आणि नैसर्गिक कॅल्शियमयुक्त प्रवाल पिष्टीने सांधेदुखी, गुडघेदुखी व संधिवातावर संपूर्ण आराम देते.",
    },
    homeRemedies: {
      EN: "Warm sesame/Mahanarayan oil massage, consume turmeric with warm milk, and avoid sour/fermented foods.",
      HI: "तिल के तेल से मालिश करें, हल्दी वाला दूध पिएं और बासी-खट्टे भोजन से बचें।",
      MR: "कोमट तेलाने सांध्यांना मसाज करा, हळदीचे दूध प्या आणि रुमाकॅल टॅबलेट जेवणानंतर १ गोळी २ वेळा घ्या.",
    },
    productTags: ["joints", "ruma-cal-tablets"],
    active: true,
  },

  // 5. Migraine & Chronic Headache (Mgrena)
  {
    id: "kb-migraine-mgrena",
    category: "Headache & Neurological",
    diseaseName: {
      EN: "Migraine, Throbbing Pain & Headache (Shirashoola & Ardhavabhedaka)",
      HI: "माइग्रेन, आधे सिर का दर्द और तनाव",
      MR: "मायग्रेन, अर्धशिशी आणि तीव्र डोकेदुखी",
    },
    doshaInvolved: "🧠 Pitta-Vata Cranial Flow Disruption",
    symptomTags: [
      "migraine", "headache", "dokedukhi", "half head pain", "ardhavabhedaka", "mgrena",
      "sirdard", "throbbing headache", "tension headache", "sinus headache", "light sensitivity",
      "doke dukhne", "shirashool", "aura",
      "माइग्रेन", "सिरदर्द", "एमग्रेना", "आधा सिर दर्द",
      "मायग्रेन", "डोकेदुखी", "अर्धशिशी", "एमग्रेना"
    ],
    infoText: {
      EN: "Mgrena Tablet combines Godanti Bhasma, Shirashooladivajra Ras, Dashmoola, and Brahmi to neutralize vascular spasm and banish migraine pain naturally without drowsiness.",
      HI: "एमग्रेना टैबलेट गोदंती भस्म, दशमूल और ब्राह्मी द्वारा माइग्रेन और असहनीय सिरदर्द को जड़ से ठीक करती है।",
      MR: "एमग्रेना टॅबलेट गोदंती भस्म, दशमूळ व ब्राह्मीच्या साहाय्याने मायग्रेन, अर्धशिशी व तणावजन्य डोकेदुखीवर त्वरित आराम देते.",
    },
    homeRemedies: {
      EN: "Apply sandalwood paste on forehead, stay hydrated in dim light, and take 1 Mgrena tablet with warm water.",
      HI: "माथे पर चंदन का लेप लगाएं, शांत कमरे में विश्राम करें और एमग्रेना टैबलेट लें।",
      MR: "कपाळावर चंदनाचा लेप लावा, शांत अंधाऱ्या खोलीत विश्राम करा आणि १ एमग्रेना टॅबलेट कोमट पाण्यासोबत घ्या.",
    },
    productTags: ["headache", "mgrena-migraine-headache-tablets"],
    active: true,
  },

  // 6. Diabetes & Metabolic Health (Dibona)
  {
    id: "kb-diabetes-dibona",
    category: "Metabolic & Diabetes",
    diseaseName: {
      EN: "Diabetes, High Blood Sugar & Lethargy (Madhumeha)",
      HI: "मधुमेह, हाई ब्लड शुगर और कमजोरी",
      MR: "मधुमेह (डायबिटीज) आणि रक्तातील साखर नियंत्रण",
    },
    doshaInvolved: "🩸 Kapha-Vata Dhatu Ksheena",
    symptomTags: [
      "diabetes", "sugar", "blood sugar", "dibona", "madhumeha", "high glucose", "frequent urination",
      "sugar control", "sakhar", "madhumeh", "diabetic", "polyuria", "pancreas",
      "मधुमेह", "शुगर", "डायबिटीज", "डायबोना",
      "मधुमेह", "साखर वाढणे", "डायबिटीज", "डायबोना"
    ],
    infoText: {
      EN: "Dibona Tablet is formulated with Gurmar, Jamun seed, Karela, Vijaysar, and Shilajit to regulate blood glucose, support pancreatic beta cells, and boost energy.",
      HI: "डायबोना टैबलेट गुड़मार, जामुन गुठली, करेला और विजयसार से ब्लड शुगर को नियंत्रित करती है और शरीर को ऊर्जावान रखती है।",
      MR: "डायबोना टॅबलेट गुळमार, जांभूळ बी, कारले व विजयसार द्वारे रक्तातील साखर नैसर्गिकरीत्या नियंत्रणात ठेवते व अशक्तपणा दूर करते.",
    },
    homeRemedies: {
      EN: "Consume fenugreek (methi) water in morning, walk 30 mins daily, and take Dibona tablet before meals.",
      HI: "सुबह मेथी दाने का पानी पिएं, नियमित टहलें और भोजन से 30 मिनट पूर्व डायबोना टैबलेट लें।",
      MR: "सकाळी भिजवलेल्या मेथीचे पाणी प्या, रोज ३० मिनिटे चाला आणि जेवणापूर्वी डायबोना टॅबलेट घ्या.",
    },
    productTags: ["diabetes", "dibona-diabetic-care-tablets"],
    active: true,
  },

  // 7. General Vitality & Complete Health (Noni Gold Juice)
  {
    id: "kb-immunity-nonigold",
    category: "Immunity & Rejuvenation",
    diseaseName: {
      EN: "Low Immunity, Toxin Build-up & Chronic Fatigue",
      HI: "कमजोर रोग प्रतिरोधक क्षमता, विषाक्तता और थकान",
      MR: "कमी प्रतिकारशक्ती, शरीरातील विषारी घटक व थकवा",
    },
    doshaInvolved: "⚖️ Tridosha Rasayana Balance",
    symptomTags: [
      "immunity", "noni", "noni gold", "detox", "fatigue", "energy", "vitality", "blood purifier",
      "hemoglobin", "pratikarshakti", "thakwa", "ashaktapana", "overall health", "rasayana",
      "रोग प्रतिरोधक क्षमता", "इम्युनिटी", "थकान", "नोनी गोल्ड",
      "प्रतिकारशक्ती", "थकवा", "अशक्तपणा", "नोनी गोल्ड ज्यूस", "डिटॉक्स"
    ],
    infoText: {
      EN: "Dr. Velankar's Noni Gold Juice is an all-in-one health elixir featuring Noni, Moringa, Aloe Vera, Sea Buckthorn, Turmeric, and Ashwagandha to boost immunity, detox the body, and elevate hemoglobin.",
      HI: "डॉ. वेलणकर का नोनी गोल्ड जूस नोनी, सहजन, एलोवेरा और अश्वगंधा से युक्त संपूर्ण स्वास्थ्य अमृत है जो शरीर को डिटॉक्स कर इम्युनिटी बढ़ाता है।",
      MR: "डॉ. वेलणकर्स नोनी गोल्ड ज्यूस नोनी, शेवगा, कोरफड, सी बकथ्रॉन, हळद व अश्वगंधा युक्त नैसर्गिक आरोग्याचा मंत्र आहे.",
    },
    homeRemedies: {
      EN: "Take 15-30ml Noni Gold Juice in a glass of lukewarm water on empty stomach every morning.",
      HI: "प्रतिदिन सुबह खाली पेट 15-30ml नोनी गोल्ड जूस गुनगुने पानी में मिलाकर पिएं।",
      MR: "दररोज सकाळी उपाशीपोटी १५-३० मि.ली. नोनी गोल्ड ज्यूस कोमट पाण्यातून घ्या.",
    },
    productTags: ["immunity", "noni-gold-juice"],
    active: true,
  },

  // 8. Hair Fall & Dandruff (Velco Kachvardhini & Shampoos)
  {
    id: "kb-hair-care-velco",
    category: "Hair & Scalp Health",
    diseaseName: {
      EN: "Dandruff, Hair Fall & Scalp Damage (Khalitya & Darunaka)",
      HI: "रूसी (डैंड्रफ), बाल झड़ना और बालों का रूखापन",
      MR: "कोंडा (Dandruff), केस गळणे आणि कोरडे केस",
    },
    doshaInvolved: "🌿 Pitta-Vata Scalp Imbalance",
    symptomTags: [
      "hair fall", "dandruff", "kes galne", "konda", "velco", "kachvardhini", "shampoo",
      "hair growth", "scalp itching", "dry hair", "split ends", "kesh", "darunaka",
      "रूसी", "डैंड्रफ", "बाल झड़ना", "हेयर ऑयल",
      "कोंडा", "केस गळणे", "वेलको कचवर्धिनी", "शाम्पू"
    ],
    infoText: {
      EN: "Velco Kachvardhini Hair Oil and Dr. Velankar's Paraben-Free Herbal Shampoos eradicate dandruff fungus, stop follicle hairfall, and restore smooth, silky hair.",
      HI: "वेलको कचवर्धिनी तेल और डॉ. वेलणकर का हर्बल शैम्पू रूसी को जड़ से मिटाकर बालों का झड़ना तुरंत रोकता है।",
      MR: "वेलको कचवर्धिनी सिद्ध तेल आणि डॉ. वेलणकर्स हर्बल शाम्पू केसांचा कोंडा नष्ट करून मुळांना मजबुती देतात.",
    },
    homeRemedies: {
      EN: "Massage Velco Kachvardhini oil into hair roots twice daily and wash with Aloevera/Shikakai herbal shampoo.",
      HI: "दिन में दो बार वेलको कचवर्धिनी तेल से जड़ों में मालिश करें और हर्बल शैम्पू से धोएं।",
      MR: "दिवसातून दोन वेळा वेलको कचवर्धिनी तेल मुळाशी लावा आणि कोरफड/शिकाकाई हर्बल शाम्पूने केस धुवा.",
    },
    productTags: ["hair", "velco-kachvardhini-hair-oil", "herbal-shampoo-conditioner-combo"],
    active: true,
  },

  // 9. Skin Care & Cooling Hydration (Aloe-Vera Mint Gel)
  {
    id: "kb-skin-care-aloevera",
    category: "Skin & Dermatology",
    diseaseName: {
      EN: "Acne, Dry Skin, Sunburn & Blemishes (Mukhadushika)",
      HI: "मुंहासे, रूखी त्वचा और चेहरे की चमक",
      MR: "चेहऱ्यावरील मुरुमे, कोरडी त्वचा व तेज",
    },
    doshaInvolved: "✨ Pitta-Rakta Heat in Skin",
    symptomTags: [
      "skin", "acne", "aloevera", "pimple", "face gel", "glow", "dry skin", "sunburn",
      "chehra", "twacha", "purad", "chamak", "mint gel", "cooling",
      "मुंहासे", "एलोवेरा जेल", "त्वचा", "चेहरे की चमक",
      "त्वचा", "मुरुमे", "कोरफड जेल", "चेहऱ्यावर तेज"
    ],
    infoText: {
      EN: "Dr. Velankar's Aloe-Vera Gel with Mint provides deep hydration, cooling relief from sunburn and heat, and reduces blemishes for glowing, fresh skin.",
      HI: "डॉ. वेलणकर का एलोवेरा व पुदीना जेल चेहरे को ठंडक, नमी और प्राकृतिक निखार प्रदान करता है।",
      MR: "डॉ. वेलणकर्स अ‍ॅलोव्हेरा विथ मिंट जेल चेहऱ्याला थंडावा, ताजेपणा आणि नैसर्गिक कांती देणारे शुद्ध जेल आहे.",
    },
    homeRemedies: {
      EN: "Wash face with cold water, apply Dr. Velankar's Aloe-Vera Mint Gel twice daily.",
      HI: "ठंडे पानी से मुंह धोकर एलोवेरा पुदीना जेल हल्के हाथों से लगाएं।",
      MR: "चेहरा स्वच्छ धुवून त्यावर हे अ‍ॅलोव्हेरा पुदिना जेल हलक्या हाताने लावा.",
    },
    productTags: ["skin", "aloevera-mint-skin-gel"],
    active: true,
  },
];
