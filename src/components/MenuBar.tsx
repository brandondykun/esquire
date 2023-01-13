import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaRedo,
  FaParagraph,
} from "react-icons/fa";
import { RxDividerHorizontal } from "react-icons/rx";
import { BsParagraph } from "react-icons/bs";
import {
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineFontColors,
} from "react-icons/ai";
import { BiFontColor } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { SketchPicker } from "react-color";
import { useEffect, useState } from "react";

type Props = {
  editor: any;
  handleSave: () => void;
  saving: boolean;
};

const MenuBar = ({ editor, handleSave, saving }: Props) => {
  if (!editor) {
    return null;
  }

  const [color, setColor] = useState(
    editor.getAttributes("textStyle").color
      ? editor.getAttributes("textStyle").color
      : "#1A1A1A"
  );

  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [colorToolTipOpen, setColorToolTipOpen] = useState<boolean>(true);

  // update the editor color when color changes
  useEffect(() => {
    editor.chain().focus().setColor(color).run();
  }, [color]);

  return (
    <div className="tip-tap-menu-bar">
      <Tooltip
        anchorId="bold-button"
        content="Bold Text"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="bold-button">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={editor.state.selection.empty}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
      </div>
      <Tooltip
        anchorId="italic-button"
        content="Italic"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="italic-button">
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={editor.state.selection.empty}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
      </div>
      <Tooltip
        anchorId="underline-button"
        content="Underline"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="underline-button">
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          disabled={editor.state.selection.empty}
        >
          <FaUnderline />
        </button>
      </div>

      <Tooltip
        anchorId="line-through-button"
        content="Line Through"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="line-through-button">
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={editor.state.selection.empty}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <FaStrikethrough />
        </button>
      </div>

      <Tooltip
        anchorId="large-heading-button"
        content="Large Heading"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="large-heading-button">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </button>
      </div>

      <Tooltip
        anchorId="small-heading-button"
        content="Small Heading"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="small-heading-button">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </button>
      </div>

      <Tooltip
        anchorId="paragraph-button"
        content="Paragraph"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="paragraph-button">
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <BsParagraph />
        </button>
      </div>

      <Tooltip
        anchorId="unordered-list-button"
        content="Bullet List"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="unordered-list-button">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <AiOutlineUnorderedList />
        </button>
      </div>

      <Tooltip
        anchorId="ordered-list-button"
        content="Numbered List"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="ordered-list-button">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <AiOutlineOrderedList />
        </button>
      </div>

      <Tooltip
        anchorId="horizontal-break-button"
        content="Horizontal Line"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="horizontal-break-button">
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RxDividerHorizontal />
        </button>
      </div>
      {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button> */}

      {colorToolTipOpen && (
        <Tooltip
          anchorId="text-color-button"
          content="Text Color"
          place="bottom"
          delayShow={500}
        />
      )}
      <div
        className="button-tool-tip-wrapper"
        id="text-color-button"
        onMouseEnter={() => setColorToolTipOpen(true)}
        onMouseLeave={() => {
          setColorToolTipOpen(false);
          setTimeout(() => setColorToolTipOpen(true), 50);
        }}
      >
        <button
          className="color-picker-swatch"
          onClick={() => {
            setDisplayColorPicker(!displayColorPicker);
          }}
        >
          <div
            className="color-picker-color"
            style={{
              color: `${
                editor.getAttributes("textStyle").color
                  ? editor.getAttributes("textStyle").color
                  : "#1A1A1A"
              }`,
            }}
          >
            <BiFontColor />
          </div>
          {displayColorPicker && (
            <div
              className="color-picker-popover"
              onClick={(e) => {
                e.stopPropagation();
                setColorToolTipOpen(false);
              }}
            >
              <div
                className="color-picker-cover"
                onClick={() => {
                  setDisplayColorPicker(false);
                }}
              />
              <SketchPicker
                disableAlpha
                width="250px"
                color={color}
                onChange={(color) => {
                  setColor(color.hex);
                }}
              />
            </div>
          )}
        </button>
      </div>

      <Tooltip
        anchorId="undo-button"
        content="Undo Button"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="undo-button">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
      </div>

      <Tooltip
        anchorId="redo-button"
        content="Redo Button"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="redo-button">
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>

      <Tooltip
        anchorId="save-button"
        content="Save Changes"
        place="bottom"
        delayShow={500}
      />
      <div className="button-tool-tip-wrapper" id="save-button">
        <button
          className="editor-save-button"
          onClick={handleSave}
          disabled={saving}
        >
          SAVE
        </button>
      </div>
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().setUnderline().run()}
        disabled={editor.isActive("underline")}
      >
        <FaUnderline />
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().unsetUnderline().run()}
        disabled={!editor.isActive("underline")}
      >
        unsetUnderline
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button> */}

      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button> */}
      {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      {/* <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#F98181").run()}
        className={
          editor.isActive("textStyle", { color: "#F98181" }) ? "is-active" : ""
        }
      >
        red
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
        className={
          editor.isActive("textStyle", { color: "#FBBC88" }) ? "is-active" : ""
        }
      >
        orange
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#FAF594").run()}
        className={
          editor.isActive("textStyle", { color: "#FAF594" }) ? "is-active" : ""
        }
      >
        yellow
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
        className={
          editor.isActive("textStyle", { color: "#70CFF8" }) ? "is-active" : ""
        }
      >
        blue
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#94FADB").run()}
        className={
          editor.isActive("textStyle", { color: "#94FADB" }) ? "is-active" : ""
        }
      >
        teal
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
        className={
          editor.isActive("textStyle", { color: "#B9F18D" }) ? "is-active" : ""
        }
      >
        green
      </button>
      <button onClick={() => editor.chain().focus().unsetColor().run()}>
        unsetColor
      </button> */}
    </div>
  );
};

export default MenuBar;
