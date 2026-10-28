import React from 'react';
import { motion } from 'motion/react';
import { X, Printer, Mail, Phone, MapPin, Github, Linkedin, Award, ExternalLink, CheckCircle } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0d1322] p-6 md:p-10 shadow-2xl space-y-6 text-slate-100 print:bg-white print:text-black print:p-0 print:border-none"
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="text-xs font-mono text-blue-400">
            Adarsh Narayan · Curriculum Vitae & Credentials Sheet
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Card Lockup */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-800">
          <img
            src="/images/adarsh-narayan.jpg"
            alt="Adarsh Narayan"
            className="w-28 h-36 object-cover rounded-xl border-2 border-blue-500/50 shadow-lg shadow-blue-500/10 shrink-0"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white print:text-black">
              Adarsh Narayan
            </h1>
            <div className="text-sm font-semibold text-blue-400">
              B.Tech in Computer Science & Engineering (CGPA 8.39) · Minor: VLSI & Embedded Systems
            </div>

            <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed max-w-2xl">
              Systems engineer focused on C++ compiler architecture, low-level tokenization, 
              hardware-software interfaces, transaction anomaly analytics, and AWS cloud foundations. 
              Actively seeking full-time Software Engineering and Embedded roles.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 pt-2 text-xs text-slate-300 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Hyderabad, India
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                +91-7667714004
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                Adarshnarayanmzp44@gmail.com
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 pt-1 text-xs text-slate-400 font-mono">
              <a
                href="https://github.com/yajnabhairav"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub: github.com/yajnabhairav
              </a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/adarsh-narayan-397b0425a"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Education & Verified AWS Credentials */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Education & Certifications
          </h2>

          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-sm font-bold text-white">B.Tech in Computer Science and Engineering (2022 – 2026)</div>
                <div className="text-xs text-slate-400">KIIT University, Bhubaneswar · Minor in VLSI & Embedded Systems</div>
              </div>
              <div className="font-mono text-emerald-400 font-bold text-sm">CGPA: 8.39</div>
            </div>

            {/* AWS Badges */}
            <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-900/40 space-y-2">
              <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verified AWS Academy Credentials (Credly)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href="https://www.credly.com/badges/858870a1-3995-4ef0-9b27-8cbad1d9081a/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-amber-500/50"
                >
                  <span className="text-slate-200">AWS Academy Cloud Foundations</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>

                <a
                  href="https://www.credly.com/badges/2c7621c6-d485-419c-b0f9-7931aa27a7bb/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-blue-500/50"
                >
                  <span className="text-slate-200">AWS Academy Cloud Architecting</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Competencies */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Technical Stack Core
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="font-semibold text-white mb-1">Languages</div>
              <div className="text-slate-400">C, C++, Python (Basic)</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="font-semibold text-white mb-1">Core Concepts</div>
              <div className="text-slate-400">OOPs, DBMS, SQL, AST Parsing</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="font-semibold text-white mb-1">VLSI & Hardware</div>
              <div className="text-slate-400">Digital Electronics, Embedded Systems</div>
            </div>
            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
              <div className="font-semibold text-white mb-1">Tools & Platforms</div>
              <div className="text-slate-400">Git, VS Code, Linux (Ubuntu), AWS</div>
            </div>
          </div>
        </div>

        {/* Key Projects */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Featured Projects
          </h2>
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white">Compiler (Mini Compiler Project) [2025]</div>
                <div className="text-xs font-mono text-blue-400">C++ / AST Lexer</div>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Designed and implemented a basic C++ compiler handling lexical analysis, syntax checking, and error detection. Built core components including tokenization parsing logic, and symbol validation. Gained strong understanding of compiler design concepts and C++ internals.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white">Online Payment Fraud Detection System [2024]</div>
                <div className="text-xs font-mono text-emerald-400">Python / DBMS / SQL</div>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Developed a transaction analysis system to identify suspicious payment patterns. Focused heavily on data preprocessing, custom logic building, and systematic result validation to achieve high accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-500 font-mono">
            Direct Contact: +91-7667714004 · Adarshnarayanmzp44@gmail.com
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg"
          >
            Close Sheet
          </button>
        </div>
      </motion.div>
    </div>
  );
};
