import axios from "axios";
import type { Note, SortBy, Tag } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
axios.defaults.headers.common["Accept"] = "application/json";

interface FetchNotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  query?: string;
  page?: number;
  tag?: Tag;
  sortBy?: SortBy;
  perPage?: number;
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
  query,
  page = 1,
  tag,
  sortBy = "created",
}: FetchNotesParams) {
  const params: FetchNotesParams = {
    page: page,
    perPage: 12,
    sortBy: sortBy,
  };
  if (query) params.query = query;
  if (tag) params.tag = tag;

  const response = await axios.get<FetchNotesHTTPResponse>("", { params });
  return response.data;
}

export async function createNote({
  title,
  content = "",
  tag = "Todo",
}: CreateNoteParams) {
  const response = await axios.post<Note>("", {
    data: { title: title, content: content, tag: tag },
  });
  return response.data;
}

export async function deleteNote({ id }: DeleteNoteParams) {
  const response = await axios.delete<Note>(`/${id}`);
  return response.data;
}
