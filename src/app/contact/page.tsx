import PageShell from '@/components/layout/PageShell';
import ContactContainer from '@/containers/contact/contactContainer';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactContainer />
    </PageShell>
  );
}
