const Header = (props) => {
  return <h1>{props.course.name}</h1>; 
};

const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises}</p>; 
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </>
  ); 
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>; 
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} /> 
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;