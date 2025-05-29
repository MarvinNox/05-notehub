import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onClick: (note: Note) => void;
}

export default function NoteLiset({ notes, onDelete, onClick }: NoteListProps) {
  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => {
          return (
            <li
              className={css.listItem}
              key={note.id}
              onClick={() => onClick(note)}
            >
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button
                  className={css.button}
                  onClick={() => onDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
