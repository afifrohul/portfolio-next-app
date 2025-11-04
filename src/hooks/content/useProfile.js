import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        const res = await axios.get("/internal/profiles");
        if (isMounted) {
          const firstSrc = res.data?.[0]?.src || null;
          setProfile(firstSrc);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  return { profile, loading };
}
