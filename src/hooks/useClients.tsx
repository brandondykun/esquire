import { useEffect, useState } from "react";
import { getClients } from "../api/apiCalls";
import { Client } from "../types";

const useClients = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clients, setClients] = useState<null | Client[]>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getClients()
      .then((res) => {
        const sorted = res.data.sort((a, b) => {
          return a.lastName.localeCompare(b.lastName);
        });
        setClients(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError("There was a problem fetching your list");
        setLoading(false);
      });
  }, []);

  return { loading, clients, error };
};

export default useClients;
