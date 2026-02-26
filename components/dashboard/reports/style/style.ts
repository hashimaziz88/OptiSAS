import { createStyles, css } from "antd-style";

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

  tabsWrap: css`
    .ant-tabs-nav {
      margin-bottom: 24px;
    }

    .ant-tabs-tab {
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      font-weight: 500;
    }

    .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: white !important;
    }

    .ant-tabs-ink-bar {
      background: ${token.colorPrimary};
    }
  `,

  filterBar: css`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 24px;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
  `,

  filterLabel: css`
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    white-space: nowrap;
  `,

  filterSelect: css`
    min-width: 160px;

    .ant-select-selector {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;
    }

    .ant-select-arrow {
      color: rgba(255, 255, 255, 0.4);
    }

    .ant-select-clear {
      background: transparent;
      color: rgba(255, 255, 255, 0.4);
    }
  `,

  statsRow: css`
    margin-bottom: 24px;
  `,

  statCard: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px 24px;
    text-align: center;

    .ant-statistic-title {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
    }

    .ant-statistic-content {
      color: white;
      font-size: 28px;
      font-weight: 700;
    }
  `,

  statCardAccent: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px 24px;
    text-align: center;

    .ant-statistic-title {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
    }

    .ant-statistic-content {
      color: ${token.colorPrimary};
      font-size: 28px;
      font-weight: 700;
    }
  `,

  table: css`
    .ant-table {
      background: transparent;
      color: white;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.06) !important;
      color: rgba(255, 255, 255, 0.65) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      font-size: 13px;
      font-weight: 600;
    }

    .ant-table-tbody > tr > td {
      background: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
      color: #e2e8f0;
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.04) !important;
    }

    .ant-table-column-sorter {
      color: rgba(255, 255, 255, 0.3);
    }

    .ant-table-column-sorter-up.active,
    .ant-table-column-sorter-down.active {
      color: ${token.colorPrimary};
    }

    .ant-pagination-total-text {
      color: rgba(255, 255, 255, 0.55);
    }

    .ant-pagination-item a {
      color: rgba(255, 255, 255, 0.65);
    }

    .ant-pagination-item-active {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      a {
        color: white;
      }
    }

    .ant-pagination-prev button,
    .ant-pagination-next button {
      color: rgba(255, 255, 255, 0.65);
    }

    .ant-empty-description {
      color: rgba(255, 255, 255, 0.3);
    }
  `,

  chartCard: css`
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
  `,

  chartTitle: css`
    color: rgba(255, 255, 255, 0.65);
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,

  emptyState: css`
    padding: 60px 0;
    text-align: center;

    .ant-empty-description {
      color: rgba(255, 255, 255, 0.3);
    }
  `,

  exportButton: css`
    margin-left: auto;
  `,
}));
