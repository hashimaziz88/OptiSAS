import { axiosInstance } from "@/utils/axiosInstance";
import { RELATED_ENDPOINTS } from "@/constants/notes";

const BASE_URL = process.env.NEXT_PUBLIC_API_LINK;

export const resolveRecordName = async (
  type: number,
  id: string,
): Promise<string> => {
  try {
    const res = await axiosInstance().get(
      `${BASE_URL}${RELATED_ENDPOINTS[type]}/${id}`,
    );
    const record = res.data;
    return (
      record?.name ??
      record?.title ??
      record?.subject ??
      record?.proposalNumber ??
      record?.contractNumber ??
      id
    );
  } catch {
    return id;
  }
};
