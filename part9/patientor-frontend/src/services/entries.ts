import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, EntryWithoutId } from '../types';

const postEntry = async (id: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

export default {
  postEntry,
};
