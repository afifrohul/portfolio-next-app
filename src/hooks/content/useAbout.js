import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useAbout() {
  const { data, error, isLoading, mutate } = useSWR(
    "/internal/abouts",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    about: data || [],
    loading: isLoading,
    error,
    mutate,
  };
}
