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

  formContainer: css`
    background: rgba(58, 63, 71, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 48px 40px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 440px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease-in-out;
    z-index: 10;

    &:hover {
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-4px);
    }
  `,

  logoContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    filter: drop-shadow(0 0 8px rgba(24, 144, 255, 0.3));
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  `,

  imageIcon: css`
    filter: brightness(0) invert(1);
    object-fit: contain;
  `,

  headerSection: css`
    text-align: center;
    margin-bottom: 20px;
  `,

  formHeading: css`
    &.ant-typography {
      color: white;
      font-weight: 800;
      margin-bottom: 8px;
    }
  `,

  formSubtitle: css`
    color: #8c8c8c;
    font-size: 14px;
  `,

  form: css`
    .ant-form-item-label > label {
      color: #cbd5e0;
      font-weight: 500;
    }

    /* Standardizing Inputs without !important */
    .ant-input-affix-wrapper,
    .ant-input,
    .ant-input-password {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #4e545f;
      color: white;
      padding: 10px 14px;
      border-radius: 8px;
      outline: none;
      box-shadow: none;

      &:hover,
      &-focused,
      &:focus {
        border-color: ${token.colorPrimary};
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
      }

      input {
        background: transparent;
        color: white;

        &::placeholder {
          color: #666;
        }
      }

      .anticon {
        color: #666;
      }
    }

    /* Primary Submit Button Styles */
    .ant-btn-primary {
      height: 48px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.25);
      border: none;
      width: 100%;
    }
  `,

  divider: css`
    &.ant-divider {
      margin: 24px 0;
      border-top-color: rgba(255, 255, 255, 0.1);

      .ant-divider-inner-text {
        color: #666;
        font-size: 12px;
        background: transparent;
      }
    }
  `,

  socialButton: css`
    &.ant-btn {
      width: 100%;
      height: 48px;
      background: transparent;
      color: white;
      border: 1px solid #4e545f;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      &:hover,
      &:focus {
        background: rgba(255, 255, 255, 0.05);
        border-color: white;
        color: white;
      }
    }
  `,

  checkBoxContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    a {
      font-size: 14px;
      color: ${token.colorPrimary};
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  `,

  checkbox: css`
    &.ant-checkbox-wrapper {
      color: #cbd5e0;

      .ant-checkbox + span {
        color: #cbd5e0;
      }
    }

    /* Link color inside checkbox (Terms) */
    a {
      color: ${token.colorPrimary};
      margin-left: 4px;
    }
  `,

  footerLinkSection: css`
    text-align: center;
    margin-top: 32px;
    display: flex;
    justify-content: center;
    gap: 8px;

    a {
      font-weight: 600;
      color: ${token.colorPrimary};
      transition: color 0.2s;

      &:hover {
        color: ${token.colorPrimaryActive};
      }
    }
  `,

  footerLinkText: css`
    &.ant-typography {
      color: #8c8c8c;
    }
  `,
}));
