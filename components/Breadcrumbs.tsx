import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Breadcrumb {
    name: string;
    path: string;
}

interface BreadcrumbsProps {
    items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const location = useLocation();
    const domain = "https://drsumitaesthetics.com"; // Adjust if needed

    // Schema.org BreadcrumbList payload
    const schemaList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": domain
            },
            ...items.map((item, idx) => ({
                "@type": "ListItem",
                "position": idx + 2,
                "name": item.name,
                "item": `${domain}${item.path}`
            }))
        ]
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schemaList)}
                </script>
            </Helmet>

            <nav aria-label="breadcrumb" className="w-full flex items-center text-sm font-light text-zinc-400 py-3 mb-4 overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-gold-500 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-gold-500 rounded">
                    <Home className="w-3.5 h-3.5" />
                    <span className="sr-only">Home</span>
                </Link>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <React.Fragment key={item.path}>
                            <ChevronRight className="w-3.5 h-3.5 mx-1.5 flex-shrink-0 text-zinc-600" />
                            {isLast ? (
                                <span className="text-zinc-200 capitalize" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="hover:text-gold-500 transition-colors capitalize focus:outline-none focus:ring-1 focus:ring-gold-500 rounded"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </nav>
        </>
    );
};

export default Breadcrumbs;
