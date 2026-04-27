'use client';

import { useEffect } from 'react';

const WORK_CURSOR_DEFAULT = 'url("/bumblebee_cursor_work_v3.png") 27 27, auto';
const WORK_CURSOR_POINTER = 'url("/bumblebee_cursor_work_v3.png") 27 27, pointer';

export default function WorkCursorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const el = document.documentElement;
    const prevDefault = el.style.getPropertyValue('--cursor-default');
    const prevPointer = el.style.getPropertyValue('--cursor-pointer');

    el.style.setProperty('--cursor-default', WORK_CURSOR_DEFAULT);
    el.style.setProperty('--cursor-pointer', WORK_CURSOR_POINTER);

    return () => {
      if (prevDefault) el.style.setProperty('--cursor-default', prevDefault);
      else el.style.removeProperty('--cursor-default');

      if (prevPointer) el.style.setProperty('--cursor-pointer', prevPointer);
      else el.style.removeProperty('--cursor-pointer');
    };
  }, []);

  return children;
}

