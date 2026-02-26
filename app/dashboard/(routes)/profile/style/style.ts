import { createStyles, css } from 'antd-style';

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
            color: #94a3b8;
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
        .ant-descriptions-item-label {
            color: #94a3b8 !important;
            background: transparent !important;
            font-weight: 500;
            min-width: 140px;
        }
        .ant-descriptions-item-content {
            color: #e2e8f0 !important;
            background: transparent !important;
        }
        .ant-descriptions-row > td {
            padding-bottom: 16px;
        }
    `,

    copyableValue: css`
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #e2e8f0;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        padding: 6px 12px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        word-break: break-all;

        .ant-typography-copy {
            color: #60a5fa;
            &:hover {
                color: #93c5fd;
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
        border-radius: 8px;
        padding: 2px 10px;
    `,
}));
