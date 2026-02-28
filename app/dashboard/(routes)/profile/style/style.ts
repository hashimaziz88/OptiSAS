import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  page: css`
    max-width: 760px;
    margin: 0 auto;
    padding: 32px 0;
  `,

  pageTitle: css`
    &.ant-typography {
      color: white;
      margin: 0 0 32px;
      font-size: 24px;
      font-weight: 700;
    }
  `,

  card: css`
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 20px;
  `,

  avatarSection: css`
    display: flex;
    align-items: center;
    gap: 24px;
  `,

  avatar: css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    text-transform: uppercase;
  `,

  userName: css`
    &.ant-typography {
      color: white;
      font-size: 22px;
      font-weight: 700;
      margin: 0 0 4px;
    }
  `,

  userEmail: css`
    &.ant-typography {
      color: ${token.colorTextTertiary};
      font-size: 14px;
      margin: 0;
    }
  `,

  rolesRow: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  `,

  sectionLabel: css`
    &.ant-typography {
      color: white;
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 20px;
      display: block;
    }
  `,

  descriptionItem: css`
    .ant-descriptions-row > td {
      padding-bottom: 16px;
    }
    .ant-descriptions-item-label {
      min-width: 140px;
    }
  `,

  copyableValue: css`
    font-family: "Courier New", monospace;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.88);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: ${token.borderRadius}px;
    padding: 6px 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    word-break: break-all;

    .ant-typography-copy {
      color: ${token.colorLink};
      &:hover {
        color: ${token.colorLinkHover};
      }
    }
  `,

  divider: css`
    border-color: rgba(255, 255, 255, 0.08);
    margin: 20px 0;
  `,

  sessionBadge: css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    background: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.25);
    color: #34d399;
  `,

  roleTag: css`
    font-size: 12px;
    font-weight: 500;
    border-radius: ${token.borderRadius}px;
    padding: 2px 10px;
  `,

  inviteCode: css`
    font-family: "Courier New", monospace;
    font-size: 13px;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.08);
    border: 1px solid rgba(251, 191, 36, 0.2);
    border-radius: ${token.borderRadius}px;
    padding: 10px 14px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    word-break: break-all;
    width: 100%;
  `,

  inviteExpiry: css`
    &.ant-typography {
      color: ${token.colorTextTertiary};
      font-size: 12px;
      margin-top: 10px;
      display: block;
    }
  `,
}));
