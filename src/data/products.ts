import sneezonaImg from "../assets/images/sneezona_capsules.jpeg";
import noniGoldImg from "../assets/images/noni_gold_juice.jpeg";
import aloeMintGelImg from "../assets/images/aloevera_mint_gel.jpeg";
import haircareShampooImg from "../assets/images/herbal_haircare_shampoo.jpeg";
import acimintPosterImg from "../assets/images/acimint_poster.jpeg";
import velcoHairOilImg from "../assets/images/velco_kachvardhini_oil.jpeg";
import acimintTabletsImg from "../assets/images/acimint_tablets.jpeg";
import rumaCalImg from "../assets/images/ruma_cal_tablets.jpeg";
import stonilComboImg from "../assets/images/stonil_syrup_tablets.jpeg";
import dibonaImg from "../assets/images/dibona_tablets.jpeg";
import mgrenaImg from "../assets/images/mgrena_tablets.jpeg";
import drVelankarImg from "../assets/images/dr_velankar_portrait.jpeg";

export {
  sneezonaImg,
  noniGoldImg,
  aloeMintGelImg,
  haircareShampooImg,
  acimintPosterImg,
  velcoHairOilImg,
  acimintTabletsImg,
  rumaCalImg,
  stonilComboImg,
  dibonaImg,
  mgrenaImg,
  drVelankarImg,
};

export type ConcernType =
  | "stress"
  | "digestion"
  | "immunity"
  | "skin"
  | "sleep"
  | "hair"
  | "joints"
  | "kidney"
  | "diabetes"
  | "respiratory"
  | "headache";

