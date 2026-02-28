import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    background: #1e2128;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0;
  `,

  modalHeader: css`
    background: transparent;
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
    min-width: 180px;

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

  modal: css`
    .ant-modal-content {
      background: #1e2128;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 0;
    }

    .ant-modal-header {
      background: transparent;
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
    .ant-select-selector {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
    }

    .ant-input::placeholder {
      color: #666 !important;
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
  `,

  drawerActions: css`
    display: flex;
    gap: 8px;
    margin-top: 20px;
  `,

  viewAction: css`
    color: #60a5fa;
  `,

  editAction: css`
    color: #facc15;
  `,

  deleteAction: css`
    color: #f87171;
  `,

  btnNoPadding: css`
    padding: 0;
  `,

  noResize: css`
    resize: none;
  `,

  formItemNm: css`
    margin-bottom: 0;
  `,

  spaceBlock: css`
    margin-bottom: 16px;
  `,
}));
