import { useEffect, useState } from "react";
import axios from "axios";

export default function useExperiences() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchExperience() {
      try {
        const res = await axios.get("/internal/experiences");
        setExperience(res.data);
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchExperience();
    return () => {
      isMounted = false;
    };
  }, []);

  return { experience, loading };
}
