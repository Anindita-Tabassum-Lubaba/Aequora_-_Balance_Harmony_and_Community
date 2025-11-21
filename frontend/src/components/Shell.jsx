// src/components/Shell.jsx
import "../css/theme.css";
import "../css/layout.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Shell({ children }) {
  return (
    <div className="appShell">
      <Sidebar />
      <Topbar />
      <main className="main">{children}</main>
    </div>
  );
}
