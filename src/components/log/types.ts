export type PostEntry = {
  id: number;
  type: 'post';
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export type BookEntry = {
  id: number;
  type: 'book';
  title: string;
  author: string;
  quote: string;
  thought: string;
  date: string;
};

export type DrawingEntry = {
  id: number;
  type: 'drawing';
  title: string;
  date: string;
  bg: string;
  sketchLines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
};

export type LogEntry = PostEntry | BookEntry | DrawingEntry;

export type LogFilterTag = 'all' | 'post' | 'book' | 'drawing';
