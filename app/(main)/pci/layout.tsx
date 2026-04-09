import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DIGI-PHARMed Admin Portal | Pharmacy Council of India',
};

export default function PCILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
