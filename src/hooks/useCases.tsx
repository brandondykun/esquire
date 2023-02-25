import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCases } from "../api/apiCalls";
import { Case } from "../types";
import camelcaseKeys from "camelcase-keys";
import { useAuthContext } from "../context/AuthContext";

type CasesProps = {
  id: number | undefined;
};

const useCases = (id: number | string | undefined) => {
  const clientId = Number(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [cases, setCases] = useState<null | Case[]>(null);
  const [error, setError] = useState<null | string>(null);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (id && currentUser) {
      setError("");
      setLoading(true);
      getCases(clientId)
        .then((res) => {
          if (res.status === 200) {
            const formatted = camelcaseKeys(res.data);
            setCases(formatted);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
            setCurrentUser(null);
            navigate("/login");
          }
          setError("There was a problem fetching the cases");
          setLoading(false);
        });
    }
    if (!id) {
      setError("Select a client to see their case list.");
      setCases(null);
      setLoading(true);
      // setLoading(false);
    }
  }, [id]);

  return { loading, cases, setCases, error };
};

export default useCases;
