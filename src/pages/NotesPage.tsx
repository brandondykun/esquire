import { useState, useEffect } from "react";
import { isEqual } from "lodash";
// import NotesEditor from "../components/NotesEditor";
// import useNotes from "../hooks/useNotes";
// import NotePreview from "../components/NotePreview";
import NotesSidebar from "../components/NotesSidebar";
import { getNotes } from "../api/apiCalls";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../components/MenuBar";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { saveNote, editNote, deleteNote } from "../api/apiCalls";
import Switch from "react-switch";
import { useAuthContext } from "../context/AuthContext";
import camelcaseKeys from "camelcase-keys";

type Note = {
  id: number;
  data: { content: object[]; type: string };
  hasChanges: boolean;
  userId: number;
  clientId: number;
};

const errorPopup = { type: "error", message: "Error saving note." };
const successPopup = { type: "success", message: "Note Saved!" };
const loadingPopup = { type: "loading", message: "Saving..." };
const deletePopup = { type: "loading", message: "Deleting note..." };
const deleteErrorPopup = { type: "error", message: "Error deleting note." };
const deleteSuccessPopup = { type: "success", message: "Note deleted." };
const defaultPopup = { type: "", message: "" };

let defaultJSONString = '{"type":"doc","content":[{"type":"paragraph"}]}';

