import { ReactNode } from "react";
import {
  IActivityDto,
  ICreateActivityDto,
  IUpdateActivityDto,
} from "@/providers/activityProvider/context";
import {
  IClientDto,
  ICreateClientDto,
  IUpdateClientDto,
} from "@/providers/clientProvider/context";
import {
  IContactDto,
  ICreateContactDto,
  IUpdateContactDto,
} from "@/providers/contactProvider/context";
import {
  IContractDto,
  ICreateContractDto,
  IUpdateContractDto,
  IContractRenewalDto,
  ICreateContractRenewalDto,
} from "@/providers/contractProvider/context";
import { IDocumentDto } from "@/providers/documentProvider/context";
import {
  INoteDto,
  ICreateNoteDto,
  IUpdateNoteDto,
} from "@/providers/noteProvider/context";
import {
  IOpportunityDto,
  ICreateOpportunityDto,
  IUpdateOpportunityDto,
} from "@/providers/opportunityProvider/context";
import {
  IPricingRequestDto,
  ICreatePricingRequestDto,
  IUpdatePricingRequestDto,
} from "@/providers/pricingRequestProvider/context";
import {
  IProposalDto,
  ICreateProposalDto,
  IUpdateProposalDto,
  ICreateProposalLineItemDto,
} from "@/providers/proposalProvider/context";
import {
  IActivitiesDashboardSummaryDto,
  IDashboardOverviewDto,
  IPipelineStageSummaryDto,
  IRevenueSummaryDto,
  ISalesPerformanceDto,
} from "@/providers/dashboardProvider/context";

export interface ActivitiesTableProps {
  data: IActivityDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (activity: IActivityDto) => void;
  onDelete: (id: string) => void;
  onView: (activity: IActivityDto) => void;
  onComplete: (activity: IActivityDto) => void;
  onCancel: (id: string) => void;
  canDelete?: boolean;
}

export interface ActivityFormModalProps {
  open: boolean;
  editing?: IActivityDto | null;
  loading: boolean;
  canAssign?: boolean;
  onSubmit: (values: ICreateActivityDto | IUpdateActivityDto) => void;
  onClose: () => void;
}

export interface CompleteActivityModalProps {
  open: boolean;
  loading: boolean;
  onSubmit: (outcome: string) => void;
  onClose: () => void;
}

export interface ClientFormModalProps {
  open: boolean;
  editing?: IClientDto | null;
  loading: boolean;
  onSubmit: (values: ICreateClientDto | IUpdateClientDto) => void;
  onClose: () => void;
}

export interface ClientsTableProps {
  data: IClientDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (client: IClientDto) => void;
  onDelete: (id: string) => void;
  onActivate: (client: IClientDto) => void;
  onView: (client: IClientDto) => void;
  canDelete?: boolean;
}

export interface ContactFormModalProps {
  open: boolean;
  editing?: IContactDto | null;
  loading: boolean;
  clients: IClientDto[];
  defaultClientId?: string;
  onSubmit: (values: ICreateContactDto | IUpdateContactDto) => void;
  onClose: () => void;
}

