export type Language = "EN" | "HI" | "MR";

export interface Translations {
  nav: {
    home: string;
    products: string;
    concerns: string;
    about: string;
    admin: string;
    cart: string;
    searchPlaceholder: string;
    subtitle: string;
    adminDashboard: string;
    adminLogin: string;
  };
  ticker: string[];
  hero: {
    badge: string;
    doshaQuizBtn: string;
    title: string;
    subtitle: string;
    shopNow: string;
    consultDoctor: string;
    trustPills: string[];
    quickViewHint: string;
    mrp: string;
  };
  doctorSection: {
    badge: string;
    title: string;
    name: string;
    role: string;
    quote: string;
    clinicTitle: string;
    clinicAddress: string;
    helplineTitle: string;
    appointmentsLabel: string;
    consultationLabel: string;
    websiteLabel: string;
    whatsappBtn: string;
    viewCatalogBtn: string;
  };
  concerns: {
    title: string;
    subtitle: string;
    exploreBtn: string;
    stress: string;
    stressDesc: string;
    digestion: string;
    digestionDesc: string;
    immunity: string;
    immunityDesc: string;
    skin: string;
    skinDesc: string;
    sleep: string;
    sleepDesc: string;
    hair: string;
    hairDesc: string;
    joints: string;
    jointsDesc: string;
    kidney: string;
    kidneyDesc: string;
    diabetes: string;
    diabetesDesc: string;
    respiratory: string;
    respiratoryDesc: string;
    headache: string;
    headacheDesc: string;
  };
  products: {
    featuredTitle: string;
    featuredSubtitle: string;
    viewAllCatalog: string;
    addToCart: string;
    added: string;
    viewDetails: string;
    filterByConcern: string;
    allConcerns: string;
    priceRange: string;
    searchProducts: string;
    ingredients: string;
    dosage: string;
    safetyWarning: string;
    inStock: string;
    outOfStock: string;
    formulationType: string;
    allForms: string;
    sortBy: string;
    sortBestselling: string;
    sortTopRated: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    noProductsFound: string;
    noProductsSubtitle: string;
    resetFilters: string;
    batchCertNo: string;
    intakeVehicle: string;
    doshaImpact: string;
    askDoctorWhatsApp: string;
    reviews: string;
  };
  spotlight: {
    badge: string;
    title: string;
    desc: string;
    points: string[];
    btnText: string;
  };
  customBlend: {
    badge: string;
    title: string;
    subtitle: string;
    jarTitle: string;
    nameLabel: string;
    defaultBlendName: string;
    selectedIngredients: string;
    discountLabel: string;
    addBtn: string;
    addedBtn: string;
  };
  batchVerification: {
    badge: string;
    title: string;
    subtitle: string;
    placeholder: string;
    verifyBtn: string;
    verifiedText: string;
    statsPatients: string;
    statsPatientsLabel: string;
    statsRating: string;
    statsRatingLabel: string;
  };
  doshaQuiz: {
    modalTitle: string;
    modalSubtitle: string;
    step: string;
    resultTitle: string;
    dominantText: string;
    recommendedTitle: string;
    retakeBtn: string;
    closeBtn: string;
    questions: Array<{
      text: string;
      options: Array<{ label: string; dosha: "vata" | "pitta" | "kapha" }>;
    }>;
    doshaProfiles: {
      vata: { title: string; desc: string };
      pitta: { title: string; desc: string };
      kapha: { title: string; desc: string };
    };
  };
  quickView: {
    overviewTab: string;
    ingredientsTab: string;
    doshaTab: string;
    anupanaTab: string;
    dosageLabel: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    shipping: string;
    freeShipping: string;
    total: string;
    checkout: string;
    processing: string;
    orderSuccess: string;
    customerDetails: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    shippingAddress: string;
    paymentMethod: string;
    razorpaySim: string;
    payNowBtn: string;
    orderConfirmedBadge: string;
    orderRefId: string;
    paymentRefId: string;
    customerLabel: string;
    deliveryAddressLabel: string;
    amountPaidLabel: string;
    returnToShopBtn: string;
    exploreBtn: string;
  };
  chatbot: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    disclaimer: string;
    typingText: string;
    homeRemedyLabel: string;
    recommendedProductsLabel: string;
    whatsappDoctorBtn: string;
  };
  footer: {
    companyTitle: string;
    companySubtitle: string;
    companyDesc: string;
    clinicAddress: string;
    formulationsHeading: string;
    categoriesHeading: string;
    consultationHeading: string;
    helplineLabel: string;
    whatsappLabel: string;
    websiteLabel: string;
    pharmacyBadge: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    nav: {
      home: "Home",
      products: "Products",
      concerns: "Shop by Concern",
      about: "Dr. Velankar",
      admin: "Admin Portal",
      cart: "Cart",
      searchPlaceholder: "Search medicines, SneeZona, Acimint, Noni Gold...",
      subtitle: "AYUSH Certified Classical Apothecary",
      adminDashboard: "⚙️ Dashboard",
      adminLogin: "🔐 Admin Login",
    },
    ticker: [
      "🌿 Dr. Velankar's Unique Clinical Formulations",
      "📜 The Herbal Shopee Pvt. Ltd. — Sangli",
      "🩺 Free Consultation & Guidance: +91 9075042727",
      "🚚 Free Express Delivery Across India Over ₹499",
      "💎 100% Pure Classical & Paraben-Free Remedies",
      "🏆 50,000+ Verified Patient Consultations",
    ],
    hero: {
      badge: "Pure • Dr. Velankar's Formulations • AYUSH Certified",
      doshaQuizBtn: "✨ Take Dosha Quiz",
      title: "Ancient Wisdom for Modern Wellness",
      subtitle: "Doctor-formulated classical Ayurvedic remedies, cold-stone milled herbs, and scientifically tested botanical extracts from Dr. Velankar's Herbal Shopee.",
      shopNow: "Explore Formulations",
      consultDoctor: "Doctor Consultation (+91 9075042727)",
      trustPills: [
        "✓ AYUSH Certified Formulations",
        "✓ 100% Paraben & Chemical Free",
        "✓ Clinically Tested Remedies",
      ],
      quickViewHint: "Click for 360° Formulation Quick View →",
      mrp: "MRP",
    },
    doctorSection: {
      badge: "🌿 Classical Healing • 25+ Years Clinical Practice",
      title: "Scientifically Formulated Classical Ayurveda",
      name: "Dr. Velankar",
      role: "Founder & Chief Vaidya — The Herbal Shopee Pvt. Ltd.",
      quote: "\"Our mission is to bring pure, classical Ayurvedic formulations from ancient texts into modern, easy-to-use remedies. Each product—from our signature SneeZona and Acimint to Noni Gold Juice and Stonil—is formulated through decades of clinical practice in Sangli to target root causes without unwanted side effects.\"",
      clinicTitle: "📍 Sangli Clinic Address:",
      clinicAddress: "Sahyadri Siddhi Apartment, B Wing Shop No. 16, Opp. N.P. Fish Market, Vishrambag Kupwad Road, Sangli, Maharashtra.",
      helplineTitle: "📞 Direct Helpline & WhatsApp:",
      appointmentsLabel: "Appointments:",
      consultationLabel: "Consultation:",
      websiteLabel: "Website:",
      whatsappBtn: "💬 Book Online Consultation (WhatsApp)",
      viewCatalogBtn: "View All Dr. Velankar Formulations",
    },
    concerns: {
      title: "Shop by Health Concern",
      subtitle: "Targeted Ayurvedic clinical formulations crafted for your body's dosha balance",
      exploreBtn: "Explore Formulations →",
      stress: "Stress & Anxiety",
      stressDesc: "Medicated adaptogens & Jatamansi for nervous calm",
      digestion: "Acidity & Digestion",
      digestionDesc: "Acimint & herbs for hyperacidity, heartburn & gut fire",
      immunity: "Immunity & Vitality",
      immunityDesc: "Noni Gold Juice for whole-body detox, vitality & Hb",
      skin: "Skin & Complexion",
      skinDesc: "Aloe-Vera Mint Gel for cooling hydration & glow",
      sleep: "Deep Sleep & Relaxation",
      sleepDesc: "Brahmi head oils & soothing herbs for sound rest",
      hair: "Hair Fall & Dandruff",
      hairDesc: "Velco Kachvardhini oil & paraben-free shampoos",
      joints: "Joint Pain & Arthritis",
      jointsDesc: "Ruma Cal tablets for arthritis, cartilage & joint mobility",
      kidney: "Kidney Stones & UTI",
      kidneyDesc: "Stonil Syrup & Tablets for kidney stone & UTI relief",
      diabetes: "Diabetes & Sugar Control",
      diabetesDesc: "Dibona tablets for natural blood sugar & pancreatic balance",
      respiratory: "Cold, Cough & Throat",
      respiratoryDesc: "SneeZona capsules for sore throat, sneezing & congestion",
      headache: "Migraine & Headache",
      headacheDesc: "Mgrena tablets for natural relief from throbbing migraine",
    },
    products: {
      featuredTitle: "Dr. Velankar's Signature Formulations",
      featuredSubtitle: "Our most trusted clinical tablets, juices, syrups, and medicated oils",
      viewAllCatalog: "View Full Apothecary Catalog",
      addToCart: "Add to Cart",
      added: "Added to Cart!",
      viewDetails: "View Details",
      filterByConcern: "Filter by Concern",
      allConcerns: "All Products",
      priceRange: "Price Range",
      searchProducts: "Search medicines...",
      ingredients: "Key Ingredients",
      dosage: "Dosage & Usage",
      safetyWarning: "Safety & Classical Advice",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      formulationType: "Formulation Type:",
      allForms: "All Forms",
      sortBy: "Sort By:",
      sortBestselling: "Bestselling",
      sortTopRated: "Top Rated (★)",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      noProductsFound: "No Ayurvedic Remedies Found",
      noProductsSubtitle: "Try adjusting your search terms or price filter constraints.",
      resetFilters: "Reset Filters",
      batchCertNo: "Batch Cert No:",
      intakeVehicle: "Intake Vehicle (Anupana)",
      doshaImpact: "Dosha Balancing Impact",
      askDoctorWhatsApp: "Ask Dr. Velankar on WhatsApp (+91 9075042727)",
      reviews: "reviews",
    },
    spotlight: {
      badge: "🌿 Clinical Spotlight • Normalises Acidity Naturally",
      title: "Dr. Velankar's Acimint Herbal Antacid",
      desc: "Formulated with pure Awala (Phyllanthus emblica), Ushir (Vetiveria zizanioides), and Guduchi (Tinospora cordifolia). It provides natural, rapid soothing from:",
      points: [
        "Relief from Acidity, Heartburn & Bloating",
        "Promotes Rapid Gastric Ulcer Healing",
        "Relieves Pitta Headache & Skin Rashes",
        "Prevents Rebound Acid Formation",
      ],
      btnText: "View Acimint Details",
    },
    customBlend: {
      badge: "🧪 Interactive Apothecary Laboratory",
      title: "Create Your Custom Apothecary Blend",
      subtitle: "Select up to 3 classical formulations to create a personalized stone-ground jar (15% custom bundle savings applied).",
      jarTitle: "📦 Custom Apothecary Jar",
      nameLabel: "Name Your Custom Remedy:",
      defaultBlendName: "My Personal Remedy Blend",
      selectedIngredients: "Selected Formulations",
      discountLabel: "Bundle Discount (15% Off)",
      addBtn: "⚡ Add Custom Blend",
      addedBtn: "✔ Added Blend!",
    },
    batchVerification: {
      badge: "📜 Transparency & Quality Guarantee",
      title: "Batch Certificate Verification Tool",
      subtitle: "Every bottle & strip is stamped with a unique Dr. Velankar batch code, tested for active botanical potency, zero synthetic adulterants, and zero heavy metals.",
      placeholder: "Enter Batch No (e.g. VEL-2026-SNZ-01)",
      verifyBtn: "Verify Batch",
      verifiedText: "Verified Authentic Batch — Standard Quality Certified (0% Heavy Metals)",
      statsPatients: "50,000+",
      statsPatientsLabel: "Satisfied Patients",
      statsRating: "4.9 ★",
      statsRatingLabel: "Clinical Trust Rating",
    },
    doshaQuiz: {
      modalTitle: "Ayurvedic Prakriti & Dosha Assessment",
      modalSubtitle: "Discover your dominant bio-energy (Vata, Pitta, or Kapha) for personalized herbal therapy.",
      step: "Question",
      resultTitle: "Your Prakriti Constitution",
      dominantText: "Dominant Bio-Energy",
      recommendedTitle: "Recommended Formulations for Your Dosha:",
      retakeBtn: "🔄 Retake Assessment",
      closeBtn: "Close",
      questions: [
        {
          text: "How would you describe your body frame & metabolism?",
          options: [
            { label: "Light, slender, variable appetite, feel cold easily", dosha: "vata" },
            { label: "Medium build, strong appetite, feel hot quickly", dosha: "pitta" },
            { label: "Solid build, broad frame, slow digestive metabolism", dosha: "kapha" },
          ],
        },
        {
          text: "What is your primary stress response or mind pattern?",
          options: [
            { label: "Restless, anxious, racing thoughts, insomnia", dosha: "vata" },
            { label: "Irritable, impatient, intense, prone to acidity", dosha: "pitta" },
            { label: "Calm, slow to act, lethargic under pressure", dosha: "kapha" },
          ],
        },
        {
          text: "How is your skin & complexion tendency?",
          options: [
            { label: "Dry, rough, thin, sensitive to dry cold weather", dosha: "vata" },
            { label: "Warm, prone to redness, acne, sensitivity, freckles", dosha: "pitta" },
            { label: "Smooth, soft, oily, thick, cool skin", dosha: "kapha" },
          ],
        },
        {
          text: "What is your sleep quality?",
          options: [
            { label: "Light, irregular, wake up frequently", dosha: "vata" },
            { label: "Sound sleep, but feel warm at night", dosha: "pitta" },
            { label: "Deep, heavy sleep, difficult to wake up early", dosha: "kapha" },
          ],
        },
      ],
      doshaProfiles: {
        vata: {
          title: "Vata Dominant (Air & Space)",
          desc: "Your energy is creative and fast-paced, but prone to anxiety, joint stiffness, dryness, and sleeplessness. Grounding adaptogens like Ashwagandha and Ruma Cal bring calm and stability.",
        },
        pitta: {
          title: "Pitta Dominant (Fire & Water)",
          desc: "You possess sharp intellect and strong digestion, but are prone to acidity, inflammation, migraines, and skin heat. Cooling remedies like Acimint, Noni Gold, and Aloe Mint Gel restore balance.",
        },
        kapha: {
          title: "Kapha Dominant (Earth & Water)",
          desc: "You are calm, stable, and strong, but prone to sluggish metabolism, sinus congestion, and fluid retention. Stimulating herbs and detoxifiers like SneeZona and Stonil revitalize your body.",
        },
      },
    },
    quickView: {
      overviewTab: "Overview",
      ingredientsTab: "Key Ingredients",
      doshaTab: "Dosha Impact",
      anupanaTab: "Intake / Anupana",
      dosageLabel: "Recommended Dosage:",
    },
    cart: {
      title: "Your Apothecary Cart",
      empty: "Your cart is empty. Explore Dr. Velankar's classical remedies!",
      subtotal: "Subtotal",
      shipping: "Shipping (Free above ₹499)",
      freeShipping: "FREE",
      total: "Total Amount",
      checkout: "Proceed to Checkout (Razorpay)",
      processing: "Processing Order...",
      orderSuccess: "Order Placed Successfully!",
      customerDetails: "Customer & Delivery Details",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      shippingAddress: "Complete Shipping Address",
      paymentMethod: "Payment Method: Razorpay Secure UPI / Card / NetBanking",
      razorpaySim: "Instant simulated checkout gateway with real order reference ID generation.",
      payNowBtn: "Pay Now via Razorpay",
      orderConfirmedBadge: "AYUSH Certified Order Confirmed",
      orderRefId: "Order Reference ID:",
      paymentRefId: "Payment ID:",
      customerLabel: "Customer:",
      deliveryAddressLabel: "Delivery Address:",
      amountPaidLabel: "Amount Paid via Razorpay:",
      returnToShopBtn: "Return to Apothecary Catalog",
      exploreBtn: "Explore Formulations",
    },
    chatbot: {
      title: "Dr. Velankar's AI Vaidya",
      subtitle: "The Herbal Shopee (Sangli) • Multilingual",
      placeholder: "Ask about symptoms (e.g. acidity, kidney stone, joint pain, cold, migraine)...",
      send: "Send",
      disclaimer: "General wellness advice grounded in classical texts. Direct doctor helpline: +91 9075042727.",
      typingText: "Consulting classical Ayurvedic Samhitas...",
      homeRemedyLabel: "Home Remedy & Pathya Advice:",
      recommendedProductsLabel: "Recommended Clinical Formulations:",
      whatsappDoctorBtn: "💬 Consult Dr. Velankar on WhatsApp",
    },
    footer: {
      companyTitle: "Dr. Velankar's",
      companySubtitle: "The Herbal Shopee Pvt. Ltd.",
      companyDesc: "Doctor-formulated classical & proprietary Ayurvedic medicines, botanical juices, and therapeutic oils.",
      clinicAddress: "📍 Sahyadri Siddhi Apt, Shop #16, Opp. N.P. Fish Market, Vishrambag Kupwad Rd, Sangli, Maharashtra.",
      formulationsHeading: "Clinical Formulations",
      categoriesHeading: "Health Categories",
      consultationHeading: "Consultation & Support",
      helplineLabel: "Helpline:",
      whatsappLabel: "WhatsApp:",
      websiteLabel: "Website:",
      pharmacyBadge: "✓ All Major Pharmacies & Online",
      copyright: "© 2026 Dr. Velankar's The Herbal Shopee Pvt. Ltd. · Welankar Ayurvedik, Sangli · All Rights Reserved.",
    },
  },
  HI: {
    nav: {
      home: "मुख्य पृष्ठ",
      products: "उत्पाद",
      concerns: "समस्या अनुसार",
      about: "डॉ. वेलणकर",
      admin: "एडमिन पोर्टल",
      cart: "कार्ट",
      searchPlaceholder: "दवाइयां, स्नीझोना, ॲसिमिंट, नोनी गोल्ड खोजें...",
      subtitle: "आयुष प्रमाणित शास्त्रीय औषधालय",
      adminDashboard: "⚙️ डैशबोर्ड",
      adminLogin: "🔐 एडमिन लॉगिन",
    },
    ticker: [
      "🌿 डॉ. वेलणकर के विशेष क्लिनिकल फॉर्मूलेशन",
      "📜 द हर्बल शॉपी प्रा. लि. — सांगली",
      "🩺 निःशुल्क परामर्श व मार्गदर्शन: +91 9075042727",
      "🚚 ₹499 से अधिक के ऑर्डर पर पूरे भारत में मुफ्त डिलीवरी",
      "💎 100% शुद्ध शास्त्रीय व पैराबेन-मुक्त उत्पाद",
      "🏆 50,000+ संतुष्ट रोगी परामर्श",
    ],
    hero: {
      badge: "शुद्ध • डॉ. वेलणकर के फॉर्मूलेशन • आयुष प्रमाणित",
      doshaQuizBtn: "✨ त्रिदोष परीक्षण (Quiz)",
      title: "आधुनिक स्वास्थ्य के लिए प्राचीन ज्ञान",
      subtitle: "डॉ. वेलणकर द्वारा तैयार किए गए प्रामाणिक हर्बल योग, सिलबट्टे पर पिसे अर्क और औषधीय तेल।",
      shopNow: "उत्पाद देखें",
      consultDoctor: "डॉक्टर से परामर्श (+91 9075042727)",
      trustPills: [
        "✓ आयुष प्रमाणित उत्पाद",
        "✓ 100% पैराबेन व केमिकल मुक्त",
        "✓ क्लिनिकली परीक्षित औषधियां",
      ],
      quickViewHint: "360° विवरण देखने के लिए क्लिक करें →",
      mrp: "मूल्य",
    },
    doctorSection: {
      badge: "🌿 शास्त्रीय चिकित्सा • 25+ वर्षों का क्लिनिकल अनुभव",
      title: "वैज्ञानिक रूप से तैयार शास्त्रीय आयुर्वेद",
      name: "डॉ. वेलणकर",
      role: "संस्थापक एवं मुख्य वैद्य — द हर्बल शॉपी प्रा. लि.",
      quote: "\"हमारा उद्देश्य प्राचीन ग्रंथों के शास्त्रीय आयुर्वेदिक फॉर्मूलेशन को आधुनिक, उपयोग में आसान औषधियों के रूप में प्रस्तुत करना है। हमारे उत्पाद—जैसे स्नीझोना, ॲसिमिंट, नोनी गोल्ड जूस और स्टोनिल—सांगली में दशकों के चिकित्सा अनुभव द्वारा बिना किसी दुष्प्रभाव के मूल कारण को ठीक करने के लिए बनाए गए हैं।\"",
      clinicTitle: "📍 सांगली क्लिनिक का पता:",
      clinicAddress: "सह्याद्री सिद्धी अपार्टमेंट, बी विंग शॉप नं. 16, एन. पी. फिश मार्केट के सामने, विश्रामबाग कुपवाड रोड, सांगली, महाराष्ट्र।",
      helplineTitle: "📞 हेल्पलाइन एवं व्हाट्सएप:",
      appointmentsLabel: "अपॉइंटमेंट:",
      consultationLabel: "परामर्श:",
      websiteLabel: "वेबसाइट:",
      whatsappBtn: "💬 ऑनलाइन परामर्श बुक करें (व्हाट्सएप)",
      viewCatalogBtn: "डॉ. वेलणकर के सभी उत्पाद देखें",
    },
    concerns: {
      title: "समस्या अनुसार समाधान",
      subtitle: "त्रिदोष संतुलन और स्थायी स्वास्थ्य के लिए विशेष आयुर्वेदिक योग",
      exploreBtn: "औषधियां देखें →",
      stress: "तनाव और घबराहट",
      stressDesc: "मानसिक शांति व तंत्रिका शक्ति के लिए मेध्य रसायन",
      digestion: "एसिडिटी और पाचन",
      digestionDesc: "एसिडिटी, सीने में जलन और गैस के लिए ॲसिमिंट",
      immunity: "रोग प्रतिरोधक क्षमता",
      immunityDesc: "संपूर्ण शरीर के डिटॉक्स और हीमोग्लोबिन के लिए नोनी गोल्ड",
      skin: "त्वचा और चमक",
      skinDesc: "ठंडक और प्राकृतिक निखार के लिए एलोवेरा पुदीना जेल",
      sleep: "गहरी नींद और विश्राम",
      sleepDesc: "ब्राह्मी तेल व औषधियां गहरी और शांत नींद के लिए",
      hair: "बाल झड़ना और डैंड्रफ",
      hairDesc: "वेलको कचवर्धिनी तेल व पैराबेन-मुक्त हर्बल शैम्पू",
      joints: "जोड़ों का दर्द और गठिया",
      jointsDesc: "गठिया, जोड़ों की चिकनाई व हड्डियों के लिए रुमाकैल",
      kidney: "पथरी और मूत्रदाह (UTI)",
      kidneyDesc: "गुर्दे की पथरी गलाने व पेशाब की जलन में स्टोनिल",
      diabetes: "मधुमेह और ब्लड शुगर",
      diabetesDesc: "ब्लड शुगर नियंत्रण व पैंक्रियाज शक्ति के लिए डायबोना",
      respiratory: "सर्दी, खांसी व बंद नाक",
      respiratoryDesc: "गले में खराश, सर्दी व छींकों में स्नीझोना कैप्सूल",
      headache: "माइग्रेन और सिरदर्द",
      headacheDesc: "माइग्रेन और आधे सिर के दर्द से राहत के लिए एमग्रेना",
    },
    products: {
      featuredTitle: "डॉ. वेलणकर के प्रमुख उत्पाद",
      featuredSubtitle: "सर्वाधिक विश्वसनीय और तुरंत राहत देने वाले क्लिनिकल योग",
      viewAllCatalog: "सम्पूर्ण औषधालय कैटलॉग देखें",
      addToCart: "कार्ट में जोड़ें",
      added: "जोड़ दिया गया!",
      viewDetails: "विवरण देखें",
      filterByConcern: "समस्या से छांटें",
      allConcerns: "सभी उत्पाद",
      priceRange: "मूल्य सीमा",
      searchProducts: "दवाइयां खोजें...",
      ingredients: "मुख्य घटक",
      dosage: "सेवन विधि",
      safetyWarning: "सुरक्षा एवं शास्त्रीय सलाह",
      inStock: "उपलब्ध है",
      outOfStock: "स्टॉक में नहीं",
      formulationType: "औषधि प्रकार:",
      allForms: "सभी प्रकार",
      sortBy: "क्रमबद्ध करें:",
      sortBestselling: "सर्वाधिक बिकने वाले",
      sortTopRated: "उच्चतम रेटिंग (★)",
      sortPriceLow: "मूल्य: कम से अधिक",
      sortPriceHigh: "मूल्य: अधिक से कम",
      noProductsFound: "कोई आयुर्वेदिक औषधि नहीं मिली",
      noProductsSubtitle: "कृपया अपने खोज शब्द या मूल्य फिल्टर बदलकर देखें।",
      resetFilters: "फिल्टर रीसेट करें",
      batchCertNo: "बैच प्रमाण पत्र संख्या:",
      intakeVehicle: "अनुपान (किसके साथ लें)",
      doshaImpact: "दोष संतुलन प्रभाव",
      askDoctorWhatsApp: "व्हाट्सएप पर डॉ. वेलणकर से पूछें (+91 9075042727)",
      reviews: "समीक्षाएं",
    },
    spotlight: {
      badge: "🌿 क्लिनिकल विशेष • एसिडिटी का प्राकृतिक इलाज",
      title: "डॉ. वेलणकर ॲसिमिंट हर्बल एंटासिड",
      desc: "शुद्ध आंवला, उशीर और गिलोय से निर्मित। यह प्राकृतिक रूप से तुरंत राहत दिलाता है:",
      points: [
        "एसिडिटी, सीने की जलन और पेट फूलने से तुरंत आराम",
        "पेट के अल्सर को तेजी से ठीक करने में सहायक",
        "पित्तजनित सिरदर्द और त्वचा के चकत्तों में लाभदायक",
        "एसिड के दोबारा बनने की प्रक्रिया को रोकता है",
      ],
      btnText: "ॲसिमिंट का विवरण देखें",
    },
    customBlend: {
      badge: "🧪 व्यक्तिगत औषधि प्रयोगशाला",
      title: "अपना विशेष आयुर्वेदिक मिश्रण तैयार करें",
      subtitle: "3 शास्त्रीय औषधियों को चुनकर अपना व्यक्तिगत मिश्रण तैयार करें (15% की विशेष छूट)।",
      jarTitle: "📦 विशेष आयुर्वेदिक जार",
      nameLabel: "अपने मिश्रण का नाम दें:",
      defaultBlendName: "मेरा व्यक्तिगत आयुर्वेदिक योग",
      selectedIngredients: "चुनी गई औषधियां",
      discountLabel: "बंडल छूट (15% की छूट)",
      addBtn: "⚡ कस्टम मिश्रण जोड़ें",
      addedBtn: "✔ जोड़ दिया गया!",
    },
    batchVerification: {
      badge: "📜 पारदर्शिता एवं गुणवत्ता प्रमाण",
      title: "बैच प्रमाण पत्र सत्यापन टूल",
      subtitle: "प्रत्येक बोतल व स्ट्रिप पर डॉ. वेलणकर का विशेष बैच कोड अंकित होता है, जो 100% शुद्धता व भारी धातुओं से मुक्त प्रमाणित है।",
      placeholder: "बैच नंबर दर्ज करें (उदा. VEL-2026-SNZ-01)",
      verifyBtn: "सत्यापित करें",
      verifiedText: "प्रमाणित प्रामाणिक बैच — मानक गुणवत्ता प्रमाणित (0% भारी धातु)",
      statsPatients: "50,000+",
      statsPatientsLabel: "संतुष्ट मरीज",
      statsRating: "4.9 ★",
      statsRatingLabel: "क्लिनिकल विश्वास रेटिंग",
    },
    doshaQuiz: {
      modalTitle: "आयुर्वेदिक प्रकृति व दोष परीक्षण",
      modalSubtitle: "व्यक्तिगत उपचार के लिए अपनी प्रमुख शारीरिक ऊर्जा (वात, पित्त, या कफ) जानें।",
      step: "प्रश्न",
      resultTitle: "आपकी शारीरिक प्रकृति",
      dominantText: "प्रमुख दोष",
      recommendedTitle: "आपके दोष के लिए अनुशंसित औषधियां:",
      retakeBtn: "🔄 पुनः परीक्षण करें",
      closeBtn: "बंद करें",
      questions: [
        {
          text: "आपकी शारीरिक बनावट व पाचन क्षमता कैसी है?",
          options: [
            { label: "हल्का, दुबला शरीर, भूख अनिश्चित, जल्दी ठंड लगना", dosha: "vata" },
            { label: "मध्यम शरीर, तीव्र भूख और पाचन, जल्दी गर्मी लगना", dosha: "pitta" },
            { label: "मजबूत, चौड़ा शरीर, धीमा पाचन और शांत स्वभाव", dosha: "kapha" },
          ],
        },
        {
          text: "तनाव की स्थिति में आपका मन कैसा व्यवहार करता है?",
          options: [
            { label: "अशांत, घबराहट, अत्यधिक सोच, अनिद्रा", dosha: "vata" },
            { label: "चिड़चिड़ा, अधीर, गुस्सा, एसिडिटी बढ़ना", dosha: "pitta" },
            { label: "शांत, कार्य में सुस्ती, तनाव में आलस्य", dosha: "kapha" },
          ],
        },
        {
          text: "आपकी त्वचा और रंगत कैसी है?",
          options: [
            { label: "रूखी, खुरदुरी, पतली, ठंडी हवा के प्रति संवेदनशील", dosha: "vata" },
            { label: "गर्म, लालिमा, मुंहासे और तिल-मस्सों की प्रवृत्ति", dosha: "pitta" },
            { label: "मुलायम, चिकनी, तैलीय, मोटी त्वचा", dosha: "kapha" },
          ],
        },
        {
          text: "आपकी नींद की गुणवत्ता कैसी है?",
          options: [
            { label: "हल्की, अनियमित, रात में बार-बार टूटना", dosha: "vata" },
            { label: "मध्यम नींद, लेकिन रात में गर्मी लगना", dosha: "pitta" },
            { label: "गहरी, भारी नींद, सुबह जल्दी उठने में कठिनाई", dosha: "kapha" },
          ],
        },
      ],
      doshaProfiles: {
        vata: {
          title: "वात प्रधान (वायु और आकाश)",
          desc: "आप रचनात्मक और गतिशील हैं, लेकिन तनाव, जोड़ों के दर्द और अनिद्रा की संभावना रहती है। अश्वगंधा और रुमाकैल जैसी औषधियां आपके लिए उत्तम हैं।",
        },
        pitta: {
          title: "पित्त प्रधान (अग्नि और जल)",
          desc: "आपकी बुद्धि तीव्र और पाचन मजबूत है, लेकिन एसिडिटी, माइग्रेन और त्वचा में जलन की संभावना रहती है। ॲसिमिंट, नोनी गोल्ड और एलोवेरा जेल आपके लिए उत्तम हैं।",
        },
        kapha: {
          title: "कफ प्रधान (पृथ्वी और जल)",
          desc: "आप शांत और स्थिर हैं, लेकिन सुस्त पाचन, कफ और भारीपन की समस्या हो सकती है। स्नीझोना और स्टोनिल जैसी औषधियां आपके शरीर को ऊर्जा देती हैं।",
        },
      },
    },
    quickView: {
      overviewTab: "अवलोकन",
      ingredientsTab: "मुख्य घटक",
      doshaTab: "दोष प्रभाव",
      anupanaTab: "अनुपान (सेवन विधि)",
      dosageLabel: "अनुशंसित सेवन विधि:",
    },
    cart: {
      title: "आपकी औषधि कार्ट",
      empty: "आपकी कार्ट खाली है। डॉ. वेलणकर के शास्त्रीय योग देखें!",
      subtotal: "उप-कुल",
      shipping: "डिलिवरी (₹499 पर मुफ्त)",
      freeShipping: "मुफ्त",
      total: "कुल राशि",
      checkout: "भुगतान करें (रेजॉरपे)",
      processing: "प्रक्रिया जारी है...",
      orderSuccess: "आर्डर सफलतापूर्वक पूरा हुआ!",
      customerDetails: "ग्राहक एवं डिलीवरी विवरण",
      fullName: "पूरा नाम",
      emailAddress: "ईमेल पता",
      phoneNumber: "फोन नंबर",
      shippingAddress: "पूरा डिलीवरी पता",
      paymentMethod: "भुगतान विधि: रेजॉरपे सुरक्षित UPI / कार्ड / नेटबैंकिंग",
      razorpaySim: "असली ऑर्डर रेफरेंस आईडी के साथ सुरक्षित ऑनलाइन गेटवे।",
      payNowBtn: "रेजॉरपे से भुगतान करें",
      orderConfirmedBadge: "आयुष प्रमाणित आर्डर स्वीकृत",
      orderRefId: "ऑर्डर रेफरेंस आईडी:",
      paymentRefId: "पेमेंट आईडी:",
      customerLabel: "ग्राहक:",
      deliveryAddressLabel: "डिलीवरी का पता:",
      amountPaidLabel: "कुल भुगतान राशि:",
      returnToShopBtn: "दुकान पर वापस जाएं",
      exploreBtn: "उत्पाद देखें",
    },
    chatbot: {
      title: "डॉ. वेलणकर AI वैद्य",
      subtitle: "द हर्बल शॉपी (सांगली) • बहुभाषी",
      placeholder: "अपनी समस्या पूछें (जैसे: एसिडिटी, पथरी, जोड़ों का दर्द, सर्दी, माइग्रेन)...",
      send: "भेजें",
      disclaimer: "सामान्य स्वास्थ्य सलाह। प्रत्यक्ष डॉक्टर हेल्पलाइन: +91 9075042727.",
      typingText: "शास्त्रीय आयुर्वेद संहिताओं का विश्लेषण...",
      homeRemedyLabel: "घरेलू उपाय एवं पथ्य सलाह:",
      recommendedProductsLabel: "अनुशंसित क्लिनिकल औषधियां:",
      whatsappDoctorBtn: "💬 व्हाट्सएप पर डॉ. वेलणकर से परामर्श लें",
    },
    footer: {
      companyTitle: "डॉ. वेलणकर",
      companySubtitle: "द हर्बल शॉपी प्रा. लि.",
      companyDesc: "डॉक्टर द्वारा तैयार शास्त्रीय आयुर्वेदिक औषधियां, हर्बल जूस और सिद्ध औषधीय तेल।",
      clinicAddress: "📍 सह्याद्री सिद्धी अपार्टमेंट, शॉप नं. 16, एन. पी. फिश मार्केट के सामने, विश्रामबाग कुपवाड रोड, सांगली, महाराष्ट्र।",
      formulationsHeading: "प्रमुख क्लिनिकल औषधियां",
      categoriesHeading: "स्वास्थ्य श्रेणियां",
      consultationHeading: "परामर्श व सहायता",
      helplineLabel: "हेल्पलाइन:",
      whatsappLabel: "व्हाट्सएप:",
      websiteLabel: "वेबसाइट:",
      pharmacyBadge: "✓ सभी प्रमुख मेडिकल स्टोर्स पर उपलब्ध",
      copyright: "© 2026 डॉ. वेलणकर द हर्बल शॉपी प्रा. लि. · वेलणकर आयुर्वेदिक, सांगली · सर्वाधिकार सुरक्षित।",
    },
  },
  MR: {
    nav: {
      home: "मुख्य पृष्ठ",
      products: "उत्पादने",
      concerns: "समस्येनुसार",
      about: "डॉ. वेलणकर",
      admin: "अ‍ॅडमिन पोर्टल",
      cart: "कार्ट",
      searchPlaceholder: "औषधे, स्नीझोना, ॲसिमिंट, नोनी गोल्ड शोधा...",
      subtitle: "आयुष प्रमाणित शास्त्रीय औषधालय",
      adminDashboard: "⚙️ डॅशबोर्ड",
      adminLogin: "🔐 अ‍ॅडमिन लॉगिन",
    },
    ticker: [
      "🌿 डॉ. वेलणकर यांचे युनिक क्लिनिकल फॉर्म्युलेशन्स",
      "📜 द हर्बल शॉपी प्रा. लि. — सांगली",
      "🩺 मोफत सल्ला व मार्गदर्शन: +91 9075042727",
      "🚚 ₹499 वरील सर्व ऑर्डर्सवर संपूर्ण भारतात मोफत डिलिव्हरी",
      "💎 100% शुद्ध शास्त्रीय व पॅराबेन-मुक्त औषधे",
      "🏆 50,000+ समाधानी रुग्ण तपासणी",
    ],
    hero: {
      badge: "शुद्ध • डॉ. वेलणकर यांचे युनिक फॉर्म्युलेशन • आयुष प्रमाणित",
      doshaQuizBtn: "✨ त्रिदोष चाचणी (Quiz)",
      title: "आधुनिक आरोग्यासाठी प्राचीन ज्ञान",
      subtitle: "डॉ. वेलणकर (द हर्बल शॉपी प्रा. लि., सांगली) यांचे सिद्ध आयुर्वेदिक व शास्त्रीय फॉर्म्युलेशन्स.",
      shopNow: "उत्पादने पहा",
      consultDoctor: "डॉक्टरांचा सल्ला (+91 9075042727)",
      trustPills: [
        "✓ आयुष प्रमाणित औषधे",
        "✓ 100% पॅराबेन व केमिकल मुक्त",
        "✓ क्लिनिकली सिद्ध परिणाम",
      ],
      quickViewHint: "360° सविस्तर माहितीसाठी क्लिक करा →",
      mrp: "किंमत",
    },
    doctorSection: {
      badge: "🌿 शास्त्रीय चिकित्सा • 25+ वर्षांचा क्लिनिकल अनुभव",
      title: "वैज्ञानिकदृष्ट्या सिद्ध शास्त्रीय आयुर्वेद",
      name: "डॉ. वेलणकर",
      role: "संस्थापक व मुख्य वैद्य — द हर्बल शॉपी प्रा. लि.",
      quote: "\"आमचे ध्येय प्राचीन ग्रंथांमधील शास्त्रीय आयुर्वेदिक फॉर्म्युलेशन्स आधुनिक व सहज वापरण्यायोग्य औषधांच्या स्वरूपात सादर करणे हे आहे. आमची उत्पादने—जसे स्नीझोना, ॲसिमिंट, नोनी गोल्ड ज्यूस व स्टोनिल—सांगलीमध्ये २ दशकांहून अधिक काळ रुग्णांच्या तपासणीतून दुष्परिणामांशिवाय मुळापासून आजार बरे करण्यासाठी तयार करण्यात आली आहेत.\"",
      clinicTitle: "📍 सांगली क्लिनिकचा पत्ता:",
      clinicAddress: "सह्याद्री सिद्धी अपार्टमेंट, बी विंग शॉप नं. 16, एन. पी. फिश मार्केट समोर, विश्रामबाग कुपवाड रोड, सांगली, महाराष्ट्र.",
      helplineTitle: "📞 थेट हेल्पलाइन व व्हॉट्सॲप:",
      appointmentsLabel: "अपॉइंटमेंट्स:",
      consultationLabel: "कन्सल्टेशन:",
      websiteLabel: "वेबसाइट:",
      whatsappBtn: "💬 ऑनलाइन कन्सल्टेशन बुक करा (व्हॉट्सॲप)",
      viewCatalogBtn: "डॉ. वेलणकर यांची सर्व उत्पादने पहा",
    },
    concerns: {
      title: "समस्येनुसार खरेदी",
      subtitle: "त्रिदोष संतुलन आणि त्वरित उपचारासाठी डॉ. वेलणकर यांची शास्त्रीय उत्पादने",
      exploreBtn: "उत्पादने पहा →",
      stress: "मानसिक ताण व थकवा",
      stressDesc: "मानसिक शांतता व मज्जासंस्थेच्या बळकटीसाठी मेध्य रसायन",
      digestion: "आम्लपित्त, ॲसिडीटी व गॅस",
      digestionDesc: "आम्लपित्त, छातीत जळजळ व पोटफुगीवर ॲसिमिंट",
      immunity: "रोगप्रतिकारक शक्ती व डिटॉक्स",
      immunityDesc: "शरीरातील विषारी द्रव्ये बाहेर काढण्यासाठी व ताकदीसाठी नोनी गोल्ड",
      skin: "त्वचा विकार व कोरफड जेल",
      skinDesc: "थंडावा, ताजेपणा आणि त्वचेच्या तेजासाठी अ‍ॅलोव्हेरा मिंट जेल",
      sleep: "शांत झोप व आराम",
      sleepDesc: "गाढ व शांत झोपेसाठी ब्राह्मी सिद्ध तेल व औषधी",
      hair: "केस गळणे व कोंडा (Dandruff)",
      hairDesc: "वेलको कचवर्धिनी तेल व पॅराबेन-मुक्त शाम्पू",
      joints: "सांधेदुखी व हाडे (संधिवात)",
      jointsDesc: "सांधेदुखी, गुडघेदुखी व हाडांच्या बळकटीसाठी रुमाकॅल",
      kidney: "मुतखडा व मुत्रदाह (Kidney Stone)",
      kidneyDesc: "मुतखडा विरघळवण्यासाठी व लघवीच्या जळजळीवर स्टोनिल",
      diabetes: "मधुमेह (डायबिटीज केअर)",
      diabetesDesc: "रक्तातील साखर नियंत्रण व स्वादुपिंड आरोग्यासाठी डायबोना",
      respiratory: "सर्दी, शिंका, खोकला व घसा",
      respiratoryDesc: "घसा खवखवणे, सर्दी, शिंका व नाक गच्च होण्यावर स्नीझोना",
      headache: "मायग्रेन व तीव्र डोकेदुखी",
      headacheDesc: "मायग्रेन (अर्धशिशी) व तीव्र डोकेदुखीवर एमग्रेना",
    },
    products: {
      featuredTitle: "डॉ. वेलणकर यांची प्रमुख उत्पादने",
      featuredSubtitle: "आमचे सर्वाधिक विश्वासाचे शास्त्रीय चूर्ण, सिरप, ज्यूस व गोळ्या",
      viewAllCatalog: "संपूर्ण औषधालय सूची पहा",
      addToCart: "कार्टमध्ये जोडा",
      added: "जोडले गेले!",
      viewDetails: "तपशील पहा",
      filterByConcern: "समस्येनुसार निवडा",
      allConcerns: "सर्व उत्पादने",
      priceRange: "किंमत मर्यादा",
      searchProducts: "औषधे शोधा...",
      ingredients: "मुख्य घटक",
      dosage: "सेवन पद्धत",
      safetyWarning: "सुरक्षा व शास्त्रीय सल्ला",
      inStock: "उपलब्ध आहे",
      outOfStock: "स्टॉक संपला",
      formulationType: "औषध प्रकार:",
      allForms: "सर्व प्रकार",
      sortBy: "क्रमवारी:",
      sortBestselling: "सर्वाधिक विकले जाणारे",
      sortTopRated: "उत्कृष्ट रेटिंग (★)",
      sortPriceLow: "किंमत: कमी ते जास्त",
      sortPriceHigh: "किंमत: जास्त ते कमी",
      noProductsFound: "कोणतेही औषध आढळले नाही",
      noProductsSubtitle: "कृपया इतर शब्द किंवा किंमत मर्यादा बदलून पहा.",
      resetFilters: "फिल्टर रीसेट करा",
      batchCertNo: "बॅच प्रमाणपत्र क्रमांक:",
      intakeVehicle: "अनुपान (कशासोबत घ्यावे)",
      doshaImpact: "दोष संतुलन परिणाम",
      askDoctorWhatsApp: "व्हॉट्सॲपवर डॉ. वेलणकर यांना विचारा (+91 9075042727)",
      reviews: "रिव्ह्यूज",
    },
    spotlight: {
      badge: "🌿 क्लिनिकल विशेष • आम्लपित्तावर नैसर्गिक उपचार",
      title: "डॉ. वेलणकर ॲसिमिंट हर्बल अँटासिड",
      desc: "शुद्ध आवळा, उशीर आणि गुळवेल यांच्यापासून तयार केलेले. हे खालील तक्रारींवर त्वरित आराम देते:",
      points: [
        "आम्लपित्त, छातीतील जळजळ व पोटफुगीवर त्वरित आराम",
        "पोटातील अल्सर लवकर भरून काढण्यास मदत",
        "पित्तामुळे होणारी डोकेदुखी व अंगावर येणारे पुरळ शांत करते",
        "ॲसिड पुन्हा तयार होण्यास नैसर्गिकरीत्या प्रतिबंध करते",
      ],
      btnText: "ॲसिमिंटचा सविस्तर तपशील पहा",
    },
    customBlend: {
      badge: "🧪 वैयक्तिक औषधालय प्रयोगशाळा",
      title: "तुमचा स्वतःचा विशेष आयुर्वेदिक ब्लेंड तयार करा",
      subtitle: "३ शास्त्रीय औषधांची निवड करून स्वतःचा पाटावर वाटलेला जार तयार करा (१५% विशेष सवलत लागू).",
      jarTitle: "📦 विशेष आयुर्वेदिक जार",
      nameLabel: "तुमच्या उपायाला नाव द्या:",
      defaultBlendName: "माझे वैयक्तिक औषधी मिश्रण",
      selectedIngredients: "निवडलेली औषधे",
      discountLabel: "बंडल सवलत (१५% सूट)",
      addBtn: "⚡ कस्टम ब्लेंड जोडा",
      addedBtn: "✔ जोडले गेले!",
    },
    batchVerification: {
      badge: "📜 पारदर्शकता व गुणवत्ता हमी",
      title: "बॅच प्रमाणपत्र पडताळणी साधन",
      subtitle: "प्रत्येक बाटली व पाकिटावर डॉ. वेलणकर यांचा विशेष बॅच कोड असतो, जो १००% शुद्ध व हेवी मेटल्स मुक्त असल्याचे प्रमाणित करतो.",
      placeholder: "बॅच नंबर टाका (उदा. VEL-2026-SNZ-01)",
      verifyBtn: "पडताळणी करा",
      verifiedText: "प्रमाणित अस्सल बॅच — दर्जेदार गुणवत्ता प्रमाणित (०% हेवी मेटल्स)",
      statsPatients: "50,000+",
      statsPatientsLabel: "समाधानी रुग्ण",
      statsRating: "4.9 ★",
      statsRatingLabel: "क्लिनिकल विश्वास रेटिंग",
    },
    doshaQuiz: {
      modalTitle: "आयुर्वेदिक प्रकृती व त्रिदोष चाचणी",
      modalSubtitle: "योग्य उपचारासाठी तुमच्या शरीरातील प्रमुख ऊर्जा (वात, पित्त किंवा कफ) ओळखा.",
      step: "प्रश्न",
      resultTitle: "तुमची शारीरिक प्रकृती",
      dominantText: "प्रमुख दोष",
      recommendedTitle: "तुमच्या प्रकृतीसाठी योग्य औषधे:",
      retakeBtn: "🔄 पुन्हा चाचणी घ्या",
      closeBtn: "बंद करा",
      questions: [
        {
          text: "तुमची शारीरिक ठेवण आणि पचन कसे आहे?",
          options: [
            { label: "बारीक, हलके शरीर, भूक अनिश्चित, लवकर थंडी वाजणे", dosha: "vata" },
            { label: "मध्यम बांधा, चांगली भूक व पचन, लवकर उकडणे", dosha: "pitta" },
            { label: "मजबूत, रुंद बांधा, शांत स्वभाव, मंद पचन", dosha: "kapha" },
          ],
        },
        {
          text: "ताणतणावाच्या वेळी तुमचे मन कसे वागते?",
          options: [
            { label: "अस्वस्थ, चिंता, खूप विचार, झोप न लागणे", dosha: "vata" },
            { label: "चिडचिड, संताप, अस्वस्थता, ॲसिडीटी वाढणे", dosha: "pitta" },
            { label: "शांत, कामात संथपणा, ताणात आळस येणे", dosha: "kapha" },
          ],
        },
        {
          text: "तुमची त्वचा कशी आहे?",
          options: [
            { label: "कोरडी, खडबडीत, थंड हवेत लगेच कोरडी पडणारी", dosha: "vata" },
            { label: "उबदार, लालसर, मुरुमे व फोड येण्याची प्रवृत्ती", dosha: "pitta" },
            { label: "मऊ, मऊसर, तेलकट, जाड त्वचा", dosha: "kapha" },
          ],
        },
        {
          text: "तुमची झोप कशी असते?",
          options: [
            { label: "हलकी, तुटक, रात्री वारंवार जाग येणे", dosha: "vata" },
            { label: "मध्यम झोप, पण रात्री उष्णता जाणवणे", dosha: "pitta" },
            { label: "गाढ, जड झोप, सकाळी लवकर उठणे कठीण", dosha: "kapha" },
          ],
        },
      ],
      doshaProfiles: {
        vata: {
          title: "वात प्रधान (वायू व आकाश)",
          desc: "तुमची ऊर्जा उत्साही असते, परंतु चिंता, सांधेदुखी, कोरडेपणा व निद्रानाशाची शक्यता असते. अश्वगंधा आणि रुमाकॅल तुम्हाला स्थैर्य देतात.",
        },
        pitta: {
          title: "पित्त प्रधान (अग्नी व जल)",
          desc: "तुमची बुद्धी तीव्र व पचन उत्तम असते, परंतु आम्लपित्त, मायग्रेन व अंगात उष्णता वाढू शकते. ॲसिमिंट, नोनी गोल्ड व अ‍ॅलोव्हेरा जेल संतुलन राखतात.",
        },
        kapha: {
          title: "कफ प्रधान (पृथ्वी व जल)",
          desc: "तुम्ही शांत व सहनशील आहात, परंतु मंद पचन, कफ व आळस जाणवू शकतो. स्नीझोना आणि स्टोनिल शरीराला ताजी ऊर्जा देतात.",
        },
      },
    },
    quickView: {
      overviewTab: "माहिती",
      ingredientsTab: "मुख्य घटक",
      doshaTab: "दोष परिणाम",
      anupanaTab: "अनुपान (कसे घ्यावे)",
      dosageLabel: "सेवन प्रमाण:",
    },
    cart: {
      title: "तुमची औषध कार्ट",
      empty: "तुमची कार्ट रिकामी आहे. डॉ. वेलणकर यांची उत्पादने पहा!",
      subtotal: "एकूण मूल्य",
      shipping: "डिलीव्हरी (₹499 वर मोफत)",
      freeShipping: "मोफत",
      total: "एकूण रक्कम",
      checkout: "रक्कम भरा (रेझरपे)",
      processing: "प्रक्रिया सुरू आहे...",
      orderSuccess: "ऑर्डर यशस्वीरित्या पूर्ण झाली!",
      customerDetails: "ग्राहक व डिलिव्हरी पत्ता",
      fullName: "पूर्ण नाव",
      emailAddress: "ईमेल पत्ता",
      phoneNumber: "फोन नंबर",
      shippingAddress: "संपूर्ण डिलिव्हरी पत्ता",
      paymentMethod: "पेमेंट पद्धत: रेझरपे सुरक्षित UPI / कार्ड / नेटबँकिंग",
      razorpaySim: "खऱ्या ऑर्डर रेफरन्स आयडीसह सुरक्षित ऑनलाइन पेमेंट गेटवे.",
      payNowBtn: "रेझरपेद्वारे पैसे भरा",
      orderConfirmedBadge: "आयुष प्रमाणित ऑर्डर निश्चित झाली",
      orderRefId: "ऑर्डर रेफरन्स आयडी:",
      paymentRefId: "पेमेंट आयडी:",
      customerLabel: "ग्राहक:",
      deliveryAddressLabel: "डिलिव्हरी पत्ता:",
      amountPaidLabel: "एकूण भरलेली रक्कम:",
      returnToShopBtn: "पुन्हा खरेदीकडे जा",
      exploreBtn: "उत्पादने पहा",
    },
    chatbot: {
      title: "डॉ. वेलणकर AI वैद्य",
      subtitle: "द हर्बल शॉपी (सांगली) • बहुभाषिक",
      placeholder: "तुमची समस्या विचारा (उदा: ॲसिडीटी, मुतखडा, सांधेदुखी, सर्दी, मायग्रेन)...",
      send: "पाठवा",
      disclaimer: "सामान्य आरोग्य सल्ला. थेट डॉक्टरांचा सल्ला: +91 9075042727.",
      typingText: "शास्त्रीय आयुर्वेद ग्रंथांचा शोध सुरू आहे...",
      homeRemedyLabel: "घरगुती उपाय व पथ्य:",
      recommendedProductsLabel: "अनुशंसित क्लिनिकल औषधे:",
      whatsappDoctorBtn: "💬 व्हॉट्सॲपवर डॉ. वेलणकर यांच्याशी बोला",
    },
    footer: {
      companyTitle: "डॉ. वेलणकर",
      companySubtitle: "द हर्बल शॉपी प्रा. लि.",
      companyDesc: "डॉक्टरांनी तयार केलेली शास्त्रीय आयुर्वेदिक औषधे, हर्बल ज्यूस व सिद्ध औषधी तेल.",
      clinicAddress: "📍 सह्याद्री सिद्धी अपार्टमेंट, शॉप नं. 16, एन. पी. फिश मार्केट समोर, विश्रामबाग कुपवाड रोड, सांगली, महाराष्ट्र.",
      formulationsHeading: "क्लिनिकल औषधे",
      categoriesHeading: "आरोग्य वर्गवारी",
      consultationHeading: "सल्ला व संपर्क",
      helplineLabel: "हेल्पलाइन:",
      whatsappLabel: "व्हॉट्सॲप:",
      websiteLabel: "वेबसाइट:",
      pharmacyBadge: "✓ सर्व प्रमुख मेडिकल स्टोअर्सवर उपलब्ध",
      copyright: "© 2026 डॉ. वेलणकर द हर्बल शॉपी प्रा. लि. · वेलणकर आयुर्वेदिक, सांगली · सर्व हक्क राखीव.",
    },
  },
};
