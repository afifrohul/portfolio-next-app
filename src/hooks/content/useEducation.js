import { useEffect, useState } from "react";
import axios from "axios";

export default function useEducation() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchEducation() {
      try {
        const res = await axios.get("/internal/educations");
        if (isMounted) setEducation(res.data);
      } catch (err) {
        console.error("Error fetching education:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchEducation();
    return () => {
      isMounted = false;
    };
  }, []);

  return { education, loading };
}
