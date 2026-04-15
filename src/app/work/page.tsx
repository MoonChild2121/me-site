import PageShell from '@/components/layout/PageShell';
import WorkContainer from '@/containers/work/workContainer';

export const metadata = {
  title: 'Work'
};

export default function WorkPage() {
  return (
    <PageShell>
      <WorkContainer />
    </PageShell>
  );
}

