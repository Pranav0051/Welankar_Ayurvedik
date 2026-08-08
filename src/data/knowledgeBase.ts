export interface KnowledgeEntry {
  id: string;
  symptomTags: string[];
  infoText: {
    EN: string;
    HI: string;
    MR: string;
  };
  productTags: string[];
  active: boolean;
}

export const initialKnowledgeBase: KnowledgeEntry[] = [
  {
    id: "kb-stress-sleep",
    symptomTags: ["stress", "anxiety", "sleeplessness", "insomnia", "mind", "tension", "headache", "tress", "sleep", "ताण", "तनाव", "अनिद्रा", "झोप"],
    infoText: {
      EN: "In Ayurveda, stress and sleep disturbances are linked to an aggravated Vata & Pitta dosha in the nervous system (Majja Dhatu). Ashwagandha promotes nerve resilience, while Brahmi and Shankhapushpi calm mental agitation and promote restorative sleep.",
      HI: "आयुर्वेद में तनाव और अनिद्रा वात तथा पित्त दोष के असंतुलन से उत्पन्न होते हैं। अश्वगंधा तंत्रिका तंत्र को शक्ति प्रदान करता है और ब्राह्मी मन को शांत करके गहरी नींद लाती है।",
      MR: "आयुर्वेदात ताण आणि झोपेच्या समस्या वात आणि पित्त दोषाच्या असंतुलनाशी जोडलेल्या आहेत. अश्वगंधा मज्जासंस्थेला ताकद देते आणि ब्राह्मी मन शांत करून गाढ झोप आणते.",
    },
    productTags: ["stress", "sleep"],
    active: true,
  },
  {
    id: "kb-digestion",
    symptomTags: ["digestion", "bloating", "gas", "acidity", "indigestion", "gut", "constipation", "stomach", "पाचन", "पेट", "गैस", "अम्लता", "अपचन", "पचन"],
    infoText: {
      EN: "Digestive imbalances are caused by weak Agni (digestive fire) and Ama (toxic byproduct) buildup. Triphala cleanses the intestinal tract gently, while Trikatu (ginger, black pepper, long pepper) re-ignites sluggish digestion.",
      HI: "पाचन समस्याएं मंदाग्नि और आम (विषक्त पदार्थों) के संचय के कारण होती हैं। त्रिफला आंतों की सौम्य सफाई करता है और त्रिकटु जठराग्नि को तीव्र करता है।",
      MR: "पचनाच्या समस्या मंदाग्नि आणि आम साचल्यामुळे निर्माण होतात. त्रिफळा आतड्यांची सौम्य सफाई करतो आणि त्रिकटु जठराग्नि प्रदीप्त करतो.",
    },
    productTags: ["digestion"],
    active: true,
  },
  {
    id: "kb-skin",
    symptomTags: ["skin", "acne", "pimples", "blood", "glow", "eczema", "rash", "complexion", "त्वचा", "रक्त", "मुंहासे", "कील", "गाल", "डाग"],
    infoText: {
      EN: "Classical Ayurveda treats skin concerns by purifying Rakta Dhatu (blood tissue) and balancing Pitta. Neem purifies toxins from the bloodstream, while Turmeric (Haldi) combined with Kashmiri Saffron promotes natural radiance.",
      HI: "शास्त्रीय आयुर्वेद में त्वचा रोगों का इलाज रक्त धातु की शुद्धि और पित्त शमन से होता है। नीम रक्त के विषक्त तत्वों को साफ करता है और हल्दी-केसर रंगत निखारते हैं।",
      MR: "शास्त्रीय आयुर्वेदात त्वचेच्या विकारांवर रक्त धातुची शुद्धी व पित्त शमनाने उपाय केला जातो. कडू निंब रक्तातील विषारी घटक बाहेर काढतो आणि हळद-केशर त्वचेला उजळवते.",
    },
    productTags: ["skin"],
    active: true,
  },
  {
    id: "kb-immunity",
    symptomTags: ["immunity", "cold", "cough", "flu", "strength", "ojas", "vitality", "energy", "रोग प्रतिरोधक", "इम्युनिटी", "सर्दी", "खांसी", "प्रतिकारशक्ती", "ऊर्जा"],
    infoText: {
      EN: "Immunity in Ayurveda is called Ojas — the supreme essence of all bodily tissues. Chyawanprash Reserve, formulated with 49 herbs and Amalaki (wild gooseberry), builds strong seasonal resistance and vitality.",
      HI: "आयुर्वेद में इम्युनिटी को 'ओजस' कहा जाता है। 49 जड़ी-बूटियों और आँवले से निर्मित च्यवनप्राश मौसमी बीमारियों से बचाव करता है और ओजस बढ़ाता है।",
      MR: "आयुर्वेदात प्रतिकारशक्तीला 'ओजस' म्हटले जाते. ४९ औषधी वनस्पती व आवळ्यापासून बनवलेला च्यवनप्राश प्रतिकारशक्ती वाढवून शरीराला ऊर्जा देतो.",
    },
    productTags: ["immunity"],
    active: true,
  },
];

// Keywords that trigger medical safety escalation (mandatory clinic/doctor referral)
export const MEDICAL_ESCALATION_KEYWORDS = [
  "pregnant", "pregnancy", "breastfeeding", "nursing", "baby", "infant",
  "blood pressure", "hypertension", "diabetes", "insulin", "cancer", "tumor",
  "heart attack", "chest pain", "kidney", "dialysis", "liver cirrhosis",
  "surgery", "prescription drug", "interaction", "overdose", "severe pain",
  "गर्भवती", "गर्भावस्था", "उच्च रक्तचाप", "मधुमेह", "कैंसर", "दिल",
  "गरोदर", "गरोदरपण", "रक्तदाब", "साखर", "कॅन्सर",
];
