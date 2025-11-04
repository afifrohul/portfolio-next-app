import { useEffect, useState } from "react";
import axios from "axios";

export default function useAbout() {
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchAbout() {
      try {
        const res = await axios.get("/internal/abouts");
        if (isMounted) setAbout(res.data);
      } catch (err) {
        console.error("Error fetching about:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAbout();
    return () => {
      isMounted = false;
    };
  }, []);

  return { about, loading };
}
