import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({

  // style/style.ts additions
  spinnerWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `,

  spinnerText: css`
    margin-top: 16px;
    color: #8c8c8c;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 500;
  `
}));