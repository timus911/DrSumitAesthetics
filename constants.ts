const BASE = import.meta.env.BASE_URL;

export const BRAND = {
  name: "Dr. Sumit Singh Gautam",
  shortName: "Dr. Sumit",
  specialty: "Plastic Surgeon & Sculptor",
  fellowship: "The Intersection of Art & Surgery",
  mentors: "Mentored by Masters of Form & Function",
  education: [
    "MBBS - GMCH-32, Chandigarh",
    "MS General Surgery - GMCH-32, Chandigarh",
    "MCh Plastic & Reconstructive Surgery - DMC Ludhiana",
    "Fellowship in Aesthetic Surgery - Belgium"
  ],
  artisticBackground: {
    description: "Dr. Sumit is not just a surgeon; he is a sculptor of the human form. His surgical precision is born from years of mastery in sketching, oil painting, 3D digital sculpting, and wood carving. This multidisciplinary artistic background allows him to visualize and restore anatomical harmony with an artist's eye and a surgeon's hand.",
    hobbies: ["Fine Art Sketching", "Oil Painting", "3D Digital Sculpting", "Wood Carving"]
  },
  tagline: "Precision. Artistry. Mastery.",
};

export const CONTACT = {
  phone: "+91 82198 16265",
  counselorPhone: "+91 85263 43434",
  email: "sumit.sgautam@gmail.com",
  location: "Healing Hospital, Sector 34 A, Chandigarh",
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Healing+Hospital+Sector+34+Chandigarh",
  hours: {
    weekdays: "Mon - Sat 9:00am - 5:00pm",
    sunday: "Closed", // Defaulting to closed unless specified
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  }
};

export const COLORS = {
  charcoal: "#070708",
  titanium: "#111214",
  pearl: "#F0F4F8",
  accent: "#4A90E2",
  accentLight: "#7FB3D5",
  accentDark: "#1B4F72",
  glass: "rgba(74, 144, 226, 0.05)",
};

/**
 * ASSETS mapping to the user-provided files (photo1.jpg - photo6.jpg)
 */
const RAW_ASSETS = {
  portraitProfessional: "dr-sumit-portrait.jpg",
  heroAction: "photo3.jpg",
  surgeryProfile: "artistic-anatomy.jpg",
  clinicalInteraction: "photo5.jpg",
  surgeryTheater: "photo6.jpg",
  surgeryHeroBackground: "/surgical-excellence.jpg", // Main screen surgical operation background
  aboutBackground: "about-bg.png",
  // Fallbacks for other visual elements
  anatomicalPlaceholder: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2000&auto=format&fit=crop",
  verpaelePainting: "verpaele-painting.jpg",
  abstractMedical: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop"
};

export type Procedure = {
  id: string;
  title: string;
  category: string;
  parentCategory: 'aesthetic' | 'reconstructive' | 'non-surgical' | 'vascular';
  description: string;
  longDescription: string;
  subSections?: string[];
  image?: string;
  brief?: {
    operationTime: string;
    anesthesia: string;
    recovery: string;
    refinement: string;
    technique?: string;
  };
  details?: {
    whoNeeds?: string[];
    candidates?: string[];
    assessment?: string[];
    functional?: string[];
    backToWork?: string[];
    holidays?: string[];
    results?: string[];
    recoveryTips?: string[];
    customFaq?: {
      question: string;
      answer: string[];
    };
  };
  regions?: string[];
  gallery?: string[];
};

