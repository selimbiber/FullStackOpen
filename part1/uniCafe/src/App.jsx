/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  return (
    <div>
      <h2>statistics</h2>
      {props.all === 0 && <p>No feedback given</p>}
      {props.all > 0 && (
        <>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </>
      )}
    </div>
  );
};

const StatisticLine = (props) => {
  /// ...
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};

export default function App() {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const { good, neutral, bad } = clicks;

  const all = good + neutral + bad;
  const average = ((good - bad) / all).toFixed(2);
  const positive = ((good / all) * 100).toFixed(2);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button
          handleClick={() => setClicks({ ...clicks, good: clicks.good + 1 })}
          text="good"
        />
        <Button
          handleClick={() => setClicks({ ...clicks, neutral: clicks.neutral + 1 })}
          text="neutral"
        />
        <Button
          handleClick={() => setClicks({ ...clicks, bad: clicks.bad + 1 })}
          text="bad"
        />
      </div>
      <br />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
}
