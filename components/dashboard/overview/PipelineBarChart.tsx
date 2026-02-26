'use client';

import React from 'react';
import { Card } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IPipelineStageSummaryDto } from '@/providers/dashboardProvider/context';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { useStyles } from './style/style';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
    stages: IPipelineStageSummaryDto[];
    loading: boolean;
}

const STAGE_COLORS = [
    'rgba(96,165,250,0.85)',
    'rgba(52,211,153,0.85)',
    'rgba(167,139,250,0.85)',
    'rgba(251,191,36,0.85)',
    'rgba(56,189,248,0.85)',
    'rgba(248,113,113,0.85)',
];

const PipelineBarChart: React.FC<Props> = ({ stages, loading }) => {
    const { styles } = useStyles();

    const data = {
        labels: stages.map((s) => s.stageName),
        datasets: [
            {
                label: 'Pipeline Value',
                data: stages.map((s) => s.value),
                backgroundColor: stages.map((_, i) => STAGE_COLORS[i % STAGE_COLORS.length]),
                borderColor: stages.map((_, i) => STAGE_COLORS[i % STAGE_COLORS.length].replace('0.85', '1')),
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
            title={<span style={{ color: 'white', fontWeight: 600 }}>Pipeline by Stage</span>}
            className={styles.chartCard}
            styles={{
                body: { padding: '16px 20px' },
                header: { background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)' },
            }}
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
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                    {stages.map((s, i) => (
                        <div
                            key={s.stageName}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: 12,
                                color: '#94a3b8',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 8,
                                    height: 8,
                                    borderRadius: 2,
                                    background: STAGE_COLORS[i % STAGE_COLORS.length],
                                }}
                            />
                            {s.stageName}
                            <span style={{ color: '#60a5fa', fontWeight: 600 }}>{s.count}</span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default PipelineBarChart;
