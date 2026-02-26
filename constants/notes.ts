export const RELATED_TO_TYPE_OPTIONS = [
  { value: 1, label: "Client" },
  { value: 2, label: "Opportunity" },
  { value: 3, label: "Proposal" },
  { value: 4, label: "Contract" },
  { value: 5, label: "Activity" },
];

export const RELATED_TO_TYPE_LABELS: Record<number, string> = {
  1: "Client",
  2: "Opportunity",
  3: "Proposal",
  4: "Contract",
  5: "Activity",
};

export const NOTES_PAGE_SIZE = 10;

export const RELATED_ENDPOINTS: Record<number, string> = {
  1: "/api/Clients",
  2: "/api/Opportunities",
  3: "/api/Proposals",
  4: "/api/Contracts",
  5: "/api/Activities",
};
