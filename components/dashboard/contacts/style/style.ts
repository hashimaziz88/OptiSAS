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
    min-width: 200px;

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

  primaryBadge: css`
    background: rgba(250, 173, 20, 0.15);
    color: #faad14;
    border: 1px solid rgba(250, 173, 20, 0.3);
  `,

  modal: css``,

  formBody: css`
    padding-top: 8px;
  `,

  formRow: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 16px;
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

  drawerActions: css`
    margin-top: 24px;
    display: flex;
    gap: 8px;
  `,

  avatarCell: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,

  avatarLabel: css`
    font-weight: 600;
    color: #e2e8f0;
    cursor: pointer;
    &:hover {
      color: #60a5fa;
    }
  `,

  drawerHeader: css``,

  drawerBody: css``,

  viewAction: css`${SHARED_STYLES.viewAction}`,

  editAction: css`${SHARED_STYLES.editAction}`,

  deleteAction: css`${SHARED_STYLES.deleteAction}`,

  activateAction: css`
    color: #34d399;
  `,

  contactAvatar: css`
    background: #3b82f6;
    flex-shrink: 0;
  `,

  contactNameLink: css`
    padding: 0;
    color: #e2e8f0;
    font-weight: 600;
  `,

  emailLink: css`
    color: #60a5fa;
  `,

  starActive: css`
    color: #faad14;
  `,

  starInactive: css`
    color: #666;
  `,

  btnNoPadding: css`
    padding: 0;
  `,

  tagSpacing: css`
    margin-bottom: 16px;
  `,

  // Contacts uses 16px (intentional slight tightening vs 20px default)
  drawerTagRow: css`
    margin-bottom: 16px;
  `,

  descriptionsSection: css`${SHARED_STYLES.descriptionsSection}`,
}));
