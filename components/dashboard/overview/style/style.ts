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

    .ant-card-body {
      padding: 20px 24px;
    }

    .ant-statistic-content {
      font-size: 22px;
      font-weight: 700;
      line-height: 1.2;
    }
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

    .ant-card-body {
      padding: 24px 16px;
    }
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

    .ant-card-body {
      padding: 16px 20px;
    }

    .ant-card-head {
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
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

    .ant-card-body {
      padding: 0;
    }

    .ant-card-head {
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

    .ant-card-body {
      padding: 0;
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

  /* KpiCards */
  kpiRow: css`
    display: flex;
    align-items: flex-start;
    gap: 16px;
  `,

  kpiContent: css`
    flex: 1;
    min-width: 0;
  `,

  /* TopPerformersTable */
  performerName: css`
    color: #e2e8f0;
    font-weight: 500;
  `,

  wonCount: css`
    color: #34d399;
    font-weight: 700;
    font-size: 15px;
  `,

  valueBlue: css`
    color: #60a5fa;
  `,

  progressPercent: css`
    color: #cbd5e0;
    font-size: 11px;
  `,

  lostValue: css`
    color: #94a3b8;
  `,

  cardTitle: css`
    color: white;
    font-weight: 600;
  `,

  transparentBg: css`
    background: transparent;
  `,

  emptyDataText: css`
    color: #64748b;
  `,

  /* PipelineBarChart */
  legendRow: css`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 14px;
  `,

  legendItem: css`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #94a3b8;
  `,

  legendDot: css`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
  `,

  legendCount: css`
    color: #60a5fa;
    font-weight: 600;
  `,

  /* RevenueTrendChart */
  chartSummaryRow: css`
    display: flex;
    gap: 20px;
    font-size: 12px;
  `,

  summaryLabel: css`
    color: #64748b;
  `,

  summaryValueGreen: css`
    color: #34d399;
    font-weight: 600;
  `,

  summaryValueBlue: css`
    color: #60a5fa;
    font-weight: 600;
  `,

  summaryValuePurple: css`
    color: #a78bfa;
    font-weight: 600;
  `,

  /* ContractsExpiringTable */
  contractNumber: css`
    color: #fb923c;
    font-family: monospace;
    font-size: 12px;
  `,

  contractTitle: css`
    color: #e2e8f0;
  `,

  daysUrgent: css`
    color: #f87171;
    font-weight: 700;
  `,

  daysWarning: css`
    color: #fb923c;
    font-weight: 700;
  `,

  contractValue: css`
    color: #34d399;
  `,

  warningTitle: css`
    color: #fb923c;
    font-weight: 600;
  `,

  /* ActivitiesSummaryCards */
  activityIcon: css`
    font-size: 24px;
  `,

  activityIconWrap: css`
    margin-bottom: 12px;
  `,

  activityLabelText: css`
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin-top: 6px;
  `,

  /* Dashboard page */
  pageWrapper: css`
    padding-bottom: 32px;
  `,

  sectionDivider: css`
    &.ant-divider {
      border-color: rgba(255, 255, 255, 0.06);
      margin: 24px 0;
    }
  `,

  activitiesHeader: css`
    margin-bottom: 8px;
  `,

  sectionSubtitle: css`
    &.ant-typography {
      color: #94a3b8;
      margin-bottom: 14px;
      font-weight: 500;
    }
  `,
}));
