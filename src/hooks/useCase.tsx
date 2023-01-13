import { useEffect, useState } from "react";
import { getCase } from "../api/apiCalls";
import { Case } from "../types";

type CaseProps = {
  id: number | undefined;
};

const useCase = ({ id }: CaseProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [caseInfo, setCaseInfo] = useState<null | Case>(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (id) {
      setError("");
      setLoading(true);
      getCase(id)
        .then((res) => {
          console.log("THIS IS THE CASE DATA: ", res.data);
          setCaseInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
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
