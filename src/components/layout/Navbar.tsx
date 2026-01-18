"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MapPin, FileText, LayoutDashboard, Bell } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: MapPin },
    { href: "/report", label: "Report Issue", icon: FileText },
    { href: "/track", label: "Track Report", icon: Bell },
    { href: "/admin", label: "Admin", icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center shadow-lg shadow-[#14b8a6]/30 group-hover:shadow-[#14b8a6]/50 transition-shadow">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-[#0f172a]">
                Infras<span className="text-[#14b8a6]">Track</span>Ture
              </span>
              <p className="text-[10px] text-[#64748b] -mt-1">San Mateo, Rizal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#475569] hover:text-[#0d9488] hover:bg-[#f0fdfa] rounded-xl transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/report">
              <Button size="sm">
                <FileText className="w-4 h-4" />
                Submit Report
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-[#475569] hover:bg-[#f1f5f9] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#e2e8f0] shadow-lg transition-all duration-300 ease-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[#475569] hover:text-[#0d9488] hover:bg-[#f0fdfa] rounded-xl transition-all"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/report" onClick={() => setIsOpen(false)}>
              <Button className="w-full">
                <FileText className="w-4 h-4" />
                Submit Report
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
