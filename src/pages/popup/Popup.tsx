import React from "react";

interface Snippet {
  id: number;
  code1: string;
  code2: string;
}

const snippets: Snippet[] = [];

const handleSaveClick = () => {
  const input1 = document.getElementById("input1") as HTMLInputElement | null;
  const input2 = document.getElementById("input2") as HTMLInputElement | null;

  if (input1 && input2) {
    const snippet: Snippet = {
      id: snippets.length,
      code1: input1.value,
      code2: input2.value,
    };

    snippets.push(snippet);
    input1.value = "";
    input2.value = "";

    console.log(snippets);
  }
};

// add a list of snippets to the popup

const Popup: React.FC = () => {
  return (
    <div>
      <input type="text" id="input1" placeholder="Name" />
      <input type="text" id="input2" placeholder="Code" />
      <button id="save-btn" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

export default Popup;
