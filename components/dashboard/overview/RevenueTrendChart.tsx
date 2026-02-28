'use client';

import React from 'react';
import { Card } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '@/utils/dashboard/opportunities';
import { RevenueTrendChartProps } from '@/types/componentProps';
import { useStyles } from './style/style';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ revenue, loading }) => {
    const { styles } = useStyles();

    const trend = revenue?.monthlyTrend ?? [];

    const data = {
        labels: trend.map((m) => m.monthName),
        datasets: [
            {
                label: 'Actual',
                data: trend.map((m) => m.actual ?? 0),
                fill: true,
                borderColor: '#34d399',
                backgroundColor: 'rgba(52,211,153,0.12)',
                pointBackgroundColor: '#34d399',
                pointBorderColor: '#34d399',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
            },
            {
                label: 'Projected',
                data: trend.map((m) => m.projected ?? 0),
                fill: false,
                borderColor: '#60a5fa',
                backgroundColor: 'rgba(96,165,250,0.1)',
                borderDash: [5, 4],
                pointBackgroundColor: '#60a5fa',
                pointBorderColor: '#60a5fa',
                pointRadius: 3,
                pointHoverRadius: 5,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#94a3b8',
                    font: { size: 12 },
                    boxWidth: 12,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(15,23,42,0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                callbacks: {
                    label: (ctx: { dataset: { label?: string }; parsed: { y: number } }) =>
                        ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                    maxRotation: 45,
                    callback: (_: unknown, index: number) => {
                        const m = trend[index];
                        if (!m) return '';
                        return m.monthName.slice(0, 3);
                    },
                },
                grid: { color: 'rgba(255,255,255,0.04)' },
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
            title={<span style={{ color: 'white', fontWeight: 600 }}>Revenue Trend</span>}
            className={styles.chartCard}
            styles={{
                body: { padding: '16px 20px' },
                header: { background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)' },
            }}
            extra={
                revenue && (
                    <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
                        <span style={{ color: '#64748b' }}>
                            Month: <span style={{ color: '#34d399', fontWeight: 600 }}>{formatCurrency(revenue.thisMonth)}</span>
                        </span>
                        <span style={{ color: '#64748b' }}>
                            Quarter: <span style={{ color: '#60a5fa', fontWeight: 600 }}>{formatCurrency(revenue.thisQuarter)}</span>
                        </span>
                        <span style={{ color: '#64748b' }}>
                            Year: <span style={{ color: '#a78bfa', fontWeight: 600 }}>{formatCurrency(revenue.thisYear)}</span>
                        </span>
                    </div>
                )
            }
            loading={loading}
        >
            {trend.length > 0 ? (
                <div className={styles.chartContainer}>
                    <Line data={data} options={options as Parameters<typeof Line>[0]['options']} />
                </div>
            ) : (
                <div className={styles.emptyText}>No revenue trend data available</div>
            )}
        </Card>
    );
};

export default RevenueTrendChart;
