import { IGetOpportunitiesParams } from "@/providers/opportunityProvider/context";
import {
  OPPORTUNITY_STAGE_LABELS,
  OPPORTUNITY_SOURCE_LABELS,
} from "@/constants/opportunities";

export const getStageLabel = (stage: number): string =>
  OPPORTUNITY_STAGE_LABELS[stage] ?? "Unknown";
export const getSourceLabel = (source: number): string =>
  OPPORTUNITY_SOURCE_LABELS[source] ?? "Unknown";

const CURRENCY_SYMBOL_MAP: Record<string, string> = {
  R: "ZAR",
  $: "USD",
  "€": "EUR",
  "£": "GBP",
};
const normaliseCurrency = (code: string | undefined | null): string =>
  CURRENCY_SYMBOL_MAP[code ?? ""] ??
  (code && /^[A-Z]{3}$/.test(code) ? code : "ZAR");

export const formatCurrency = (
  value: number,
  currency?: string | null,
): string =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: normaliseCurrency(currency),
    minimumFractionDigits: 0,
  }).format(value ?? 0);

export const buildOpportunitiesParams = (
  page: number,
  pageSize: number,
  filters: { searchTerm?: string; stage?: number; clientId?: string },
): IGetOpportunitiesParams => ({
  pageNumber: page,
  pageSize,
  ...(filters.searchTerm ? { searchTerm: filters.searchTerm } : {}),
  ...(filters.stage !== undefined ? { stage: filters.stage } : {}),
  ...(filters.clientId ? { clientId: filters.clientId } : {}),
});
