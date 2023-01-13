import { useEffect, useState } from "react";
import { getNotes } from "../api/apiCalls";

type Note = {
  id: number;
  data: { content: object[]; type: string };
  hasChanges: boolean;
};

const useNotes = () => {
  const [notesLoading, setNotesLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<null | Note[]>(null);
  const [notesError, setNotesError] = useState<null | string>(null);

  useEffect(() => {
    setNotesLoading(true);
    getNotes()
      .then((res) => {
        setNotes(res.data);
        setNotesLoading(false);
      })
      .catch((err) => {
        setNotesError("There was a problem fetching notes");
        setNotesLoading(false);
      });
  }, []);

  return { notesLoading, notes, notesError, setNotes };
};

export default useNotes;
