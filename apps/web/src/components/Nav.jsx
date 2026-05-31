import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Home, Calendar, Building2, CalendarCheck, MessageSquare,
  DollarSign, Radio, Menu, X, Trophy, User
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/",            label: "Home",        icon: Home },
  { href: "/schedule",    label: "Live Scores", icon: Radio },
  { href: "/cities",      label: "Cities",      icon: Building2 },
  { href: "/events",      label: "Events",      icon: CalendarCheck },
  { href: "/forums",      label: "Forums",      icon: MessageSquare },
  { href: "/my-matches",  label: "My Matches",  icon: Calendar },
  { href: "/logistics",   label: "Logistics",   icon: DollarSign },
  { href: "/profile",     label: "Profile",     icon: User },
];

export default function Nav({ children }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-30
        flex flex-col transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-[#FF415B] flex items-center justify-center">
            <Trophy size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">FanPass</span>
          <button
            className="ml-auto lg:hidden text-gray-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${active
                    ? "bg-[#FF415B]/15 text-[#FF415B] border border-[#FF415B]/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800">
          <p className="text-xs text-gray-600">FIFA World Cup 2026™</p>
          <p className="text-xs text-gray-600">Jun 11 – Jul 19, 2026</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
          <button
            onClick={() => setOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#FF415B] flex items-center justify-center">
              <Trophy size={12} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm">FanPass</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
