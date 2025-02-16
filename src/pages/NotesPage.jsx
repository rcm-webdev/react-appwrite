import NoteCard from "../components/NoteCard.jsx";
import { fakeData as notes } from "../assets/fakeData.js";

const NotesPage = () => {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;
