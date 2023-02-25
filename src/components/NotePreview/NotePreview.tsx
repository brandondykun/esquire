import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { RotateLoader } from "react-spinners";

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
  const [isOpen, setIsOpen] = useState(false);

  const root = document.getElementById("root");

  const removeClick = () => {
    setIsOpen(false);
    console.log("REMOVED EVENT LISTENER");
    root?.removeEventListener("click", removeClick);
  };

  const handleTrashButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
    console.log("ADDED EVENT LISTENER");
    root?.addEventListener("click", removeClick);
  };

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
        <Tooltip
          anchorId={`delete-button-anchor-${note.id}`}
          // events={["click"]}
          place="right"
          className="note-delete-tooltip"
          classNameArrow="note-delete-tooltip-arrow"
          isOpen={isOpen}
          offset={14}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(Number(note?.id));
              setIsOpen(false);
            }}
          >
            DELETE
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            CANCEL
          </button>
        </Tooltip>

        <button
          className="note-delete-button"
          id={`delete-button-anchor-${note.id}`}
          onClick={handleTrashButtonClick}
        >
          {!isOpen && <MdDeleteForever />}
        </button>
      </div>
    </div>
  );
};

export default NotePreview;
