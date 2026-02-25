import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  imageIcon: css`
    filter: brightness(0) invert(1);
    object-fit: contain;
  `,
    
  logoContainer: css`
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 0 8px rgba(24, 144, 255, 0.3));
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  `,
}));
