import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../api/apiCalls";
import { useAuthContext } from "../context/AuthContext";
import { Client } from "../types";
import camelcaseKeys from "camelcase-keys";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientsById } from "../reducers/clientsSlice";
import { AppDispatch } from "../store/store";
import { getCurrentUser } from "../reducers/authSlice";

const useClients = (trigger?: boolean) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clients, setClients] = useState<null | Client[]>(null);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(getCurrentUser);

  // const { currentUser, setCurrentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchClientsById(currentUser.id));
      // getClients(currentUser.id)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       const formatted = camelcaseKeys(res.data);
      //       const sorted = formatted.sort((a: Client, b: Client) => {
      //         return a.lastName.localeCompare(b.lastName);
      //       });
      //       setClients(sorted);
      //       setLoading(false);
      //     }
      //   })
      //   .catch((err) => {
      //     if (err.response?.data?.error === "NO TOKEN") {
      //       setCurrentUser(null);
      //       navigate("/login");
      //     }
      //     setError("There was a problem fetching your list");
      //     setLoading(false);
      //   });
    }
  }, [trigger ? trigger : null]);

  return { loading, clients, error };
};

export default useClients;
