import { use, useState } from "react";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import type { Note } from "../../types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import ReactPaginate from "react-paginate";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import NoteModal from "../NoteModal/NoteModal";

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [note, setNote] = useState<Note | null>(null);
  const [isModal, setIsModal] = useState(false);

  const handleCreateNote = () => {
    setIsModal(true);
  };
  const closeModal = () => {};

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["note", page, query],
    queryFn: () => fetchNotes({ page: page, query: debouncedQuery }),
    placeholderData: keepPreviousData,
  });

  // useEffect(() => {
  //   if (isSuccess && data.total_results == 0) {
  //     toast.error("No movies found for your request.", {
  //       style: {
  //         borderRadius: "10px",
  //         background: "#444",
  //         color: "#fff",
  //       },
  //     });
  //   }
  // }, [data, isSuccess]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {isSuccess && data.totalPages > 1 && (
            <ReactPaginate
              pageCount={data.totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              disabledClassName={css.disabled}
              nextLabel={<MdOutlineKeyboardArrowRight size={12} />}
              previousLabel={<MdOutlineKeyboardArrowLeft size={12} />}
            />
          )}
          {<button className={css.button}>Create note +</button>}
        </header>

        {data?.notes && (
          <NoteList notes={data.notes} onDelete={() => {}} onClick={() => {}} />
        )}
      </div>
      {isModal && <NoteModal onClose={closeModal} />}
    </>
  );
}

export default App;
