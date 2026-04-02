import { useHomeStyles } from './useHomeStyles';

export default function Home() {
  const s = useHomeStyles();

  return (
    <section className={s.hero} aria-label="Introduction">
      <div>
        <div className={s.kicker}>Frontend Engineer &amp; Visual Chronicler</div>

        <h1 className={s.heading}>
          <span className={s.line}>Digital</span>
          <span className={s.line}>Precision,</span>
          <span className={`${s.line} ${s.italic}`}>Analog Soul.</span>
        </h1>

        <p className={s.body}>
          Building uncompromising web experiences with a focus on tactile interaction and
          architectural clarity. Currently engineering at the intersection of code and craft.
        </p>
      </div>

      <div className={s.right} aria-hidden>
        ✨
      </div>
    </section>
  );
}

