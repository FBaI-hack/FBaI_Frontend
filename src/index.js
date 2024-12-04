import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import colors from "./styles/colors";

// CSS Variables 설정
const root = document.documentElement;
Object.keys(colors).forEach((key) => {
  root.style.setProperty(`--${key}`, colors[key]);
});

ReactDOM.render(<App />, document.getElementById("root"));
