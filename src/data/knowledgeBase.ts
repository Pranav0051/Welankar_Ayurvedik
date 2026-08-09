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

export const initialKnowledgeBase: KnowledgeEntry[] = [
  // 1. Digestive System (Amlapitta & Agnimandya)
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
      "pitta", "sour belching", "hyperacidity", "acidic", "amlapitta",
      "ambat dhekar", "chattit jaljal", "pet me jalan", "khatti dakkar", "acidity zali ahe", "pitta jhala",
      "अम्लता", "एसिडिटी", "सीने में जलन", "खट्टी डकार", "अम्लपित्त",
      "ॲसिडीटी", "छातीत जळजळ", "आंबट ढेकर", "पित्त", "आम्लपित्त"
    ],
    infoText: {
      EN: "Amlapitta occurs when aggravated Pitta dosha impairs digestive fire (Agni), causing excess acid secretions. Classical remedies aim to cool Pitta, soothe the mucosal lining, and neutralize acid.",
      HI: "अम्लपित्त तब होता है जब कुपित पित्त दोष जठराग्नि को बिगाड़कर अत्यधिक अम्ल स्रावित करता है। यह पित्त शमन और पेट की परत को शीतलता प्रदान करता है।",
      MR: "कुपित झालेले पित्त जठराग्नी बिघडवून अतिरिक्त आम्ल तयार करते. पित्त शांत करणे व पोटात थंडावा देणे हा यावर शास्त्रीय उपाय आहे.",
    },
    homeRemedies: {
      EN: "Sip coriander seed water or cool A2 cow milk with cardamom. Avoid spicy, oily, fried, and sour foods.",
      HI: "धनिया का पानी या इलायची के साथ ठंडा A2 गाय का दूध पिएं। मिर्च-मसालेदार और खट्टे पदार्थों का त्याग करें।",
      MR: "धने सुंठ सिद्ध पाणी किंवा वेलचीयुक्त थंड A2 गाईचे दूध घ्या. तिखट, तेलकट व आंबट पदार्थ टाळा.",
    },
    productTags: ["digestion", "triphala-deep-gut-cleanser", "trikatu-deepan-churna"],
    active: true,
  },
  {
    id: "kb-digestion",
    category: "Digestive & Gut Health",
    diseaseName: {
      EN: "Indigestion, Bloating & Sluggish Digestion (Agnimandya)",
      HI: "मंद जठराग्नि, अपचन और पेट फूलना",
      MR: "अपचन, पोटात गॅस आणि मंदाग्नी",
    },
    doshaInvolved: "🌬️ Vata-Kapha Mandagni",
    symptomTags: [
      "digestion", "bloating", "gas", "indigestion", "gut", "stomach pain", "heaviness",
      "sluggish digestion", "appetite", "fullness", "pet me gas", "paachan", "pachan",
      "potat gas", "pot fulane", "pot dukhi", "ann n pachne", "pet me dard", "gas jhala ahe",
      "पाचन", "पेट", "गैस", "अपचन", "भारीपन", "भूख न लगना",
      "पचन", "पोट फुगणे", "गॅस", "अन्न न पचणे", "पोटदुखी"
    ],
    infoText: {
      EN: "Sluggish digestive fire (Mandagni) leads to un-assimilated metabolic toxins called Ama, resulting in gas, bloating, and heaviness after meals. Trikatu and Triphala reignite Agni and scrape away toxins.",
      HI: "मंदाग्नि के कारण पेट में 'आम' (विषक्त तत्व) जमा होता है, जिससे गैस और भारीपन आता है। त्रिकटु जठराग्नि को तीव्र करता है और त्रिफला आंतों की सफाई करता है।",
      MR: "मंदाग्नीमुळे पोटात 'आम' साचतो, ज्यामुळे गॅस व जडपणा येतो. त्रिकटु जठराग्नी प्रदीप्त करतो आणि त्रिफळा आंतड्यांची शुद्धी करतो.",
    },
    homeRemedies: {
      EN: "Chew a small piece of fresh ginger with a pinch of rock salt 15 minutes before lunch & dinner.",
      HI: "भोजन से 15 मिनट पहले सेंधा नमक के साथ ताजा अदरक का टुकड़ा चबाएं।",
      MR: "जेवणापूर्वी १५ मिनिटे आल्याचा छोटा तुकडा सैंधव मिठासोबत चावून खा.",
    },
    productTags: ["digestion", "trikatu-deepan-churna", "triphala-deep-gut-cleanser"],
    active: true,
  },
  {
    id: "kb-constipation",
    category: "Digestive & Gut Health",
    diseaseName: {
      EN: "Constipation & Bowel Irregularity (Vibandha)",
      HI: "कब्जियत और मल त्याग में कठिनाई (विबंध)",
      MR: "बद्धकोष्ठता आणि पोट साफ न होणे",
    },
    doshaInvolved: "🌬️ Dry Vata in Colon (Pakvashaya)",
    symptomTags: [
      "constipation", "bowel", "hard stool", "irregular bowel", "kabz", "kabj", "stool",
      "vibandha", "colon detox", "incomplete evacuation", "kabjiyaat",
      "pot saf nahi hot", "pot kaddak", "shouchas kaddak", "pot saf hot nahi",
      "कब्ज", "कब्जियत", "मल त्याग", "पेट साफ न होना", "विबंध",
      "बद्धकोष्ठता", "पोट साफ न होणे", "शौचास कडक होणे"
    ],
    infoText: {
      EN: "Constipation stems from aggravated dry Vata dosha in the lower intestines, slowing down peristalsis. Triphala Churna lubricates colon tissues and encourages smooth morning evacuation without dependency.",
      HI: "कब्ज बड़ी आंत में वात के सूखने से होती है। त्रिफला चूर्ण आंतों को प्राकृतिक नमी देकर सुबह सहज पेट साफ करता है।",
      MR: "आतड्यात वात सुकल्यामुळे बद्धकोष्ठता होते. त्रिफळा चूर्ण आतड्यांना मऊ करून सकाळी सहज पोट साफ करतो.",
    },
    homeRemedies: {
      EN: "Drink 1 glass of warm water with 1 tsp A2 cow ghee or soaked raisins before sleeping.",
      HI: "रात को सोते समय 1 गिलास गुनगुने पानी के साथ 1 चम्मच A2 गाय का घी या भीगी मुनक्का लें।",
      MR: "रात्री झोपताना १ ग्लास कोमट पाण्यासोबत १ चमचा A2 तूप किंवा भिजवलेले मनुक्यांचे पाणी घ्या.",
    },
    productTags: ["digestion", "triphala-deep-gut-cleanser"],
    active: true,
  },

  // 2. Skin & Hair Care (Rakta Shodhana & Varnya)
  {
    id: "kb-acne-pimples",
    category: "Skin & Beauty",
    diseaseName: {
      EN: "Acne, Pimples & Skin Blemishes (Yuvana Pidaka)",
      HI: "मुंहासे, कील-मुंहासे और चेहरे के दाग (युवान पिड़का)",
      MR: "पिंपल्स, पुरळ आणि त्वचेचे डाग",
    },
    doshaInvolved: "🔥 Pitta-Rakta Heat",
    symptomTags: [
      "acne", "pimples", "pimple", "zits", "blemishes", "breakouts", "oily skin",
      "blood purifier", "chehre ke daag", "pimpal", "muhase", "rakta",
      "purad", "chehryavar pimples", "daag dhabbe", "pimple aale ahet", "pimple aale",
      "मुंहासे", "कील", "दाग", "पिंपल्स", "चेहरे के दाने", "रक्त शुद्धि",
      "पिंपल्स", "पुरळ", "चेहऱ्यावरील डाग", "रक्त शुद्धी"
    ],
    infoText: {
      EN: "Acne is caused by excess Pitta heat contaminating the Rakta Dhatu (blood tissue) and clogging skin pores. Neem and Guduchi purify metabolic blood toxins at the root.",
      HI: "मुंहासे रक्त धातु में पित्त की गर्मी और विषक्त तत्वों के जमा होने से होते हैं। नीम और गुडूची रक्त शोधन करके अंदरूनी गर्मी शांत करते हैं।",
      MR: "रक्त धातुमध्ये पित्ताची उष्णता वाढल्यामुळे पिंपल्स येतात. कडू निंब आणि गुडूची रक्तातील विषारी द्रव्ये दूर करतात.",
    },
    homeRemedies: {
      EN: "Apply fresh neem paste or sandalwood water externally. Drink fresh Amla juice in the morning.",
      HI: "नीम का लेप या चंदन जल चेहरे पर लगाएं। सुबह आंवले का रस पीएं।",
      MR: "कडू निंबाचा लेप किंवा चंदनाचे पाणी चेहऱ्यावर लावा. सकाळी आवळ्याचा रस प्या.",
    },
    productTags: ["skin", "neem-guduchi-blood-purifier", "haldi-kesar-radiance-churna"],
    active: true,
  },
  {
    id: "kb-eczema-rashes",
    category: "Skin & Beauty",
    diseaseName: {
      EN: "Skin Eczema, Rashes, Itching & Allergies (Kustha / Vicharchika)",
      HI: "त्वचा की खुजली, चकत्ते, दाद और एलर्जी",
      MR: "त्वचेची खाज, लाल चकत्ते आणि ॲलर्जी",
    },
    doshaInvolved: "🔥 Pitta-Kapha Toxins",
    symptomTags: [
      "eczema", "rash", "itching", "skin allergy", "hives", "psoriasis", "dermatitis",
      "redness", "skin irritation", "khujli", "twacha", "khaj", "lal chakatte", "khaj yete",
      "खुजली", "चकत्ते", "दाद", "खाज", "त्वचा एलर्जी",
      "खाज", "लाल चकत्ते", "त्वचेची ॲलर्जी", "गजकर्ण"
    ],
    infoText: {
      EN: "Skin rashes and inflammatory itching are classic signs of trapped Pitta-Kapha toxins in the lymphatic and blood micro-channels. Neem & Manjishtha flush systemic impurities.",
      HI: "त्वचा पर जलन, खुजली और चकत्ते पित्त और कफ के प्रकोप से होते हैं। नीम और मंजीष्ठा लिम्फ और रक्त नालियों को साफ करते हैं।",
      MR: "त्वचेवर लाल चकत्ते व खाज येणे हे पित्त व कफ दोषाचे लक्षण आहे. नीम व मंजीष्ठा शरीरातील विषारी घटक साफ करतात.",
    },
    homeRemedies: {
      EN: "Wash affected skin with cool Neem decoction or apply virgin Coconut oil mixed with pure camphor.",
      HI: "नीम के पानी से त्वचा धोएं अथवा नारियल तेल में थोड़ा कपूर मिलाकर लगाएं।",
      MR: "कडू निंबाच्या पाण्याने त्वचा धुवा किंवा खोबरेल तेलात कापूर मिसळून लावा.",
    },
    productTags: ["skin", "neem-guduchi-blood-purifier"],
    active: true,
  },
  {
    id: "kb-hairfall-dandruff",
    category: "Skin & Beauty",
    diseaseName: {
      EN: "Hair Fall, Thinning & Dandruff (Khalitya / Palitya)",
      HI: "बाल झड़ना, पतले होना और रूसी (खालित्य)",
      MR: "केस गळणे, पतले होणे आणि कोंडा",
    },
    doshaInvolved: "🌬️ Vata-Pitta Scalp Heat",
    symptomTags: [
      "hair fall", "hairloss", "hair loss", "thinning hair", "dandruff", "scalp",
      "baldness", "grey hair", "baal jhadna", "kesh", "khalitya",
      "kes galat ahet", "kes galati", "kes khup galat ahet", "baal jhad rahe hai", "konda",
      "बाल झड़ना", "रूसी", "डैंड्रफ", "गंजापन", "सफेद बाल",
      "केस गळणे", "कोंडा", "केस पांढरे होणे", "केशवर्धक"
    ],
    infoText: {
      EN: "Excess Pitta heat in hair follicles combined with dry Vata causes hair roots to weaken and fall. Bhringraj and Brahmi oil deeply nourish the scalp and cool cranial heat.",
      HI: "सिर में अत्यधिक पित्त की गर्मी से बालों की जड़ें कमजोर होती हैं। भृंगराज और ब्राह्मी तेल बालों की जड़ों को पोषण प्रदान कर बाल झड़ने से रोकते हैं।",
      MR: "डोक्यातील पित्ताच्या उष्णतेमुळे केसांची मुळे कमकुवत होतात. भृंगराज व ब्राह्मी तेल डोक्याला थंडावा देऊन केस गळती थांबवते.",
    },
    homeRemedies: {
      EN: "Gently massage warm Brahmi/Bhringraj oil onto scalp before sleeping. Avoid harsh chemical shampoos.",
      HI: "रात को ब्राह्मी/भृंगराज तेल से सिर की मालिश करें। केमिकल शम्पू का इस्तेमाल न करें।",
      MR: "रात्री ब्राह्मी किंवा भृंगराज तेलाने डोक्याला हलका मसाज करा. रासायनिक शाम्पू टाळा.",
    },
    productTags: ["sleep", "brahmi-jatamansi-taila", "neem-guduchi-blood-purifier"],
    active: true,
  },
  {
    id: "kb-skin-glow",
    category: "Skin & Beauty",
    diseaseName: {
      EN: "Dull Complexion & Hyperpigmentation (Varnya Needs)",
      HI: "त्वचा का कालापन, झाइयां और रंगत सुधार",
      MR: "त्वचेचा निस्तेजपणा, काळे डाग आणि तजेलदारपणा",
    },
    doshaInvolved: "✨ Bhrajaka Pitta Renewal",
    symptomTags: [
      "glow", "dull skin", "pigmentation", "dark spots", "complexion", "radiance",
      "fairness", "skin lighting", "tan", "varnya", "chahre ka noor",
      "tajeldarpana", "chamak", "chehryavar daag", "chehre par nikhhar",
      "रंगत", "चमक", "झाइयां", "गोरापन", "चेहरे की कांति",
      "तजेलदारपणा", "त्वचेचा रंग", "काळे डाग", "चेहऱ्यावर तजेलदारपणा"
    ],
    infoText: {
      EN: "Healthy glowing skin depends on balanced Bhrajaka Pitta in the dermis. Saffron (Kesar), Turmeric (Haldi), and Sandalwood enhance microcirculation and skin luminosity naturally.",
      HI: "त्वचा की स्वाभाविक दमक भ्राजक पित्त के संतुलन पर निर्भर करती है। केसर और हल्दी त्वचा की कोशिकाओं को पोषण देकर स्वाभाविक निखार लाते हैं।",
      MR: "त्वचेचा नैसर्गिक तजेलदारपणा भ्राजक पित्तावर अवलंबून असतो. केशर व हळद त्वचेला नैसर्गिक सौंदर्य देतात.",
    },
    homeRemedies: {
      EN: "Mix Turmeric powder with raw milk or rose water as a face pack (Lepa).",
      HI: "कच्चे दूध या गुलाब जल में चुटकी भर हल्दी मिलाकर चेहरे पर उबटन की तरह लगाएं।",
      MR: "कच्च्या दुधात किंवा गुलाब पाण्यात हळद मिसळून चेहऱ्यावर लेप लावा.",
    },
    productTags: ["skin", "haldi-kesar-radiance-churna"],
    active: true,
  },

  // 3. Sleep, Mind & Nervous System (Manovaha Srotas)
  {
    id: "kb-insomnia-sleep",
    category: "Sleep & Mind",
    diseaseName: {
      EN: "Insomnia, Sleeplessness & Disturbed Sleep (Anidra)",
      HI: "अनिद्रा, नींद न आना और बेचैन नींद (अनिद्रा)",
      MR: "अनिद्रा, झोप न येणे आणि अपुरी झोप",
    },
    doshaInvolved: "🌬️ Aggravated Vata & Tarpaka Pitta",
    symptomTags: [
      "sleep", "insomnia", "sleeplessness", "restless sleep", "waking up", "nightmares",
      "anidra", "neend na aana", "jhop", "jhop nahi yet", "jhop nahi etiy", "jhop nahi etay", "neend nahi aati", "sleep disorder",
      "अनिद्रा", "नींद न आना", "बेचैन नींद", "रात को जगना",
      "अनिद्रा", "गाढ झोप न येणे", "झोपेच्या समस्या", "झोप"
    ],
    infoText: {
      EN: "Anidra (insomnia) is driven by hyperactive Vata vibrating in the brain (Majja Dhatu). Jatamansi, Brahmi, and Shankhapushpi soothe overactive neurotransmitters to restore delta sleep.",
      HI: "अनिद्रा वात दोष के बढ़ने और मस्तिष्क की अशांति से होती है। ब्राह्मी, शंखपुष्पी और जटामानसी मस्तिष्क की नसों को शांत कर प्राकृतिक नींद लाते हैं।",
      MR: "वात दोष वाढल्यामुळे आणि मन अशांत असल्यामुळे झोप येत नाही. ब्राह्मी व शंखपुष्पी मज्जासंस्थेला शांत करून गाढ झोप देतात.",
    },
    homeRemedies: {
      EN: "Massage soles of feet with warm sesame or Brahmi oil (Padabhyanga) before sleeping.",
      HI: "सोने से पहले पैरों के तलवों की गुनगुने तेल से मालिश (पादाभ्यंग) करें।",
      MR: "झोपण्यापूर्वी पायाच्या तळव्यांना कोमट ब्राह्मी किंवा तीळ तेलाने मसाज करा.",
    },
    productTags: ["sleep", "brahmi-jatamansi-taila", "shankhapushpi-jatamansi-syrup"],
    active: true,
  },
  {
    id: "kb-stress-anxiety",
    category: "Sleep & Mind",
    diseaseName: {
      EN: "Stress, Anxiety, Tension & Overthinking (Chinta / Manovaha Stres)",
      HI: "मानसिक तनाव, चिंता, घबराहट और अवसाद",
      MR: "मानसिक ताण, चिंता, घबराट आणि अतिविचार",
    },
    doshaInvolved: "🌬️ Prana Vata Disturbance",
    symptomTags: [
      "stress", "anxiety", "tension", "panic", "overthinking", "worry", "depression",
      "nervousness", "tress", "chinta", "tanav", "taan", "khup tension ahe", "tension ahe", "mansik taan",
      "तनाव", "चिंता", "घबराहट", "मानसिक दबाव", "अतिविचार",
      "ताण", "चिंता", "घबराट", "अतिविचार", "मानसिक ताण"
    ],
    infoText: {
      EN: "Anxiety and chronic stress deplete Ojas (vital life force) and destabilize Prana Vata. Nagauri Ashwagandha strengthens the adrenal system and builds nervous resilience.",
      HI: "अत्यधिक तनाव ओजस का क्षय करता है। नागौरी अश्वगंधा तंत्रिका तंत्र को मजबूत करके मानसिक तनाव और घबराहट को दूर करता है।",
      MR: "अतिविचार व ताणामुळे शरीरातील ओजस कमी होते. नागौरी अश्वगंधा चेतासंस्थेला ताकद देऊन ताण-तणाव कमी करते.",
    },
    homeRemedies: {
      EN: "Practice 10 minutes of Anulom-Vilom Pranayama morning and evening. Sip warm Ashwagandha milk.",
      HI: "सुबह-शाम 10 मिनट अनुलोम-विलोम प्राणायाम करें। रात को गुनगुना अश्वगंधा दूध पीएं।",
      MR: "सकाळी व संध्याकाळी १० मिनिटे अनुलोम-विलोम प्राणायाम करा. रात्री कोमट अश्वगंधा दूध घ्या.",
    },
    productTags: ["stress", "nagauri-ashwagandha-churna", "shankhapushpi-jatamansi-syrup"],
    active: true,
  },
  {
    id: "kb-memory-brain-fog",
    category: "Sleep & Mind",
    diseaseName: {
      EN: "Memory Loss, Concentration & Brain Fog (Medhya Kshaya)",
      HI: "स्मरण शक्ति की कमी, एकाग्रता और दिमागी थकान",
      MR: "स्मरणशक्ती कमी होणे, अभ्यासात लक्ष न लागणे व मेंदूची थकवा",
    },
    doshaInvolved: "🧠 Medhya Rasayana Need",
    symptomTags: [
      "memory", "concentration", "brain fog", "focus", "studying", "forgetfulness",
      "mental clarity", "dhir", "smriti", "dimag", "yaadgari", "smaranshakti", "abhyasat lax nahi",
      "याददाश्त", "स्मरण शक्ति", "एकाग्रता", "दिमाग", "भूलने की बीमारी",
      "स्मरणशक्ती", "एकाग्रता", "मेंदूची शक्ती", "अभ्यास"
    ],
    infoText: {
      EN: "Medhya herbs enhance Dhi (learning), Dhriti (retention), and Smriti (recall). Shankhapushpi and Brahmi nourish neuro-receptors and remove mental sluggishness.",
      HI: "शंखपुष्पी और ब्राह्मी मेध्य रसायन हैं जो मस्तिष्क की धारणा शक्ति और स्मरण शक्ति को प्रखर करते हैं।",
      MR: "शंखपुष्पी व ब्राह्मी हे मेध्य रसायन आहेत, जे स्मरणशक्ती आणि एकाग्रता वाढवतात.",
    },
    homeRemedies: {
      EN: "Eat 5 soaked almonds and 2 walnuts daily in the morning with a spoon of raw honey.",
      HI: "सुबह भीगे हुए 5 बादाम और 2 अखरोट शहद के साथ खाएं।",
      MR: "सकाळी ५ भिजवलेले बदाम आणि २ अक्रोड मधासोबत खा.",
    },
    productTags: ["sleep", "shankhapushpi-jatamansi-syrup", "brahmi-jatamansi-taila"],
    active: true,
  },
  {
    id: "kb-migraine-headache",
    category: "Sleep & Mind",
    diseaseName: {
      EN: "Migraine & Chronic Headaches (Shiroroga / Suryavarta)",
      HI: "माइग्रेन, सिरदर्द और आधे सिर का दर्द (शिरोरोग)",
      MR: "मायग्रेन, डोकेदुखी आणि अर्धे डोके दुखणे",
    },
    doshaInvolved: "🔥 Pitta-Vata Cranial Pressure",
    symptomTags: [
      "migraine", "headache", "head pain", "throbbing head", "head pain", "sir dard",
      "sirdard", "shiroroga", "half headache", "doke dukhi", "doke dukhat ahe", "sir me dard",
      "सिरदर्द", "माइग्रेन", "आधे सिर का दर्द", "सिर में थकावट",
      "डोकेदुखी", "मायग्रेन", "अर्धे डोके दुखणे"
    ],
    infoText: {
      EN: "Migraines stem from trapped Pitta heat and constricted blood vessels in cranial tissue. Cooling oils like Brahmi Jatamansi and Shiroabhyanga reduce throbbing vascular spasms.",
      HI: "माइग्रेन सिर की नसों में पित्त की अधिकता और तनाव से होता है। ब्राह्मी तेल से मालिश सिर को शीतलता देकर दर्द कम करती है।",
      MR: "मायग्रेन डोक्यातील पित्त व रक्तवाहिन्यांच्या ताणामुळे होतो. ब्राह्मी तेलाने मालिश केल्याने डोक्याला आराम मिळतो.",
    },
    homeRemedies: {
      EN: "Apply cold cow ghee inside nostrils (Nasya) or massage scalp with cooled Brahmi Taila.",
      HI: "नाक में गाय के देसी घी की 2-2 बूंदें डालें (नस्य) और ब्राह्मी तेल सिर पर लगाएं।",
      MR: "नाकात गाईच्या तुपाचे २-२ थेंब टाका (नस्य) आणि ब्राह्मी तेल लावा.",
    },
    productTags: ["sleep", "brahmi-jatamansi-taila", "shankhapushpi-jatamansi-syrup"],
    active: true,
  },

  // 4. Immunity & Respiratory (Pranavaha Srotas & Ojas)
  {
    id: "kb-immunity-fatigue",
    category: "Immunity & Vitality",
    diseaseName: {
      EN: "Low Immunity, Chronic Fatigue & Weakness (Ojas Kshaya)",
      HI: "कमजोर इम्युनिटी, बार-बार बीमार पड़ना और शारीरिक कमजोरी",
      MR: "कमी प्रतिकारशक्ती, सतत आजारी पडणे आणि अशक्तपणा",
    },
    doshaInvolved: "🛡️ Ojas Depletion (All Dhatus)",
    symptomTags: [
      "immunity", "fatigue", "weakness", "low energy", "stamina", "ojas", "vitality",
      "exhaustion", "frequent illness", "kamjori", "imunity", "pratikar shakti", "ashaktapana", "thakva",
      "इम्युनिटी", "कमजोरी", "थकावट", "रोग प्रतिरोधक शक्ति", "ऊर्जा",
      "प्रतिकारशक्ती", "अशक्तपणा", "थकवा", "ऊर्जा कमी होणे"
    ],
    infoText: {
      EN: "Ojas is the vital essence of all 7 bodily tissues. Low immunity manifests as constant lethargy and vulnerability to infections. Chyawanprash Reserve builds cellular Ojas.",
      HI: "आयुर्वेद में 'ओजस' संपूर्ण स्वास्थ्य का सार है। च्यवनप्राश 49 जड़ी-बूटियों के साथ ओजस और शारीरिक शक्ति को बढ़ाता है।",
      MR: "ओजस हा सर्व धातूंचा मुख्य सार आहे. च्यवनप्राश शरीराची प्रतिकारशक्ती व ताकद कमालीची वाढवतो.",
    },
    homeRemedies: {
      EN: "Take 1 tablespoon Chyawanprash every morning with warm milk on empty stomach.",
      HI: "रोज सुबह खाली पेट 1 चम्मच च्यवनप्राश गुनगुने दूध के साथ लें।",
      MR: "रोज सकाळी उपाशी पोटी १ चमचा च्यवनप्राश कोमट दुधासोबत घ्या.",
    },
    productTags: ["immunity", "chyawanprash-heritage-avaleha", "nagauri-ashwagandha-churna"],
    active: true,
  },
  {
    id: "kb-cold-cough-sinus",
    category: "Immunity & Vitality",
    diseaseName: {
      EN: "Cold, Cough, Seasonal Flu & Sinusitis (Kasa / Shwasa)",
      HI: "सर्दी, जुकाम, खांसी, कफ और साइनस (कास-श्वास)",
      MR: "सर्दी, खोकला, कफ आणि सायनस",
    },
    doshaInvolved: "💧 Aggravated Kapha-Vata Congestion",
    symptomTags: [
      "cold", "cough", "flu", "sinus", "congestion", "sore throat", "phlegm", "kasa",
      "sardi", "khansi", "khokla", "sardijukam", "ghasa dukhat ahe", "sardi khokla aala ahe", "sardi zali ahe",
      "सर्दी", "खांसी", "जुकाम", "कफ", "गले में खराश", "साइनस",
      "सर्दी", "खोकला", "कफ", "घसा दुखणे", "सायनस"
    ],
    infoText: {
      EN: "Cough and respiratory mucus result from excess Kapha accumulating in the lungs (Pranavaha Srotas). Trikatu and Chyawanprash liquefy phlegm and clear airway passages.",
      HI: "सर्दी और कफ फेफड़ों में कफ दोष के जमने से होते हैं। त्रिकटु (सोंठ, काली मिर्च, पीपली) जमा हुआ कफ पिघलाता है।",
      MR: "छातीत कफ साचल्यामुळे सर्दी व खोकला होतो. त्रिकटु (सुंठ, मिरी, पिंपळी) कफ वितळवून घसा साफ करतो.",
    },
    homeRemedies: {
      EN: "Drink hot Tulsi-Ginger-Black Pepper tea with 1 tsp raw honey 2-3 times daily.",
      HI: "दिन में 2-3 बार तुलसी, अदरक और काली मिर्च की कड़क चाय शहद के साथ पिएं।",
      MR: "दिवसातून २-३ वेळा तुळस, आले व मिरीचा काढा मधासोबत प्या.",
    },
    productTags: ["immunity", "trikatu-deepan-churna", "chyawanprash-heritage-avaleha"],
    active: true,
  },

  // 5. Joints, Bones & Pain (Asthi & Majja Srotas)
  {
    id: "kb-arthritis-joints",
    category: "Joints & Pain Relief",
    diseaseName: {
      EN: "Joint Pain, Stiffness & Arthritis (Sandhivata / Amavata)",
      HI: "जोड़ों का दर्द, गठिया और घुटनों की जकड़न (संधिवात/आमवात)",
      MR: "सांधेदुखी, संधिवात आणि सुजलेले सांधे",
    },
    doshaInvolved: "🌬️ Vata Invasion in Joints",
    symptomTags: [
      "joint pain", "arthritis", "stiffness", "knee pain", "swollen joints", "rheumatism",
      "gathiya", "sandhivata", "amavata", "jodo ka dard", "sandhe dukhi", "gudghe dukhat ahet", "sandhe dukhat ahet",
      "जोड़ों का दर्द", "गठिया", "घुटने का दर्द", "जकड़न", "सूजन",
      "सांधेदुखी", "संधिवात", "गुडघेदुखी", "सांधे सुजणे"
    ],
    infoText: {
      EN: "Sandhivata (osteoarthritis) is Vata drying up joint synovial fluid, while Amavata (rheumatoid) involves toxic Ama in joints. Ashwagandha rebuilds bone density and calms inflammatory Vata.",
      HI: "संधिवात जोड़ों में वात बढ़ने से और ग्रीस सूखने से होता है। अश्वगंधा और त्रिफला जोड़ों की सूजन और दर्द दूर करते हैं।",
      MR: "सांध्यांमधील वंगण कमी झाल्यामुळे सांधेदुखी होते. अश्वगंधा व त्रिफळा सांध्यातील दाह कमी करून ताकद देतात.",
    },
    homeRemedies: {
      EN: "Massage warm sesame oil mixed with dry ginger powder onto painful joints morning and evening.",
      HI: "गुनगुने तील के तेल में सोंठ का पाउडर मिलाकर जोड़ों की सहलाकर मालिश करें।",
      MR: "कोमट तीळ तेलात सुंठ पावडर मिसळून सांध्यांना हलक्या हाताने चोळा.",
    },
    productTags: ["stress", "nagauri-ashwagandha-churna", "triphala-deep-gut-cleanser"],
    active: true,
  },
  {
    id: "kb-back-muscle-pain",
    category: "Joints & Pain Relief",
    diseaseName: {
      EN: "Back Pain, Sciatica & Muscle Soreness (Kati Shoola)",
      HI: "कमर दर्द, साइटिका और मांसपेशियों की ऐंठन (कटिशूल)",
      MR: "पाठदुखी, कंबरदुखी आणि स्नायूंचा ताण",
    },
    doshaInvolved: "🌬️ Lumbar Vata Aggravation",
    symptomTags: [
      "back pain", "sciatica", "muscle pain", "lumbar pain", "lower back", "spasm",
      "kati shoola", "kamar dard", "path dukhi", "kambar dukhi", "kambar dukhat ahe", "path dukhat ahe",
      "कमर दर्द", "पीठ दर्द", "साइटिका", "मांसपेशियों का दर्द",
      "कंबरदुखी", "पाठदुखी", "स्नायूंचे दुखणे"
    ],
    infoText: {
      EN: "Lower back pain (Kati Shoola) is caused by Vata stagnation in the lumbar spine and pelvic basin. Ashwagandha strengthens spinal muscles and soothes nerve pinching.",
      HI: "कमर दर्द (कटिशूल) रीढ़ की हड्डी में वात जमने से होता है। अश्वगंधा कमर की मांसपेशियों को मजबूती देता है।",
      MR: "कंबरदुखी पाठीच्या मणक्यात वात साचल्यामुळे होते. अश्वगंधा स्नायूंना ताकद देऊन वेदना दूर करते.",
    },
    homeRemedies: {
      EN: "Apply hot compress or warm sesame oil to lower back. Avoid sitting continuously for long hours.",
      HI: "कमर पर गरम सिकाई करें और तिल का तेल लगाएं। लगातार लंबे समय तक न बैठें।",
      MR: "कमरेवर गरम पाण्याचा शेक घ्या व तेल लावा. एकाच जागी जास्त वेळ बसू नका.",
    },
    productTags: ["stress", "nagauri-ashwagandha-churna"],
    active: true,
  },

  // 6. Metabolic & Lifestyle Wellness (Medovaha Srotas)
  {
    id: "kb-weight-loss",
    category: "Metabolism & Weight",
    diseaseName: {
      EN: "Weight Management & Sluggish Metabolism (Sthoulya)",
      HI: "मोटापा, वजन घटाना और सुस्त मेटाबॉलिज्म (स्थौल्य)",
      MR: "वजन कमी करणे, लठ्ठपणा आणि मंद मेटाबॉलिझम",
    },
    doshaInvolved: "💧 Kapha-Medo Accumulation",
    symptomTags: [
      "weight loss", "obesity", "belly fat", "sluggish metabolism", "fat burning",
      "sthoulya", "vajan ghatana", "wajan kami karne", "fat detox", "vajan kami karaych ahe", "potachi charbi",
      "वजन घटाना", "मोटापा", "पेट की चर्बी", "मेटाबॉलिज्म",
      "वजन कमी करणे", "लठ्ठपणा", "पोटाची चरबी"
    ],
    infoText: {
      EN: "Sthoulya (obesity) is caused by Kapha blocking the Medovaha channels (fat tissue metabolism). Trikatu fires up fat metabolism while Triphala clears stagnant lipids.",
      HI: "मोटापा कफ दोष और मेद धातु के असंतुलन से होता है। त्रिकटु और त्रिफला मेटाबॉलिज्म को तेज करके चर्बी पिघलाने में मदद करते हैं।",
      MR: "लठ्ठपणा कफ दोष आणि मेद धातुच्या असंतुलनामुळे होतो. त्रिकटु व त्रिफळा चयापचय क्रिया सुधारतात.",
    },
    homeRemedies: {
      EN: "Drink warm water with 1 tsp raw honey and lemon every morning on empty stomach.",
      HI: "रोज सुबह खाली पेट 1 गिलास गुनगुने पानी में 1 चम्मच शहद और नींबू मिलाकर पीएं।",
      MR: "रोज सकाळी उपाशी पोटी कोमट पाण्यात १ चमचा मध व लिंबू मिसळून प्या.",
    },
    productTags: ["digestion", "trikatu-deepan-churna", "triphala-deep-gut-cleanser"],
    active: true,
  },
  {
    id: "kb-diabetes-sugar",
    category: "Metabolism & Weight",
    diseaseName: {
      EN: "High Blood Sugar & Metabolic Support (Prameha)",
      HI: "ब्लड शुगर नियंत्रण और प्रमेह प्रबंधन (प्रमेह)",
      MR: "रक्तातील साखर नियंत्रण आणि मधुमेह काळजी",
    },
    doshaInvolved: "💧 Kapha-Pitta Metabolic Disturbance",
    symptomTags: [
      "diabetes", "blood sugar", "sugar level", "hyperglycemia", "prameha", "insulin",
      "sugar control", "madhumeh", "sakhar", "sugar vadhli ahe",
      "ब्लड शुगर", "मधुमेह", "शुगर लेवल", "प्रमेह",
      "रक्तातील साखर", "मधुमेह", "साखर नियंत्रण"
    ],
    infoText: {
      EN: "Prameha involves Kapha imbalances in fat and fluid tissues affecting pancreatic Agni. Neem, Guduchi, and Turmeric support healthy glucose utilization and pancreatic metabolic balance.",
      HI: "प्रमेह (मधुमेह) में कफ और मेद धातु का विकार होता है। नीम, गुडूची और हल्दी ब्लड शुगर को संतुलित करने में सहायक हैं।",
      MR: "मधुमेहामध्ये कफ व मेद धातूचे असंतुलन असते. नीम व हळद रक्तातील साखरेचे प्रमाण संतुलित ठेवण्यास मदत करतात.",
    },
    homeRemedies: {
      EN: "Drink bitter gourd (Karela) juice or Jamun seed powder with warm water every morning.",
      HI: "सुबह करेले का रस या जामुन की गुठली का पाउडर गुनगुने पानी से लें।",
      MR: "सकाळी कारल्याचा रस किंवा जांभूळ बी पावडर कोमट पाण्यासोबत घ्या.",
    },
    productTags: ["skin", "neem-guduchi-blood-purifier", "haldi-kesar-radiance-churna"],
    active: true,
  },

  // 7. Women's & Men's Health (Artava & Shukra Srotas)
  {
    id: "kb-pcod-pcos-periods",
    category: "Women's Wellness",
    diseaseName: {
      EN: "PCOD, PCOS & Irregular Periods (Artava Dushti)",
      HI: "पीसीओडी, पीसीओएस और अनियमित मासिक धर्म (आर्तव दृष्टि)",
      MR: "PCOD, PCOS आणि अनियमित पाळी",
    },
    doshaInvolved: "💧 Kapha-Vata Ovarian Stagnation",
    symptomTags: [
      "pcod", "pcos", "irregular periods", "delayed period", "hormonal imbalance",
      "ovarian cyst", "artava", "period issue", "masik dharm", "pali", "pali et nahi", "pali irregular ahe",
      "अनियमित पीरियड", "मासिक धर्म", "पीसीओडी", "पीसीओएस", "हार्मोनल असंतुलन",
      "अनियमित पाळी", "पाळीची समस्या", "PCOD", "PCOS"
    ],
    infoText: {
      EN: "PCOD/PCOS is caused by Kapha-Vata blockage in the reproductive tissue (Artava Srotas). Neem, Guduchi, and Triphala clear pelvic tissue stagnation and restore hormonal balance.",
      HI: "पीसीओडी कफ और वात के कारण गर्भाशय नालियों में रुकावट से होता है। नीम, गुडूची और त्रिफला हार्मोनल संतुलन बनाते हैं।",
      MR: "PCOD हा कफ व वात दोषाच्या अडथळ्यामुळे होतो. नीम, गुडूची व त्रिफळा संप्रेरकांचे प्रमाण संतुलित ठेवतात.",
    },
    homeRemedies: {
      EN: "Drink warm Fenugreek (Methi) seed water every morning. Avoid processed white sugar.",
      HI: "रोज सुबह मेथी दाने का उबला पानी पिएं। चीनी और मैदा पूरी तरह बंद करें।",
      MR: "रोज सकाळी मेथीदाण्यांचे कोमट पाणी प्या. साखर व मैदा खाणे टाळा.",
    },
    productTags: ["skin", "neem-guduchi-blood-purifier", "triphala-deep-gut-cleanser"],
    active: true,
  },
  {
    id: "kb-menstrual-cramps",
    category: "Women's Wellness",
    diseaseName: {
      EN: "Menstrual Cramps & PMS Pain (Kashtartava)",
      HI: "मासिक धर्म का दर्द, ऐंठन और पीएमएस (कष्टार्तव)",
      MR: "पाळीतील पोटदुखी, ताण आणि त्रास",
    },
    doshaInvolved: "🌬️ Apana Vata Spasm",
    symptomTags: [
      "period pain", "cramps", "menstrual cramps", "pms", "kashtartava",
      "period cramps", "pelvic pain", "pait me dard", "pali me dukhi", "palit potat dukhat ahe",
      "मासिक धर्म का दर्द", "पेट में मरोड़", "कब्जियत और दर्द",
      "पाळीतील पोटदुखी", "पाळीचा ताण", "पोटात पेटके"
    ],
    infoText: {
      EN: "Severe period cramps (Kashtartava) result from obstructed Apana Vata in the pelvic basin. Ashwagandha and warm herbal fusions relax uterine smooth muscle spasms.",
      HI: "मासिक धर्म के दौरान मरोड़ अपान वात के रुकने से होती है। नागौरी अश्वगंधा गर्भाशय की मांसपेशियों को आराम देती है।",
      MR: "पाळीतील तीव्र पोटदुखी अपान वात अडकल्यामुळे होते. नागौरी अश्वगंधा स्नायूंना शिथिल करून वेदना कमी करते.",
    },
    homeRemedies: {
      EN: "Sip warm Ginger-Jaggery tea and place a warm water bottle on the lower abdomen.",
      HI: "अदरक और गुड़ की गरम चाय पिएं तथा पेट पर गरम पानी की बोतल से सिकाई करें।",
      MR: "आले व गुळाचा गरम काढा प्या आणि पोटावर शेक घ्या.",
    },
    productTags: ["stress", "nagauri-ashwagandha-churna", "trikatu-deepan-churna"],
    active: true,
  },
  {
    id: "kb-vitality-stamina",
    category: "Vitality & Energy",
    diseaseName: {
      EN: "Vajikarana Vitality, Energy & Physical Stamina",
      HI: "शारीरिक शक्ति, वाजीकरण, स्टैमिना और ओजस वृद्धि",
      MR: "शारीरिक ताकद, स्टॅमिना आणि ओजस वाढवणे",
    },
    doshaInvolved: "⚡ Shukra & Ojas Rejuvenation",
    symptomTags: [
      "stamina", "vitality", "vigor", "energy booster", "vajikarana", "strength",
      "physical strength", "takad", "shakti", "stamina booster", "takad pahije",
      "स्टैमिना", "शारीरिक शक्ति", "ताकत", "ऊर्जा", "वाजीकरण",
      "स्टॅमिना", "शारीरिक ताकद", "शक्ती", "ऊर्जा"
    ],
    infoText: {
      EN: "Vajikarana Rasayanas nourish the vital reproductive and muscle tissues (Shukra & Mamsa Dhatu). Nagauri Ashwagandha and Chyawanprash rebuild physical endurance and core stamina.",
      HI: "वाजीकरण रसायन शरीर की मांसपेशियों और ओजस को तृप्त करते हैं। अश्वगंधा और च्यवनप्राश शारीरिक शक्ति को दोगुना करते हैं।",
      MR: "वाजीकरण औषधे शरीरातील ताकद व ओजस कमालीचे वाढवतात. अश्वगंधा व च्यवनप्राश नवीन ऊर्जा देतात.",
    },
    homeRemedies: {
      EN: "Drink warm A2 cow milk boiled with Ashwagandha powder, 2 dates, and a pinch of nutmeg before sleep.",
      HI: "रात को दूध में अश्वगंधा, खजूर और जायफल उबालकर पिएं।",
      MR: "रात्री दुधात अश्वगंधा, खजूर आणि जायफळ उकळवून प्या.",
    },
    productTags: ["stress", "nagauri-ashwagandha-churna", "chyawanprash-heritage-avaleha"],
    active: true,
  },
];

// Keywords that trigger medical safety escalation (mandatory clinic/doctor referral)
export const MEDICAL_ESCALATION_KEYWORDS = [
  "pregnant", "pregnancy", "breastfeeding", "nursing", "baby", "infant",
  "blood pressure", "hypertension", "diabetes type 1", "insulin dependent",
  "cancer", "tumor", "heart attack", "chest pain", "kidney failure", "dialysis",
  "liver cirrhosis", "surgery", "prescription drug interaction", "overdose",
  "severe bleeding", "unconscious",
  "गर्भवती", "गर्भावस्था", "उच्च रक्तचाप", "कैंसर", "दिल का दौरा",
  "गरोदर", "गरोदरपण", "रक्तदाब", "कॅन्सर", "हृदयविकार"
];
