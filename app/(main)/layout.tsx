import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'DIGI-PHARMed Admin Portal | Pharmacy Council of India',
    description: 'PCI Admin Portal — 22-module governance platform for pharmacy institution compliance, inspection, and registration management.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'PrimeReact Atlantis-REACT',
        url: 'https://www.primefaces.org/Atlantis-react',
        description: 'PCI Admin Portal — 22-module governance platform for pharmacy institution compliance, inspection, and registration management.',
        images: ['https://www.primefaces.org/static/social/Atlantis-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <Layout>{children}</Layout>;
}
