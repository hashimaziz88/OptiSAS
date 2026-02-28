import { ScenarioType } from "@/types/auth";

export const ROLE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Admin: { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
  SalesManager: { color: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.3)' },
  BusinessDevelopmentManager: { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)' },
  SalesRep: { color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
};

export const ROLE_LABELS: Record<string, string> = {
  Admin: 'Admin',
  SalesManager: 'Sales Manager',
  BusinessDevelopmentManager: 'BDM',
  SalesRep: 'Sales Rep',
};

export const ROLE_OPTIONS = [
  { value: "SalesRep", label: "Sales Representative" },
  { value: "SalesManager", label: "Sales Manager" },
  {
    value: "BusinessDevelopmentManager",
    label: "Business Development Manager",
  },
];

export const SCENARIO_OPTIONS = [
  { value: "shared", label: "Shared" },
  { value: "new-org", label: "New Org" },
  { value: "join-org", label: "Join Org" },
];

export const SCENARIO_HINTS: Record<ScenarioType, string> = {
  shared:
    "Access the default shared workspace. Defaults to Sales Representative.",
  "new-org": "Create a new isolated organisation. You will become its Admin.",
  "join-org":
    "Join an existing organisation using an invitation code from your Admin.",
};
