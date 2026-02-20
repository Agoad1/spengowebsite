import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Spengo | AI-Powered Web Design & Conversion Optimization | Cincinnati & Cleveland, OH',
    description: 'We build fast, modern websites that convert visitors into customers. AI-optimized web design, free audits, and conversion-focused development. Based in Cincinnati & Cleveland, Ohio. Serving businesses nationwide.',
    keywords: ['web design', 'website development', 'conversion optimization', 'AI web design', 'Cincinnati web design', 'Cleveland web design', 'Ohio web design', 'website audit', 'CRO', 'landing page optimization'],
    authors: [{ name: 'Spengo Technologies' }],
    openGraph: {
        title: 'Spengo | We Make It Easy For Your Website Visitors To Convert',
        description: 'Fast, modern websites that convert. Free audit included. Based in Ohio, serving businesses nationwide.',
        url: 'https://spengowebsite.vercel.app',
        siteName: 'Spengo',
        locale: 'en_US',
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Spengo | AI-Powered Web Design That Converts',
        description: 'We build fast, modern websites that convert visitors into customers. Free audit included.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://spengowebsite.vercel.app',
    },
};

export const viewport = {
    themeColor: '#0a0a0a',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            "name": "Spengo Technologies",
                            "description": "AI-powered web design and conversion optimization agency",
                            "url": "https://spengowebsite.vercel.app",
                            "email": "adamgoad22@gmail.com",
                            "telephone": "586-909-0660",
                            "areaServed": [
                                { "@type": "City", "name": "Cincinnati", "addressRegion": "OH" },
                                { "@type": "City", "name": "Cleveland", "addressRegion": "OH" },
                                { "@type": "Country", "name": "US" }
                            ],
                            "address": [
                                {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Cincinnati",
                                    "addressRegion": "OH",
                                    "addressCountry": "US"
                                },
                                {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Cleveland",
                                    "addressRegion": "OH",
                                    "addressCountry": "US"
                                }
                            ],
                            "priceRange": "$500 - $1500",
                            "serviceType": ["Web Design", "Web Development", "Conversion Optimization", "Website Audit", "AI Optimization"],
                        })
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Why don't you do discovery calls?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Because a clear form gets us the same info in less time. We review your details, scope the project properly, and send you a direct plan."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How long does a project take?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Most technical builds take 2-4 weeks. Design-only upgrades can be faster. You'll get a guaranteed timeline in your fixed-price proposal."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What if I already have a website?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "We audit your current build, identify where you're losing customers, and refactor it into a site that actually performs."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Do you write the copy too?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "We provide copywriting direction and structural engineering. If you need full, high-conversion copy, we can scope that into your customized project plan."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "What's the AI optimization exactly?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "AI tools like ChatGPT and Perplexity are replacing traditional Google searches. We structure your site data so it's proof-driven, semantically clear, and easy for both humans and AI to recommend."
                                    }
                                }
                            ]
                        })
                    }}
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
