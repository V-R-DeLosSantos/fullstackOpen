import { useState } from 'react';

const Statistics = (props) => {
  return(
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total}</p>
      <p>average {props.average.toFixed(2)}</p>
      <p>positive {props.positive.toFixed(2)}%</p>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  // Calcula el total de comentarios
  const total = good + neutral + bad;

  // Calcula la puntuación promedio
  const average = total > 0 ? (good - bad) / total : 0;

  // Calcula el porcentaje de comentarios positivos
  const positive = total > 0 ? (good / total) * 100 : 0;

  return (
    <div>
      <h1>give feedback</h1>
      
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>

      <h1>statistics </h1>

      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        average={average} 
        positive={positive} 
      />

    </div>
  );
};

export default App;