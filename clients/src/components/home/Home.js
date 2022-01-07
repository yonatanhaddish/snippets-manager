import React, { useState, useEffect } from "react";
import Snippet from "./Snippet";
const Axios = require("axios");

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);

  useEffect(() => {
    getSnippet();
  }, []);

  async function getSnippet() {
    const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
    setSnippets(snippetsRes.data);
  }

  function renderSnippets() {
    return snippets.map((snippet, i) => {
      return <Snippet snippet={snippet} key={i} />;
    });
  }

  return (
    <div className="home">
      {!newSnippetEditorOpen && (
        <button onClick={() => setNewSnippetEditorOpen(true)}>
          Add Snippet
        </button>
      )}
      {newSnippetEditorOpen && (
        <div>
          <form>
            <label htmlFor="editor-title">Title</label>
            <input id="editor-title" />

            <label htmlFor="editor-description">Desctiption</label>
            <input id="editor-description" />

            <label htmlFor="editor-code">Code</label>
            <textarea id="editor-code" />
          </form>
        </div>
      )}

      {renderSnippets()}
    </div>
  );
}

export default Home;
