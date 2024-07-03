import { createRoot } from "react-dom/client";
import styles from "./css/styles.css";
import App from "./pages/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
