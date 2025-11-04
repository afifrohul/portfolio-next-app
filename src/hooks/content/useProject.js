import { useEffect, useState } from "react";
import axios from "axios";

export default function useProject() {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProject() {
      try {
        const res = await axios.get("/internal/projects");
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project :", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProject();
    return () => {
      isMounted = false;
    };
  }, []);

  return { project, loading };
}
