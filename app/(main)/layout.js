import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import "./main.css";

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Header />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
