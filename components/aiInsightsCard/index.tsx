'use client';

import React, { useState } from 'react';
import { Alert, Button, Card, Skeleton, Typography } from 'antd';
import { BulbOutlined, ReloadOutlined } from '@ant-design/icons';
import { AiInsightsCardProps } from '@/types/componentProps';
import { useStyles } from './style/style';

function serialiseData(data: Record<string, unknown>): string {
    return Object.entries(data)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => {
            const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (s) => s.toUpperCase())
                .trim();
            const formatted =
                typeof value === 'number'
                    ? value.toLocaleString('en-ZA', { maximumFractionDigits: 2 })
                    : String(value);
            return `${label}: ${formatted}`;
        })
        .join('\n');
}

const AiInsightsCard: React.FC<AiInsightsCardProps> = ({
    data,
    type,
    title = 'AI Business Insights',
    disabled = false,
}) => {
    const { styles } = useStyles();

    const [loading, setLoading] = useState(false);
    const [insights, setInsights] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const hasGenerated = insights !== null;

    const generateInsights = async () => {
        setLoading(true);
        setError(null);

        try {
            const context = serialiseData(data);

            const response = await fetch('/api/ai-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ context, type }),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error ?? `Unexpected error (HTTP ${response.status})`);
            }

            setInsights(json.insights as string);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const cardTitle = (
        <div className={styles.headerRow}>
            <BulbOutlined className={styles.headerIcon} />
            <Typography.Title level={5} className={styles.headerTitle}>
                {title}
            </Typography.Title>
        </div>
    );

    return (
        <Card className={styles.card} title={cardTitle} variant="borderless">
            <div className={styles.actionRow}>
                <Button
                    type="primary"
                    icon={hasGenerated ? <ReloadOutlined /> : <BulbOutlined />}
                    onClick={generateInsights}
                    loading={loading}
                    disabled={disabled || loading}
                >
                    {hasGenerated ? 'Regenerate Insights' : 'Generate Insights'}
                </Button>
                {disabled && !loading && (
                    <Typography.Text className={styles.disabledNote}>
                        Load data first to enable AI analysis.
                    </Typography.Text>
                )}
            </div>

            {loading && (
                <div className={styles.skeletonWrap}>
                    <Skeleton active paragraph={{ rows: 5 }} title={false} />
                </div>
            )}

            {!loading && error && (
                <Alert
                    type="error"
                    message="Could not generate insights"
                    description={error}
                    showIcon
                    className={styles.errorAlert}
                />
            )}

            {!loading && insights && (
                <>
                    <div className={styles.insightsBlock}>{insights}</div>
                    <div className={styles.attribution}>
                        Powered by Gemini 2.5 Flash via Google AI Studio
                    </div>
                </>
            )}
        </Card>
    );
};

export default AiInsightsCard;