const NotesPage = () => {
  const [notes, setNotes] = useState<null | Note[]>(null);
  const [notesLoading, setNotesLoading] = useState<boolean>(true);
  const [notesError, setNotesError] = useState<null | string>(null);

  const [currentNote, setCurrentNote] = useState<null | any>(null);
  const [currentHasChanges, setCurrentHasChanges] = useState<boolean>(false);

  const [editing, setEditing] = useState(false);

  const [slideUpPopup, setSlideUpPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [popupMessage, setPopupMessage] = useState(defaultPopup);

  const { currentUser } = useAuthContext();

  // Initial fetch for the notes
  useEffect(() => {
    if (!currentUser) return;
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

  // handle a new note being selected
  const handleClick = (id: any) => {
    if (currentNote && id === currentNote.id) return;

    if (currentHasChanges && notes) {
      const updatedCurrent = {
        ...currentNote,
        data: editor?.getJSON(),
        hasChanges: true,
      };
      const notesCopy = [...notes];
      const filteredNotes = notesCopy.filter((n) => {
        return n.id !== currentNote.id;
      });
      setNotes([...filteredNotes, updatedCurrent]);
    }
    const newCurrentNote = notes?.find((note) => {
      return note.id === id;
    });

    if (newCurrentNote && newCurrentNote) {
      setCurrentNote(newCurrentNote ? newCurrentNote : null);
    }
    setCurrentHasChanges(false);
  };

  // handle click of the new note button
  const handleNewNoteClick = () => {
    setCurrentNote(null);
  };

  // The editor
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        TextStyle,
        Color,
        Placeholder.configure({
          showOnlyWhenEditable: false,
          placeholder: ({ editor }) => {
            if (editor.isEditable) {
              return "Add a new note…";
            }
            return "Toggle the switch to the right to start editing.";
          },
        }),
      ],
      content: currentNote ? currentNote.data : "<div></div>",
    },
    [currentNote]
  );

  // Determine if the current note in the editor has been changed
  useEffect(() => {
    if (currentNote && editor && !editor.isDestroyed) {
      const json = editor?.getJSON();
      const jsonIsDefault = JSON.stringify(json) === defaultJSONString; // Default editor content
      // Get the current note
      const current = notes?.find((n) => {
        return n.id === currentNote.id;
      });
      if (!isEqual(json, current?.data) && !jsonIsDefault) {
        if (!currentHasChanges) {
          setCurrentHasChanges(true);
        }
      } else if (
        JSON.stringify(json) === JSON.stringify(current?.data) &&
        !jsonIsDefault
      ) {
        if (currentHasChanges) {
          setCurrentHasChanges(false);
        }
      }
    }
  });

  // Toggle editor between editing and not editing
  if (editor && !editor.isDestroyed) {
    editor?.setEditable(editing);
  }

  // Toggle function to toggle editing
  const toggleEdit = () => {
    setEditing((prev) => !prev);
  };

  // Hide the note save/loading message popup
  const hidePopup = () => {
    setTimeout(() => {
      setSlideUpPopup(true);
    }, 1600);
    setTimeout(() => {
      setShowPopup(false);
      setSlideUpPopup(false);
      setPopupMessage({ type: "", message: "" });
    }, 2000);
  };

  const handleDelete = (id: number) => {
    setPopupMessage(deletePopup);
    setShowPopup(true);
    deleteNote(id)
      .then((res) => {
        if (res.status === 200) {
          if (id === currentNote?.id) {
            setCurrentNote(null);
          }
          const updatedNotes = notes?.filter((n) => {
            return n.id !== id;
          });
          setNotes(updatedNotes ? updatedNotes : null);
          setPopupMessage(deleteSuccessPopup);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setPopupMessage(deleteErrorPopup);
      })
      .finally(() => {
        hidePopup();
      });
  };

  // Save a note; triggered when the save button is clicked on the menu bar
  const handleSave = () => {
    setPopupMessage(loadingPopup);
    setShowPopup(true);

    // if note has an id - edit that note
    if (currentNote?.id && currentUser) {
      const formatted = {
        user_id: currentUser.id,
        id: currentNote.id,
        data: editor?.getJSON(),
        hasChanges: false,
        client_id: null, // TO DO need to set this at some point
      };
      editNote(currentNote.id, formatted)
        .then((res) => {
          if (res.status === 200) {
            if (notes) {
              const formatted = camelcaseKeys(res.data);
              const filtered = notes.filter((note) => {
                return note.id !== res.data.id;
              });
              setCurrentHasChanges(false);
              setNotes([...filtered, formatted]);
              setPopupMessage(successPopup);
              // setCurrentNote(res.data); // this is causing a rerender flash
            }
          }
        })
        .catch((err) => {
          setPopupMessage(errorPopup);
        })
        .finally(() => {
          hidePopup();
        });
    } else if (currentUser) {
      // note doesn't have an id - save new note
      const formatted = {
        data: editor?.getJSON(),
        hasChanges: false,
        user_id: currentUser.id,
        client_id: null, // TO DO need to set this at some point
      };
      saveNote(formatted)
        .then((res) => {
          if (res.status === 201) {
            if (notes) {
              const formatted = camelcaseKeys(res.data);
              setCurrentHasChanges(false);
              setNotes([...notes, formatted]);
              setPopupMessage(successPopup);
              setCurrentNote(formatted); // this is causing a rerender flash
            }
          }
        })
        .catch((err) => {
          setPopupMessage(errorPopup);
        })
        .finally(() => {
          hidePopup();
        });
    }
  };

  return (
    <div className="page-container">
      <div className="notes-page-container">
        <div className="notes-preview-sidebar">
          <button className="new-note-button" onClick={handleNewNoteClick}>
            ADD NEW NOTE +
          </button>
          {notes && (
            <NotesSidebar
              notes={notes}
              handleClick={handleClick}
              currentNote={currentNote}
              currentHasChanges={currentHasChanges}
              handleDelete={handleDelete}
            />
          )}
        </div>

        <div className="notes-editor-container">
          {editor?.isEditable ? (
            <MenuBar
              editor={editor}
              handleSave={handleSave}
              saving={showPopup}
            />
          ) : (
            <div className="tip-tap-menu-bar-read-mode">
              <div>READ MODE</div>
            </div>
          )}
          <div className="editor-content-wrapper">
            <EditorContent editor={editor} />
            <div className="editor-edit-button">
              <Switch
                onChange={toggleEdit}
                checked={editing}
                height={20}
                width={40}
              />
            </div>

            <div
              className={`note-loading-indicator ${showPopup ? "show" : ""} ${
                slideUpPopup ? "hide" : ""
              }`}
            >
              {popupMessage.message ? popupMessage.message : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
