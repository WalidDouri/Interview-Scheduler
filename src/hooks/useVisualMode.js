import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //When replace is true then set the history to reflect that we are replacing the current mode.
  const transition = (newMode, replace = false) => {
    let newHistory = [...history];
    if (!replace) {
      newHistory.push(newMode);
      setHistory(newHistory);
      setMode(newMode);
    } else {
      newHistory.splice(-1, 1, newMode);
      setHistory(newHistory);
      setMode(newMode);
    };
  }

  const back = () => {
    let newHistory = [...history];
    if (!history.length <= 1) {
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
    return;
  };

  return { mode, transition, back };

};