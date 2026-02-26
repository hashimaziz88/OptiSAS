export const formatCurrency = (val?: number) =>
  `ZAR ${(val ?? 0).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
