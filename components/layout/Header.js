"use client";

import { Search, Bell, Menu } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <button className="header-menu-button">
        <Menu size={20} />
      </button>

      <div className="header-search">
        <Search size={16} />
        <input type="text" placeholder="Search tasks, subjects, notes..." />
      </div>

      <div className="header-actions">
        <button className="header-icon-button">
          <Bell size={18} />
          <span className="header-dot" />
        </button>

        <div className="header-profile">
          <div className="header-avatar">A</div>
          <span className="header-profile-name">Aditi</span>
        </div>
      </div>
    </header>
  );
}
