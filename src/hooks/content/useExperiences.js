import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useExperiences() {
  const { data, error, isLoading, mutate } = useSWR(
    "/internal/experiences",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    experience: data || [],
    loading: isLoading,
    error,
    mutate,
  };
}
