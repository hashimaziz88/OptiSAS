import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  card: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(8px);

    .ant-card-head {
      background: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      padding: 16px 24px;
    }

    .ant-card-body {
      padding: 20px 24px;
    }
  `,

  headerRow: css`
    display: flex;
    align-items: center;
    gap: 10px;
  `,

  headerIcon: css`
    font-size: 18px;
    color: ${token.colorPrimary};
  `,

  headerTitle: css`
    &.ant-typography {
      color: white;
      font-size: 15px;
      font-weight: 600;
      margin: 0;
    }
  `,

  actionRow: css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  `,

  insightsBlock: css`
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 16px 18px;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.7;
    font-size: 13.5px;
    color: #cbd5e1;
    margin-bottom: 12px;
  `,

  attribution: css`
    font-size: 11px;
    color: rgba(255, 255, 255, 0.3);
    text-align: right;
    margin-top: 4px;
  `,

  skeletonWrap: css`
    margin-top: 8px;

    .ant-skeleton-paragraph > li {
      background: rgba(255, 255, 255, 0.06) !important;
    }

    .ant-skeleton-title {
      background: rgba(255, 255, 255, 0.06) !important;
    }
  `,

  disabledNote: css`
    &.ant-typography {
      color: rgba(255, 255, 255, 0.35);
      font-size: 12px;
    }
  `,

  errorAlert: css`
    &.ant-alert {
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: 10px;
      margin-bottom: 12px;
    }
  `,
}));
