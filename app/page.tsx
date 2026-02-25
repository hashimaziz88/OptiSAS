"use client";
import React from 'react';
import Link from 'next/link';
import { Button, Typography } from "antd";
import { useStyles } from './style/style';
import LogoImage from '@/components/logoImage/LogoImage';
const { Title, Text } = Typography;

export default function Home() {
  const { styles, cx } = useStyles(); // cx is used to combine classes

  return (
    <div className={styles.container}>
      <div className={styles.backgroundGlow} />

      <main className={styles.heroSection}>
        <div className={styles.logoContainer}>
          <LogoImage height={80} width={160} />
        </div>

        <Title className={styles.heroTitle}>
          Welcome to OptiSAS
        </Title>

        <Text className={styles.heroSubtitle}>
          Your all-in-one CRM solution for seamless client management and business growth.
        </Text>

        <div className={styles.buttonGroup}>
          <Link href="/login">
            <Button
              type="primary"
              size="large"
              className={styles.actionButton}
            >
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="large"
              /* We combine the base button style and the specific register style */
              className={cx(styles.actionButton, styles.registerButton)}
            >
              Register
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}