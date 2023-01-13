import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";

type Note = {
  id: number;
  data: { content: object[]; type: string };
  hasChanges: boolean;
};

type Props = {
  note: Note;
  handleClick: (id: any) => void;
  currentNote: Note | null;
  currentHasChanges: boolean;
  previewText: string;
  handleDelete: (id: number) => void;
};

const NotePreview = ({
  note,
  handleClick,
  currentNote,
  currentHasChanges,
  previewText,
  handleDelete,
}: Props) => {
  const shouldHaveIndicator =
    (currentHasChanges && note?.id === currentNote?.id) || note.hasChanges;

  //   console.log("NOTE ID: ", note?.id);
  //   console.log("Current Has Changes: ", currentHasChanges);
  //   console.log("Note id === current note id: ", note?.id === currentNote?.id);
  //   console.log("note.hasChanges: ", note.hasChanges);

  //   console.log(previewText, "  SHOULD HAVE INDICATOR: ", shouldHaveIndicator);
  //   console.log("NOTE: ", note);

  //   console.log("CURRENT HAS CHANGES: ", currentHasChanges);
  return (
    <div
      key={note?.id}
      onClick={() => handleClick(note.id)}
      className={`note-preview ${currentNote?.id === note?.id ? "active" : ""}`}
    >
      <div className="note-change-indicator-container">
        {shouldHaveIndicator && (
          <>
            <Tooltip
              anchorId={`indicator-${note?.id}`}
              content="Note has unsaved changes"
              place="right"
              delayShow={500}
              className="note-change-indicator-tool-tip"
            />
            <div
              id={`indicator-${note?.id}`}
              className="note-change-indicator"
            ></div>
          </>
        )}
      </div>
      <div className="note-preview-text-container">
        <div className="note-preview-text">{previewText}</div>
        <button
          className="note-delete-button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(Number(note?.id));
          }}
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};

export default NotePreview;
