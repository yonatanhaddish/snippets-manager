import React from "react";
import ReactDom from "react-dom";

function App() {
    function sendData(e) {
        e.preventDefault();
        console.log("Sending Data");
    }
    return (
     <>
        <form onSubmit={sendData}>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
    </>
)};

ReactDom.render(<App />, document.getElementById("root"));

