import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useEducation() {
  const { data, error, isLoading, mutate } = useSWR(
    "/internal/educations",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    education: data || [],
    loading: isLoading,
    error,
    mutate,
  };
}
