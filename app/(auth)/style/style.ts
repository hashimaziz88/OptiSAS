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
    filter: drop-shadow(0 0 8px ${token.colorPrimary}4d);
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
    color: ${token.colorTextTertiary};
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
      color: ${token.colorTextSecondary};
      font-weight: 500;
      font-size: 13px;
    }

    /* Input structural overrides — colours handled by ConfigProvider */
    .ant-input-affix-wrapper,
    .ant-input,
    .ant-input-password {
      padding: 7px 11px;
      border-radius: ${token.borderRadius}px;
      outline: none;
      box-shadow: none;

      &:hover,
      &-focused,
      &:focus {
        border-color: ${token.colorPrimary};
        background: rgba(255, 255, 255, 0.05);
        box-shadow: 0 0 0 2px ${token.colorPrimary}1a;
      }

      .anticon {
        color: ${token.colorTextQuaternary};
      }
    }

    /* Select structural overrides — colours handled by ConfigProvider */
    .ant-select .ant-select-selector {
      border-radius: ${token.borderRadius}px;
      height: ${token.controlHeight}px;
      align-items: center;
    }

    .ant-select .ant-select-selection-item,
    .ant-select .ant-select-selection-placeholder {
      line-height: ${token.controlHeight - 2}px;
      color: ${token.colorTextSecondary};
    }

    .ant-select:hover .ant-select-selector,
    .ant-select-focused .ant-select-selector {
      border-color: ${token.colorPrimary};
      box-shadow: 0 0 0 2px ${token.colorPrimary}1a;
    }

    .ant-select .ant-select-arrow {
      color: ${token.colorTextQuaternary};
    }

    /* Button — shadows handled by ConfigProvider */
    .ant-btn-primary {
      font-weight: 600;
      font-size: 14px;
      width: 100%;
    }
  `,

  checkBoxContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    a {
      font-size: 14px;
      color: ${token.colorLink};
      transition: opacity 0.2s;

      &:hover {
        color: ${token.colorLinkHover};
      }
    }
  `,

  checkbox: css`
    &.ant-checkbox-wrapper {
      color: ${token.colorTextSecondary};

      .ant-checkbox + span {
        color: ${token.colorTextSecondary};
      }
    }

    a {
      color: ${token.colorLink};
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
      color: ${token.colorLink};
      transition: color 0.2s;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: ${token.colorLinkHover};
      }
    }
  `,

  footerLinkText: css`
    &.ant-typography {
      color: ${token.colorTextSecondary};
    }
  `,

  segmentedWrapper: css`
    margin-bottom: 12px;

    /* Structural overrides only — colours handled by ConfigProvider Segmented */
    .ant-segmented {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: ${token.borderRadius}px;
      padding: 3px;
      width: 100%;

      .ant-segmented-item {
        border-radius: ${token.borderRadius - 2}px;
        transition: color 0.2s;
      }

      .ant-segmented-item-selected {
        border-radius: ${token.borderRadius - 2}px;
      }

      .ant-segmented-thumb {
        border-radius: ${token.borderRadius - 2}px;
      }
    }
  `,

  scenarioHint: css`
    color: ${token.colorTextTertiary};
    font-size: 12px;
    margin: 8px 0 0;
    text-align: center;
    line-height: 1.5;
  `,
}));
