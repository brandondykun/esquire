import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContactInfo } from "../api/apiCalls";
import { ContactInfo } from "../types";
import camelcaseKeys from "camelcase-keys";

type ContactInfoProp = {
  id: number;
};

const useContactInfo = ({ id }: ContactInfoProp) => {
  const [contactLoading, setContactLoading] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<null | ContactInfo>(null);
  const [contactError, setContactError] = useState<null | string>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setContactLoading(true);
    getContactInfo(id)
      .then((res) => {
        const formatted = camelcaseKeys(res.data);
        setContactInfo(formatted);
      })
      .catch((err) => {
        if (err.response?.data?.error === "NO TOKEN") {
          navigate("/login");
        }
        setContactError("There was a problem fetching contact info");
      })
      .finally(() => setContactLoading(false));
  }, [id]);

  return { contactLoading, contactInfo, contactError };
};

export default useContactInfo;
