export const OPPORTUNITY_STAGE_LABELS: Record<number, string> = {
  1: "Lead",
  2: "Qualified",
  3: "Proposal",
  4: "Negotiation",
  5: "Closed Won",
  6: "Closed Lost",
};

export const OPPORTUNITY_STAGE_COLORS: Record<number, string> = {
  1: "gold",
  2: "blue",
  3: "purple",
  4: "orange",
  5: "green",
  6: "red",
};

export const OPPORTUNITY_STAGE_OPTIONS = [
  { value: 1, label: "Lead" },
  { value: 2, label: "Qualified" },
  { value: 3, label: "Proposal" },
  { value: 4, label: "Negotiation" },
  { value: 5, label: "Closed Won" },
  { value: 6, label: "Closed Lost" },
];

export const OPPORTUNITY_SOURCE_LABELS: Record<number, string> = {
  1: "Inbound",
  2: "Outbound",
  3: "Referral",
  4: "Partner",
  5: "RFP",
};

export const OPPORTUNITY_SOURCE_OPTIONS = [
  { value: 1, label: "Inbound" },
  { value: 2, label: "Outbound" },
  { value: 3, label: "Referral" },
  { value: 4, label: "Partner" },
  { value: 5, label: "RFP" },
];

export const OPPORTUNITIES_PAGE_SIZE = 10;

export const STAGE_ORDER = [1, 2, 3, 4, 5, 6];

export const STAGE_API_KEYS: Record<number, string> = {
  1: "Lead",
  2: "Qualified",
  3: "Proposal",
  4: "Negotiation",
  5: "ClosedWon",
  6: "ClosedLost",
};

export const PIPELINE_STAGE_COLORS = [
  "rgba(96,165,250,0.85)",
  "rgba(52,211,153,0.85)",
  "rgba(167,139,250,0.85)",
  "rgba(251,191,36,0.85)",
  "rgba(56,189,248,0.85)",
  "rgba(248,113,113,0.85)",
];
