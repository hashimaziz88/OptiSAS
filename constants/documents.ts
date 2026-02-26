export const DOCUMENT_CATEGORY_OPTIONS = [
  { value: 1, label: "Contract" },
  { value: 2, label: "Proposal" },
  { value: 3, label: "Presentation" },
  { value: 4, label: "Quote" },
  { value: 5, label: "Report" },
  { value: 6, label: "Other" },
];

export const DOCUMENT_CATEGORY_LABELS: Record<number, string> = {
  1: "Contract",
  2: "Proposal",
  3: "Presentation",
  4: "Quote",
  5: "Report",
  6: "Other",
};

export const DOCUMENT_CATEGORY_COLORS: Record<number, string> = {
  1: "blue",
  2: "green",
  3: "purple",
  4: "orange",
  5: "cyan",
  6: "default",
};

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

export const DOCUMENTS_PAGE_SIZE = 10;

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
