export type Entry = {
  id: string;
  title: string;
  type: 'note' | 'sketch' | 'video' | 'book' | 'idea';
  date: string;
  preview: string;
  content?: string;
};

