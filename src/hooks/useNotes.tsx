import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../api/apiCalls";
import camelcaseKeys from "camelcase-keys";
import { useAuthContext } from "../context/AuthContext";

type Note = {
  id: number;
  data: { content: object[]; type: string };
  hasChanges: boolean;
  userId: number;
  clientId: number | null;
};

const useNotes = () => {
  const [notesLoading, setNotesLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<null | Note[]>(null);
  const [notesError, setNotesError] = useState<null | string>(null);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setNotesLoading(true);
      getNotes()
        .then((res) => {
          if (res.status === 200) {
            const formatted = camelcaseKeys(res.data);
            setNotes(formatted);
            setNotesLoading(false);
          }
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
            setCurrentUser(null);
            navigate("/login");
          }
          setNotesError("There was a problem fetching notes");
          setNotesLoading(false);
        });
    }
  }, []);

  return { notesLoading, notes, notesError, setNotes };
};

export default useNotes;
