import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  let [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto"; // Reset the height
    current.style.height = current.scrollHeight + "px"; // Set the new height
  };

  const mouseDown = (e) => {
    mouseStartPos = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };
    mouseStartPos = { x: e.clientX, y: e.clientY };
    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          name=""
          id=""
        ></textarea>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    body: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    colors: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteCard;
