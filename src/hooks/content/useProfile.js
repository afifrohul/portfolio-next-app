import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useProfile() {
  const { data, error, isLoading, mutate } = useSWR(
    "/internal/profiles",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  console.log(data)

  return {
    profile: data || [],
    loading: isLoading,
    error,
    mutate,
  };
}
