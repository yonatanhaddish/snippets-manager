import React from "react";
import ReactDom from "react-dom";

function Welcome(props) {

    return <h1>Welcome {props.user} to this site.</h1>
};

    const el= (
        <div>
            <Welcome user="Jane Doe" />
            <Welcome user="Peter Doe" />
            <Welcome user="Jane Doe" />
        </div>
    );

    ReactDom.render(el, document.getElementById("root"));

