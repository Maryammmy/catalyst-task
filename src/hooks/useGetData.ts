import { useQuery } from "@tanstack/react-query";
import { baseAPI } from "../services";

export const useGetData = (queryKey: string, url: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => baseAPI.get(url),
    refetchInterval: 5000,
  });
};