export interface Product {
  id: number;
  name: string;
  name_hi?: string;
  name_mr?: string;
  slug: string;
  concern: ConcernType;
  form?:
    | "Churna (Powder)"
    | "Taila (Medicated Oil)"
    | "Avaleha (Jam/Paste)"
    | "Vati (Tablet/Cap)"
    | "Svarasa (Juice/Syrup)"
    | "Gel (Topical)"
    | "Shampoo (Hair Wash)";
  price: number;
  stock: number;
  weight: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  batchNo?: string;
  tag?: string;
  tagline: string;
  doshaEffect?: {
    vata: "Pacifies" | "Neutral" | "Increases";
    pitta: "Pacifies" | "Neutral" | "Increases";
    kapha: "Pacifies" | "Neutral" | "Increases";
  };
  anupana?: string;
  ingredients: string[];
  dosage: string;
  description: string;
  description_hi?: string;
  description_mr?: string;
  longDescription: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Dr. Velankar's SneeZona Capsules",
    name_hi: "डॉ. वेलणकर स्नीझोना कैप्सूल",
    name_mr: "डॉ. वेलणकर स्नीझोना कॅप्सूल",
    slug: "sneezona-capsules",
    concern: "respiratory",
    form: "Vati (Tablet/Cap)",
    price: 180,
    stock: 75,
    weight: "10 Capsules Strip",
    image: sneezonaImg,
    rating: 4.9,
    reviewsCount: 184,
    batchNo: "VEL-2026-SNZ-01",
    tag: "Unique Formulation",
    tagline: "औषध एक फायदे अनेक — Relieves Sore Throat, Cold, Sneezing & Headache",
    doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "Warm water or Tulsi-infused ginger tea",
    ingredients: [
      "Tribhuvan Kirti Ras",
      "Sitopaladi Churna",
      "Kantakari",
      "Tulsi Extract",
      "Trikatu",
      "Yashtimadhu",
    ],
    dosage: "1 capsule 2 to 3 times a day with warm water.",
    description:
      "Dr. Velankar's unique Ayurvedic formulation for throat soreness, nasal congestion, sneezing, cold, headache, and bodyache.",
    description_hi:
      "गले में खराश व दर्द, सर्दी, छींक, बंद नाक, बदन दर्द और सिरदर्द में तुरंत राहत देने वाला विशेष फॉर्मूलेशन।",
    description_mr:
      "घसा खवखवणे व दुखणे, सर्दी, शिंका, नाक गच्च होणे, अंगदुखी व डोकेदुखीवर डॉ. वेलणकर यांचे अत्यंत प्रभावी आयुर्वेदिक युनिक फॉर्म्युलेशन.",
    longDescription:
      "Formulated specifically by Dr. Velankar for multi-symptom upper respiratory discomfort. Effectively clears sinus congestion, reduces inflammatory throat irritation, alleviates feverish body aches, and quiets incessant sneezing without causing drowsiness.",
    active: true,
  },
  {
    id: 2,
    name: "Dr. Velankar's Noni Gold Juice",
    name_hi: "डॉ. वेलणकर नोनी गोल्ड जूस",
    name_mr: "डॉ. वेलणकर्स नोनी गोल्ड ज्यूस",
    slug: "noni-gold-juice",
    concern: "immunity",
    form: "Svarasa (Juice/Syrup)",
    price: 590,
    stock: 40,
    weight: "500ml Bottle",
    image: noniGoldImg,
    rating: 4.95,
    reviewsCount: 260,
    batchNo: "VEL-2026-NONI-05",
    tag: "Bestseller Tonic",
    tagline: "नैसर्गिक आरोग्याचा मंत्र — Detox, Vitality, Digestion & Immunity Booster",
    doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "15-30ml in a glass of lukewarm water on empty stomach in morning",
    ingredients: [
      "Noni (Morinda citrifolia)",
      "Korfad (Aloe Vera)",
      "Shevgyache Paan (Moringa Leaf)",
      "Halad (Turmeric)",
      "Sea Buckthorn",
      "Green Tea",
      "Triphala",
      "Basil (Tulsi)",
      "Ashwagandha",
      "Haridra",
    ],
    dosage: "15-30ml diluted in lukewarm water twice daily before meals.",
    description:
      "Power-packed Ayurvedic nectar with Noni, Moringa, Aloe Vera, Sea Buckthorn, Ashwagandha and Tulsi for cellular detox, immunity, and stamina.",
    description_hi:
      "विटामिन बी-कॉम्प्लेक्स, विटामिन सी, एंटीऑक्सीडेंट और कैल्शियम से भरपूर दिव्य टॉनिक। रोग प्रतिरोधक क्षमता व ऊर्जा बढ़ाता है।",
    description_mr:
      "विटामिन बी कॉम्प्लेक्स, विटामिन सी, नैसर्गिक अँटिऑक्सिडंट्स, कॅल्शियम व अ, ई ने समृद्ध. रोगप्रतिकारक शक्ती, डिटॉक्स, वेदना शमन, पचन व ऊर्जा वाढवणारा अमृत ज्यूस.",
    longDescription:
      "Dr. Velankar's Noni Gold Juice is an elite adaptogenic and detoxifying elixir. It blends organic Noni with powerhouse botanicals including Moringa, Turmeric, Sea Buckthorn, and Ashwagandha to balance blood pressure, support healthy blood sugar, elevate hemoglobin, reduce systemic inflammation, and revitalize daily vitality.",
    active: true,
  },
  {
    id: 3,
    name: "Dr. Velankar's Acimint Herbal Antacid Tablet",
    name_hi: "डॉ. वेलणकर असिमिट हर्बल एंटासिड टैबलेट",
    name_mr: "डॉ. वेलणकर ॲसिमिंट हर्बल अँटासिड टॅबलेट",
    slug: "acimint-herbal-antacid-tablet",
    concern: "digestion",
    form: "Vati (Tablet/Cap)",
    price: 240,
    stock: 85,
    weight: "60 Tablets Bottle",
    image: acimintTabletsImg,
    rating: 4.9,
    reviewsCount: 310,
    batchNo: "VEL-2026-ACI-08",
    tag: "Normalises Acidity Naturally",
    tagline: "Normalises Acidity Naturally — Heartburn, Ulcer Healing & Gas Relief",
    doshaEffect: { vata: "Neutral", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "Water or cool milk 30 minutes after meals",
    ingredients: [
      "Awala (Phyllanthus emblica)",
      "Ushir (Vetiveria zizanioides)",
      "Guduchi (Tinospora cordifolia)",
      "Pudina Satva",
      "Kamdudha Ras",
      "Sutshekhar Ras",
    ],
    dosage: "1-2 tablets twice daily after meals with water.",
    description:
      "Doctor-formulated antacid tablet providing rapid, natural relief from hyperacidity, heartburn, bloating, gastric ulcers, and Pitta headaches.",
    description_hi:
      "आवंला, उशीर और गिलोय से युक्त हर्बल फॉर्मूला। एसिडिटी, सीने में जलन, गैस और पित्तजनित सिरदर्द को जड़ से ठीक करता है।",
    description_mr:
      "आवळा, उशीर आणि गुळवेल यांचे प्रभावी संयोजन. आम्लपित्त, छातीत जळजळ, गॅस, पोटफुगी, अल्सर आणि पित्तामुळे होणारी डोकेदुखी यावर अत्यंत गुणकारी.",
    longDescription:
      "Unlike synthetic antacids that cause rebound hyperacidity, Acimint normalizes gastric secretion naturally. High concentration of Amalaki and Ushir soothes mucosal inflammation and promotes rapid ulcer healing, while Guduchi detoxifies the digestive tract.",
    active: true,
  },
  {
    id: 4,
    name: "Stonil Kidney Stone & Alkalizer Combo",
    name_hi: "स्टोनिल सिरप और स्टोनिल टैबलेट",
    name_mr: "स्टोनिल सिरप व स्टोनिल टॅबलेट",
    slug: "stonil-syrup-tablet-combo",
    concern: "kidney",
    form: "Svarasa (Juice/Syrup)",
    price: 380,
    stock: 50,
    weight: "180ml Syrup + 30 Tablets",
    image: stonilComboImg,
    rating: 4.85,
    reviewsCount: 145,
    batchNo: "VEL-2026-STN-03",
    tag: "Lithotriptic & Alkalizer",
    tagline: "मुत्राश्मरी, मुत्रदाहावर उपयुक्त — Flushes Kidney Stones & Relieves UTI Burning",
    doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "Take with ample lukewarm water or tender coconut water",
    ingredients: [
      "Pashanbhed (Bergenia ligulata)",
      "Varun Chal (Crataeva nurvala)",
      "Gokshura (Tribulus terrestris)",
      "Punarnava (Boerhavia diffusa)",
      "Shuddha Shilajit",
      "Yavkshar",
      "Kulathi Extract",
    ],
    dosage:
      "Syrup: 2 tsp 3 times a day with equal water. Tablets: 2 tablets 3 times a day or as directed.",
    description:
      "Classical lithotriptic and alkalizing formulation to break down kidney stones, soothe urinary tract burning, and prevent calculus recurrence.",
    description_hi:
      "पाषाणभेद, वरुण छाल और गोक्षुर से निर्मित पथरी नाशक व मूत्रदाह शामक योग। गुर्दे की पथरी को धीरे-धीरे गलाकर बाहर निकालता है।",
    description_mr:
      "पाषाणभेद, वरुण साल, गोखरू व पुनर्नवा युक्त. मुतखडा (Kidney Stone) विरघळवून बाहेर काढण्यासाठी आणि लघवीची जळजळ (UTI) थांबवण्यासाठी सिद्ध औषध.",
    longDescription:
      "Stonil combines time-tested lithotriptic (stone-dissolving) herbs Pashanbhed and Varuna with renal diuretics Gokshura and Punarnava. It regulates urinary pH, acts as a powerful alkalizer, prevents calcium oxalate crystal aggregation, and provides swift comfort during painful urination.",
    active: true,
  },
  {
    id: 5,
    name: "Ruma Cal Herbal Joint Care Tablets",
    name_hi: "रुमाकैल जॉइंट केयर टैबलेट",
    name_mr: "रुमाकॅल टॅब (सांधेदुखी व हाडे)",
    slug: "ruma-cal-tablets",
    concern: "joints",
    form: "Vati (Tablet/Cap)",
    price: 320,
    stock: 65,
    weight: "60 Tablets Bottle",
    image: rumaCalImg,
    rating: 4.8,
    reviewsCount: 198,
    batchNo: "VEL-2026-RUM-07",
    tag: "Complete Joint Care",
    tagline: "Herbal Formulation for Complete Joint Mobility, Cartilage & Bone Strength",
    doshaEffect: { vata: "Pacifies", pitta: "Neutral", kapha: "Pacifies" },
    anupana: "Warm milk or lukewarm water after food",
    ingredients: [
      "Shallaki (Boswellia serrata)",
      "Nirgundi",
      "Yograj Guggulu",
      "Praval Pishti (Coral Calcium)",
      "Ashwagandha",
      "Hadjod (Cissus quadrangularis)",
      "Rasna",
    ],
    dosage: "1 tablet twice daily after meals with warm water or milk.",
    description:
      "Comprehensive Ayurvedic joint and bone nutrition tablet relieving arthritis stiffness, cartilage wear, backache, and knee pain.",
    description_hi:
      "शल्लाकी, निर्गुंडी, योगराज गुग्गुलु और प्राकृतिक प्रवाल पिष्टी से भरपूर। जोड़ों का दर्द, सूजन और हड्डियों की कमजोरी दूर करता है।",
    description_mr:
      "शल्लाकी, निर्गुंडी, योगराज गुग्गुळ व नैसर्गिक कॅल्शियमयुक्त प्रवाल पिष्टी. गुडघेदुखी, कंबरदुखी, संधिवात (Arthritis) आणि सांध्यांमधील लवचिकता वाढवण्यासाठी अत्यंत गुणकारी.",
    longDescription:
      "Ruma Cal addresses Vata accumulation in Asthi and Majja Dhatus (bones & joints). It lubricates synovial fluid in joints, repairs micro-damage to cartilage, suppresses inflammatory cytokines, and delivers bioavailable organic calcium to fortify bone density.",
    active: true,
  },
  {
    id: 6,
    name: "Velco Kachvardhini Hair Oil",
    name_hi: "वेलको कचवर्धिनी केश तेल",
    name_mr: "वेलको कचवर्धिनी सिद्ध हेअर ऑईल",
    slug: "velco-kachvardhini-hair-oil",
    concern: "hair",
    form: "Taila (Medicated Oil)",
    price: 280,
    stock: 55,
    weight: "90ml Bottle",
    image: velcoHairOilImg,
    rating: 4.9,
    reviewsCount: 220,
    batchNo: "VEL-2026-KACH-02",
    tag: "Anti-Dandruff & Hairfall",
    tagline: "कोंडानाशक, केस गळणे कमी करते — Deep Root Follicle Nourishment",
    doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "Gentle scalp massage (Shiroabhyanga)",
    ingredients: [
      "Kachora",
      "Bhringraj (Eclipta alba)",
      "Amalaki",
      "Neem Leaf Extract",
      "Brahmi",
      "Gunja",
      "Pure Til & Coconut Oil Base",
    ],
    dosage: "Apply twice daily to hair roots and gently massage with fingertips.",
    description:
      "Traditional medicinal hair oil specially formulated to eradicate stubborn dandruff, arrest rapid hair fall, and stimulate new hair follicles.",
    description_hi:
      "रूसी (Dandruff) का नाश करने वाला और बालों का झड़ना तुरंत रोकने वाला पारंपरिक आयुर्वेदिक सिद्ध तेल।",
    description_mr:
      "कोंडानाशक, केस गळणे थांबवणारे आणि मुळांना घट्ट पकड देणारे सिद्ध तेल. दिवसातून दोन वेळा केसांच्या मुळाशी चोळून लावणे.",
    longDescription:
      "Cooked in traditional Taila Paka Vidhi with pure herbal extracts that eliminate fungal scalp micro-flora causing dandruff, nourish hair papilla, cool excess scalp Pitta, and prevent premature graying and thinning.",
    active: true,
  },
  {
    id: 7,
    name: "Dibona Diabetic Care Tablets",
    name_hi: "डायबोना मधुमेह नाशक टैबलेट",
    name_mr: "डायबोना डायबिटीक केअर टॅबलेट",
    slug: "dibona-diabetic-care-tablets",
    concern: "diabetes",
    form: "Vati (Tablet/Cap)",
    price: 350,
    stock: 45,
    weight: "60 Tablets Bottle",
    image: dibonaImg,
    rating: 4.8,
    reviewsCount: 160,
    batchNo: "VEL-2026-DIB-04",
    tag: "Sugar Metabolism",
    tagline: "Natural Glycemic Control, Pancreatic Beta-Cell Support & Energy Restore",
    doshaEffect: { vata: "Pacifies", pitta: "Neutral", kapha: "Pacifies" },
    anupana: "Warm water 30 minutes before breakfast and dinner",
    ingredients: [
      "Gurmar (Gymnema sylvestre)",
      "Jamun Beej (Syzygium cumini)",
      "Karela (Momordica charantia)",
      "Vijaysar",
      "Methi",
      "Shilajit",
      "Mamejava",
    ],
    dosage: "1-2 tablets twice daily 30 minutes before principal meals.",
    description:
      "Synergistic botanical formulation to help maintain healthy blood sugar levels, reduce sugar cravings, and protect against diabetic fatigue.",
    description_hi:
      "गुड़मार, जामुन बीज, करेला और विजयसार का अचूक योग। ब्लड शुगर को प्राकृतिक रूप से नियंत्रित करता है और ऊर्जा बनाए रखता है।",
    description_mr:
      "गुळमार, जांभूळ बी, कारले व विजयसार युक्त आयुर्वेदिक टॅबलेट. रक्तातील साखर नैसर्गिकरीत्या नियंत्रित ठेवण्यास व अशक्तपणा दूर करण्यास मदत करते.",
    longDescription:
      "Dibona stimulates natural insulin response and curbs intestinal glucose absorption. Rich in charantin, gymnemic acids, and flavonoids, it combats Madhumeha symptoms like excessive thirst, frequent urination, and lethargy.",
    active: true,
  },
  {
    id: 8,
    name: "Mgrena Natural Migraine & Headache Tablets",
    name_hi: "एमग्रेना माइग्रेन और सिरदर्द टैबलेट",
    name_mr: "एमग्रेना मायग्रेन व तीव्र डोकेदुखी टॅबलेट",
    slug: "mgrena-migraine-headache-tablets",
    concern: "headache",
    form: "Vati (Tablet/Cap)",
    price: 290,
    stock: 60,
    weight: "60 Tablets Bottle",
    image: mgrenaImg,
    rating: 4.85,
    reviewsCount: 175,
    batchNo: "VEL-2026-MGR-06",
    tag: "Get Rid of Migraine",
    tagline: "Get Rid of Migraine & Throbbing Headache Naturally Without Sedation",
    doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Neutral" },
    anupana: "Warm water or lukewarm milk",
    ingredients: [
      "Godanti Bhasma",
      "Shirashooladivajra Ras",
      "Dashmoola",
      "Brahmi",
      "Shankhapushpi",
      "Jatamansi",
      "Pippali",
    ],
    dosage: "1 tablet twice daily with water, or 1 tablet immediately at headache onset.",
    description:
      "Potent Ayurvedic cranial soothing tablet targeting root causes of vascular migraines, stress headaches, and sinus pressure.",
    description_hi:
      "माइग्रेन के असहनीय दर्द, आधे सिर के दर्द और तनावजनित सिरदर्द से प्राकृतिक व स्थायी मुक्ति।",
    description_mr:
      "मायग्रेन (अर्धशिशी), तीव्र डोकेदुखी व तणावावर त्वरित आराम देणारी डॉ. वेलणकर यांची सिद्ध आयुर्वेदिक टॅबलेट.",
    longDescription:
      "Mgrena regulates cranial micro-circulation and pacifies vitiated Vata and Pitta that trigger neuromuscular spasms in the head. It relieves light/sound sensitivity, nausea associated with migraine, and promotes clear mental calm without dependency.",
    active: true,
  },
  {
    id: 9,
    name: "Dr. Velankar's Aloe-Vera Gel with Mint",
    name_hi: "डॉ. वेलणकर एलोवेरा व पुदीना जेल",
    name_mr: "डॉ. वेलणकर्स अ‍ॅलोव्हेरा विथ मिंट जेल",
    slug: "aloevera-mint-skin-gel",
    concern: "skin",
    form: "Gel (Topical)",
    price: 195,
    stock: 50,
    weight: "100g Jar",
    image: aloeMintGelImg,
    rating: 4.8,
    reviewsCount: 130,
    batchNo: "VEL-2026-ALO-09",
    tag: "Refresh Cool",
    tagline: "Moisturizing & Hydrating Cooling Effect on Face & Skin",
    doshaEffect: { vata: "Neutral", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "External topical application on clean skin",
    ingredients: [
      "Pure Aloe Barbadensis Leaf Juice",
      "Mentha piperita (Mint Extract)",
      "Vitamin E",
      "Cucumber Hydrosol",
    ],
    dosage: "Apply generously to face and skin twice daily after washing.",
    description:
      "Pure soothing Aloe Vera gel infused with refreshing mint to deeply hydrate, calm irritated skin, soothe acne flare-ups, and restore radiant skin barrier.",
    description_hi:
      "चेहरे और त्वचा को ठंडक और गहरा पोषण देने वाला शुद्ध एलोवेरा व पुदीना जेल। मुंहासे और रूखेपन से राहत।",
    description_mr:
      "चेहऱ्याला आणि त्वचेला थंडावा, आर्द्रता व चमक देणारे शुद्ध कोरफड आणि पुदिना जेल. पुरळ व उन्हामुळे काळी पडलेली त्वचा पूर्ववत करते.",
    longDescription:
      "Formulated with 100% cold-stabilized aloe pulp and rejuvenating peppermint extract. Provides instant relief from environmental heat, sunburn, irritation, and dull skin texture.",
    active: true,
  },
  {
    id: 10,
    name: "Dr. Velankar's Herbal Shampoo & Conditioner Combo",
    name_hi: "डॉ. वेलणकर हर्बल शैम्पू व कंडीशनर कॉम्बो",
    name_mr: "डॉ. वेलणकर्स हर्बल हेअर केअर शाम्पू + कंडिशनर",
    slug: "herbal-shampoo-conditioner-combo",
    concern: "hair",
    form: "Shampoo (Hair Wash)",
    price: 340,
    stock: 40,
    weight: "200ml Bottle + Free Dclino Lotion",
    image: haircareShampooImg,
    rating: 4.85,
    reviewsCount: 155,
    batchNo: "VEL-2026-HHC-11",
    tag: "Paraben Free Launch",
    tagline: "Aloevera & Shikakai Natural Care for Smooth, Silky & Shiny Hair",
    doshaEffect: { vata: "Pacifies", pitta: "Pacifies", kapha: "Pacifies" },
    anupana: "Apply on wet hair during bath",
    ingredients: [
      "Aloevera Extract",
      "Shikakai (Acacia concinna)",
      "Reetha",
      "Amla",
      "Dclino Antidandruff Active",
    ],
    dosage: "Gently massage into wet hair and scalp, leave for 2 minutes, rinse well.",
    description:
      "Paraben-free botanical shampoo and conditioner available in Aloevera (for dry/damaged hair) and Shikakai (for oily hair & dandruff) with complimentary Dclino anti-dandruff lotion.",
    description_hi:
      "पैराबेन-मुक्त प्राकृतिक हेयर केयर फॉर्मूला। बालों को रेशमी, चमकदार और डैंड्रफ-मुक्त बनाता है।",
    description_mr:
      "पॅराबेन-मुक्त नैसर्गिक शाम्पू व कंडिशनर. कोरफड (कोरड्या केसांसाठी) आणि शिकाकाई (कोंडा व तेलकट केसांसाठी) फॉर्म्युला + मोफत डी-क्लिनो लोशन.",
    longDescription:
      "Designed to preserve the scalp's natural lipid mantle without harsh SLS or parabens. Restores protein bonds in damaged hair cuticles and leaves locks soft, bouncy, and lustrous.",
    active: true,
  },
];
