import { useState } from 'react';
import { useField, useRadioInput } from '../hooks';
import { NewDiaryEntry, NewDiaryProps } from '../types';
import { postDiary } from '../services/diaryService';
import axios from 'axios';
import Notification from './Notification';

const NewDiary = (props: NewDiaryProps) => {
  const { diaries, setDiaries } = props;

  const [notification, setNotification] = useState('');

  const [weather, setWeather] = useState('');
  const sunny = useRadioInput('sunny', 'weather');
  const rainy = useRadioInput('rainy', 'weather');
  const stormy = useRadioInput('stormy', 'weather');
  const cloudy = useRadioInput('cloudy', 'weather');
  const windy = useRadioInput('windy', 'weather');

  const [visibility, setVisibility] = useState('');
  const great = useRadioInput('great', 'visibility');
  const good = useRadioInput('good', 'visibility');
  const ok = useRadioInput('ok', 'visibility');
  const poor = useRadioInput('poor', 'visibility');

  const { onReset: resetDate, ...date } = useField('date');
  const { onReset: resetComment, ...comment } = useField('text');

  const submitDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date: date.value,
      visibility: visibility,
      weather,
      comment: comment.value,
    };
    postDiary(newDiary)
      .then(res => {
        setDiaries(diaries.concat(res));
        resetForm();
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          if (error.response && typeof error.response.data === 'string') {
            setNotification(error.response.data);
          }
        }
      });
  };

  const resetForm = () => {
    resetDate();
    resetComment();
  };

  return (
    <div>
      <h2>Post a new diary</h2>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <form onSubmit={submitDiary}>
        <div>
          <label>
            date
            <input {...date} />
          </label>
        </div>

        <fieldset>
          <legend>visiblity</legend>
          <div>
            <input {...great} onChange={e => setVisibility(e.target.value)} />
            <label htmlFor="great">sunny</label>
          </div>
          <div>
            <input {...good} onChange={e => setVisibility(e.target.value)} />
            <label htmlFor="good">good</label>
          </div>
          <div>
            <input {...ok} onChange={e => setVisibility(e.target.value)} />
            <label htmlFor="ok">ok</label>
          </div>
          <div>
            <input {...poor} onChange={e => setVisibility(e.target.value)} />
            <label htmlFor="poor">poor</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>weather</legend>
          <div>
            <input {...sunny} onChange={e => setWeather(e.target.value)} />
            <label htmlFor="sunny">sunny</label>
          </div>
          <div>
            <input {...rainy} onChange={e => setWeather(e.target.value)} />
            <label htmlFor="rainy">rainy</label>
          </div>
          <div>
            <input {...stormy} onChange={e => setWeather(e.target.value)} />
            <label htmlFor="stormy">stormy</label>
          </div>
          <div>
            <input {...cloudy} onChange={e => setWeather(e.target.value)} />
            <label htmlFor="cloudy">cloudy</label>
          </div>
          <div>
            <input {...windy} onChange={e => setWeather(e.target.value)} />
            <label htmlFor="windy">windy</label>
          </div>
        </fieldset>

        <div>
          <label>
            comment
            <input {...comment} />
          </label>
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiary;
