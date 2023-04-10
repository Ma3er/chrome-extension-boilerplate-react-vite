import React, { useState, useEffect } from "react";
import "./Popup.css";

interface Snippet {
  id: number;
  title: string;
  code1: string;
  code2: string;
}

const Popup: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    chrome.storage.local.get("snippets", (data) => {
      if (data.snippets) {
        setSnippets(data.snippets);
      }
    });
  }, []);

  const handleSaveClick = () => {
    const input1 = document.getElementById("input1") as HTMLInputElement | null;
    const input2 = document.getElementById("input2") as HTMLInputElement | null;

    if (input1 && input2) {
      const snippet: Snippet = {
        id: snippets.length,
        code1: input1.value,
        code2: input2.value,
      };

      setSnippets((prevSnippets) => [...prevSnippets, snippet]);
      input1.value = "";
      input2.value = "";

      chrome.storage.local.set({ snippets: snippets.concat(snippet) });
    }
  };

  const handleClearClick = () => {
    setSnippets([]);
    chrome.storage.local.clear();
  };

  return (
    <div>
      <input type="text" id="input1" placeholder="Enter code snippet 1" />
      <input type="text" id="input2" placeholder="Enter code snippet 2" />
      <button id="save-btn" onClick={handleSaveClick}>
        Save
      </button>
      <button id="clear-btn" onClick={handleClearClick}>
        Clear
      </button>
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet.id}>
            <h3>{snippet.title}</h3>
            <pre>{snippet.code1}</pre>
            <pre>{snippet.code2}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
