import NotePreview from "./NotePreview";

type Note = {
  id: number;
  data: any; // this is bad so update this
  hasChanges: boolean;
};

type Props = {
  notes: Note[];
  //   note: Note;
  handleClick: (id: any) => void;
  currentNote: Note | null;
  currentHasChanges: boolean;
  handleDelete: (id: number) => void;
  //   previewText: string;
};

const NotesSidebar = ({
  notes,
  //   note,
  handleClick,
  currentNote,
  currentHasChanges,
  handleDelete,
}: //   previewText,
Props) => {
  return (
    <>
      {notes
        .sort((a, b) => b.id - a.id)
        .map((note) => {
          let previewText = "Untitled Note";
          if (note.data.content[0].hasOwnProperty("content")) {
            if (note.data.content[0]?.content[0].type === "text") {
              previewText = note.data.content[0].content[0].text;
            }
          }

          return (
            <NotePreview
              key={note.id}
              handleClick={handleClick}
              currentNote={currentNote}
              currentHasChanges={currentHasChanges}
              previewText={previewText}
              note={note}
              handleDelete={handleDelete}
            />
          );
        })}
    </>
  );
};

export default NotesSidebar;
