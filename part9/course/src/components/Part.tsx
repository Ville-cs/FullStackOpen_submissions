import { PartProps } from '../types';

const myStyle = {
  marginBottom: 0,
};

const Part = (props: PartProps) => {
  const { part } = props;

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3 style={myStyle}>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3 style={myStyle}>
            {part.name} {part.exerciseCount}
          </h3>
          project exercises {part.groupProjectCount}
        </div>
      );
    case 'background':
      return (
        <div>
          <h3 style={myStyle}>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em> <br></br>
          {part.backgroundMaterial}
        </div>
      );
    case 'special':
      return (
        <div>
          <h3 style={myStyle}>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em> <br></br>
          required skills: {part.requirements.join(', ')}
        </div>
      );
    default:
      return;
  }
};

export default Part;
