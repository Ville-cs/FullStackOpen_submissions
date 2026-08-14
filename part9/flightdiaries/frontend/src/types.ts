import { ChangeEvent } from 'react';

export type InputEvent = ChangeEvent<HTMLInputElement>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryProps {
  diary: DiaryEntry;
}

export interface NewDiaryProps {
  diaries: DiaryEntry[];
  setDiaries: (diaries: DiaryEntry[]) => void;
}

export interface NotificationProps {
  notification: string;
  setNotification: (str: string) => void;
}
