import React from "react";
import Axios from "axios";

function Snippet({ snippet, getSnippet }) {

  async function deleteSnippet() {
    
    await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);

    getSnippet();
  }

  return (
    <div className="snippet">
      {snippet.title && <h2>{snippet.title}</h2>}
      {snippet.description && <p>{snippet.description}</p>}
      {snippet.code && (
        <pre>
          <code>{snippet.code}</code>
        </pre>
      )}
      <button type="submit" onClick={deleteSnippet}>Delete</button>
    </div>
  );
}

export default Snippet;
