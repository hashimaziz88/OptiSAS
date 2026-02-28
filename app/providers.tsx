"use client";
import React from "react";
import { ConfigProvider, App } from "antd";
import { AuthProvider } from "@/providers/authProvider";
import { ClientProvider } from "@/providers/clientProvider";
import { ContactProvider } from "@/providers/contactProvider";
import { OpportunityProvider } from "@/providers/opportunityProvider";
import { ProposalProvider } from "@/providers/proposalProvider";
import { PricingRequestProvider } from "@/providers/pricingRequestProvider";
import { ContractProvider } from "@/providers/contractProvider";
import { ActivityProvider } from "@/providers/activityProvider";
import { DocumentProvider } from "@/providers/documentProvider";
import { NoteProvider } from "@/providers/noteProvider";
import { DashboardProvider } from "@/providers/dashboardProvider";
import { ReportProvider } from "@/providers/reportProvider";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    // Brand
                    colorPrimary: '#494c51',
                    // Links
                    colorLink: '#60a5fa',
                    colorLinkHover: '#93c5fd',
                    // Text hierarchy
                    colorTextSecondary: '#cbd5e0',
                    colorTextTertiary: '#8c8c8c',
                    colorTextQuaternary: '#666666',
                    // Borders
                    colorBorder: '#4e545f',
                    colorBorderSecondary: '#3a3d42',
                    // Controls
                    controlHeight: 40,
                    borderRadius: 8,
                    borderRadiusLG: 12,
                },
                components: {
                    Button: {
                        primaryShadow: 'none',
                        defaultShadow: 'none',
                        dangerShadow: 'none',
                    },
                    Input: {
                        colorBgContainer: 'rgba(255, 255, 255, 0.03)',
                        colorText: '#ffffff',
                        colorTextPlaceholder: '#666666',
                        activeShadow: 'none',
                    },
                    Select: {
                        colorBgContainer: 'rgba(255, 255, 255, 0.03)',
                        colorText: '#ffffff',
                        colorTextPlaceholder: '#666666',
                        // Dropdown
                        colorBgElevated: '#1e2128',
                        optionSelectedBg: 'rgba(96, 165, 250, 0.15)',
                        optionSelectedColor: '#ffffff',
                        optionActiveBg: 'rgba(255, 255, 255, 0.08)',
                        colorTextDisabled: 'rgba(255, 255, 255, 0.25)',
                    },
                    Segmented: {
                        itemColor: '#8c8c8c',
                        itemSelectedColor: '#ffffff',
                        itemSelectedBg: '#494c51',
                        trackBg: 'rgba(255, 255, 255, 0.05)',
                    },
                    Table: {
                        colorBgContainer: 'transparent',
                        headerBg: 'rgba(255, 255, 255, 0.04)',
                        headerColor: 'rgba(255, 255, 255, 0.5)',
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                        rowHoverBg: 'rgba(255, 255, 255, 0.05)',
                        bodySortBg: 'transparent',
                        fixedHeaderSortActiveBg: '#1e2128',
                        colorText: 'rgba(255, 255, 255, 0.85)',
                    },
                    Modal: {
                        contentBg: 'rgba(22, 26, 34, 0.98)',
                        headerBg: 'transparent',
                        titleColor: 'rgba(255, 255, 255, 0.88)',
                        colorIcon: 'rgba(255, 255, 255, 0.45)',
                        colorIconHover: 'rgba(255, 255, 255, 0.88)',
                        footerBg: 'transparent',
                        titleFontSize: 18,
                    },
                    Drawer: {
                        colorBgElevated: 'rgba(22, 26, 34, 0.98)',
                        colorText: 'rgba(255, 255, 255, 0.88)',
                        colorIcon: 'rgba(255, 255, 255, 0.45)',
                        colorIconHover: 'rgba(255, 255, 255, 0.88)',
                        colorSplit: 'rgba(255, 255, 255, 0.1)',
                    },
                    DatePicker: {
                        colorBgContainer: 'rgba(255, 255, 255, 0.03)',
                        colorBgElevated: '#1e2128',
                        colorText: 'rgba(255, 255, 255, 0.88)',
                        colorTextPlaceholder: '#666666',
                        colorBorder: '#4e545f',
                        cellHoverBg: 'rgba(255, 255, 255, 0.08)',
                        colorPrimary: '#60a5fa',
                        colorPrimaryHover: '#93c5fd',
                        activeShadow: 'none',
                    },
                    Pagination: {
                        itemBg: 'rgba(255, 255, 255, 0.06)',
                        itemActiveBg: 'rgba(255, 255, 255, 0.08)',
                        itemLinkBg: 'transparent',
                        colorBorder: 'rgba(255, 255, 255, 0.12)',
                        colorText: 'rgba(255, 255, 255, 0.75)',
                        colorPrimary: '#60a5fa',
                        colorPrimaryHover: '#93c5fd',
                    },
                    InputNumber: {
                        colorBgContainer: 'rgba(255, 255, 255, 0.03)',
                        colorText: '#ffffff',
                        colorTextPlaceholder: '#666666',
                        activeShadow: 'none',
                    },
                    Form: {
                        labelColor: 'rgba(255, 255, 255, 0.65)',
                    },
                    Descriptions: {
                        labelBg: 'rgba(255, 255, 255, 0.04)',
                        // v6 component-specific tokens for cell text
                        contentColor: '#e2e8f0',
                        titleColor: 'rgba(255, 255, 255, 0.88)',
                        extraColor: '#e2e8f0',
                        // label text uses colorTextSecondary scoped to this component
                        colorTextSecondary: '#94a3b8',
                        colorSplit: 'rgba(255, 255, 255, 0.1)',
                    },
                    Statistic: {
                        colorText: 'rgba(255, 255, 255, 0.85)',
                        titleFontSize: 14,
                    },
                },
            }}
        >
            <App>
                <AuthProvider>
                    <ClientProvider>
                        <ContactProvider>
                            <OpportunityProvider>
                                <ProposalProvider>
                                    <PricingRequestProvider>
                                        <ContractProvider>
                                            <ActivityProvider>
                                                <DocumentProvider>
                                                    <NoteProvider>
                                                        <DashboardProvider>
                                                            <ReportProvider>
                                                                {children}
                                                            </ReportProvider>
                                                        </DashboardProvider>
                                                    </NoteProvider>
                                                </DocumentProvider>
                                            </ActivityProvider>
                                        </ContractProvider>
                                    </PricingRequestProvider>
                                </ProposalProvider>
                            </OpportunityProvider>
                        </ContactProvider>
                    </ClientProvider>
                </AuthProvider>
            </App>
        </ConfigProvider>
    );
};
