import React, { useState, useEffect } from "react";
import Snippet from "./Snippet";
const Axios = require("axios");

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  useEffect(() => {
    getSnippet();
  }, []);

//   GET snippet
  async function getSnippet() {
    const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
    setSnippets(snippetsRes.data);
  }

//   RENDER snippet into Snippet component
  function renderSnippets() {
    return snippets.map((snippet, i) => {
      return <Snippet snippet={snippet} key={i} />;
    });
  }

//   POST snippet
  async function saveSnippets(e) {
      e.preventDefault();

      const snippetData= {
          title: editorTitle ? editorTitle : undefined,
          description: editorDescription ? editorDescription : undefined,
          code: editorCode ? editorCode : undefined
      }

      await Axios.post("http://localhost:5000/snippet/", snippetData)
  }

  return (
    <div className="home">
      {!newSnippetEditorOpen && (
        <button onClick={() => setNewSnippetEditorOpen(true)}>
          Add Snippet
        </button>
      )}
      {newSnippetEditorOpen && (
        <div className="snippet-editor">
          <form onSubmit={saveSnippets}>
            <label htmlFor="editor-title">Title</label>
            <input
              id="editor-title"
              type="text"
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
            />

            <label htmlFor="editor-description">Description</label>
            <input
              id="editor-description"
              type="text"
              value={editorDescription}
              onChange={(e) => setEditorDescription(e.target.value)}
            />

            <label htmlFor="editor-code">Code</label>
            <textarea
              id="editor-code"
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
            />
            <button type="submit">Save Snippet</button>
          </form>
        </div>
      )}

      {renderSnippets()}
    </div>
  );
}

export default Home;
