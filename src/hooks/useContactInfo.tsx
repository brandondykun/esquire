import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContactInfo } from "../api/apiCalls";
import { ContactInfo } from "../types";
import camelcaseKeys from "camelcase-keys";
import { useAuthContext } from "../context/AuthContext";

const useContactInfo = (id: number | string | undefined, trigger: boolean) => {
  const clientId = Number(id);

  const [contactLoading, setContactLoading] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<null | ContactInfo>(null);
  const [contactError, setContactError] = useState<null | string>(null);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setContactLoading(true);
      getContactInfo(clientId)
        .then((res) => {
          const formatted = camelcaseKeys(res.data);
          setContactInfo(formatted);
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
            setCurrentUser(null);
            navigate("/login");
          }
          setContactError("There was a problem fetching contact info");
        })
        .finally(() => setContactLoading(false));
    }
  }, [id, trigger]);

  return { contactLoading, contactInfo, contactError };
};

export default useContactInfo;
