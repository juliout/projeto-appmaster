import React from "react";
import Routeres from "./Routeres";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./default.scss"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Routeres />
  </StrictMode>
);
