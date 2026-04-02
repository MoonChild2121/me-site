import styles from './Home.module.css';

export function useHomeStyles() {
  return {
    hero: styles.hero,
    kicker: styles.kicker,
    heading: styles.heading,
    line: styles.line,
    italic: styles.italic,
    body: styles.body,
    right: styles.right
  };
}

