export const formatCurrency = (amount: number): string =>
  `ZAR ${(amount ?? 0).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;

export const calcLineTotal = (item: {
  quantity?: number;
  unitPrice?: number;
  discount?: number;
  taxRate?: number;
}): number => {
  const qty = item.quantity ?? 0;
  const price = item.unitPrice ?? 0;
  const disc = item.discount ?? 0;
  const tax = item.taxRate ?? 0;
  return qty * price * (1 - disc / 100) * (1 + tax / 100);
};
