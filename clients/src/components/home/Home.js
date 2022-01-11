import React, { useState, useEffect } from "react";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import Axios from "axios";
import "./Home.scss";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

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
    let sortedSnippet = [...snippets];
    sortedSnippet = sortedSnippet.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedSnippet.map((snippet, i) => {
      return (
        <Snippet
          snippet={snippet}
          key={i}
          getSnippet={getSnippet}
          editSnippet={editSnippet}
          setEditSnippetData={setNewSnippetEditorOpen}
        />
      );
    });
  }

  // EDIT snippet
  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setNewSnippetEditorOpen(true);
  }

  return (
    <div className="home">
      {!newSnippetEditorOpen && (
        <button className="btn-editor-toggle" onClick={() => setNewSnippetEditorOpen(true)}>
          Add Snippet
        </button>
      )}
      {newSnippetEditorOpen && (
        <SnippetEditor
          setNewSnippetEditorOpen={setNewSnippetEditorOpen}
          getSnippet={getSnippet}
          editSnippetData={editSnippetData}
          setEditSnippetData={setNewSnippetEditorOpen}
        />
      )}

      {renderSnippets()}
    </div>
  );
}

export default Home;
