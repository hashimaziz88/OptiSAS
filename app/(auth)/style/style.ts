import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: radial-gradient(circle at 0% 0%, #3a3f47 0%, #1a1c22 100%);
    padding: 16px;
    position: relative;
    overflow-y: auto;
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
    padding: 28px 28px 24px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 420px;
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
    margin-bottom: 10px;

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
    margin-bottom: 14px;
  `,

  formHeading: css`
    &.ant-typography {
      color: white;
      font-weight: 800;
      margin-bottom: 4px;
    }
  `,

  formSubtitle: css`
    color: #8c8c8c;
    font-size: 14px;
  `,

  form: css`
    .ant-form-item {
      margin-bottom: 12px;
    }

    .ant-form-item-label {
      padding-bottom: 2px;
    }

    .ant-form-item-label > label {
      color: #cbd5e0;
      font-weight: 500;
      font-size: 13px;
    }

    /* Standardizing Inputs without !important */
    .ant-input-affix-wrapper,
    .ant-input,
    .ant-input-password {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #4e545f;
      color: white;
      padding: 7px 11px;
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

    /* Select Input Styles */
    .ant-select .ant-select-selector {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #4e545f;
      border-radius: 8px;
      height: 40px;
      align-items: center;
      color: white;
    }

    .ant-select .ant-select-selection-item,
    .ant-select .ant-select-selection-placeholder {
      line-height: 38px;
      color: #cbd5e0;
    }

    .ant-select:hover .ant-select-selector,
    .ant-select-focused .ant-select-selector {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }

    .ant-select .ant-select-arrow {
      color: #666;
    }

    /* Primary Submit Button Styles */
    .ant-btn-primary {
      height: 40px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: none;
      border: none;
      width: 100%;

      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
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
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;

    a {
      font-weight: 600;
      color: #60a5fa;
      transition: color 0.2s;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: #93c5fd;
      }
    }
  `,

  footerLinkText: css`
    &.ant-typography {
      color: #cbd5e0;
    }
  `,

  segmentedWrapper: css`
    margin-bottom: 12px;

    .ant-segmented {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 3px;
      width: 100%;

      .ant-segmented-item {
        color: #8c8c8c;
        border-radius: 6px;
        transition: color 0.2s;

        &:hover {
          color: white;
        }
      }

      .ant-segmented-item-selected {
        color: white;
        background: ${token.colorPrimary};
        border-radius: 6px;
      }

      .ant-segmented-thumb {
        background: ${token.colorPrimary};
        border-radius: 6px;
      }
    }
  `,

  scenarioHint: css`
    color: #8c8c8c;
    font-size: 12px;
    margin: 8px 0 0;
    text-align: center;
    line-height: 1.5;
  `,
}));
