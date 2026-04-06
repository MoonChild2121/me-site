import styles from './SiteFooter.module.css';

export function useFooterStyles() {
  return {
    footer: styles.footer,
    inner: styles.inner,
    copy: styles.copy,
    links: styles.links,
    link: styles.link,
    linkIcon: styles.linkIcon,
    linkLabel: styles.linkLabel
  };
}

