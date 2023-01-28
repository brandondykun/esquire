import { useEffect, useState } from "react";
import { getNotes } from "../api/apiCalls";
import camelcaseKeys from "camelcase-keys";

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

  useEffect(() => {
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
        setNotesError("There was a problem fetching notes");
        setNotesLoading(false);
      });
  }, []);

  return { notesLoading, notes, notesError, setNotes };
};

export default useNotes;
