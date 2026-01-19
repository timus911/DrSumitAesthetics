import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { PROCEDURES } from '../constants.ts';
import ProcedureCard from '../components/ProcedureCard.tsx';

// Default hints for all procedures to ensure no gaps
const DEFAULT_HINTS: Record<string, string> = {
    'facelift-chandigarh': "MACS techniques to restore the structural foundation of the face.",
    'neck-lift-chandigarh': "Tightening the deep platysma muscle to sharpen the jawline.",
    'lip-lift-chandigarh': "Shortening the philtrum to reveal tooth show and restore youthful lip proportions.",
    'hair-transplant-chandigarh': "Restoring hairline density with natural, surgeon-designed artistry.",
    'blepharoplasty-chandigarh': "Refining the eyelids to remove tiredness and open up the gaze.",
    'rhinoplasty-nose-job-chandigarh': "Balancing the central feature of the face to harmonize with your other features.",
    'otoplasty-chandigarh': "Correcting ear prominence to improve facial balance.",
    'fat-grafting-chandigarh': "Restoring lost volume with your own tissue for soft, natural fullness.",
    'liposuction-chandigarh': "Precision sculpting to reveal underlying muscular definition.",
    'tummy-tuck-chandigarh': "Restoring the abdominal core by repairing muscles and removing excess skin.",
    'body-contouring-chandigarh': "Comprehensive reshaping of the silhouette after weight loss.",
    'buttock-lift-chandigarh': "Elevation and tightening of the posterior contour.",
    'breast-augmentation-chandigarh': "Enhancing volume and shape for a balanced silhouette.",
    'breast-reduction-chandigarh': "Alleviating discomfort and reshaping the profile.",
    'breast-lift-chandigarh': "Restoring elevation and firmness to sagging tissue.",
    'gynecomastia-surgery-chandigarh': "Restoring a masculine chest contour.",
    'vaginoplasty-chandigarh': "Restoring intimate tone and function.",
    'labiaplasty-chandigarh': "Refining intimate contours for comfort and aesthetics.",
    'botox-chandigarh': "Softening dynamic lines and wrinkles for a refreshed, rested look.",
    'microneedling-chandigarh': "Stimulating natural collagen production to improve texture and scars.",
    'chemical-peeling': "Exfoliating damaged skin layers to reveal a brighter, smoother complexion.",
    'dermal-fillers': "Instantly restoring lost volume and contouring facial features.",
    'varicose-veins-chandigarh': "Treating visible veins for improved leg health and aesthetics.",
    'vascular-surgery-chandigarh': "Specialized vascular access and care.",
    'scar-revision-chandigarh': "Improving the appearance of surgical or traumatic scars for smoother texture."
};

// Region-specific overrides where context changes significantly
const REGION_SPECIFIC_HINTS: Record<string, Record<string, string>> = {
    Face: {
        'facelift-chandigarh': "MACS techniques to restore the structural foundation of the face, correcting jowls and midface sagging.",
        'liposuction-chandigarh': "Removing submental fat (double chin) to define the jawline."
    },
    Nose: {
        'fat-grafting-chandigarh': "Micro-droplet grafting to smooth minor irregularities or camouflage depressions."
    },
    Eyes: {
        'fat-grafting-chandigarh': "Nanofat grafting to treat dark circles and hollows."
    },
    Ears: {
        'otoplasty-chandigarh': "Reshaping the cartilage to 'pin back' prominent ears for a natural look.",
        'fat-grafting-chandigarh': "Rejuvenating thinning earlobes to allow for better earring support."
    },
    Lips: {
        'fat-grafting-chandigarh': "Adding natural volume to thin lips using your own tissue."
    },
    Neck: {
        'liposuction-chandigarh': "Sculpting the neck by removing excess fat deposits under the chin."
    },
    Buttock: {
        'fat-grafting-chandigarh': "Using your own fat to add projection and roundness (BBL)."
    },
    Thighs: {
        'liposuction-chandigarh': "Refining the inner and outer thighs to create a slimmer silhouette."
    },
    Arms: {
        'liposuction-chandigarh': "Debulking heavy arms to reveal muscle tone."
    }
};

const ConcernDetail: React.FC = () => {
    const { region } = useParams<{ region: string }>();

    // Normalize region for comparison if needed, though exact match is expected from Links
    const filteredProcedures = PROCEDURES.filter(p =>
        p.regions?.includes(region || "") &&
        p.parentCategory !== 'reconstructive'
    );

    return (
        <div className="pt-52 pb-32">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24 space-y-8"
                >
                    <span className="text-[#5DA9E9] text-[10px] tracking-[0.4em] uppercase font-bold">Region Focus</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-none text-white">{region}</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
                    {filteredProcedures.length > 0 ? (
                        filteredProcedures.map((proc, idx) => {
                            // Logic: Look for specific override, fallback to default, fallback to nothing
                            const specificHint = region && REGION_SPECIFIC_HINTS[region]?.[proc.id];
                            const defaultHint = DEFAULT_HINTS[proc.id];
                            const hintText = specificHint || defaultHint;

                            return (
                                <div key={proc.id} className="h-full">
                                    <ProcedureCard proc={proc} index={idx} hint={hintText} hideDescription={true} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-32 text-center glass border border-white/5">
                            <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">No specific procedures listed for this region yet.</p>
                            <Link to="/contact" className="inline-block mt-8 text-[#5DA9E9] text-xs uppercase tracking-widest hover:text-white transition-colors">
                                Contact for specific inquiry
                            </Link>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
};

export default ConcernDetail;
