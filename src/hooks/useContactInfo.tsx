import { useEffect, useState } from "react";
import { getContactInfo } from "../api/apiCalls";
import { ContactInfo } from "../types";

type ContactInfoProp = {
  id: number;
};

const useContactInfo = ({ id }: ContactInfoProp) => {
  const [contactLoading, setContactLoading] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<null | ContactInfo>(null);
  const [contactError, setContactError] = useState<null | string>(null);

  useEffect(() => {
    setContactLoading(true);
    getContactInfo(id)
      .then((res) => {
        const info = res.data[0];
        setContactInfo({ phone: info.phone, email: info.email });
        setContactLoading(false);
      })
      .catch((err) => {
        setContactError("There was a problem fetching contact info");
        setContactLoading(false);
      });
  }, [id]);

  return { contactLoading, contactInfo, contactError };
};

export default useContactInfo;
