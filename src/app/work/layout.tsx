import type { ReactNode } from 'react';
import WorkCursorProvider from './WorkCursorProvider';

export default function WorkLayout({ children }: { children: ReactNode }) {
  return <WorkCursorProvider>{children}</WorkCursorProvider>;
}