export interface ContactsTableProps {
  data: IContactDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (contact: IContactDto) => void;
  onDelete: (id: string) => void;
  onActivate: (contact: IContactDto) => void;
  onView: (contact: IContactDto) => void;
  onSetPrimary: (id: string) => void;
  canDelete?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface OpportunityWithClientOption extends SelectOption {
  clientId: string;
  clientName: string;
}

export interface ContractFormModalProps {
  open: boolean;
  editing: IContractDto | null;
  loading: boolean;
  onSubmit: (values: ICreateContractDto | IUpdateContractDto) => Promise<void>;
  onClose: () => void;
}

export interface ContractRenewalsTableProps {
  renewals: IContractRenewalDto[];
  loading: boolean;
  canComplete: boolean;
  onComplete: (renewalId: string) => Promise<void>;
}

export interface ContractsTableProps {
  data: IContractDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onView: (record: IContractDto) => void;
  onEdit: (record: IContractDto) => void;
  onDelete: (id: string) => void;
  onActivate: (record: IContractDto) => void;
  onCancel: (record: IContractDto) => void;
  onRenew: (record: IContractDto) => void;
  onCompleteRenewal: (record: IContractDto) => void;
  canDelete?: boolean;
  canActivateCancel?: boolean;
}

export interface RenewalModalProps {
  open: boolean;
  contract: IContractDto | null;
  loading: boolean;
  onSubmit: (
    contractId: string,
    payload: ICreateContractRenewalDto,
  ) => Promise<void>;
  onClose: () => void;
}

export interface DocumentsTableProps {
  data: IDocumentDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onView: (doc: IDocumentDto) => void;
  onDownload: (doc: IDocumentDto) => void;
  onDelete: (id: string) => void;
  canDelete?: boolean;
}

export interface DocumentUploadModalProps {
  open: boolean;
  loading: boolean;
  onUpload: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

// ─── Notes ────────────────────────────────────────────────────────────────────

export interface NoteFormModalProps {
  open: boolean;
  editing?: INoteDto | null;
  loading: boolean;
  onSubmit: (values: ICreateNoteDto | IUpdateNoteDto) => void;
  onClose: () => void;
}

export interface NotesTableProps {
  data: INoteDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (note: INoteDto) => void;
  onDelete: (id: string) => void;
  onView: (note: INoteDto) => void;
}

export interface AssignOpportunityModalProps {
  open: boolean;
  loading: boolean;
  currentOwnerId?: string;
  onSubmit: (values: { userId: string }) => void;
  onClose: () => void;
}

export interface OpportunitiesTableProps {
  data: IOpportunityDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (opp: IOpportunityDto) => void;
  onDelete: (id: string) => void;
  onView: (opp: IOpportunityDto) => void;
  canDelete?: boolean;
}

export interface OpportunityFormModalProps {
  open: boolean;
  editing?: IOpportunityDto | null;
  loading: boolean;
  clients: IClientDto[];
  onSubmit: (values: ICreateOpportunityDto | IUpdateOpportunityDto) => void;
  onClose: () => void;
}

export interface StageUpdateModalProps {
  open: boolean;
  loading: boolean;
  initialStage?: number;
  onSubmit: (values: { stage: number; reason?: string }) => void;
  onClose: () => void;
}

export interface ActivitiesSummaryCardsProps {
  activities: IActivitiesDashboardSummaryDto | undefined;
  loading: boolean;
}

export interface ContractsExpiringTableProps {
  contracts: IContractDto[];
  loading: boolean;
}

export interface KpiCardsProps {
  overview: IDashboardOverviewDto | null | undefined;
  loading: boolean;
}

export interface PipelineBarChartProps {
  stages: IPipelineStageSummaryDto[];
  loading: boolean;
}

export interface RevenueTrendChartProps {
  revenue: IRevenueSummaryDto | undefined;
  loading: boolean;
}

export interface TopPerformersTableProps {
  performers: ISalesPerformanceDto[];
  loading: boolean;
}

export interface AssignPricingRequestModalProps {
  open: boolean;
  request: IPricingRequestDto | null;
  loading: boolean;
  onAssign: (id: string, userId: string) => Promise<void>;
  onClose: () => void;
}

export interface PricingRequestFormModalProps {
  open: boolean;
  editing: IPricingRequestDto | null;
  loading: boolean;
  onSubmit: (
    values: ICreatePricingRequestDto | IUpdatePricingRequestDto,
  ) => Promise<void>;
  onClose: () => void;
}

export interface PricingRequestsTableProps {
  data: IPricingRequestDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onView: (record: IPricingRequestDto) => void;
  onEdit: (record: IPricingRequestDto) => void;
  onDelete: (id: string) => void;
  onComplete: (record: IPricingRequestDto) => void;
  onAssign: (record: IPricingRequestDto) => void;
  canDelete?: boolean;
  canAssign?: boolean;
}

export interface DraftLineItem extends ICreateProposalLineItemDto {
  _key: number;
}

export interface ProposalFormModalProps {
  open: boolean;
  editing: IProposalDto | null;
  loading: boolean;
  onSubmit: (values: ICreateProposalDto | IUpdateProposalDto) => Promise<void>;
  onClose: () => void;
}

export interface ProposalsTableProps {
  data: IProposalDto[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number, pageSize: number) => void;
  onView: (record: IProposalDto) => void;
  onEdit: (record: IProposalDto) => void;
  onDelete: (id: string) => void;
  onSubmit: (record: IProposalDto) => void;
  onApprove: (record: IProposalDto) => void;
  onReject: (record: IProposalDto) => void;
  canDelete?: boolean;
  canApproveReject?: boolean;
}

export interface RejectProposalModalProps {
  open: boolean;
  proposal: IProposalDto | null;
  loading: boolean;
  onReject: (id: string, reason: string) => Promise<void>;
  onClose: () => void;
}

export interface ClientSelectFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  className?: string;
  size?: "small" | "middle" | "large";
  placeholder?: string;
}

export interface InfoRowProps {
  label: string;
  value: ReactNode;
  copyable?: boolean;
  onCopy?: (value: string, label: string) => void;
}

export interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export interface AuthLayoutProps {
  children: ReactNode;
}

export interface AuthFooterLinkProps {
  text: string;
  linkHref: string;
  linkLabel: string;
}

export interface FormLabelProps {
  text: string;
}

export interface SpinnerProps {
  tip?: string;
  size?: number;
}

export type TabKey = "all" | "mine" | "pending";

export interface AiInsightsCardProps {
  data: Record<string, unknown>;
  type: "dashboard" | "report";
  title?: string;
  disabled?: boolean;
}
