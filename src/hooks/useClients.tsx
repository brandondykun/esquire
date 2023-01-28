import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../api/apiCalls";
import { useAuthContext } from "../context/AuthContext";
import { Client } from "../types";
import camelcaseKeys from "camelcase-keys";

const useClients = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clients, setClients] = useState<null | Client[]>(null);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser) {
      getClients(currentUser.id)
        .then((res) => {
          if (res.status === 200) {
            const formatted = camelcaseKeys(res.data);
            const sorted = formatted.sort((a, b) => {
              return a.lastName.localeCompare(b.lastName);
            });
            setClients(sorted);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
            navigate("/login");
          }
          setError("There was a problem fetching your list");
          setLoading(false);
        });
    }
  }, []);

  return { loading, clients, error };
};

export default useClients;
