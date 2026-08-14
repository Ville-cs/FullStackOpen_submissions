import { useState, useEffect } from 'react';
import { getDiaries } from './services/diaryService';
import { DiaryEntry } from './types';
import Diary from './components/Diary';
import NewDiary from './components/NewDiary';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  if (!diaries) return;

  return (
    <div className="container">
      <NewDiary diaries={diaries} setDiaries={setDiaries} />
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
