/* eslint-disable react/prop-types */
import { useState } from "react";

const Anecdote = ({ anecdote }) => {
  return <p>{anecdote}</p>;
};

const Votes = ({ point }) => {
  return <p>has {point} votes</p>;
};

const Button = ({ handleClick, buttonText }) => {
  return <button onClick={handleClick}>{buttonText}</button>;
};

export default function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const vote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const mostVotedAnecdote = anecdotes[points.indexOf(Math.max(...points))];
  const highestVote = Math.max(...points);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <Votes point={points[selected]} />
      <div>
        {selected !== 0 && (
          <Button
            handleClick={() => setSelected((prevSelected) => prevSelected - 1)}
            buttonText="previous anecdote"
          />
        )}
        <Button handleClick={vote} buttonText="vote" />
        {anecdotes[selected + 1] && (
          <Button
            handleClick={() => setSelected((prevSelected) => prevSelected + 1)}
            buttonText="next anecdote"
          />
        )}
      </div>
      <br />
      {highestVote !== 0 && (
        <div>
          <h2>Anecdote with most votes</h2>
          <Anecdote anecdote={mostVotedAnecdote} />
          <Votes point={highestVote} />
        </div>
      )}
    </div>
  );
}
