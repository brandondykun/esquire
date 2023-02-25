import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address } from "../types";
import { getAddress } from "../api/apiCalls";
import camelcaseKeys from "camelcase-keys";
import { useAuthContext } from "../context/AuthContext";

// type ClientProps = {
//   id: number | undefined;
// };

const useClientAddress = (
  id: number | string | undefined,
  trigger: boolean
) => {
  const clientId = Number(id);

  const [address, setAddress] = useState<Address | null>(null);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    // get client name
    if (id && currentUser && !trigger) {
      // get client address
      getAddress(clientId)
        .then((res) => {
          if (res.status === 200) {
            // format the backend object to match front end structure
            const formatted = camelcaseKeys(res.data);
            setAddress(formatted);
            setAddressLoading(false);
          }
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
            setCurrentUser(null);
            navigate("/login");
          }
          setAddressError("There was a problem fetching the address");
          setAddressLoading(false);
        });
    } else {
      setAddress(null);
      setAddressLoading(true);
    }
  }, [id, trigger]);

  return {
    addressLoading,
    address,
    addressError,
  };
};

export default useClientAddress;
