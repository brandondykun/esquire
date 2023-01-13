import { useEffect, useState } from "react";
import { Address, Client } from "../types";
import { getClient, getAddress } from "../api/apiCalls";

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

  useEffect(() => {
    // get client name
    if (id) {
      setNameLoading(true);
      setAddressLoading(true);
      getClient(id)
        .then((res) => {
          setClientName(res.data);
          setNameLoading(false);
        })
        .catch((err) => {
          setNameError("There was a problem fetching that client");
          setNameLoading(false);
        });
      // get client address
      getAddress(id)
        .then((res) => {
          const response: Address = res.data[0];
          setAddress(response);
          setAddressLoading(false);
        })
        .catch((err) => {
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
