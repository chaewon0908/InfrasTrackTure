"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f43f5e]/10 rounded-full blur-3xl" />

      <div className="section-container relative py-16">
        <div className="footer-grid">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">
                  Infras<span className="text-[#14b8a6]">Track</span>Ture
                </span>
                <p className="text-xs text-[#94a3b8]">San Mateo, Rizal</p>
              </div>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Empowering citizens to report infrastructure issues and enabling local government to respond faster and more efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#14b8a6] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/report", label: "Report an Issue" },
                { href: "/track", label: "Track Your Report" },
                { href: "/admin", label: "Admin Dashboard" },
                { href: "#faq", label: "FAQs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#94a3b8] hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Issue Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#14b8a6] mb-6">
              Report Categories
            </h4>
            <ul className="space-y-3">
              {[
                "Roads & Potholes",
                "Streetlights",
                "Drainage & Flooding",
                "Garbage Collection",
                "Sidewalks & Bridges",
              ].map((category) => (
                <li key={category}>
                  <span className="text-[#94a3b8]">{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#14b8a6] mb-6">
              Contact LGU San Mateo
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#14b8a6] mt-0.5 shrink-0" />
                <span className="text-[#94a3b8] text-sm">
                  Municipal Hall, Gen. A. Luna St., Brgy. Guitnang Bayan I, San Mateo, Rizal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#14b8a6] shrink-0" />
                <span className="text-[#94a3b8] text-sm">(02) 8942-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#14b8a6] shrink-0" />
                <span className="text-[#94a3b8] text-sm">info@sanmateo.gov.ph</span>
              </li>
              <li className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-[#14b8a6] shrink-0" />
                <a
                  href="https://facebook.com/sanmateorizal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94a3b8] text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  @SanMateoRizal
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1e293b]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#64748b] text-sm text-center md:text-left">
              © {new Date().getFullYear()} InfrasTrackTure. A capstone project by PUP students.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[#64748b] text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#64748b] text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-[#64748b] text-sm">
                Data Privacy Act of 2012 Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
