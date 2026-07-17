"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BookOpen,
  FileText,
  BarChart3,
  Target,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-mark">SF</span>
        <span className="sidebar-name">StudyFlow</span>
      </div>

      <nav className="sidebar-menu">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={active ? "sidebar-item active" : "sidebar-item"}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p>StudyFlow v0.1</p>
      </div>
    </aside>
  );
}
