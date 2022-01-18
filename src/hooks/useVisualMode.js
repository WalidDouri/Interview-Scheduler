import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // When replace is true then set the history to reflect that we are replacing the current mode.
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    } else {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    };
    setMode(newMode)
  }

  const back = () => {
    let newHistory = [...history];
    if (!history.length <= 1) {
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(([...newHistory]));
    }
    return;
  };

  return { mode, transition, back };

};