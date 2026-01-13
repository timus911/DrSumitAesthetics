import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND, CONTACT } from '../constants';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = '/dr-sumit-portrait.jpg', // Default image
    url,
    type = 'website'
}) => {
    const siteTitle = title ? `${title} | Dr. Sumit Aesthetics` : "Best Plastic Surgeon in Chandigarh | Dr. Sumit Aesthetics | Sector 34";
    const metaDescription = description || "Dr. Sumit Singh Gautam is a Board Certified Plastic Surgeon specializing in high-definition body sculpting, facial aesthetic surgery, and reconstructive procedures in Chandigarh.";
    const siteUrl = url ? `https://drsumitaesthetics.com${url}` : 'https://drsumitaesthetics.com';

    // Parse address from constants or hardcode for Schema precision
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Dr. Sumit Aesthetics",
        "alternateName": "Dr. Sumit Singh Gautam - Plastic Surgeon",
        "image": image.startsWith('http') ? image : `https://drsumitaesthetics.com${image}`,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": CONTACT.phone,
        "priceRange": "$$",
        "medicalSpecialty": ["PlasticSurgery", "CosmeticSurgery"],
        "parentOrganization": {
            "@type": "MedicalOrganization",
            "name": "Healing Hospital",
            "address": "SCO 18-19, Sector 34-A, Chandigarh"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Healing Hospital, SCO 18-19, Sector 34-A", // Exact match to user request
            "addressLocality": "Chandigarh",
            "addressRegion": "Chandigarh",
            "postalCode": "160022",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 30.7276,
            "longitude": 76.7667
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "department": {
            "@type": "Physician",
            "name": BRAND.name,
            "medicalSpecialty": "Plastic Surgery"
        },
        "sameAs": [
            CONTACT.social.instagram,
            CONTACT.social.linkedin,
            "https://www.facebook.com/drsumitsinghgautam"
        ]
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={keywords || "best plastic surgeon chandigarh, cosmetic surgeon india, dr sumit singh gautam, liposuction chandigarh, rhinoplasty india, aesthetic surgery, hair transplant chandigarh, tummy tuck india, breast implant surgeon"} />

            {/* Local SEO / Geo Tags */}
            <meta name="geo.region" content="IN-CH" />
            <meta name="geo.placename" content="Chandigarh" />
            <meta name="geo.position" content="30.7276;76.7667" />
            <meta name="ICBM" content="30.7276, 76.7667" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={siteUrl} />

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;
