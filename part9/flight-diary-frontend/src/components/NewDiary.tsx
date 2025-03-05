import { useField } from '../hooks';
import { NewDiaryEntry, NewDiaryProps } from '../types';
import { postDiary } from '../services/diaryService';

const NewDiary = (props: NewDiaryProps) => {
  const { diaries, setDiaries } = props;

  const { onReset: resetDate, ...date } = useField('text');
  const { onReset: resetVisibility, ...visibility } = useField('text');
  const { onReset: resetWeather, ...weather } = useField('text');
  const { onReset: resetComment, ...comment } = useField('text');

  const submitDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date: date.value,
      visibility: visibility.value,
      weather: weather.value,
      comment: comment.value,
    };
    postDiary(newDiary).then(diary => {
      setDiaries(diaries.concat(diary));
      resetForm();
    });
  };

  const resetForm = () => {
    resetDate();
    resetVisibility();
    resetWeather();
    resetComment();
  };

  return (
    <div>
      <h2>Post a new diary</h2>
      <form onSubmit={submitDiary}>
        <div>
          <label>
            date
            <input {...date} />
          </label>
        </div>
        <div>
          <label>
            visibility
            <input {...visibility} />
          </label>
        </div>
        <div>
          <label>
            weather
            <input {...weather} />
          </label>
        </div>
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
