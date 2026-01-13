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
  seoContent?: string; // Rich SEO content for specific procedure pages
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
    seoContent: `
### Tummy Tuck (Abdominoplasty) in Chandigarh: Restore Your Core
**Reclaim Your Pre-Pregnancy or Pre-Weight Loss Figure at Healing Hospital**

A Tummy Tuck is more than just skin removal; it is a restoration of your abdominal core. Dr. Sumit Singh Gautam specializes in **Lipo-Abdominoplasty**, a modern technique that combines liposuction with skin tightening for superior contouring.

**Who is it for?**
It is the gold standard for mothers with "Diastasis Recti" (muscle separation) or massive weight loss patients with hanging skin folds.

#### The Procedure
*   **Muscle Repair:** We tighten the abdominal wall muscles like an internal corset.
*   **Scar Placement:** The incision is placed extremely low, typically hidden within the bikini line.
*   **Safety:** Performed under general anesthesia with dedicated DVT prophylaxis protocols.

#### Cost of Tummy Tuck in Chandigarh
Pricing depends on whether a Mini-Tummy Tuck or Full Abdominoplasty is required.
*   **Inclusions:** Hospital stay (typically 2 days), anesthesia, and follow-up care.

#### Recovery
*   **Walk Tall:** You will walk bent over for a few days to protect the repair.
*   **Return to Life:** Desk work in 14 days; gym in 6 weeks.
`,
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
    regions: ["Abdomen", "Body", "Thighs", "Arms", "Buttock"],
    seoContent: `
### High Definition Liposuction in Chandigarh: The Art of Athletic Sculpting

**Achieve a Chiseled, Athletic Physique with Dr. Sumit Singh Gautam at Healing Hospital, Sector 34**

High Definition (HD) Liposuction is not merely fat removal; it is an architectural reshaping of the human form. Unlike traditional liposuction, which focuses on debulking, HD Liposuction creates shadows and highlights to mimic the underlying musculature of an athlete.

**Why Choose Dr. Sumit for HD Liposuction?**
As a **Board Certified Plastic Surgeon**, Dr. Sumit combines his artistic background in sculpture with advanced surgical techniques to deliver results that look natural and powerful.

#### The Procedure: Etching Your Ideal Form
The procedure involves the precise removal of superficial and deep fat layers to reveal the "six-pack" (rectus abdominis), obliques, and serratus muscles.
*   **Precision:** Ultrasound-assisted technologies (like VASER) are often employed to liquefy fat before removal, preserving blood vessels and nerves.
*   **Safety:** Performed at **Healing Hospital**, a fully accredited facility in Chandigarh, ensuring the highest safety standards.

#### Cost of HD Liposuction in Chandigarh
The investment for HD Liposuction varies based on the number of areas treated (e.g., abdomen, flanks, back).
*   **Transparency:** We provide a detailed breakdown during your consultation, covering anesthesia, hospital fees, and post-op garments.
*   **Value:** We prioritize safety and long-term results over short-term discounts.

#### Recovery & Aftercare
*   **Recovery Time:** Most patients return to desk work within 5-7 days.
*   **Garments:** A specialized compression suit is worn for 4-6 weeks to ensure the skin adheres to the new muscular contours.

[View our Before and After Gallery](/gallery) to see the transformative results of our "Tricity" patients.
    `
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
    ],
    seoContent: `
### Body Contouring in Chandigarh: The Complete Transformation
**Specialized Post-Weight Loss & Body Lift Surgery**

After significant weight loss, loose skin can hide your hard-earned results. Dr. Sumit offers comprehensive body contouring solutions in Tricity, treating the body as a cohesive unit ensuring proportion and balance.

**Procedures Offered:**
*   **Arm Lift (Brachioplasty):** Reducing "bat wings" for toned arms.
*   **Thigh Lift:** Reshaping the inner and outer thighs.
*   **Lower Body Lift:** A 360-degree removal of excess skin from the beltline.

#### Safety & Scarring
Body contouring involves long incisions. Dr. Sumit's "Visualist" technique ensures these scars are placed in natural shadows or clothing lines to minimize visibility.

#### Recovery
Every procedure varies, but generally, expect 2-3 weeks of recovery before returning to a sedentary job. Compression garments are essential for 6 weeks.
`
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
    gallery: ["/scar-revision-fat-grafted.jpg", "/fat-grafting-result-1.jpg", "/fat-grafting-result-2.jpg", "/fat-grafting-result-3.png"],
    seoContent: `
### Fat Grafting in Chandigarh: The Natural Filler
**Restore Volume & Youth with Your Own Tissue**

Fat Grafting (Fat Transfer) is the ultimate organic solution for volume loss. Dr. Sumit harvests fat from areas of excess (like the tummy) and processes it into Microfat or Nanofat for rejuvenation.

**Applications:**
*   **Face:** Filling sunken cheeks, temples, and tear troughs (dark circles).
*   **Breast:** Natural augmentation without implants (usually 1 cup size increase).
*   **Buttock:** Creating a "Brazilian Butt Lift" contour.

#### The Science: Nanofat
Dr. Sumit uses **Nanofat**—emulsified fat rich in stem cells—to treat skin quality, fine lines, and dark circles. It acts more like a biological skin booster than a filler.

#### Longevity
Unlike synthetic fillers which dissolve in 12 months, transplanted fat that survives (typically 60-70%) is permanent. It ages naturally with you.
`
  },
  {
    id: "buttock-lift",
    title: "Buttock Lift",
    category: "Body",
    parentCategory: "aesthetic",
    description: "Elevation and tightening of the posterior contour.",
    longDescription: "Removing excess skin and lifting the remaining tissue to improve the tone and shape of the buttocks.",
    image: "/buttock-lift-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Buttock", "Body"],
    seoContent: `
### Buttock Lift in Chandigarh: Shape & Lift
**Enhancing Curves with Safety & Precision**

Whether due to aging, weight loss, or genetics, a flat or sagging buttock can affect your clothing fit and confidence.

**Techniques:**
*   **Surgical Lift:** Removing excess skin from the upper buttock/lower back region to lift the tissue.
*   **Auto-Augmentation:** Using your own tissue flaps during a lift to add volume without implants.

#### Safety Note
This procedure is performed strictly under general anesthesia at Healing Hospital. We prioritize safety above extreme volume, ensuring natural, proportional results.

#### Result Timeline
Results are visible immediately. You will need to avoid sitting directly on the area for 2 weeks to allow for optimal healing.
`
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
    regions: ["Neck", "Face"],
    seoContent: `
### Neck Lift in Chandigarh: Define Your Jawline
**Deep Plane Neck Contouring for a Sharp Profile**

A heavy or sagging neck can age a face more than wrinkles. Dr. Sumit performs Deep Plane Neck Lifts to address the "Turkey Neck" and restore a crisp, youthful cervico-mental angle (jaw-neck angle).

**The Procedure**
We tighten the Platysma muscle primarily. In many cases, this is combined with deep liposuction to remove sub-mental fat.

#### Minimal Scars
In isolated neck lifts, the incision is often hidden entirely under the chin or behind the ears.

#### Recovery
You will wear a supportive chin strap for 1 week. Bruising typically resolves in 10-12 days.
`
  },
  {
    id: "lip-lift-reduction",
    title: "Lip Lift / Lip Reduction",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Refining lip proportions and philtrum height.",
    longDescription: "Shortening the space between the nose and lip or reducing excess volume to achieve balanced facial ratios.",
    image: "/lip-lift-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Lips", "Face"],
    seoContent: `
### Lip Lift in Chandigarh: Sensual Balance
**Shortening the Philtrum for a Youthful Pout**

A long upper lip (philtrum) can hide your teeth when you smile and make the face look older. A Lip Lift shortens this distance, rolling the red part of the lip outward (vermilion show) for a naturally fuller look without fillers.

**The "Bullhorn" Technique**
The incision is hidden perfectly in the shadow of the base of the nose. It is virtually undetectable once healed.

#### Lip Reduction
For clients with genetically overly prominent lips, we perform precision reduction to balance facial harmony, often preserving the natural shape while reducing volume.
`
  },
  {
    id: "hair-transplant",
    title: "Hair Transplant",
    category: "Face",
    parentCategory: "aesthetic",
    description: "Restoring density and hairline naturally.",
    longDescription: "Advanced follicular unit extraction and placement for permanent hair restoration with microscopic precision.",
    image: "/hair-transplant-aesthetic.jpg", // User-provided aesthetic image
    regions: ["Face"],
    seoContent: `
### Hair Transplant in Chandigarh: Restoring Confidence Permanently

**Advanced FUE & DHT Techniques for Natural Hair Restoration**

Hair loss can significantly impact self-esteem. Dr. Sumit Singh Gautam offers state-of-the-art Hair Transplant services in Chandigarh, utilizing advanced Follicular Unit Extraction (FUE) and Direct Hair Transplantation (DHT) methods to ensure maximum graft survival and density.

**The "Visualist" Approach to Hairlines**
Designing a hairline is art. It requires understanding facial proportions, age-appropriate recession, and natural directionality. Dr. Sumit, your **Board Certified** expert, designs hairlines that frame your face perfectly, distinguishing a good transplant from a great one.

#### Why Choose Us for Hair Transplant in Chandigarh?
1.  **Surgeon-Led Procedure:** Unlike many clinics where technicians do the work, Dr. Sumit is personally involved in the planning and slit creation phases.
2.  **Healing Hospital Audit:** We operate within a hospital environment, ensuring sterility and emergency readiness—standards often missing in small clinics.

#### Cost of Hair Transplant in Chandigarh
The cost is determined by the number of grafts required to achieve your desired density.
*   **Consultation:** A thorough scalp analysis determines your donor availability and recipient area needs.
*   **Value:** We focus on "per-graft" viability, ensuring you get the most out of every extracted follicle.

#### Recovery Time
*   **Downtime:** Minimal. Tiny scabs form and fall off within 7-10 days.
*   **Growth:** New hair growth begins at 3-4 months, with full density achieved by 12 months.

Visit our **Before and After Gallery** to witness the life-changing density our patients enjoy.
    `
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
    regions: ["Eyes", "Face"],
    seoContent: `
### Blepharoplasty (Eyelid Surgery) in Chandigarh: Awake & Refreshed
**Upper and Lower Eyelid Rejuvenation**

The eyes are the first place to show aging. Hooded upper lids can make you look tired, while lower bags can make you look older. Blepharoplasty is a precise surgical procedure to remove excess skin and fat bags.

**Upper Blepharoplasty**
*   **Goal:** Open up the eyes and create a crisp eyelid platform.
*   **Scar:** Hidden in the natural eyelid crease.

**Lower Blepharoplasty**
*   **Technique:** We often use a trans-conjunctival approach (internal incision) for fat removal, leaving no external scar.
*   **Tear Troughs:** We frequently combine this with fat grafting to blend the lid-cheek junction.

#### Recovery
It is a quick recovery procedure. Sutures are removed on Day 5. Most patients return to work in 7-10 days.
`
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
    regions: ["Nose", "Face"],
    seoContent: `
### Rhinoplasty in Chandigarh: Harmonizing Your Profile

**Expert Nose Reshaping (Nose Job) by Dr. Sumit Singh Gautam**

Rhinoplasty is widely considered the most complex of all cosmetic surgeries. It sits at the exact intersection of form and function. A beautiful nose must also breathe perfectly. In Sector 34, Chandigarh, Dr. Sumit performs both Open and Closed Rhinoplasty to correct structural deformities, dorsal humps, and bulbous tips.

**Board Certified Precision**
Your nose is the central feature of your face. Even a millimeter of change can alter your entire appearance. Dr. Sumit's deep understanding of facial aesthetics ensures your new nose complements your chin, forehead, and cheeks.

#### Functional & Cosmetic Correction
We frequently combine **Septoplasty** (for breathing) with Rhinoplasty.
*   **Deviated Septum:** Correcting internal blockages.
*   **Cosmetic:** Refining the bridge, tip, and alar base.

#### Cost of Rhinoplasty in Chandigarh
Rhinoplasty costs depend on the complexity (Primary vs. Revision) and the technique required.
*   **Hospital Safety:** General anesthesia is administered by senior anesthesiologists at Healing Hospital.

#### Recovery Time
*   **Splint Removal:** The external splint is removed after 7 days, revealing your new profile.
*   **Social Activity:** Most bruising fades by day 10.
*   **Final Results:** While immediate improvement is obvious, subtle refinement of the tip continues for up to a year.

Explore our **Before and After Gallery** to see how we have refined profiles across the Tricity.
    `
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
    gallery: ["/otoplasty-result-1.jpg", "/otoplasty-result-2.jpg", "/otoplasty-result-3.png", "/otoplasty-result-4.png", "/otoplasty-result-5.jpg"],
    seoContent: `
### Otoplasty in Chandigarh: Ear Reshaping
**Correcting Prominent Ears for Children and Adults**

Prominent or "bat ears" can be a source of social anxiety. Otoplasty (Ear Pinning) reshapes the ear cartilage to bring it closer to the head and create a natural-looking anti-helical fold.

**Timing**
*   **Children:** Can be done after age 6 (when ear growth is near complete).
*   **Adults:** Can be done at any age.

#### The Procedure
Performed under Local Anesthesia for adults and General Anesthesia for children. The scar is hidden completely behind the ear.

#### Recovery
A head bandage is worn for 3-5 days. Results are permanent and immediate.
`
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
    gallery: ["/breast-augmentation-result-1.jpg", "/breast-augmentation-result-2.jpg"],
    seoContent: `
### Breast Augmentation in Chandigarh: Enhance Your Silhouette
**Premium Implants (Motiva / Mentor) & Fat Transfer**

Breast Augmentation is one of the most transformative procedures for confidence. Dr. Sumit offers tailored solutions using US FDA-approved implants or your own fat (Composite Augmentation).

**Implant Choices**
*   **Ergonomix (Motiva):** Implants that move naturally with gravity, looking round when lying down and teardrop when standing.
*   **Round vs Drop:** We help you choose based on your upper pole fulness desires.

#### Safety Protocol
We use a **"No-Touch" Technique** with Keller Funnels to insert implants, minimizing the risk of infection or capsular contracture.

#### Recovery
Most patients are back to desk jobs in 5 days. Heavy lifting is restricted for 4 weeks.
`
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
    gallery: ["/breast-reduction-result-1.jpg", "/axillary-breast-reduction-result.png"],
    seoContent: `
### Breast Reduction in Chandigarh: Relief & Proportion
**Alleviating Back Pain & Restoring Confidence**

Macromastia (excessively large breasts) can cause chronic neck pain, shoulder grooving, and rashes. Breast Reduction is a functional and aesthetic surgery that removes excess weight and lifts the breast for a youthful, proportionate shape.

**The Technique**
Dr. Sumit generally uses the **Superomedial Pedicle** technique, which preserves nipple sensation and allows for breastfeeding in many cases.

#### Results
*   **Physical relief:** Immediate alleviation of shoulder strain.
*   **Aesthetic:** Lighter, perkier breasts that fit better in clothing.

#### Cost
The cost varies by size and complexity but includes all hospital and anesthesia fees.
`
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
    gallery: ["/body-contouring-result-1.jpg", "/body-contouring-result-2.png"],
    seoContent: `
### Gynecomastia Surgery in Chandigarh: Masculine Chest Contouring

**Effective Treatment for Male Breast Enlargement (Man Boobs)**

Gynecomastia is a common condition affecting men of all ages, often causing significant embarrassment. It is characterized by the overdevelopment of breast tissue (gland) and/or excess fat. Diet and exercise often fail to resolve true glandular gynecomastia.

**The Surgical Solution**
Dr. Sumit Singh Gautam employs a "Stealth Incision" technique.
1.  **Liposuction:** To remove fatty tissue and contour the chest wall.
2.  **Gland Excision:** Direct removal of the firm glandular disk through a tiny Areolar incision.

#### Why Dr. Sumit?
*   **Board Certified Plastic Surgeon:** Expertise in hiding scars and preventing "crater" deformities.
*   **Sector 34 Location:** Conveniently located at Healing Hospital for all Tricity residents.

#### Cost of Gynecomastia Surgery in Chandigarh
The procedure is an investment in regained confidence. Costs include OT charges, anesthesia, and post-op care.
*   **Affordable Quality:** We offer competitive pricing without compromising on the hospital hygiene and safety standards.

#### Recovery Time
*   **Return to Work:** Most men return to lighter office duties within 3-4 days.
*   **Gym:** Chest workouts can resume after 4 weeks.
*   **Results:** Visible immediately, with final skin tightening over 3 months.

See our **Before and After Gallery** for examples of restored masculine contours.
    `
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
    gallery: ["/scar-revision-fat-grafted.jpg", "/keloid-excision-result.jpg", "/scar-revision-result-2.jpg"],
    seoContent: `
### Scar Revision in Chandigarh: Erasing Trauma
**Surgical & Laser Solutions for Scars**

Scars from accidents, previous surgeries, or burns can be stigmatizing. While no scar can be removed completely, "Revision" can make them significantly less visible.

**Approaches:**
*   **Surgical Excision:** Removing a wide/bad scar and closing it with fine plastic surgery techniques (Geometric Broken Line Closure / Z-plasty).
*   **Fat Grafting:** To improve the color and texture of depressed scars.
*   **Laser/Microneedling:** For surface texture blending.

#### Keloids
We have a specialized protocol for Keloids, combining surgical removal with immediate steroid injections to prevent recurrence.
`
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
    regions: ["Face", "Eyes", "Neck"],
    seoContent: `
### Botox in Chandigarh: The Art of Subtlety
**Erase Lines, Keep Your Expressions**

Botox (Botulinum Toxin) is the world's most popular non-surgical treatment. In the hands of a Plastic Surgeon, it is a tool for artistic shaping, not just paralyzing. Dr. Sumit ensures you look rested, not "frozen".

**Target Areas:**
*   **Dynamic Lines:** Forehead furrows, frown lines (11s), and Crow's feet.
*   **Facial Slimming:** Treating the Masseter muscles to slim a square jawline.
*   **Excess Sweating:** Hyperhidrosis treatment for underarms and palms.

#### Safety
We use only authentic Allergan Botox or Dysport, opened in front of you. Results last 3-4 months.
`
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
    regions: ["Face", "Body"],
    seoContent: `
### Microneedling in Chandigarh: Collagen Induction
**Dermapen 4 Treatment for Acne Scars & Texture**

Microneedling creates thousands of microscopic channels in the skin, triggering the body's natural wound-healing response. This generates new collagen and elastin.

**Why Choose It?**
*   **Acne Scars:** Reduces the depth of boxcar and rolling scars.
*   **Pores:** Tightens enlarged pores.
*   **Rejuvenation:** Combined with PRP (Vampire Facial) for maximum glow.

#### Downtime
Redness lasts 24-48 hours, similar to a sunburn. It is safe for all skin types.
`
  },
  {
    id: "chemical-peeling",
    title: "Chemical Peeling",
    category: "Non-Surgical",
    parentCategory: "non-surgical",
    description: "Advanced skin resurfacing for clarity and tone.",
    longDescription: "Carefully calibrated chemical solutions to exfoliate the skin's outer layers, addressing uneven pigmentation and refining texture.",
    image: "/chemical-peel-non-surgical.png",
    seoContent: `
### Chemical Peels in Chandigarh: Reveal New Skin
**Customized Medical Grade Peels**

Unlike salon facials, medical peels penetrate deeper to remove damaged outer skin layers. Dr. Sumit customizes the acid blend (Glycolic, Salicylic, TCA, or Yellow Peel) based on your skin concern.

**Treatable Conditions:**
*   **Pigmentation:** Melasma and sun spots.
*   **Active Acne:** Salicylic peels dry out active breakouts.
*   **Glow:** Party peels for instant radiance with zero peeling.

#### Safety
Medical supervision ensures no risk of burns or hyperpigmentation.
`,
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
    regions: ["Face", "Nose", "Eyes", "Lips", "Neck"],
    seoContent: `
### Dermal Fillers in Chandigarh: Liquid Facelift
**Restoring Volume & Contour Instantly**

Aging is essentially loss of volume (fat and bone). Hyaluronic Acid (HA) fillers replace this lost structure. Dr. Sumit uses fillers like an artist uses clay—to lift, project, and refine.

**Key Areas:**
*   **Tear Troughs:** Removing the "tired" look under eyes.
*   **Cheeks:** Restoring the "Og-curve" of youth.
*   **Lips:** Definition and hydration (Russian Lips or Natural Plump).
*   **Jawline:** Creating a sharp, defined profile.

#### Longevity
Depending on the product (Juvederm/Restylane) and area, results last 9-18 months.
`
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
    regions: ["Body", "Arms", "Thighs"],
    seoContent: `
### Microvascular Surgery in Chandigarh: Saving Limbs
**Advanced Reconstructive Microsurgery at Healing Hospital**

Microvascular surgery involves joining blood vessels and nerves as thin as a hair under high-magnification microscopes. This capability allows us to perform free flaps—transplanting tissue from one part of the body to another to cover complex open wounds (after trauma or cancer).

**Critical for:**
*   Saving crushed limbs.
*   Reconstucting faces after cancer surgery.
*   Restoring severed fingers (Replantation).
`
  },
  {
    id: "traumatic-reconstruction",
    title: "Traumatic Reconstruction",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Restoring form and function after major injury.",
    longDescription: "Complex surgical pathways to rebuild tissue and function following severe physical trauma.",
    image: "/traumatic-reconstructive.png",
    seoContent: `
### Trauma Reconstruction in Chandigarh
**Restoring Form After Accident or Injury**

Accidents can leave devastating physical and psychological scars. Our Reconstructive unit at Healing Hospital works 24/7 to treat maxillo-facial injuries, soft tissue loss, and compound fractures.

**Goal:**
Our priority is "Function First, Aesthetics Always." We aim to restore your body to its pre-injury state with minimal scarring.
`,
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
    regions: ["Face", "Nose", "Eyes"],
    seoContent: `
### Facial Fracture Surgery in Chandigarh
**Maxillofacial Surgery Excellence**

Fractures of the jaw (mandible), cheek (zygoma), or eye socket (orbit) require precise fixation with titanium plates. Malignment can lead to double vision or bite issues.

**Why a Plastic Surgeon?**
We access these fractures through "hidden" incisions (inside the mouth or eyelid) to ensure no visible scarring on your face.
`
  },
  {
    id: "nerve-vessel-tendon-repair",
    title: "Nerve / Vessel / Tendon Repair",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Immediate and delayed restoration of extremities.",
    longDescription: "Precise repair of essential structural components to restore function to hands and limbs.",
    image: "/nerve-repair-reconstructive.png",
    seoContent: `
### Nerve & Tendon Repair in Chandigarh
**Restoring Hand Function**

Cut tendons or nerves in the hand can lead to permanent paralysis if not repaired immediately. We use microsurgical sutures to reconnect these vital structures.

**Rehabilitation:**
Surgery is only half the battle. Our dedicated physiotherapy protocol ensures your hand returns to full strength and mobility.
`,
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
    regions: ["Face", "Lips"],
    seoContent: `
### Cleft Lip & Palate Surgery in Chandigarh
**Creating Smiles for Children**

Cleft Lip is one of the most common birth defects. Dr. Sumit is passionate about restoring the smiles of these children.

**Timeline:**
*   **Cleft Lip:** Repaired at 3-6 months of age.
*   **Cleft Palate:** Repaired at 9-12 months (before speech develops).

**Technique:**
We focus on rebuilding the lip muscle loop to ensure normal movement and a symmetrical pout.
`
  },
  {
    id: "burns-contracture",
    title: "Burns & Contracture Release",
    category: "Reconstructive",
    parentCategory: "reconstructive",
    description: "Restoring mobility after burn injuries.",
    longDescription: "Release of tight scar tissue and skin grafting to restore full joint flexibility.",
    image: "/burns-contracture-reconstructive.png",
    seoContent: `
### Burn Reconstruction in Chandigarh
**Post-Burn Deformity Correction**

Burns can lead to contractures—tight scars that restrict joint movement. We specialize in releasing these contractures using Z-plasties and skin grafts to restore range of motion.

**Acute Burns:**
We also manage fresh burns with advanced dressings and early grafting to minimize scarring from the start.
`,
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
    seoContent: `
### Diabetic Foot Management in Chandigarh
**Preventing Amputation through Reconstruction**

Non-healing diabetic ulcers often put limbs at risk. We work as a team with endocrinologists and vascular surgeons to improve blood flow and cover wounds with hardy flaps.

**Limb Salvage:**
Our goal is always to save the foot and maintain your mobility.
`,
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
