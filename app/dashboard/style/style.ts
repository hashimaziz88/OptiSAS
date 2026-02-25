import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  container: css`
    min-height: 100vh;
    background: radial-gradient(circle at 0% 0%, #3a3f47 0%, #1a1c22 100%);
    width: 100%;
  `,

  sider: css`
    background: rgba(58, 63, 71, 0.4) !important;
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.08);

    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
    }

    .ant-menu {
      background: transparent !important;
      border: none !important;
    }

    .ant-menu-item-selected {
      background-color: ${token.colorPrimary} !important;
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
    }
  `,

  logoWrapper: css`
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    margin-bottom: 8px;
  `,

  header: css`
    &.ant-layout-header {
      background: rgba(58, 63, 71, 0.6) !important;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0;
      display: flex;
      align-items: center;
    }
  `,

  triggerBtn: css`
    &.ant-btn {
      color: white;
      font-size: 18px;
      width: 64px;
      height: 64px;
      border: none;

      &:hover {
        background: rgba(255, 255, 255, 0.05) !important;
        color: ${token.colorPrimary};
      }
    }
  `,

  content: css`
    margin: 24px 16px;
    padding: 24px;
    min-height: 280px;
    background: rgba(58, 63, 71, 0.3) !important;
    backdrop-filter: blur(8px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

    h1,
    p {
      color: white;
    }
  `,
  imageIcon: css`
    filter: brightness(0) invert(1);
    object-fit: contain;
  `,

  logoutBtn: css`
    &.ant-btn {
      color: white;
      font-size: 14px;
      height: 64px;
      padding: 0 16px;
      margin-left: auto;
      border: none;

      &:hover {
        background: rgba(255, 255, 255, 0.05) !important;
        color: ${token.colorError};
      }
    }
  `,
}));
