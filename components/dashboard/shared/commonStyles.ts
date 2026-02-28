/**
 * Shared CSS constants for dashboard components.
 * Interpolate into `css` template literals inside createStyles:
 *   viewAction: css`${SHARED_STYLES.viewAction}`,
 */
export const SHARED_STYLES = {
  // Table action button colours
  viewAction: "color: #60a5fa;",
  editAction: "color: #facc15;",
  deleteAction: "color: #f87171;",

  // Common layout helpers
  fullWidth: "width: 100%;",

  // Drawer detail section spacing
  drawerTagRow: "margin-bottom: 20px;",
  descriptionsSection: "margin-bottom: 24px;",
} as const;
