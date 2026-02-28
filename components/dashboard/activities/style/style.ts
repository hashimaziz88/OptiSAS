import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    background: #1e2128;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0;
  `,

  modalHeader: css`
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 20px 24px;
    margin-bottom: 0;
  `,

  modalBody: css`
    padding: 24px;
  `,

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
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.12);
    color: white;

    &:hover,
    &:focus-within {
      border-color: ${token.colorPrimary};
      background: rgba(255, 255, 255, 0.05) !important;
    }
  `,

  filterSelect: css`
    min-width: 160px;

    &:hover .ant-select-selector,
    &.ant-select-focused .ant-select-selector {
      border-color: ${token.colorPrimary} !important;
    }
  `,

  refreshButton: css`
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: #cbd5e0;

    &:hover {
      border-color: ${token.colorPrimary} !important;
      color: ${token.colorPrimary} !important;
    }
  `,

  table: css``,

  overdueBadge: css`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ef4444;
    margin-right: 6px;
  `,

  modal: css``,

  formBody: css`
    padding: 8px 0;
  `,

  submitButton: css`
    width: 100%;
    margin-top: 8px;
    height: 44px;
    font-size: 15px;
    font-weight: 600;
  `,

  drawerHeader: css``,

  drawerBody: css``,

  drawerActions: css`
    display: flex;
    gap: 8px;
    margin-top: 24px;
    flex-wrap: wrap;
  `,

  tabs: css`
    .ant-tabs-nav {
      margin-bottom: 16px;
    }

    .ant-tabs-tab {
      color: #94a3b8;
    }

    .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${token.colorPrimary};
    }

    .ant-tabs-ink-bar {
      background: ${token.colorPrimary};
    }
  `,

  viewAction: css`
    color: #60a5fa;
  `,

  editAction: css`
    color: #facc15;
  `,

  deleteAction: css`
    color: #f87171;
  `,

  completeAction: css`
    color: #22c55e;
  `,

  cancelAction: css`
    color: #f59e0b;
  `,

  subjectLink: css`
    padding: 0;
    color: #60a5fa;
    font-weight: 600;
  `,

  helperText: css`
    color: #64748b;
    font-size: 12px;
  `,

  noResize: css`
    resize: none;
  `,

  formItemNm: css`
    margin-bottom: 0;
  `,

  fullWidth: css`
    width: 100%;
  `,

  disabledInput: css`
    color: #e2e8f0;
    cursor: default;
  `,

  inputSuffix: css`
    color: #64748b;
    font-size: 12px;
  `,

  badgeMargin: css`
    margin-left: 6px;
  `,

  completeBtnGreen: css`
    background: #22c55e;
    border-color: #22c55e;
    color: white;
  `,

  spaceBlock: css`
    margin-bottom: 16px;
  `,
}));
