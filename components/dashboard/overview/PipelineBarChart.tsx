'use client';

import React from 'react';
import { Card } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IPipelineStageSummaryDto } from '@/providers/dashboardProvider/context';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { PIPELINE_STAGE_COLORS } from '@/constants/opportunities';
import { PipelineBarChartProps } from '@/types/componentProps';
import { useStyles } from './style/style';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);

const PipelineBarChart: React.FC<PipelineBarChartProps> = ({ stages, loading }) => {
    const { styles } = useStyles();

    const data = {
        labels: stages.map((s) => s.stageName),
        datasets: [
            {
                label: 'Pipeline Value',
                data: stages.map((s) => s.totalValue ?? s.value ?? 0),
                backgroundColor: stages.map((_, i) => PIPELINE_STAGE_COLORS[i % PIPELINE_STAGE_COLORS.length]),
                borderColor: stages.map((_, i) => PIPELINE_STAGE_COLORS[i % PIPELINE_STAGE_COLORS.length].replace('0.85', '1')),
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(15,23,42,0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                callbacks: {
                    label: (ctx: { parsed: { y: number } }) =>
                        ` ${formatCurrency(ctx.parsed.y)}`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#94a3b8', font: { size: 11 } },
                grid: { color: 'rgba(255,255,255,0.05)' },
                border: { color: 'rgba(255,255,255,0.08)' },
            },
            y: {
                type: 'logarithmic' as const,
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                    callback: (v: number | string) => formatCurrency(Number(v)),
                },
                grid: { color: 'rgba(255,255,255,0.05)' },
                border: { color: 'rgba(255,255,255,0.08)' },
            },
        },
    };

    return (
        <Card
            title={<span className={styles.cardTitle}>Pipeline by Stage</span>}
            className={styles.chartCard}
            loading={loading}
        >
            {stages.length > 0 ? (
                <div className={styles.chartContainer}>
                    <Bar data={data} options={options as Parameters<typeof Bar>[0]['options']} />
                </div>
            ) : (
                <div className={styles.emptyText}>No pipeline data available</div>
            )}

            {/* Count summary below chart */}
            {stages.length > 0 && (
                <div className={styles.legendRow}>
                    {stages.map((s, i) => (
                        <div key={s.stageName} className={styles.legendItem}>
                            <span
                                className={styles.legendDot}
                                style={{ background: PIPELINE_STAGE_COLORS[i % PIPELINE_STAGE_COLORS.length] }}
                            />
                            {s.stageName}
                            <span className={styles.legendCount}>{s.count}</span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default PipelineBarChart;
