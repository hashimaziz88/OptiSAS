import Image from "next/image";
import { useStyles } from "./style/style";
import logo from "@/assets/icons/logo.svg";

const LogoImage: React.FC<{ height: number; width: number }> = ({ height, width }) => {
    const { styles } = useStyles();
    return (
        <Image
            src={logo}
            alt="App Logo"
            width={width}
            height={height}
            unoptimized
            className={styles.imageIcon}
        />
    );
};

export default LogoImage;