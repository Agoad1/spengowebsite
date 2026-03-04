import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Spengo - AI-Powered Web Design & Automation',
    description: 'Explore our tiered services from foundation websites to full business automation and custom AI builds.',
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
