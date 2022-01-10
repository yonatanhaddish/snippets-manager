import React, { useState, useEffect } from "react";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import Axios from "axios";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);

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
      return <Snippet snippet={snippet} key={i} getSnippet={getSnippet}/>;
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
        <SnippetEditor
          setNewSnippetEditorOpen={setNewSnippetEditorOpen}
          getSnippet={getSnippet}
        />
      )}

      {renderSnippets()}
    </div>
  );
}

export default Home;
