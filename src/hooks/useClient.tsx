import { useEffect, useState } from "react";
import { Client } from "../types";
import { getClient } from "../api/apiCalls";
import camelcaseKeys from "camelcase-keys";
import { useAuthContext } from "../context/AuthContext";

const useClient = (id: number | string | undefined, trigger?: boolean) => {
  const clientId = Number(id);

  const [clientName, setClientName] = useState<Client | null>(null);
  const [nameLoading, setNameLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    // get client name
    if (id && currentUser && !trigger) {
      setNameLoading(true);
      getClient(clientId)
        .then((res) => {
          if (res.status === 200) {
            // format the backend object to match front end structure
            const formatted = camelcaseKeys(res.data);
            setClientName(formatted);
            setNameLoading(false);
          }
        })
        .catch((err) => {
          setNameError("There was a problem fetching that client");
          setNameLoading(false);
        });
      // get client address
    } else {
      // setClientName(null);
      // setNameLoading(true);
    }
  }, [id, trigger ? trigger : null]);

  return {
    nameLoading,
    clientName,
    nameError,
  };
};

export default useClient;
