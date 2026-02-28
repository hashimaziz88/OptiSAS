import { createStyles, css } from "antd-style";
import { SHARED_STYLES } from '@/components/dashboard/shared/commonStyles';

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    padding: 0;
  `,

  modalHeader: css`
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 24px;
    margin-bottom: 0;
  `,

  modalBody: css`
    padding: 24px;
  `,

  pageHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `,

  pageTitle: css`
    &.ant-typography {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
  `,

  filterBar: css`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
  `,

  searchInput: css`
    max-width: 260px;
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.12);
    color: white;

    &:hover,
    &:focus-within {
      border-color: ${token.colorPrimary};
      background: rgba(255, 255, 255, 0.05) !important;
    }
  `,

  filterSelect: css`
    min-width: 160px;

    &:hover .ant-select-selector,
    &.ant-select-focused .ant-select-selector {
      border-color: ${token.colorPrimary} !important;
    }
  `,

  table: css``,

  statusBadge: css`
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  `,

  activeBadge: css`
    background: rgba(82, 196, 26, 0.15);
    color: #52c41a;
    border: 1px solid rgba(82, 196, 26, 0.3);
  `,

  inactiveBadge: css`
    background: rgba(255, 77, 79, 0.15);
    color: #ff4d4f;
    border: 1px solid rgba(255, 77, 79, 0.3);
  `,

  modal: css``,

  formBody: css`
    padding-top: 8px;
  `,

  formFooter: css`
    margin-bottom: 0;
    margin-top: 8px;
  `,

  formFooterActions: css`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  `,

  refreshButton: css`
    color: #8c8c8c;
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
  `,

  statsRow: css`
    margin-bottom: 24px;
  `,

  statLabel: css`
    color: #8c8c8c;
  `,

  statContacts: css`
    color: #60a5fa;
  `,

  statOpportunities: css`
    color: #34d399;
  `,

  drawerActions: css`
    margin-top: 24px;
    display: flex;
    gap: 8px;
  `,

  drawerBody: css`
    .ant-statistic-title {
      color: #8c8c8c;
    }

    .ant-statistic-content {
      color: #e2e8f0;
    }
  `,

  drawerHeader: css``,

  viewAction: css`${SHARED_STYLES.viewAction}`,

  editAction: css`${SHARED_STYLES.editAction}`,

  deleteAction: css`${SHARED_STYLES.deleteAction}`,

  activateAction: css`
    color: #34d399;
  `,

  clientNameLink: css`
    padding: 0;
    color: #60a5fa;
    font-weight: 600;
  `,

  fullWidth: css`${SHARED_STYLES.fullWidth}`,

  drawerTagRow: css`${SHARED_STYLES.drawerTagRow}`,

  descriptionsSection: css`${SHARED_STYLES.descriptionsSection}`,
}));
