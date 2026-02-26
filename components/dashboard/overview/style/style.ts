import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  pageHeader: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  `,
  pageTitle: css`
    &.ant-typography {
      color: white;
      margin: 0;
      font-weight: 700;
    }
  `,
  card: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
  `,
  cardHeader: css`
    background: transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  `,
  kpiCard: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    height: 100%;
  `,
  kpiIconBox: css`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  `,
  kpiLabel: css`
    color: #8c8c8c;
    font-size: 13px;
    margin-bottom: 4px;
  `,
  kpiDescription: css`
    color: #64748b;
    font-size: 12px;
    margin-top: 4px;
  `,
  activityCard: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    height: 100%;
    text-align: center;
  `,
  activityValue: css`
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
  `,
  activityLabel: css`
    font-size: 13px;
    color: #94a3b8;
    margin-top: 6px;
  `,
  chartCard: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    height: 100%;
  `,
  chartContainer: css`
    position: relative;
    height: 240px;
  `,
  tableCard: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;

    .ant-table {
      background: transparent !important;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.04) !important;
      color: #94a3b8 !important;
      font-size: 12px !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    }

    .ant-table-tbody > tr > td {
      background: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.04) !important;
    }
  `,
  warningCard: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(251, 146, 60, 0.3);
    border-radius: 16px;
    overflow: hidden;

    .ant-card-head {
      background: rgba(251, 146, 60, 0.05) !important;
      border-bottom: 1px solid rgba(251, 146, 60, 0.2) !important;
    }

    .ant-table {
      background: transparent !important;
    }

    .ant-table-thead > tr > th {
      background: rgba(255, 255, 255, 0.04) !important;
      color: #94a3b8 !important;
      font-size: 12px !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    }

    .ant-table-tbody > tr > td {
      background: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    }

    .ant-table-tbody > tr:hover > td {
      background: rgba(255, 255, 255, 0.04) !important;
    }
  `,
  emptyText: css`
    color: #64748b;
    text-align: center;
    padding: 20px 0;
  `,
  refreshBtn: css`
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    color: #e2e8f0;

    &:hover {
      background: rgba(255, 255, 255, 0.14) !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
      color: white !important;
    }
  `,
}));
