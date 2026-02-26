export const isAdmin = (roles?: string[] | null): boolean =>
  roles?.includes("Admin") ?? false;

export const isAdminOrManager = (roles?: string[] | null): boolean =>
  roles?.some((r) => r === "Admin" || r === "SalesManager") ?? false;

export const isAdminOrManagerOrBDM = (roles?: string[] | null): boolean =>
  roles?.some(
    (r) =>
      r === "Admin" ||
      r === "SalesManager" ||
      r === "BusinessDevelopmentManager",
  ) ?? false;
