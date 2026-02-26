import { createStyles, css } from "antd-style";
import type { CSSProperties } from "react";

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    background: "#1e2128",
    border: "1px solid rgba(255,255,255,0.1)",
    border-radius: 16,
    padding: 0,
`,

  modalHeader: css`
    background: "transparent",
    border-bottom: "1px solid rgba(255,255,255,0.08)",
    padding: "20px 24px",
    margin-bottom: 0,
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
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: white;

    .ant-input {
      background: transparent;
      color: white;
      &::placeholder {
        color: #666;
      }
    }

    .anticon {
      color: #666;
    }

    &:hover,
    &:focus-within {
      border-color: ${token.colorPrimary};
    }
  `,

  filterSelect: css`
    min-width: 200px;

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

  table: css`
    .ant-table {
      background: transparent;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.05);
      color: #cbd5e0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-weight: 600;
    }

    .ant-table-tbody > tr > td {
      background: transparent;
      color: #e2e8f0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.04) !important;
    }

    .ant-pagination {
      .ant-pagination-item a,
      .ant-pagination-prev button,
      .ant-pagination-next button {
        color: #cbd5e0;
      }
      .ant-pagination-item-active {
        background: ${token.colorPrimary};
        border-color: ${token.colorPrimary};
        a {
          color: white;
        }
      }
    }
  `,

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

  modal: css`
    .ant-modal-content {
      background: #1e2128 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 16px !important;
    }

    .ant-modal-header {
      background: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 20px 24px;
    }

    .ant-modal-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }

    .ant-modal-close {
      color: #8c8c8c;
      &:hover {
        color: white;
      }
    }

    .ant-form-item-label > label {
      color: #cbd5e0;
      font-weight: 500;
    }

    .ant-input,
    .ant-input-affix-wrapper {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: white;
      border-radius: 8px;

      input {
        background: transparent;
        color: white;
        &::placeholder {
          color: #666;
        }
      }

      &:hover,
      &:focus,
      &-focused {
        border-color: ${token.colorPrimary};
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
      }
    }

    .ant-select .ant-select-selector {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
      border-radius: 8px;
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      color: #cbd5e0 !important;
    }

    .ant-switch-checked {
      background: ${token.colorPrimary};
    }
  `,

  formBody: css`
    padding-top: 8px;

    .ant-form-item-label > label {
      color: #cbd5e0;
      font-weight: 500;
    }

    .ant-input,
    .ant-input-affix-wrapper,
    textarea.ant-input {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: white;
      border-radius: 8px;

      &::placeholder {
        color: #666;
      }

      &:hover,
      &:focus,
      &-focused {
        border-color: ${token.colorPrimary};
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
      }
    }

    .ant-select .ant-select-selector {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
      border-radius: 8px;
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      color: #cbd5e0 !important;
    }

    .ant-select-arrow {
      color: #666;
    }

    .ant-switch {
      background: rgba(255, 255, 255, 0.15);

      &.ant-switch-checked {
        background: ${token.colorPrimary};
      }
    }
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

  drawerHeader: css`
    .ant-drawer-title {
      color: white !important;
    }
    .ant-drawer-close {
      color: #8c8c8c;
      &:hover {
        color: white;
      }
    }
  `,

  drawerBody: css`
    .ant-descriptions-item-label,
    .ant-descriptions-item-content {
      color: #cbd5e0 !important;
      background: transparent !important;
    }
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
}));
