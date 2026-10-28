import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#070a12] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div>
            <div className="text-base font-bold text-white tracking-tight">
              Adarsh Narayan
            </div>
            <div className="text-xs text-slate-400 mt-1">
              B.Tech in Computer Science and Engineering (KIIT) · Minor in VLSI & Embedded Systems
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Hyderabad, India · +91-7667714004
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <a
              href="tel:+917667714004"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91-7667714004</span>
            </a>
            <a
              href="mailto:adarshnarayanmzp44@gmail.com"
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/adarsh-narayan-397b0425a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/adarsh-narayan-portfolio.zip"
              download="adarsh-narayan-portfolio.zip"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-medium"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download ZIP</span>
            </a>
            <a
              href="https://github.com/yajnabhairav"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Adarsh Narayan. Personal Portfolio & Systems Engineering Showcase.
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            AWS Certified · B.Tech CSE (KIIT) · Hyderabad, India
          </div>
        </div>
      </div>
    </footer>
  );
};
