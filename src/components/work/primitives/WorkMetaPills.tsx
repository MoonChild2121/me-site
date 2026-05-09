import Pill from '@/components/common/Pill/Pill';
import WorkPillList from '@/components/common/Pill/WorkPillList';
import { splitMetaLine } from '../utils';

type WorkMetaPillsProps = {
  meta: string;
  'aria-label'?: string;
  sentence?: boolean;
  listClassName?: string;
};

export default function WorkMetaPills({
  meta,
  'aria-label': ariaLabel = 'Stack and tools',
  sentence,
  listClassName,
}: WorkMetaPillsProps) {
  const items = splitMetaLine(meta);
  const variant = sentence ? 'workSentence' : 'work';

  return (
    <WorkPillList className={listClassName} aria-label={ariaLabel}>
      {items.map((t) => (
        <li key={t}>
          <Pill as="span" variant={variant}>
            {t}
          </Pill>
        </li>
      ))}
    </WorkPillList>
  );
}
