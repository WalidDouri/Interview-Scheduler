import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // When replace is true then set the history to reflect that we are replacing the current mode.
  const transition = (newMode, replace) => {
    setMode(newMode)
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    };
  }

  const back = () => {
    // let newHistory = [...history];
    // if (!history.length <= 1) {
    if (history.length > 1) {
      // newHistory.pop();
      // setMode(newHistory[newHistory.length - 1]);
      // setHistory(([...newHistory]));
      setMode(history[history.length - 2]);
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);

    }
    // }
    // return;
  };

  return { mode, transition, back };

};