import React from "react";
import Routeres from "./Routeres";
import { createRoot } from "react-dom/client";
import "./default.scss"
import "./_breakPoint.scss"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Routeres />
);
