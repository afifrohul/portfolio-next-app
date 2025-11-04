import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useProject() {
  const { data, error, isLoading, mutate } = useSWR(
    "/internal/projects",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    project: data || [],
    loading: isLoading,
    error,
    mutate,
  };
}
