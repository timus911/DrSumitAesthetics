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
    const siteTitle = `${title ? `${title} | ` : ''}${BRAND.name} - ${BRAND.specialty}`;
    const metaDescription = description || "Dr. Sumit Singh Gautam is a Board Certified Plastic Surgeon specializing in high-definition body sculpting, facial aesthetic surgery, and reconstructive procedures in Chandigarh.";
    const siteUrl = url ? `https://drsumitaesthetics.com${url}` : 'https://drsumitaesthetics.com'; // Placeholder domain

    // Structured Data for Local Business / Physician
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Physician",
        "name": BRAND.name,
        "image": image,
        "@id": siteUrl,
        "url": siteUrl,
        "telephone": CONTACT.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Healing Hospital, Sector 34 A",
            "addressLocality": "Chandigarh",
            "addressRegion": "Chandigarh",
            "postalCode": "160022",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 30.7276, // Approximate coords for Sec 34 Chandigarh
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
        "sameAs": [
            CONTACT.social.instagram,
            CONTACT.social.linkedin
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
