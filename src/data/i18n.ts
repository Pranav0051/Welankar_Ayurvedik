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
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    shopNow: string;
    consultChatbot: string;
  };
  concerns: {
    title: string;
    subtitle: string;
    stress: string;
    digestion: string;
    immunity: string;
    skin: string;
    sleep: string;
  };
  products: {
    featuredTitle: string;
    featuredSubtitle: string;
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
  };
  chatbot: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    disclaimer: string;
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    nav: {
      home: "Home",
      products: "Apothecary Products",
      concerns: "Shop by Concern",
      about: "Our Heritage",
      admin: "Admin Portal",
      cart: "Cart",
      searchPlaceholder: "Search herbs, formulations, remedies...",
    },
    hero: {
      badge: "Pure • Authentic • AYUSH Certified",
      title: "Ancient Wisdom for Modern Wellness",
      subtitle: "Hand-crafted classical Ayurvedic formulations, stone-ground herbs, and slow-cooked medicated oils from sacred apothecary traditions.",
      shopNow: "Explore Formulations",
      consultChatbot: "Ask Vaidya AI",
    },
    concerns: {
      title: "Shop by Concern",
      subtitle: "Targeted Ayurvedic formulations crafted for your body's dosha balance",
      stress: "Headache & Stress",
      digestion: "Digestion & Gut",
      immunity: "Immunity & Ojas",
      skin: "Skin & Blood Purifier",
      sleep: "Sleep & Nervous System",
    },
    products: {
      featuredTitle: "Heritage Formulations",
      featuredSubtitle: "Our most trusted classical churnas, oils, and reserves",
      addToCart: "Add to Cart",
      added: "Added to Cart!",
      viewDetails: "View Details",
      filterByConcern: "Filter by Concern",
      allConcerns: "All Concerns",
      priceRange: "Price Range",
      searchProducts: "Search medicines...",
      ingredients: "Key Ingredients",
      dosage: "Dosage & Usage",
      safetyWarning: "Safety & Classical Advice",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
    },
    cart: {
      title: "Your Apothecary Cart",
      empty: "Your cart is empty. Explore our classical remedies!",
      subtotal: "Subtotal",
      shipping: "Shipping (Free above ₹499)",
      freeShipping: "FREE",
      total: "Total Amount",
      checkout: "Proceed to Checkout (Razorpay)",
      processing: "Processing Order...",
      orderSuccess: "Order Placed Successfully!",
    },
    chatbot: {
      title: "Vaidya AI Wellness Guide",
      subtitle: "Grounded in Classical Ayurvedic Texts",
      placeholder: "Ask about symptoms (e.g. digestion, sleep, stress)...",
      send: "Send",
      disclaimer: "General wellness advice grounded in classical texts. Not a replacement for medical diagnosis.",
    },
  },
  HI: {
    nav: {
      home: "मुख्य पृष्ठ",
      products: "आयुर्वेदिक उत्पाद",
      concerns: "समस्या अनुसार खरीदें",
      about: "हमारी विरासत",
      admin: "एडमिन पोर्टल",
      cart: "कार्ट",
      searchPlaceholder: "जड़ी-बूटियों और योग खोजें...",
    },
    hero: {
      badge: "शुद्ध • प्रामाणिक • आयुष प्रमाणित",
      title: "आधुनिक स्वास्थ्य के लिए प्राचीन ज्ञान",
      subtitle: "पारंपरिक जड़ी-बूटियाँ, सिलबट्टे पर पिसे चूर्ण और सिद्ध औषधीय तेल।",
      shopNow: "उत्पाद देखें",
      consultChatbot: "वैद्य AI से पूछें",
    },
    concerns: {
      title: "समस्या अनुसार खरीदें",
      subtitle: "त्रिदोष संतुलन के लिए विशेष आयुर्वेदिक योग",
      stress: "सिरदर्द और तनाव",
      digestion: "पाचन और पेट",
      immunity: "रोग प्रतिरोधक क्षमता",
      skin: "त्वचा और रक्त शुद्धि",
      sleep: "अनिद्रा और तंत्रिका",
    },
    products: {
      featuredTitle: "प्रमुख आयुर्वेदिक योग",
      featuredSubtitle: "हमारे सर्वाधिक विश्वसनीय शास्त्रीय चूर्ण और तेल",
      addToCart: "कार्ट में जोड़ें",
      added: "जोड़ दिया गया!",
      viewDetails: "विवरण देखें",
      filterByConcern: "समस्या से छांटें",
      allConcerns: "सभी समस्याएं",
      priceRange: "मूल्य सीमा",
      searchProducts: "दवाइयां खोजें...",
      ingredients: "मुख्य घटक",
      dosage: "सेवन विधि",
      safetyWarning: "सुरक्षा एवं शास्त्रीय सलाह",
      inStock: "उपलब्ध है",
      outOfStock: "स्टॉक में नहीं",
    },
    cart: {
      title: "आपकी औषधि कार्ट",
      empty: "आपकी कार्ट खाली है। हमारे शास्त्रीय योग देखें!",
      subtotal: "उप-कुल",
      shipping: "डिलिवरी (₹499 पर मुफ्त)",
      freeShipping: "मुफ्त",
      total: "कुल राशि",
      checkout: "भुगतान करें (रेजॉरपे)",
      processing: "प्रक्रिया जारी है...",
      orderSuccess: "आर्डर सफलतापूर्वक पूरा हुआ!",
    },
    chatbot: {
      title: "वैद्य AI स्वास्थ्य मार्गदर्शक",
      subtitle: "शास्त्रीय आयुर्वेद ग्रंथों पर आधारित",
      placeholder: "अपनी समस्या पूछें (जैसे: पाचन, नींद, तनाव)...",
      send: "भेजें",
      disclaimer: "सामान्य स्वास्थ्य सलाह। यह चिकित्सकीय निदान का विकल्प नहीं है।",
    },
  },
  MR: {
    nav: {
      home: "मुख्य पृष्ठ",
      products: "आयुर्वेदिक उत्पाद",
      concerns: "समस्येनुसार खरेदी",
      about: "आमचा वारसा",
      admin: "अ‍ॅडमिन पोर्टल",
      cart: "कार्ट",
      searchPlaceholder: "वनौषधी व औषधे शोधा...",
    },
    hero: {
      badge: "शुद्ध • अस्सल • आयुष प्रमाणित",
      title: "आधुनिक आरोग्यासाठी प्राचीन ज्ञान",
      subtitle: "पारंपारिक औषधी वनस्पती, दगडी पाटावर वाटलेले चूर्ण व सिद्ध तेल.",
      shopNow: "उत्पादने पहा",
      consultChatbot: "वैद्य AI ला विचारा",
    },
    concerns: {
      title: "समस्येनुसार खरेदी",
      subtitle: "त्रिदोष संतुलीत ठेवण्यासाठी विशेष आयुर्वेदिक योग",
      stress: "डोकेदुखी व ताण",
      digestion: "पचन व पोट",
      immunity: "प्रतिकारशक्ती",
      skin: "त्वचा व रक्त शुद्धी",
      sleep: "गाढ झोप व मज्जासंस्था",
    },
    products: {
      featuredTitle: "प्रमुख आयुर्वेदिक योग",
      featuredSubtitle: "आमचे सर्वाधिक विश्वासाचे शास्त्रीय चूर्ण व तेल",
      addToCart: "कार्टमध्ये जोडा",
      added: "जोडले गेले!",
      viewDetails: "तपशील पहा",
      filterByConcern: "समस्येनुसार निवडा",
      allConcerns: "सर्व समस्या",
      priceRange: "किंमत मर्यादा",
      searchProducts: "औषधे शोधा...",
      ingredients: "मुख्य घटक",
      dosage: "सेवन पद्धत",
      safetyWarning: "सुरक्षा व शास्त्रीय सल्ला",
      inStock: "उपलब्ध आहे",
      outOfStock: "स्टॉक संपला",
    },
    cart: {
      title: "तुमची औषध कार्ट",
      empty: "तुमची कार्ट रिकामी आहे. आमची उत्पादने पहा!",
      subtotal: "एकूण मूल्य",
      shipping: "डिलीव्हरी (₹499 वर मोफत)",
      freeShipping: "मोफत",
      total: "एकूण रक्कम",
      checkout: "रक्कम भरा (रेझरपे)",
      processing: "प्रक्रिया सुरू आहे...",
      orderSuccess: "ऑर्डर यशस्वीरित्या पूर्ण झाली!",
    },
    chatbot: {
      title: "वैद्य AI आरोग्य मार्गदर्शक",
      subtitle: "शास्त्रीय आयुर्वेद ग्रंथांवर आधारित",
      placeholder: "तुमची समस्या विचारा (उदा: पचन, झोप, ताण)...",
      send: "पाठवा",
      disclaimer: "सामान्य आरोग्य सल्ला. हे वैद्यकीय निदानाचे पर्यायी साधन नाही.",
    },
  },
};