const RAW_PROCEDURES: Procedure[] = [
  // AESTHETIC - BODY
  {
    id: "tummy-tuck",
    title: "Tummy Tuck (Abdominoplasty)",
    category: "Body",
    parentCategory: "aesthetic",
    description: "Refining the abdominal wall and contour through structural restoration.",
    longDescription: "Abdominoplasty removes excess skin and fat and restores weakened or separated muscles to create an abdominal profile that is smoother and firmer.",
    image: "/tummy-tuck-aesthetic.jpg",
    brief: {
      operationTime: "3 - 5 Hours",
      anesthesia: "General Anaesthesia",
      recovery: "10 - 14 Days",
      refinement: "Mature at 6 - 12 months"
    },
    details: {
      whoNeeds: ["Patients with lingering skin laxity after significant weight loss or pregnancy.", "Individuals seeking to repair stomach muscle separation (diastasis recti)."],
      candidates: ["Ideally non-smokers with a stable weight for at least six months.", "Those with realistic expectations about surgical scarring, which is placed low and discreetly."],
      assessment: ["We evaluate your abdominal wall integrity and skin elasticity.", "Assessment of internal fat versus subcutaneous fat to determine if Liposuction should be combined."],
      functional: ["You will be mobile and walking (though slightly hunched) within 24 hours.", "Light independence for basic personal care is expected by day 3."],
      backToWork: ["Desk jobs typically require 2 weeks of recovery.", "Physically demanding work may require 4-6 weeks for full clearance."],
      holidays: ["Plan for a 14-day 'quiet window' to allow primary healing.", "Rest is essential during this phase to minimize swelling and optimize scar quality."],
      results: ["Initial contour improvement is visible immediately despite swelling.", "The final refined shape settles as tissues soften over 6 to 12 months."],
      recoveryTips: ["Wear your compression garment religiously as it acts as your 'internal skin'.", "Hydration and high-protein nutrition are key to tissue repair."]
    },
    regions: ["Abdomen", "Body"],
    gallery: ["/tummy-tuck-result-1.png", "/tummy-tuck-result-2.jpg"]
  },
  {
    id: "hd-liposuction",
    title: "High Definition Liposuction",
    category: "Body",
    parentCategory: "aesthetic",
    description: "Precision sculpting to reveal underlying muscular definition.",
    longDescription: "HD Liposuction goes beyond traditional fat removal, meticulously sculpting around muscle groups to highlight natural athletic definition.",
    image: "/hd-lipo-aesthetic.jpg",
    brief: {
      operationTime: "2 - 4 Hours",
      anesthesia: "General / Deep Sedation",
      recovery: "5 - 7 Days",
      refinement: "Crisp at 3 months"
    },
    details: {
      whoNeeds: ["Individuals with good muscle tone who have stubborn pockets of fat masking their definition.", "Athletic patients looking for that final 'etched' appearance of the obliques and abdominals."],
      candidates: ["Patients with high skin elasticity (needed for the skin to shrink-wrap over the new contours).", "Those near their target weight but lacking visible muscle definition."],
      assessment: ["A detailed 'pinch test' mapping of fat distribution.", "Evaluation of underlying muscle groups to determine the 'etching' lines."],
      functional: ["Walking is encouraged immediately to minimize stiffness.", "Bruising and mild soreness are managed easily with standard care."],
      backToWork: ["Most patients return to office roles within 5-7 days.", "Strenuous gym activity usually resumes at 3-4 weeks."],
      holidays: ["One week of focused recovery is usually sufficient.", "This is a faster recovery than standard body lifting procedures."],
      results: ["Initial results are often 'wow' at 4 weeks.", "Final etching becomes crisp at 3 months as minor swelling disappears."],
      recoveryTips: ["Lymphatic drainage massage is highly recommended to smooth out results.", "Constant compression for 4 weeks ensures the skin adheres perfectly to the new muscular form."]
    },
    regions: ["Abdomen", "Body", "Thighs", "Arms", "Buttock"]
  },
  {
    id: "body-contouring",
    title: "Body Contouring",
    category: "Body",
    parentCategory: "aesthetic",
    description: "Comprehensive reshaping of the torso and limbs.",
    longDescription: "A collection of procedures aimed at eliminating loose skin and excess fat following weight loss or aging to harmonize the silhouette.",
    image: "/body-contouring-aesthetic.png", // User-provided aesthetic image
    regions: ["Body", "Abdomen", "Thighs", "Arms", "Buttock"],
    gallery: [
      "/axillary-breast-reduction-result.png",
      "/body-contouring-result-1.jpg",
      "/body-contouring-result-2.png",
      "/body-contouring-result-3.jpg",
      "/body-contouring-result-4.jpg",
      "/body-contouring-result-5.png",
      "/tummy-tuck-result-1.png",
      "/tummy-tuck-result-2.jpg"
    ]
  },
  {
    id: "fat-grafting",
    title: "Fat Grafting",
    category: "Body",
    parentCategory: "aesthetic",
    description: "Using autologous tissue for volume restoration.",
    longDescription: "Fat grafting is the meticulous process of harvesting your own fat cell—typically from the abdomen or thighs—and precisely re-integrating them into areas requiring volume, contour, or skin rejuvenation. It is the ultimate bio-compatible filler, offering permanent results that age naturally with you.",
    image: "/fat-grafting-aesthetic.jpg", // User-provided aesthetic image
    brief: {
      operationTime: "2 - 4 Hours",
      anesthesia: "General / Deep Sedation",
      recovery: "7 - 10 Days",
      refinement: "Mature at 6 months",
      technique: "Facial – Microfat / Nanofat / SNIF (tailored) | Body – Microfat grafting"
    },
    details: {
      whoNeeds: ["Patients seeking to restore volume lost to aging or weight loss.", "Individuals looking for a natural alternative to synthetic fillers."],
      candidates: ["Patients with sufficient donor fat in areas like the flanks or abdomen.", "Nonsmokers who understand that a percentage of fat is naturally reabsorbed before stabilizing."],
      assessment: ["Evaluation of donor site fat quality and recipient zone skin laxity.", "Detailed mapping of volume deficits to ensure a balanced, symmetric restoration."],
      functional: ["Mild swelling and bruising at both donor and recipient sites for 5-7 days.", "Normal walking and light activities are encouraged within 48 hours."],
      backToWork: ["Typically 7-10 days for most professional roles.", "Physical impact activities should be paused for 3-4 weeks."],
      holidays: ["10 days of 'quiet time' helps optimize the survival of the grafted fat.", "Rest and avoiding pressure on the grafted areas are critical during this window."],
      results: ["Initial volume settles over 3 months as 'permanent' fat integration occurs.", "Final soft, natural contours are reached as tissues fully soften by 6 months."],
      recoveryTips: ["Avoid direct pressure on the treated areas (sleep elevated for face, special cushions for body).", "Maintain a stable weight to ensure the long-term integrity of the results."],
      customFaq: {
        question: "Is fat grafting performed the same way on the face and body?",
        answer: ["No. Facial tissues and body tissues behave very differently. Facial fat grafting often requires more refined techniques for precision and skin quality, while body fat grafting focuses on stable volume and contour. The technique is selected based on the area treated and the desired outcome."]
      }
    },
    regions: ["Face", "Nose", "Eyes", "Ears", "Lips", "Neck", "Breasts", "Body", "Buttock"],
    gallery: ["/scar-revision-fat-grafted.jpg", "/fat-grafting-result-1.jpg", "/fat-grafting-result-2.jpg", "/fat-grafting-result-3.png"]
  },
  {
    id: "buttock-lift",
    title: "Buttock Lift",
    category: "Body",
    parentCategory: "aesthetic",
    description: "Elevation and tightening of the posterior contour.",
    longDescription: "Removing excess skin and lifting the remaining tissue to improve the tone and shape of the buttocks.",
    image: "/buttock-lift-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Buttock", "Body"]
  },

  // AESTHETIC - FACE
  {
    id: "facelift-macs",
    title: "Facelift (MACS Lift)",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Minimal Access Cranial Suspension for vertical rejuvenation.",
    longDescription: "A specialized Belgium-refined technique that lifts deep facial tissues vertically, avoiding the horizontal 'pulled' look of traditional facelifts.",
    image: "/facelift-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Face"]
  },
  {
    id: "neck-lift",
    title: "Neck Lift (Deep Plane)",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Structural sharpening of the jawline and neck angle.",
    longDescription: "Addressing the deep platysma and fat layers to resolve neck laxity and redefine a sharp, youthful submental profile.",
    image: "/neck-lift-aesthetic.png", // User-provided aesthetic image
    regions: ["Neck", "Face"]
  },
  {
    id: "lip-lift-reduction",
    title: "Lip Lift / Lip Reduction",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Refining lip proportions and philtrum height.",
    longDescription: "Shortening the space between the nose and lip or reducing excess volume to achieve balanced facial ratios.",
    image: "/lip-lift-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Lips", "Face"]
  },
  {
    id: "hair-transplant",
    title: "Hair Transplant",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Restoring density and hairline naturally.",
    longDescription: "Advanced follicular unit extraction and placement for permanent hair restoration with microscopic precision.",
    image: "/hair-transplant-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Face"]
  },
  {
    id: "blepharoplasty",
    title: "Blepharoplasty (Eye Bags)",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Revitalizing the orbital region through lid refinement.",
    longDescription: "Correcting puffy eye bags and drooping lids to restore a bright, awake, and energetic facial expression.",
    image: "/blepharoplasty-aesthetic.jpg",
    brief: {
      operationTime: "1.5 - 2.5 Hours",
      anesthesia: "General / Local + Sedation",
      recovery: "7 - 10 Days",
      refinement: "Settled at 2 months"
    },
    details: {
      whoNeeds: ["Individuals with heavy upper lids or pronounced under-eye bags.", "Patients who feel they look 'tired' even when well-rested."],
      candidates: ["Good overall health with no serious eye conditions like glaucoma.", "Non-smokers who understand that the goal is refinement, not a 'surprised' look."],
      assessment: ["Evaluation of skin laxity, fat prolapse, and muscle tone around the eyes.", "Check for dry eye syndrome and vision health."],
      functional: ["Vision remains clear, but initial swelling and bruising last about 5-7 days.", "You'll be fully mobile immediately, though reading and screens should be limited for 48 hours."],
      backToWork: ["Patients typically return to work by day 7-10 with light makeup.", "Public social events are best planned after 2 weeks."],
      holidays: ["A 7-day 'home recovery' is recommended.", "Iced compresses are your best friend during this first week."],
      results: ["The 'bright-eyed' look is evident within 2-3 weeks.", "Scar lines fade almost into invisibility over 2-4 months."],
      recoveryTips: ["Keep your head elevated while sleeping for the first 5 days.", "Protect your eyes from sun and wind with dark sunglasses."]
    },
    regions: ["Eyes", "Face"]
  },
  {
    id: "rhinoplasty",
    title: "Rhinoplasty (Nose Job)",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Refining nasal structure for harmony and function.",
    longDescription: "Reshaping the nose to fit the face while maintaining or improving respiratory airflow.",
    image: "/rhinoplasty-aesthetic.jpg",
    brief: {
      operationTime: "2.5 - 4 Hours",
      anesthesia: "General Anaesthesia",
      recovery: "7 - 10 Days",
      refinement: "Final at 12 months"
    },
    details: {
      whoNeeds: ["Patients seeking to refine a nasal hump, tip width, or overall projection.", "Those needing functional correction for breathing issues (Septoplasty)."],
      candidates: ["Patients whose facial growth is complete.", "Individuals seeking internal and external nasal harmony."],
      assessment: ["3D visualization of the proposed new profile.", "Internal examination of the septum and turbinates for airflow optimization."],
      functional: ["Breathing may be congested for the first few days due to internal swelling.", "Most 'splints' are removed by day 7."],
      backToWork: ["Typically 7-10 days as bruising under eyes resolves.", "Heavy contact sports must be avoided for 6 weeks."],
      holidays: ["10 days off is ideal for a stress-free recovery.", "Avoid heavy glasses resting on the nasal bridge for 4 weeks."],
      results: ["The new profile is visible immediately after splint removal.", "The final refinement of the tip matures over 12 months as fine swelling resolves."],
      recoveryTips: ["Avoid blowing your nose for at least 2 weeks.", "Use saline sprays as prescribed to keep internal passages clear."]
    },
    regions: ["Nose", "Face"]
  },
  {
    id: "otoplasty",
    title: "Ear Reshaping (Otoplasty)",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Correction of ear prominence and symmetry.",
    longDescription: "Pinned-back or reshaped ears to improve position and appearance, often performed to resolve congenital concerns.",
    image: "/otoplasty-aesthetic.png", // User-provided aesthetic image
    regions: ["Ears", "Face"],
    gallery: ["/otoplasty-result-1.jpg", "/otoplasty-result-2.jpg", "/otoplasty-result-3.png", "/otoplasty-result-4.png", "/otoplasty-result-5.jpg"]
  },

  // BREAST
  {
    id: "breast-augmentation",
    title: "Breast Augmentation",
    category: "Breast",
    parentCategory: "aesthetic",
    description: "Enhancing volume with Fat or Premium Implants.",
    longDescription: "Customized volume enhancement tailored to the patient's anatomy, utilizing either fat transfer or silicone implants.",
    subSections: ["With Fat", "With Implants"],
    image: "/breast-augmentation-aesthetic.png",
    brief: {
      operationTime: "1.5 - 2.5 Hours",
      anesthesia: "General Anaesthesia",
      recovery: "5 - 7 Days",
      refinement: "Drop & Fluff at 3 months"
    },
    details: {
      whoNeeds: ["Women seeking to restore volume lost after nursing or weight changes.", "Individuals desiring better symmetry and a more balanced silhouette."],
      candidates: ["Stable breast health and realistic expectations about implant size.", "Understanding the difference between a 'lift' and simple 'augmentation'."],
      assessment: ["Detailed measurements of chest width and existing breast tissue.", "Discussion of implant profile (High vs Moderate) and placement (Under vs Over muscle)."],
      functional: ["Arms will feel heavy and chest tight for the first 48-72 hours.", "Walking is essential from day one to aid circulation."],
      backToWork: ["Desk jobs can resume in 5-7 days.", "Strenuous upper body lifting is restricted for 4-6 weeks."],
      holidays: ["One full week of 'rebound time' is sufficient.", "Plan for extra help at home if you have small children."],
      results: ["Shape is visible immediately, though 'drop and fluff' takes 6-12 weeks.", "Implants settle into a natural position progressively."],
      recoveryTips: ["The surgical support bra is mandatory for the first 6 weeks.", "Manual massage may be recommended depending on the implant type."]
    },
    regions: ["Breasts"],
    gallery: ["/breast-augmentation-result-1.jpg", "/breast-augmentation-result-2.jpg"]
  },
  {
    id: "breast-reduction",
    title: "Breast Reduction",
    category: "Breast",
    parentCategory: "aesthetic",
    description: "Alleviating discomfort while reshaping the profile.",
    longDescription: "Reduction of excess glandular tissue and skin to create a lighter, more proportionate breast size.",
    image: "/breast-reduction-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Breasts"],
    gallery: ["/breast-reduction-result-1.jpg", "/axillary-breast-reduction-result.png"]
  },
  {
    id: "breast-lift",
    title: "Breast Lift (Mastopexy)",
    category: "Breast",
    parentCategory: "aesthetic",
    description: "Restoring elevation and firmness.",
    longDescription: "Raising and reshaping sagging breasts by removing excess skin and tightening surrounding tissue.",
    image: "/breast-lift-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Breasts"]
  },

  // MALE
  {
    id: "gynecomastia",
    title: "Gynecomastia (Male Breast Reduction)",
    category: "Male",
    parentCategory: "aesthetic",
    description: "Correcting overdeveloped male breast tissue.",
    longDescription: "Surgical removal of glandular tissue or fat to restore a flat, masculine chest contour.",
    image: "/gynecomastia-aesthetic.jpg",
    brief: {
      operationTime: "1.5 - 2 Hours",
      anesthesia: "General / Deep Sedation",
      recovery: "3 - 5 Days",
      refinement: "Smooth at 3 months"
    },
    details: {
      whoNeeds: ["Men with enlarged breast tissue that does not respond to diet or exercise.", "Individuals seeking to resolve the 'puffy nipple' appearance."],
      candidates: ["Men at a stable weight whose hormones have been evaluated.", "Those seeking a permanent solution to glandular overdevelopment."],
      assessment: ["Ultrasound may be used to determine the ratio of fat to glandular tissue.", "Testing to ensure no underlying medical causes for the enlargement."],
      functional: ["Soreness is similar to a heavy chest workout.", "Most patients are back to light movements within 48 hours."],
      backToWork: ["Typically 3-5 days for office work.", "Gym activity (especially chest press) is restricted for 4 weeks."],
      holidays: ["A 5-day break is usually all that is required.", "Recovery is relatively rapid compared to larger body procedures."],
      results: ["The chest looks flatter and more masculine immediately.", "Final contour refinement occurs as skin tightens over 3 months."],
      recoveryTips: ["The compression vest is vital to flatten the area and prevent fluid buildup.", "Lymphatic massage helps ensure a smooth, bump-free result."]
    },
    regions: ["Breasts", "Body"],
    gallery: ["/body-contouring-result-1.jpg", "/body-contouring-result-2.png"]
  },

  // INTIMATE
  {
    id: "vaginoplasty",
    title: "Vaginoplasty",
    category: "Intimate",
    parentCategory: "aesthetic",
    description: "Vaginal rejuvenation and tightening.",
    longDescription: "Restoring muscular tone and vaginal integrity for functional and aesthetic restoration.",
    image: "/vaginoplasty-aesthetic.png", // User-provided aesthetic image
    regions: ["Body"]
  },
  {
    id: "labiaplasty",
    title: "Labiaplasty",
    category: "Intimate",
    parentCategory: "aesthetic",
    description: "Reshaping and refinement of the labia.",
    longDescription: "Reducing excess labial tissue for comfort, confidence, and aesthetic improvement.",
    image: "/labiaplasty-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Body"]
  },

  // AESTHETIC - SCAR REVISION (Moved here)
  {
    id: "scar-revision",
    title: "Scar Revision",
    category: "Aesthetic",
    parentCategory: "aesthetic",
    description: "Improving the appearance of surgical or traumatic scars.",
    longDescription: "Surgical and non-surgical techniques to minimize scar visibility and blend them with surrounding skin, restoring confidence through refined texture.",
    image: "/scar-revision-aesthetic.png", // User-provided aesthetic image
    regions: ["Body", "Face", "Arms", "Thighs"],
    gallery: ["/scar-revision-fat-grafted.jpg", "/keloid-excision-result.jpg", "/scar-revision-result-2.jpg"]
  },

  // NON-SURGICAL
  {
    id: "botox",
    title: "Botox & Neuromodulators",
    category: "Non-Surgical",
    parentCategory: "non-surgical",
    description: "Smoothing dynamic wrinkles for a refreshed expression.",
    longDescription: "Precision application of neuromodulators to soften forehead lines, crow's feet, and frown lines while maintaining natural facial animation.",
    image: "/botox-procedure.jpg",
    brief: {
      operationTime: "15 - 30 Minutes",
      anesthesia: "None / Topical Cooling",
      recovery: "Immediate",
      refinement: "Full effect in 7 - 10 days"
    },
    details: {
      whoNeeds: ["Patients seeking to soften dynamic expression lines.", "Individuals looking for a preventative approach to deep wrinkle formation."],
      candidates: ["Healthy adults with realistic expectations of softening rather than freezing expression."],
      assessment: ["Evaluation of muscle strength and skin elasticity during active expression."],
      functional: ["No downtime; you can return to social activities immediately."],
      backToWork: ["Instant return to work; no physical signs visible usually within 30 minutes."],
      holidays: ["Perfect 'lunchtime' procedure with zero recovery window."],
      results: ["Results soften at 3-5 days, peak at 14 days, and last 3-4 months."],
      recoveryTips: ["Keep upright for 4 hours; avoid strenuous exercise for 24 hours."]
    },
    regions: ["Face", "Eyes", "Neck"]
  },
  {
    id: "microneedling",
    title: "Microneedling",
    category: "Non-Surgical",
    parentCategory: "non-surgical",
    description: "Collagen induction therapy for skin rejuvenation.",
    longDescription: "Utilizing medical-grade microneedling to stimulate the body's natural healing response, improving skin texture and reducing fine lines.",
    image: "/microneedling-non-surgical.png",
    brief: {
      operationTime: "45 - 60 Minutes",
      anesthesia: "Local Anaesthesia (Topical Cream)",
      recovery: "1 - 2 Days",
      refinement: "Progressive over 3 months"
    },
    details: {
      whoNeeds: ["Individuals with acne scars, fine lines, or uneven skin texture.", "Patients seeking to improve overall skin brightness and health."],
      candidates: ["Nearly all skin types and tones.", "Individuals without active skin infections or severe inflammation."],
      assessment: ["Analysis of skin thickness and depth of scarring/pigmentation.", "Setting expectations for a series of treatments."],
      functional: ["Skin will look like a mild sunburn for 24-48 hours.", "Normal activity resumes immediately."],
      backToWork: ["Typically next day as redness subsides.", "Avoid direct sun exposure for 1 week."],
      holidays: ["No formal holidays needed.", "Weekends are great for 'social downtime'."],
      results: ["Initial glow is visible in 1 week.", "Collagen remodelling shows real structural improvement after 3 treatments."],
      recoveryTips: ["Use a high-quality hyaluronic acid serum during the first 24 hours.", "Strict sun protection is non-negotiable post-treatment."]
    },
    regions: ["Face", "Body"]
  },
  {
    id: "chemical-peeling",
    title: "Chemical Peeling",
    category: "Non-Surgical",
    parentCategory: "non-surgical",
    description: "Advanced skin resurfacing for clarity and tone.",
    longDescription: "Carefully calibrated chemical solutions to exfoliate the skin's outer layers, addressing uneven pigmentation and refining texture.",
    image: "/chemical-peel-non-surgical.png",
    brief: {
      operationTime: "30 - 45 Minutes",
      anesthesia: "Local Anaesthesia (Topical Cooling)",
      recovery: "3 - 7 Days",
      refinement: "Reveals new skin in 10 days"
    },
    details: {
      whoNeeds: ["Patients with sun damage, melasma, or surface-level age spots.", "Anyone seeking to 'reset' their skin's clarity and smoothness."],
      candidates: ["Varies by peel depth; customized to your specific skin tone.", "Commitment to strict post-peel sun avoidance is essential."],
      assessment: ["Skin classification and history of pigmentation issues.", "Preparation of skin with a pre-peel home care regimen."],
      functional: ["Tightness and some peeling of the skin is expected.", "Moisturization is critical during the peeling process."],
      backToWork: ["Typically 3-5 days depending on the depth of the peel.", "Social downtime varies; light peels have no downtime."],
      holidays: ["A long weekend is usually sufficient for deep peels.", "Plan to stay indoors away from direct heat."],
      results: ["Fresh, clearer skin is fully revealed within 10-14 days.", "Significant reduction in pigmentation and finer pores."],
      recoveryTips: ["Do not pick at the peeling skin; let it fall off naturally.", "Only use the specialized post-procedure kit provided by our team."]
    },
    regions: ["Face"]
  },
  {
    id: "dermal-fillers",
    title: "Dermal Fillers",
    category: "Non-Surgical",
    parentCategory: "non-surgical",
    description: "Restoring volume and sculpting anatomical contours.",
    longDescription: "Utilizing premium hyaluronic acid to restore mid-face volume, refine the jawline, and enhance lip definition with artistic precision and anatomical harmony.",
    image: "/injectables-non-surgical.jpg",
    brief: {
      operationTime: "30 - 45 Minutes",
      anesthesia: "Topical Cream / Local Anesthetic",
      recovery: "1 - 2 Days",
      refinement: "Settles at 7 days"
    },
    details: {
      whoNeeds: ["Individuals with volume loss in the cheeks, temples, or under-eyes.", "Patients seeking non-surgical refinement of the nose or jawline."],
      candidates: ["Healthy patients looking for immediate structural or volume improvement."],
      assessment: ["3D facial analysis to restore proportions rather than just filling lines."],
      functional: ["Mild swelling or bruising may occur; social activity remains possible."],
      backToWork: ["Typically next day as minor swelling stabilizes."],
      holidays: ["Plan for a 2-day 'buffer' before major social events to ensure any bruising resolves."],
      results: ["Immediate volume restoration; final integration into tissues at 2 weeks."],
      recoveryTips: ["Cold compresses help reduce initial swelling; avoid high heat for 24 hours."]
    },
    regions: ["Face", "Nose", "Eyes", "Lips", "Neck"]
  },

  // RECONSTRUCTIVE
  {
    id: "microvascular-repair",
    title: "Microvascular Repair",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Microsurgical reconnection of vessels and nerves.",
    longDescription: "Critical restoration of blood flow and nerve function using high-magnification surgical techniques.",
    image: "/microvascular-reconstructive.png",
    regions: ["Body", "Arms", "Thighs"]
  },
  {
    id: "traumatic-reconstruction",
    title: "Traumatic Reconstruction",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Restoring form and function after major injury.",
    longDescription: "Complex surgical pathways to rebuild tissue and function following severe physical trauma.",
    image: "/traumatic-reconstructive.png",
    regions: ["Body", "Face", "Arms", "Thighs"]
  },
  {
    id: "facial-fracture-surgery",
    title: "Facial Fracture Surgery",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Stabilization of the facial skeleton.",
    longDescription: "Correcting fractures of the jaw, nose, and orbital bones to restore anatomical alignment.",
    image: "/facial-fracture-reconstructive.png",
    regions: ["Face", "Nose", "Eyes"]
  },
  {
    id: "nerve-vessel-tendon-repair",
    title: "Nerve / Vessel / Tendon Repair",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Immediate and delayed restoration of extremities.",
    longDescription: "Precise repair of essential structural components to restore function to hands and limbs.",
    image: "/nerve-repair-reconstructive.png",
    regions: ["Arms", "Thighs"]
  },
  {
    id: "hand-foot-fractures",
    title: "Fractures of Hand & Foot",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Refining the skeletal integrity of digits and limbs.",
    longDescription: "Specialized fixation of the small bones of the hand and foot to preserve range of motion.",
    image: "/hand-fracture-reconstructive.png",
    regions: ["Arms", "Thighs"]
  },
  {
    id: "hand-deformities",
    title: "Hand Deformities",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Correcting congenital and acquired conditions.",
    longDescription: "Surgical intervention for conditions like syndactyly or Dupuytren's contracture.",
    image: "/hand-deformity-reconstructive.png",
    regions: ["Arms"]
  },
  {
    id: "cleft-lip-palate",
    title: "Cleft Lip & Palate Repair",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Pediatric and adult cleft correction.",
    longDescription: "Restoring facial appearance and speech functionality through specialized cleft pathways.",
    image: "/cleft-lip-reconstructive.png",
    regions: ["Face", "Lips"]
  },
  {
    id: "burns-contracture",
    title: "Burns & Contracture Release",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Restoring mobility after burn injuries.",
    longDescription: "Release of tight scar tissue and skin grafting to restore full joint flexibility.",
    image: "/burns-contracture-reconstructive.png",
    regions: ["Body", "Face", "Arms", "Thighs"]
  },
  {
    id: "pressure-sores",
    title: "Pressure Sores / Bed Sores",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Complex wound care and flap coverage.",
    longDescription: "Using healthy tissue flaps to close deep, non-healing pressure ulcers.",
    image: "/pressure-sores-reconstructive.jpg",
    regions: ["Body", "Buttock"]
  },
  {
    id: "diabetic-foot",
    title: "Diabetic Foot",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Limb salvage and chronic wound management.",
    longDescription: "Surgical intervention to heal diabetic ulcers and prevent amputation.",
    image: "/diabetic-foot-reconstructive.jpg",
    regions: ["Thighs", "Body"]
  },

  // VASCULAR
  {
    id: "varicose-veins",
    title: "Varicose Veins",
    category: "Vascular",
    parentCategory: "vascular",
    description: "Treatment of venous insufficiency.",
    longDescription: "Surgical and minimally invasive management of swollen veins for health and aesthetics.",
    regions: ["Thighs", "Body"]
  },
  {
    id: "ultrasound-vascular",
    title: "Ultrasound-Guided Vascular Procedures",
    category: "Vascular",
    parentCategory: "vascular",
    description: "Precision-guided vascular treatments.",
    longDescription: "Using real-time ultrasound to ensure the highest accuracy in venous interventions.",
    regions: ["Body", "Thighs"]
  }
];
// Helper to fix paths
const fixPath = (path?: string) => {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  // Combine base with path, ensuring no double slash if path starts with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${cleanPath}`;
};

export const ASSETS = Object.fromEntries(
  Object.entries(RAW_ASSETS).map(([k, v]) => [k, fixPath(v) || v])
) as typeof RAW_ASSETS;

export const PROCEDURES = RAW_PROCEDURES.map(p => ({
  ...p,
  image: fixPath(p.image),
  gallery: p.gallery?.map(g => fixPath(g)!)
}));
