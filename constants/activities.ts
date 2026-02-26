export const ACTIVITY_TYPE_LABELS: Record<number, string> = {
  1: "Meeting",
  2: "Call",
  3: "Email",
  4: "Task",
  5: "Presentation",
  6: "Other",
};

export const ACTIVITY_TYPE_COLORS: Record<number, string> = {
  1: "purple",
  2: "blue",
  3: "cyan",
  4: "orange",
  5: "geekblue",
  6: "default",
};

export const ACTIVITY_TYPE_OPTIONS = [
  { value: 1, label: "Meeting" },
  { value: 2, label: "Call" },
  { value: 3, label: "Email" },
  { value: 4, label: "Task" },
  { value: 5, label: "Presentation" },
  { value: 6, label: "Other" },
];

export const ACTIVITY_STATUS_LABELS: Record<number, string> = {
  1: "Scheduled",
  2: "Completed",
  3: "Cancelled",
};

export const ACTIVITY_STATUS_COLORS: Record<number, string> = {
  1: "blue",
  2: "green",
  3: "red",
};

export const ACTIVITY_STATUS_OPTIONS = [
  { value: 1, label: "Scheduled" },
  { value: 2, label: "Completed" },
  { value: 3, label: "Cancelled" },
];

export const ACTIVITIES_PAGE_SIZE = 10;

export const PRIORITY_LABELS: Record<number, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

export const PRIORITY_COLORS: Record<number, string> = {
  1: "default",
  2: "blue",
  3: "orange",
  4: "red",
};
