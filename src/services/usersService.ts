import { useQuery } from "@tanstack/react-query";
import { baseAPI } from ".";

export const getUsers = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["usersList"],
    queryFn: () => baseAPI.get("users"),
    refetchInterval: 5000,
  });
};
