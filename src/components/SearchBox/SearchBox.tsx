import css from "./SearchBox.module.css";

interface SearchBoxProps{
    onChange(query: string)=> void;
}

export default function SearchBox() {
    
    return <input className={css.input} onChange={ ()=>onchange(query)} type="text" placeholder="Search notes" />;
}
