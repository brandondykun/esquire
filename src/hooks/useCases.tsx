import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCases } from "../api/apiCalls";
import { Case } from "../types";
import camelcaseKeys from "camelcase-keys";

type CasesProps = {
  id: number | undefined;
};

const useCases = ({ id }: CasesProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cases, setCases] = useState<null | Case[]>(null);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setError("");
      setLoading(true);
      getCases(id)
        .then((res) => {
          console.log("CASES RES: ", res);
          if (res.status === 200) {
            const formatted = camelcaseKeys(res.data);
            setCases(formatted);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
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

  return { loading, cases, error };
};

export default useCases;
