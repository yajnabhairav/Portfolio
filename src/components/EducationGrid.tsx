import React from 'react';
import { Award, Layers, ExternalLink, CheckCircle2 } from 'lucide-react';

export const EducationGrid: React.FC = () => {
  return (
    <section id="education" className="py-16 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Academic Track & Industry Credentials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Education & Verified Credentials
          </h2>
          <p className="text-sm md:text-base text-slate-400 mt-2">
            Rigorous undergraduate training at KIIT University combining full-spectrum 
            Computer Science with a dedicated Minor in VLSI & Embedded Systems, paired with 
            verified AWS Academy Cloud Credentials.
          </p>
        </div>

        {/* Bento Grid: Degree Card + AWS Credentials Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Degree Card (Wide: 7 cols) */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-800 bg-[#0f172a]/70 backdrop-blur-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <span>KIIT University, Bhubaneswar</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-blue-400 font-mono">2022 – 2026</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    B.Tech in Computer Science and Engineering
                  </h3>
                </div>

                {/* CGPA Badge in Tabular Numeral */}
                <div className="text-right">
                  <div className="text-xs text-slate-400">Academic Standing</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    8.39 <span className="text-sm font-normal text-slate-400">CGPA</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Comprehensive coursework spanning data structures, algorithms, compiler design, 
                relational database management systems (DBMS), operating systems, computer organization, 
                and discrete mathematics.
              </p>
            </div>

            {/* Minor Specialization Highlight */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Minor Specialization: VLSI & Embedded Systems</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated hardware curriculum encompassing Digital Electronics, micro-architectures, 
                logic gate synthesis, hardware description basics, and real-time microcontroller interfaces.
              </p>
            </div>
          </div>

          {/* AWS Verified Credly Credentials Card (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl border border-slate-800 bg-[#0f172a]/70 backdrop-blur-sm flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
                <Award className="w-4 h-4" />
                <span>Verified Cloud Credentials</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">
                AWS Academy Badges (Credly)
              </h3>
              <div className="text-xs text-slate-400 mt-1">
                Amazon Web Services Training & Certification
              </div>
            </div>

            {/* Two Verified Credly Badges */}
            <div className="space-y-3">
              {/* Badge 1: Cloud Foundation */}
              <a
                href="https://www.credly.com/badges/858870a1-3995-4ef0-9b27-8cbad1d9081a/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>AWS Academy Cloud Foundations</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 transition-colors" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Core cloud concepts, security, architecture, pricing & global infrastructure.
                </div>
                <div className="text-[10px] font-mono text-amber-400/90 mt-1.5 flex items-center gap-1">
                  <span>Verify on Credly</span>
                  <span aria-hidden="true">→</span>
                </div>
              </a>

              {/* Badge 2: Cloud Architecting */}
              <a
                href="https://www.credly.com/badges/2c7621c6-d485-419c-b0f9-7931aa27a7bb/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>AWS Academy Cloud Architecting</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-300 transition-colors" />
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Well-Architected Framework, multi-tier systems, resilient & scalable cloud designs.
                </div>
                <div className="text-[10px] font-mono text-blue-400/90 mt-1.5 flex items-center gap-1">
                  <span>Verify on Credly</span>
                  <span aria-hidden="true">→</span>
                </div>
              </a>
            </div>

            <div className="text-xs text-slate-500 pt-2 border-t border-slate-800/80">
              Verified digital badges issued directly by Amazon Web Services via Credly.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
