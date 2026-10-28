import React from 'react';
import { Phone, Mail, FileText, Download } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, onOpenResume }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
        >
          Adarsh Narayan
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            About
          </a>
          <a href="#education" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Education & AWS
          </a>
          <a href="#skills" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Technical Skills
          </a>
          <a href="#projects" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Featured Projects
          </a>
          <a href="#contact" className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0">
            Contact & Hire
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/adarsh-narayan-portfolio.zip"
            download="adarsh-narayan-portfolio.zip"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/40 border border-emerald-800/60 rounded-lg hover:bg-emerald-900/40 transition-colors whitespace-nowrap shrink-0"
            title="Download full project source code as .ZIP"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download ZIP</span>
          </a>

          <button
            onClick={onOpenResume}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume</span>
          </button>

          <button
            onClick={onContactClick}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact for Job</span>
          </button>
        </div>
      </div>
    </header>
  );
};
