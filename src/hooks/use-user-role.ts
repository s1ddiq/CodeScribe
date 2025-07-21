import { useState, useEffect } from "react";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchRole = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/user/role");
        if (!res.ok) {
          throw new Error(`Failed to fetch role (${res.status})`);
        }

        const data = await res.json();
        if (mounted) {
          setRole(data.role);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "An error occurred");
          setRole(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchRole();

    return () => {
      mounted = false;
    };
  }, []);

  return { role, loading, error };
}
