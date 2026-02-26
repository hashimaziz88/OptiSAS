import { createStyles, css } from 'antd-style';

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
            &::placeholder { color: #666; }
        }

        .anticon { color: #666; }

        &:hover, &:focus-within {
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

        .ant-select-selection-placeholder,
        .ant-select-selection-item {
            color: #cbd5e0 !important;
        }

        .ant-select-arrow { color: #666; }

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
                a { color: white; }
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

    modal: css`
        .ant-modal-content {
            background: #2a2d35;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
        }

        .ant-modal-header {
            background: transparent;
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
            &:hover { color: white; }
        }

        .ant-modal-body { padding: 24px; }

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
                &::placeholder { color: #666; }
            }

            &:hover, &:focus, &-focused {
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
}));
