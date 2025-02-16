import PropTypes from "prop-types";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
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
