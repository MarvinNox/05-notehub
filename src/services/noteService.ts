import axios from "axios";
import type { Note, SortBy, Tag } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  query: string;
  page?: number;
  tag: Tag;
  sortby: SortBy;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: Tag;
}

interface DeleteNoteParams {
  id: number;
}

export async function fetchNotes({
  query = "",
  page = 1,
  tag = "Todo",
  sortby = "created",
}: FetchNotesParams) {
  const response = await axios.get<FetchNotesHTTPResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        search: query,
        page: page,
        tag: tag,
        perPage: 10,
        sortBy: sortby,
      },
    }
  );
  return response.data;
}

export async function createNote({
  title,
  content = "",
  tag = "Todo",
}: CreateNoteParams) {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    { data: { title: title, content: content, tag: tag } }
  );
  return response.data;
}

export async function deleteNote({ id }: DeleteNoteParams) {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`
  );
  return response.data;
}
