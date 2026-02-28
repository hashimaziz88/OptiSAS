import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  modalContainer: css`
    padding: 0;
  `,

  modalHeader: css`
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
    max-width: 280px;
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
    min-width: 180px;

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

  modal: css``,

  formBody: css`
    .ant-upload-drag {
      &:hover {
        border-color: ${token.colorPrimary} !important;
      }
    }
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
    margin-top: 20px;
  `,

  fileNameCell: css`
    display: flex;
    align-items: center;
    gap: 8px;

    .file-icon {
      color: ${token.colorPrimary};
      font-size: 18px;
    }
  `,

  viewAction: css`
    color: #60a5fa;
  `,

  downloadAction: css`
    color: #34d399;
  `,

  deleteAction: css`
    color: #f87171;
  `,

  btnNoPadding: css`
    padding: 0;
  `,

  spaceBlock: css`
    margin-bottom: 16px;
  `,

  fullWidth: css`
    width: 100%;
  `,
}));
