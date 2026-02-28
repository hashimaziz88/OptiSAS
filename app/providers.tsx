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
import { themeSetup } from "@/utils/themeSetup";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ConfigProvider
            theme={themeSetup}
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
