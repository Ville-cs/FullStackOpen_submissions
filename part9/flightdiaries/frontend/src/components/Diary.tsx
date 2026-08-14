import { DiaryProps } from '../types';

const Diary = (props: DiaryProps) => {
  const { diary } = props;

  return (
    <div>
      <h3>{diary.date}</h3>
      <>visibility: {diary.visibility}</> <br />
      <>weather: {diary.weather}</> <br />
      <>comments: {diary.comment}</>
    </div>
  );
};

export default Diary;
