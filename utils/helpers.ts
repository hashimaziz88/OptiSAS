export const toArray = <T>(
  data: T[] | { items?: T[] } | null | undefined,
): T[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray((data as { items?: T[] }).items))
    return (data as { items: T[] }).items;
  return [];
};
