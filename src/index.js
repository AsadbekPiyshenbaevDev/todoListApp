import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContainer } from "react-notifications";
import "./styles/main.css";
import "react-notifications/lib/notifications.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <App />
    <NotificationContainer />
  </>
);
