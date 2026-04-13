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
    schemaType?: 'MedicalBusiness' | 'Physician' | 'MedicalProcedure' | 'Article' | 'FAQPage';
    procedureName?: string;
    articleDate?: string;
    faqs?: { question: string; answer: string[] }[];
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = '/dr-sumit-portrait.webp',
    url,
    type = 'website',
    schemaType = 'MedicalBusiness',
    procedureName,
    articleDate,
    faqs
}) => {
    const siteTitle = title ? `${title} | Dr. Sumit Aesthetics` : "Dr. Sumit - Plastic & Aesthetic Surgeon in Chandigarh | Sector 34";
    const metaDescription = description || "Dr. Sumit Singh Gautam is a Board Certified Plastic Surgeon specializing in high-definition body sculpting, facial aesthetic surgery, and reconstructive procedures in Chandigarh.";
    const siteUrl = url ? `https://drsumitaesthetics.com${url}` : 'https://drsumitaesthetics.com';
    const absoluteImage = image.startsWith('http') ? image : `https://drsumitaesthetics.com${image.startsWith('/') ? '' : '/'}${image}`;

    const buildSchema = () => {
        const physicianSchema = {
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": "Dr. Sumit Singh Gautam",
            "image": "https://drsumitaesthetics.com/dr-sumit-portrait.webp",
            "medicalSpecialty": "Plastic Surgery",
            "affiliation": {
                "@type": "MedicalOrganization",
                "name": "Healing Hospital",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chandigarh",
                    "addressRegion": "Punjab",
                    "postalCode": "160022"
                }
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Healing Hospital, SCO 18-19, Sector 34-A",
                "addressLocality": "Chandigarh",
                "addressRegion": "Punjab",
                "postalCode": "160022",
                "addressCountry": "IN"
            },
            "telephone": CONTACT.counselorPhone,
            "priceRange": "$$$",
            "url": "https://drsumitaesthetics.com"
        };

        if (schemaType === 'Article') {
            return {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": procedureName || title || "Dr. Sumit Aesthetics",
                "image": absoluteImage,
                "url": siteUrl,
                "datePublished": articleDate || new Date().toISOString(),
                "author": {
                    "@type": "Person",
                    "name": "Dr. Sumit Singh Gautam",
                    "url": "https://drsumitaesthetics.com/about"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Dr. Sumit Aesthetics",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://drsumitaesthetics.com/dr-sumit-profile.webp"
                    }
                },
                "description": metaDescription
            };
        }

        if (schemaType === 'FAQPage' && faqs) {
            return {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer.join(' ')
                    }
                }))
            };
        }

        // Default or procedure-specific schema
        return {
            "@context": "https://schema.org",
            "@id": siteUrl,
            "url": siteUrl,
            "@type": schemaType,
            "name": procedureName || "Dr. Sumit Aesthetics",
            "image": absoluteImage,
            "logo": "https://drsumitaesthetics.com/dr-sumit-profile.webp",
            "medicalSpecialty": "Plastic Surgery",
            "provider": physicianSchema,
            ...(schemaType !== 'MedicalProcedure' && {
                "telephone": CONTACT.counselorPhone,
                "priceRange": "$$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Healing Hospital, SCO 18-19, Sector 34-A",
                    "addressLocality": "Chandigarh",
                    "addressRegion": "Punjab",
                    "postalCode": "160022",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 30.7225,
                    "longitude": 76.7681
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
                    "https://healinghospital.co.in/best-plastic-cosmetic-surgeon-chandigarh/",
                    "https://www.instagram.com/dr.sumitsgautam/"
                ]
            })
        };
    };

    const baseSchema = buildSchema();

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
            <meta property="og:image" content={absoluteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={absoluteImage} />

            {/* Canonical */}
            <link rel="canonical" href={siteUrl} />

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(baseSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
