import PageShell from '@/components/layout/PageShell';
import LogContainer from '@/containers/log/logContainer';

export const metadata = {
  title: 'Log',
};

export default function LogPage() {
  return (
    <PageShell>
      <LogContainer />
    </PageShell>
  );
}
