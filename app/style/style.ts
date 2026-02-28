import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle at 0% 0%, #3a3f47 0%, #1a1c22 100%);
    padding: 24px;
    position: relative;
    overflow: hidden;
  `,

  backgroundGlow: css`
    position: absolute;
    width: 400px;
    height: 400px;
    background: ${token.colorPrimary};
    filter: blur(180px);
    opacity: 0.15;
    top: 10%;
    left: 5%;
    pointer-events: none;
  `,

  heroSection: css`
    text-align: center;
    max-width: 600px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  logoContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 0 8px ${token.colorPrimary}4d);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  `,

  imageIcon: css`
    filter: brightness(0) invert(1);
    object-fit: contain;
  `,

  heroTitle: css`
    &.ant-typography {
      color: white;
      font-size: 64px;
      font-weight: 800;
      margin-bottom: 16px;
      line-height: 1.2;
      background: linear-gradient(to bottom, #ffffff 30%, #8c8c8c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,

  heroSubtitle: css`
    &.ant-typography {
      color: ${token.colorTextSecondary};
      font-size: 18px;
      display: block;
      margin-bottom: 32px;
      max-width: 480px;
    }
  `,

  buttonGroup: css`
    display: flex;
    gap: 16px;
    justify-content: center;

    a {
      display: inline-block;
      text-decoration: none;
    }
  `,

  actionButton: css`
    &.ant-btn {
      width: 140px;
      height: 48px;
      font-weight: 600;
      border-radius: ${token.borderRadius}px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
  `,

  registerButton: css`
    &.ant-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid ${token.colorBorder};
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: white;
        color: white;
      }
    }
  `,
}));
