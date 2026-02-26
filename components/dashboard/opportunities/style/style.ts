import { createStyles, css } from "antd-style";
import type { CSSProperties } from "react";

export const modalStyles: {
  container: CSSProperties;
  header: CSSProperties;
  body: CSSProperties;
} = {
  container: {
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

  pipelineRow: css`
    margin-bottom: 24px;
  `,

  pipelineCard: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    transition: border-color 0.2s;

    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
  `,

  pipelineCardLabel: css`
    font-size: 12px;
    color: #8c8c8c;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,

  pipelineCardCount: css`
    font-size: 28px;
    font-weight: 700;
    color: white;
    line-height: 1.2;
  `,

  pipelineCardValue: css`
    font-size: 12px;
    color: #a0aec0;
    margin-top: 2px;
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
    min-width: 170px;

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

  stageBadge: css`
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
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
    .ant-input-affix-wrapper,
    .ant-input-number,
    .ant-picker {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: white;
      border-radius: 8px;
      width: 100%;

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

    .ant-input-number-input {
      color: white;
    }

    .ant-picker-input > input {
      color: white !important;
    }

    .ant-picker-suffix {
      color: #666;
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
  `,

  formBody: css`
    padding-top: 8px;

    .ant-form-item-label > label {
      color: #cbd5e0;
      font-weight: 500;
    }

    .ant-input,
    .ant-input-affix-wrapper,
    .ant-input-number,
    .ant-picker {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: white;
      border-radius: 8px;
      width: 100%;

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

    .ant-input-number-input {
      color: white;
    }

    .ant-picker-input > input {
      color: white !important;
    }

    .ant-picker-suffix {
      color: #666;
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

    textarea.ant-input {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: white;
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

    .ant-timeline-item-content {
      color: #e2e8f0;
    }

    .ant-timeline-item-tail {
      border-color: rgba(255, 255, 255, 0.1);
    }
  `,

  drawerActions: css`
    margin-top: 24px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  `,

  sectionTitle: css`
    color: #8c8c8c;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin: 20px 0 10px;
  `,

  stageHistoryItem: css`
    font-size: 13px;
  `,

  stageHistoryTime: css`
    font-size: 11px;
    color: #8c8c8c;
    margin-top: 2px;
  `,

  probabilityText: css`
    color: #a0aec0;
    font-size: 13px;
  `,

  valueText: css`
    font-weight: 600;
    color: #e2e8f0;
  `,
}));
