import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { saveNote, editNote, getNote } from "../api/apiCalls";
import Switch from "react-switch";
import { useAuthContext } from "../context/AuthContext";

type Note = {
  id: number;
  data: { content: object[]; type: string };
  hasChanges: boolean;
};

type Props = {
  note: Note | null;
  setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>;
  notes: Note[] | null;
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | null>>;
  currentHasChanges: boolean;
  setCurrentHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  currentNoteChange: any | null;
  setCurrentNoteChange: React.Dispatch<React.SetStateAction<Note | null>>;
};

const errorPopup = { type: "error", message: "Error saving note." };
const successPopup = { type: "success", message: "Note Saved!" };
const loadingPopup = { type: "loading", message: "Saving..." };
const defaultPopup = { type: "", message: "" };

let changedJSON: any = {};
let defaultJSONString = '{"type":"doc","content":[{"type":"paragraph"}]}';

const NotesEditor = ({
  setNotes,
  notes,
  setCurrentNote,
  setCurrentHasChanges,
  setCurrentNoteChange,
  currentHasChanges,
  currentNoteChange,
  note,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [slideUpPopup, setSlideUpPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(defaultPopup);
  const [content, setContent] = useState<JSON | null>(null);

  const { currentUser } = useAuthContext();

  const editor = useEditor({
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
    // content: note ? note.data : "<div></div>",
    content: "<div></div>",

    onUpdate({ editor }) {
      const json = editor?.getJSON();
      const jsonIsDefault = JSON.stringify(json) === defaultJSONString; // Default editor content
      console.log("json", JSON.stringify(json));
      console.log("currentNoteChange", currentNoteChange);

      // if (
      //   !jsonIsDefault &&
      //   JSON.stringify(currentNoteChange) !== JSON.stringify(json)
      // ) {
      //   setCurrentNoteChange(json);
      //   console.log("UPDATED PARENT STATE: ", JSON.stringify(json));
      // }
    },
  });

  useEffect(() => {
    if (note) {
      editor?.commands.setContent(note.data);
    }
  }, [note]);

  // Determine if the current note in the editor has been changed
  useEffect(() => {
    if (note) {
      const json = editor?.getJSON();
      const jsonIsDefault = JSON.stringify(json) === defaultJSONString; // Default editor content
      if (
        JSON.stringify(json) !== JSON.stringify(note?.data) &&
        !jsonIsDefault
      ) {
        if (!currentHasChanges) {
          setCurrentHasChanges(true);
        }
      } else if (
        JSON.stringify(json) === JSON.stringify(note?.data) &&
        !jsonIsDefault
      ) {
        if (currentHasChanges) {
          setCurrentHasChanges(false);
        }
      }
    }
  });

  useEffect(() => {
    setCurrentHasChanges(false);
    return () => {
      const originalNote = JSON.stringify(note?.data);
      const editorContent = JSON.stringify(changedJSON);
      const originalNoteIsDefault = defaultJSONString === originalNote;

      if (originalNote && editorContent !== originalNote) {
        if (notes) {
          const filtered = notes?.filter((n) => {
            return n.id !== note?.id;
          });
          // console.log("SET THE NEW NOTES");
          // console.log("NEW NOTES: ", [
          //   ...filtered,
          //   { id: note?.id, data: changedJSON, hasChanges: true },
          // ]);
          // setNotes([
          //   ...filtered,
          //   { id: note?.id, data: changedJSON, hasChanges: true },
          // ]);
          setCurrentHasChanges(false);
        }
      }
    };
  }, [note]);

  if (editor && !editor.isDestroyed) {
    editor?.setEditable(editing);
  }

  const toggleEdit = () => {
    setEditing((prev) => !prev);
  };

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

  const handleSave = () => {
    setPopupMessage(loadingPopup);
    setShowPopup(true);

    // if note has an id - edit that note
    if (note?.id) {
      const formatted = {
        id: note.id,
        data: editor?.getJSON(),
        hasChanges: false,
        client_id: null,
        user_id: currentUser?.id,
      };
      editNote(note.id, formatted)
        .then((res) => {
          if (res.status === 200) {
            if (notes) {
              const filtered = notes.filter((note) => {
                return note.id !== res.data.id;
              });
              setCurrentHasChanges(false);
              setNotes([...filtered, res.data]);
              setPopupMessage(successPopup);
              setCurrentNote(res.data);
            }
          }
        })
        .catch((err) => {
          setPopupMessage(errorPopup);
        })
        .finally(() => {
          hidePopup();
        });
    } else {
      // note doesn't have an id - save new note
      const formatted = { data: editor?.getJSON(), hasChanges: false };
      saveNote(formatted)
        .then((res) => {
          if (res.status === 201) {
            if (notes) {
              setCurrentHasChanges(false);
              setNotes([...notes, res.data]);
              setPopupMessage(successPopup);
              setCurrentNote(res.data);
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

  return null;
  // <div className="notes-editor-container">
  //   {editor?.isEditable ? (
  //     <MenuBar editor={editor} handleSave={handleSave} saving={showPopup} />
  //   ) : (
  //     <div className="tip-tap-menu-bar-read-mode">
  //       <div>READ MODE</div>
  //     </div>
  //   )}
  //   <div className="editor-content-wrapper">
  //     <EditorContent editor={editor} />
  //     <div className="editor-edit-button">
  //       <label>
  //         <span>Edit</span>
  //         <Switch
  //           onChange={toggleEdit}
  //           checked={editing}
  //           height={20}
  //           width={40}
  //         />
  //       </label>
  //     </div>

  //     <div
  //       className={`note-loading-indicator ${showPopup ? "show" : ""} ${
  //         slideUpPopup ? "hide" : ""
  //       }`}
  //     >
  //       {popupMessage.message ? popupMessage.message : ""}
  //     </div>
  //   </div>
  // </div>
};

export default NotesEditor;
