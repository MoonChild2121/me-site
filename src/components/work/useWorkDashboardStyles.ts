import { useMemo } from 'react';

import styles from './WorkDashboard.module.css';

export function useWorkDashboardStyles() {
  return useMemo(
    () => ({
      layout: styles.layout,
      sidebar: styles.sidebar,
      sidebarNav: styles.sidebarNav,
      sidebarLink: styles.sidebarLink,
      sidebarLinkActive: styles.sidebarLinkActive,
      main: styles.main,
      screen: styles.screen,
      screenScroller: styles.screenScroller,
      topControls: styles.topControls,
      controlsRow: styles.controlsRow,
      activeTitle: styles.activeTitle,
      controlsActions: styles.controlsActions,
      buttonLink: styles.buttonLink,
      pageEnter: styles.pageEnter,
      contentEnter: styles.contentEnter,
      sectionFrame: styles.sectionFrame,
      sectionFrameCenter: styles.sectionFrameCenter,
      sectionLeaving: styles.sectionLeaving,
      sectionEntering: styles.sectionEntering,
      section: styles.section,
      sectionBody: styles.sectionBody,
      body: styles.body,
      list: styles.list,
      item: styles.item,
      itemHeader: styles.itemHeader,
      itemTitle: styles.itemTitle,
      itemMeta: styles.itemMeta,
      bullets: styles.bullets,
      featuredPanel: styles.featuredPanel,
      pubLink: styles.pubLink,
      emptyState: styles.emptyState,
    }),
    []
  );
}
