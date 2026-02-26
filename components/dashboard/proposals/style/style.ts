import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    background: #1e2128;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0;
  `,

  modalHeader: css`
    background: #1e2128;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 24px;
    margin-bottom: 0;
  `,

  modalBody: css`
    background: #1e2128;
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
    max-width: 280px;
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.12);
    color: white;

    .ant-input {
      background: transparent !important;
      color: white !important;
      &::placeholder {
        color: #666;
      }
      &:focus,
      &:active {
        background: transparent !important;
        color: white !important;
      }
    }

    .ant-input-affix-wrapper {
      background: transparent !important;
    }

    .anticon {
      color: #666;
    }

    &:hover,
    &:focus-within {
      border-color: ${token.colorPrimary};
      background: rgba(255, 255, 255, 0.05) !important;
    }
  `,

  filterSelect: css`
    min-width: 160px;

    .ant-select-selector {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      color: #cbd5e0 !important;
    }

    .ant-select-arrow {
      color: #666;
    }

    &:hover .ant-select-selector,
    &.ant-select-focused .ant-select-selector {
      border-color: ${token.colorPrimary} !important;
    }
  `,

  refreshButton: css`
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: #cbd5e0;

    &:hover {
      border-color: ${token.colorPrimary} !important;
      color: ${token.colorPrimary} !important;
    }
  `,

  table: css`
    .ant-table {
      background: transparent;
      color: white;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.04) !important;
    }
  `,

  lineItemsTable: css`
    margin-top: 8px;

    .ant-table {
      background: rgba(255, 255, 255, 0.02);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 8px 12px;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
      padding: 8px 12px;
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.03) !important;
    }
  `,

  totalRow: css`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 12px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    margin-top: 4px;
    color: #e2e8f0;
    font-size: 15px;

    strong {
      color: white;
    }
  `,

  modal: css`
    .ant-modal-content {
      background: #1e2128 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 16px !important;
      padding: 0;
    }

    .ant-modal-header {
      background: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px 24px;
      margin-bottom: 0;
    }

    .ant-modal-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }
  `,

  formBody: css`
    .ant-form-item-label > label {
      color: #94a3b8;
      font-size: 13px;
    }

    .ant-input,
    .ant-select-selector,
    .ant-picker,
    .ant-input-number {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
    }

    .ant-input::placeholder,
    .ant-input-number-input::placeholder {
      color: #666 !important;
    }

    .ant-picker-input > input {
      color: white !important;
    }

    .ant-picker-suffix {
      color: #666;
    }

    .ant-input-number-input {
      color: white !important;
    }
  `,

  sectionTitle: css`
    color: #94a3b8;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 20px 0 12px;
  `,

  addLineItemRow: css`
    margin-top: 12px;
    padding: 16px;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 12px;

    .ant-form-item-label > label {
      color: #94a3b8;
      font-size: 12px;
    }

    .ant-input,
    .ant-input-number,
    .ant-input-number .ant-input-number-input {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
    }

    .ant-input::placeholder,
    .ant-input-number-input::placeholder {
      color: #555 !important;
    }
  `,

  lineItemTopRow: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 16px;

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
      gap: 12px 0;
    }
  `,

  lineItemBottomRow: css`
    display: grid;
    grid-template-columns: 70px 1fr 80px 80px auto;
    gap: 0 12px;
    align-items: start;

    @media (max-width: 520px) {
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      .ant-form-item:last-child {
        grid-column: 1 / -1;
      }
    }
  `,

  submitButton: css`
    width: 100%;
    margin-top: 8px;
    height: 44px;
    font-size: 15px;
    font-weight: 600;
  `,

  drawerHeader: css`
    .ant-drawer-title {
      color: white !important;
      font-weight: 600;
    }
  `,

  drawerBody: css`
    .ant-descriptions-item-label {
      color: #94a3b8 !important;
      font-size: 13px;
      background: rgba(255, 255, 255, 0.04) !important;
    }

    .ant-descriptions-item-content {
      color: #e2e8f0 !important;
      background: transparent !important;
    }

    .ant-descriptions-view {
      border-color: rgba(255, 255, 255, 0.1) !important;
    }

    .ant-descriptions-row > th,
    .ant-descriptions-row > td {
      border-color: rgba(255, 255, 255, 0.1) !important;
    }

    .ant-tag {
      border-color: rgba(255, 255, 255, 0.15);
    }
  `,

  drawerSection: css`
    margin-top: 24px;

    h4 {
      color: #94a3b8;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 12px;
    }
  `,

  drawerActions: css`
    display: flex;
    gap: 8px;
    margin-top: 20px;
    flex-wrap: wrap;
  `,

  amountText: css`
    font-weight: 600;
    color: ${token.colorPrimary};
  `,
}));
