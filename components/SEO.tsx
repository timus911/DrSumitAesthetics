import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND, CONTACT } from '../constants';

interface BreadcrumbItem {
    name: string;
    item: string;
}

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    schemaType?: 'MedicalBusiness' | 'Physician' | 'MedicalProcedure' | 'Article' | 'FAQPage' | 'Reviews' | 'HowTo';
    procedureName?: string;
    articleDate?: string;
    faqs?: { question: string; answer: string[] }[];
    ratingValue?: number;
    reviewCount?: number;
    breadcrumbs?: BreadcrumbItem[];
    howToSteps?: { name: string; text: string }[];
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
    faqs,
    ratingValue = 4.9,
    reviewCount = 524,
    breadcrumbs,
    howToSteps
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
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": ratingValue,
                "reviewCount": reviewCount
            },
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
            "url": "https://drsumitaesthetics.com"
        };

        const breadcrumbSchema = breadcrumbs ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://drsumitaesthetics.com${crumb.item}`
            }))
        } : null;

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

        if (schemaType === 'HowTo' && howToSteps) {
            return {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": `Recovery Guide: ${procedureName}`,
                "step": howToSteps.map((step, index) => ({
                    "@type": "HowToStep",
                    "position": index + 1,
                    "name": step.name,
                    "text": step.text
                }))
            };
        }

        // Default or complex medical schema
        const base = {
            "@context": "https://schema.org",
            "@id": siteUrl,
            "url": siteUrl,
            "@type": schemaType === 'Reviews' ? 'MedicalBusiness' : schemaType,
            "name": procedureName || "Dr. Sumit Aesthetics",
            "image": absoluteImage,
            "logo": "https://drsumitaesthetics.com/dr-sumit-profile.webp",
            "medicalSpecialty": "Plastic Surgery",
            "provider": physicianSchema,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": ratingValue,
                "reviewCount": reviewCount
            },
            ...(schemaType !== 'MedicalProcedure' && {
                "telephone": CONTACT.counselorPhone,
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
                "sameAs": [
                    "https://healinghospital.co.in/best-plastic-cosmetic-surgeon-chandigarh/",
                    "https://www.instagram.com/dr.sumitsgautam/"
                ]
            })
        };

        return breadcrumbSchema ? [base, breadcrumbSchema] : base;
    };

    const baseSchema = buildSchema();

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={keywords || "best plastic surgeon chandigarh, cosmetic surgeon india, dr sumit singh gautam, liposuction chandigarh, rhinoplasty india"} />

            {/* Open Graph */}
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

            <link rel="canonical" href={siteUrl} />

            <script type="application/ld+json" data-rh="true">
                {JSON.stringify(baseSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
