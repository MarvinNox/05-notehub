import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (query: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      onChange={(evt) => onChange(evt.target.value)}
      type="text"
      placeholder="Search notes"
    />
  );
}
