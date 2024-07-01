import { createRoot } from "react-dom/client";
import "./css/styles.css";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
