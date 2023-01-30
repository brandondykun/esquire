import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address, Client, DbAddress, DbClient } from "../types";
import { getClient, getAddress } from "../api/apiCalls";
import camelcaseKeys from "camelcase-keys";

type ClientProps = {
  id: number | undefined;
};

const useClient = ({ id }: ClientProps) => {
  const [clientName, setClientName] = useState<Client | null>(null);
  const [nameLoading, setNameLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const [address, setAddress] = useState<Address | null>(null);
  const [addressLoading, setAddressLoading] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // get client name
    if (id) {
      setNameLoading(true);
      setAddressLoading(true);
      getClient(id)
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
      getAddress(id)
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
            navigate("/login");
          }
          setAddressError("There was a problem fetching the address");
          setAddressLoading(false);
        });
    } else {
      setAddress(null);
      setClientName(null);
      setNameLoading(true);
      setAddressLoading(true);
    }
  }, [id]);

  return {
    addressLoading,
    address,
    addressError,
    nameLoading,
    clientName,
    nameError,
  };
};

export default useClient;
