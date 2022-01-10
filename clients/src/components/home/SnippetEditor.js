import React, { useState } from "react";
import Axios from "axios";

function SnippetEditor({setNewSnippetEditorOpen, getSnippet}) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  //   POST snippet
  async function saveSnippets(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };

    await Axios.post("http://localhost:5000/snippet/", snippetData);

    getSnippet();
    closeEditor();
  }

  //   CLOSE the Editor
  function closeEditor() {
    setNewSnippetEditorOpen(false);
    setEditorTitle("");
    setEditorDescription("");
    setEditorCode("");
  }

  return (
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
        <button type="button" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
