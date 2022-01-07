import React, { useState, useEffect } from "react";
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

    return (
        <div className="home">Home</div>
    )
}

export default Home;