import { createStyles, css } from "antd-style";
import type { CSSProperties } from "react";

export const modalStyles: {
  content: CSSProperties;
  header: CSSProperties;
  body: CSSProperties;
} = {
  content: {
    background: "#1e2128",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 0,
  },
  header: {
    background: "transparent",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "20px 24px",
    marginBottom: 0,
  },
  body: {
    padding: "24px",
  },
};

export const useStyles = createStyles(({ token }) => ({
  pageTitle: css`
    color: white;
    font-size: 24px;
    font-weight: 700;
    margin: 0 !important;
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
    min-width: 160px;

    .ant-select-selector {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
    }

    .ant-select-arrow {
      color: #666;
    }
  `,

  table: css`
    .ant-table {
      background: transparent;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.65);
      font-weight: 600;
      font-size: 13px;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.85);
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.03) !important;
    }

    .ant-pagination {
      margin-top: 16px;
    }
  `,

  modal: css`
    .ant-modal-content {
      background: #1e2128 !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 16px !important;
    }

    .ant-modal-title {
      color: white;
      font-size: 18px;
      font-weight: 600;
    }

    .ant-modal-close {
      color: rgba(255, 255, 255, 0.45);
      &:hover {
        color: white;
      }
    }

    .ant-form-item-label > label {
      color: rgba(255, 255, 255, 0.75);
    }

    .ant-input,
    .ant-input-number,
    .ant-input-number-input,
    .ant-picker,
    .ant-select-selector,
    .ant-input-affix-wrapper {
      background: rgba(255, 255, 255, 0.06) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;

      &::placeholder {
        color: #555 !important;
      }
    }

    .ant-picker-input > input,
    .ant-input-number-input {
      color: white !important;
    }

    .ant-select-arrow,
    .ant-picker-suffix {
      color: #666;
    }
  `,

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
    .ant-descriptions-item-label {
      color: #94a3b8 !important;
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
}));
