import React, { useState, useEffect } from "react";
import Snippet from "./Snippet";
const Axios= require('axios');


function Home() {

    const [snippets, setSnippets]= useState([]);

    useEffect(() => {
        getSnippet();
    }, []);

    async function getSnippet() {
        const snippetsRes= await Axios.get("http://localhost:5000/snippet/");
        setSnippets(snippetsRes.data);
    }

    function renderSnippets() {
        return snippets.map((snippet, i) => {
            return <Snippet snippet= {snippet} key={i}/>
        })
    }

    return (
        <div className="home">{renderSnippets()}</div>
    )
}

export default Home;