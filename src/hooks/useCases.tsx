import { useEffect, useState } from "react";
import { getCases } from "../api/apiCalls";
import { Case } from "../types";

type CasesProps = {
  id: number | undefined;
};

const useCases = ({ id }: CasesProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cases, setCases] = useState<null | Case[]>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (id) {
      setError("");
      setLoading(true);
      getCases(id)
        .then((res) => {
          setCases(res.data);
          setLoading(false);
        })
        .catch((err) => {
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
