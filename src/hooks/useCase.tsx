import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCase } from "../api/apiCalls";
import { Case } from "../types";
import { useAuthContext } from "../context/AuthContext";
import camelcaseKeys from "camelcase-keys";

type CaseProps = {
  id: number | undefined;
};

const useCase = (id: number | string | undefined) => {
  const caseId = Number(id);

  const [loading, setLoading] = useState<boolean>(false);
  const [caseInfo, setCaseInfo] = useState<null | Case>(null);
  const [error, setError] = useState<null | string>(null);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (id && currentUser) {
      setError("");
      setLoading(true);
      getCase(caseId)
        .then((res) => {
          if (res.status === 200) {
            const formatted = camelcaseKeys(res.data);
            setCaseInfo(formatted);
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
      setCaseInfo(null);
      setLoading(true);
      // setLoading(false);
    }
  }, [id]);

  return { loading, caseInfo, error };
};

export default useCase;
