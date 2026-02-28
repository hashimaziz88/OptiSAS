'use client';

import React from 'react';
import { Tag, Tooltip, Typography, message } from 'antd';
import {
    CopyOutlined,
    KeyOutlined,
    MailOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useAuthState } from '@/providers/authProvider';
import { generateInvitationCode } from '@/utils/auth/invitationCode';
import { useStyles } from '@/components/profile/style/style';
import InfoRow from '@/components/profile/InfoRow';

const { Title, Text } = Typography;

const ROLE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
    Admin: { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
    SalesManager: { color: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.3)' },
    BusinessDevelopmentManager: { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)' },
    SalesRep: { color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
};

const ROLE_LABELS: Record<string, string> = {
    Admin: 'Admin',
    SalesManager: 'Sales Manager',
    BusinessDevelopmentManager: 'BDM',
    SalesRep: 'Sales Rep',
};

const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
        message.success(`${label} copied`);
    });
};

const ProfilePage: React.FC = () => {
    const { styles } = useStyles();
    const { user } = useAuthState();

    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'User';
    const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join('') || 'U';
    const roles = user?.roles ?? [];

    const sessionExpiry = user?.expiresAt ? dayjs(user.expiresAt) : null;
    const isSessionValid = sessionExpiry ? sessionExpiry.isAfter(dayjs()) : false;

    const canInvite = roles.some((r) => r === 'Admin' || r === 'SalesManager' || r === 'BusinessDevelopmentManager');
    const inviteCode = canInvite && user?.tenantId ? generateInvitationCode(user.tenantId) : null;
    // Next UTC midnight expressed in local time
    const nowUtc = new Date();
    const nextUtcMidnight = dayjs(
        new Date(Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate() + 1))
    );

    return (
        <div className={styles.page}>
            <Title level={3} className={styles.pageTitle}>My Profile</Title>

            {/* Identity card */}
            <div className={styles.card}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatar}>{initials}</div>
                    <div>
                        <Title level={4} className={styles.userName}>{fullName}</Title>
                        <Text className={styles.userEmail}>
                            <MailOutlined className={styles.iconBlue} />
                            {user?.email ?? '—'}
                        </Text>
                        {roles.length > 0 && (
                            <div className={styles.rolesRow}>
                                {roles.map((role) => {
                                    const style = ROLE_COLORS[role] ?? ROLE_COLORS.SalesRep;
                                    return (
                                        <Tag
                                            key={role}
                                            className={styles.roleTag}
                                            style={{
                                                color: style.color,
                                                background: style.bg,
                                                border: `1px solid ${style.border}`,
                                            }}
                                            icon={<SafetyCertificateOutlined />}
                                        >
                                            {ROLE_LABELS[role] ?? role}
                                        </Tag>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Account details */}
            <div className={styles.card}>
                <Text strong className={styles.sectionLabel}>
                    <UserOutlined className={styles.iconBlueWide} />
                    Account Details
                </Text>

                <div className={styles.accountDetailsColumn}>
                    <InfoRow
                        label="Email Address"
                        value={user?.email ?? '—'}
                        copyable
                        onCopy={handleCopy}
                    />
                </div>
            </div>


            {/* Invite team members — Admin / SalesManager only */}
            {inviteCode && (
                <div className={styles.card}>
                    <Text strong className={styles.sectionLabel}>
                        <KeyOutlined className={styles.iconGold} />
                        Invite Team Members
                    </Text>

                    <Text className={styles.inviteHelpText}>
                        Share this code with colleagues so they can join your organisation when registering.
                        The code refreshes every day at UTC midnight.
                    </Text>

                    <span className={styles.inviteCode}>
                        <span className={styles.flexOne}>{inviteCode}</span>
                        <Tooltip title="Copy invitation code">
                            <CopyOutlined
                                className={styles.clickableIcon}
                                onClick={() => handleCopy(inviteCode, 'Invitation code')}
                            />
                        </Tooltip>
                    </span>

                    <Text className={styles.inviteExpiry}>
                        Expires {nextUtcMidnight.format('DD MMM YYYY [at] HH:mm')} (local time)
                    </Text>
                </div>
            )}

            {/* Session */}

        </div>
    );
};

export default ProfilePage;
