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

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;

      .ant-picker,
      .ant-select {
        width: 100% !important;
      }
    }

    .ant-picker {
      background: rgba(255, 255, 255, 0.05) !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      color: white !important;

      .ant-picker-input > input {
        color: white !important;
        &::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
        }
      }

      .ant-picker-separator,
      .ant-picker-suffix,
      .ant-picker-clear {
        color: rgba(255, 255, 255, 0.4) !important;
      }

      &:hover,
      &.ant-picker-focused {
        border-color: rgba(255, 255, 255, 0.3) !important;
      }
    }

    .ant-btn:not(.ant-btn-primary) {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.75);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: white;
      }
    }
  `,

  filterLabel: css`
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    white-space: nowrap;

    @media (max-width: 768px) {
      margin-top: 4px;
    }
  `,

  filterSelect: css`
    min-width: 160px;
  `,

  statsRow: css`
    margin-bottom: 24px;

    .ant-col {
      margin-bottom: 12px;
      display: flex;
    }
  `,

  statCard: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px 24px;
    text-align: center;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .ant-statistic-title {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    .ant-statistic-content {
      color: white;
      font-size: 22px;
      font-weight: 700;
      word-break: break-word;
    }

    @media (max-width: 768px) {
      padding: 14px 12px;

      .ant-statistic-content {
        font-size: 16px;
      }

      .ant-statistic-content-value-int,
      .ant-statistic-content-value-decimal {
        font-size: 16px;
      }
    }
  `,

  statCardAccent: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px 24px;
    text-align: center;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .ant-statistic-title {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    @media (max-width: 768px) {
      padding: 14px 12px;
    }
  `,

  statAccentValue: css`
    color: #6366f1 !important;
    font-size: 22px;
    font-weight: 700;
    word-break: break-word;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  `,

  table: css``,

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

  /* OpportunitiesReportTab */
  lostSuffix: css`
    color: #f87171;
    font-size: 20px;
  `,

  /* SalesByPeriodTab */
  periodLabel: css`
    width: 110px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    flex-shrink: 0;
  `,

  barTrack: css`
    flex: 1;
    position: relative;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    height: 22px;
  `,

  barRow: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  `,

  barValues: css`
    width: 210px;
    color: #e2e8f0;
    font-size: 11px;
    text-align: right;
    flex-shrink: 0;
  `,

  legendContainer: css`
    display: flex;
    gap: 20px;
    margin-top: 14px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.35);
  `,

  legendSwatch: css`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    margin-right: 6px;
  `,

  emptyChartText: css`
    color: rgba(255, 255, 255, 0.4);
    font-size: 16px;
  `,

  filterSelectMin: css`
    min-width: 120px;
  `,
}));
