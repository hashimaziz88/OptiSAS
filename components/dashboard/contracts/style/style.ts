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

  pageTitle: css`
    &.ant-typography {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
  `,

  pageHeader: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  `,

  filterBar: css`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
  `,

  searchInput: css`
    max-width: 280px;
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
  `,

  table: css``,

  modal: css``,

  formBody: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,

  formRow: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  `,

  sectionTitle: css`
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-top: 8px;
    margin-bottom: 4px;
  `,

  submitButton: css`
    width: 100%;
    margin-top: 8px;
  `,

  warningBadge: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #facc15;
    font-size: 12px;
  `,

  amountText: css`
    color: ${token.colorPrimary};
    font-weight: 600;
  `,

  drawerHeader: css``,

  drawerBody: css``,

  viewAction: css`${SHARED_STYLES.viewAction}`,

  editAction: css`${SHARED_STYLES.editAction}`,

  deleteAction: css`${SHARED_STYLES.deleteAction}`,

  activateAction: css`
    color: #22c55e;
  `,

  cancelAction: css`
    color: #f87171;
  `,

  renewAction: css`
    color: #a78bfa;
  `,

  warningIcon: css`
    color: #facc15;
  `,

  btnNoPadding: css`
    padding: 0;
  `,

  fullWidth: css`${SHARED_STYLES.fullWidth}`,

  spaceBlock: css`
    margin-bottom: 20px;
  `,

  descriptionsSection: css`${SHARED_STYLES.descriptionsSection}`,

  renewBtnYellow: css`
    color: #facc15;
    border-color: #facc15;
  `,

  renewBtnGreen: css`
    color: #22c55e;
    border-color: #22c55e;
  `,

  renewBtnPurple: css`
    color: #a78bfa;
    border-color: #a78bfa;
  `,

  gridSpanFull: css`
    grid-column: 1 / -1;
  `,

  renewalsSection: css`
    margin-top: 20px;
  `,

  renewalsSectionTitle: css`
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 12px;
  `,

  renewalsTable: css`
    .ant-table {
      background: transparent;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.55);
      font-weight: 600;
      font-size: 12px;
      padding: 8px 12px;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.85);
      font-size: 13px;
      padding: 10px 12px;
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.03) !important;
    }

    .ant-table-placeholder {
      background: transparent;
    }
  `,

  completeRenewalBtn: css`
    background: #22c55e;
    border-color: #22c55e;

    &:hover {
      background: #16a34a !important;
      border-color: #16a34a !important;
    }
  `,

  mutedText: css`
    color: #94a3b8;
    font-size: 12px;
  `,
}));
