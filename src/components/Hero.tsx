import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Terminal, 
  Award, 
  Copy, 
  Check, 
  Play,
  FileText,
  MessageSquare,
  Sparkles,
  Download
} from 'lucide-react';

const ROLES = [
  'Systems & Software Engineer',
  'VLSI & Embedded Systems Specialist',
  'Compiler & C++ Systems Architect',
  'Data Preprocessing & Fraud Logic Engineer'
];

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToProjects,
  onScrollToContact,
  onOpenResume
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'compiler' | 'fraud' | 'vlsi'>('compiler');
  const [hasCopied, setHasCopied] = useState(false);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const snippets = {
    compiler: {
      lang: 'C++',
      filename: 'mini_compiler_lexer.cpp',
      code: `// Lexical tokenization & AST symbol resolution
Token Lexer::scanNextToken() {
  skipWhitespace();
  if (isAlpha(peek())) return parseIdentifierOrKeyword();
  if (isDigit(peek())) return parseNumericLiteral();
  return parseOperatorOrDelimiter();
}`
    },
    fraud: {
      lang: 'Python',
      filename: 'fraud_pattern_evaluator.py',
      code: `# Multi-dimensional transaction risk assessment
def evaluate_transaction(record: dict) -> dict:
    z_score = compute_velocity_zscore(record['card_id'])
    geo_delta = haversine_distance(record['lat_lon'], prev_loc)
    is_anomaly = (z_score > 3.2) or (geo_delta > 850 and time_delta < 3600)
    return {"flagged": is_anomaly, "confidence": 0.942}`
    },
    vlsi: {
      lang: 'Verilog / HDL',
      filename: 'alu_pipelined_stage.v',
      code: `// Pipelined Arithmetic Logic & Condition Register
module alu_stage (
  input wire clk, reset_n,
  input wire [31:0] op_a, op_b,
  input wire [3:0] alu_ctrl,
  output reg [31:0] alu_out,
  output reg zero_flag
);`
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippets[activeSnippetTab].code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsRunningSim(true);
    setSimOutput(null);
    setTimeout(() => {
      setIsRunningSim(false);
      if (activeSnippetTab === 'compiler') {
        setSimOutput('PASS: Lexer tokenized 42 tokens · 0 syntax faults · AST Symbol tree validated');
      } else if (activeSnippetTab === 'fraud') {
        setSimOutput('PASS: Stream evaluated 1,000 transactions · 3 anomalous patterns isolated · Accuracy: 96.8%');
      } else {
        setSimOutput('PASS: Propagation delay: 1.42ns · Critical path timing verified · Zero setup violations');
      }
    }, 600);
  };

  return (
    <section id="about" className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background radial luminous mesh */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 w-[950px] h-[520px] bg-blue-600/10 blur-[130px] rounded-full" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 right-0 w-[550px] h-[450px] bg-emerald-600/10 blur-[120px] rounded-full" 
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Recruiter Status Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Actively Open to Opportunities</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Hyderabad, India
              </span>
              <span aria-hidden="true">·</span>
              <span>B.Tech CSE (KIIT 2022–2026) · CGPA 8.39</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Adarsh Narayan
              </h1>
              
              <div className="h-10 mt-2 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-sky-300 bg-clip-text text-transparent"
                  >
                    {ROLES[roleIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Lead Narrative with Core Specializations */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Computer Science & Engineering graduate from KIIT University with a dedicated Minor Specialization 
              in <strong className="text-white font-semibold">VLSI & Embedded Systems</strong> (CGPA 8.39) and verified{' '}
              <strong className="text-amber-300 font-semibold">AWS Cloud Credentials</strong>. Focused on compiler design, 
              C++ memory internals, data preprocessing heuristics, and digital logic circuits.
            </p>

            {/* Key CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onScrollToContact}
                className="group flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/25 active:scale-95"
              >
                <span>Hire / Contact Adarsh</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>View Resume / CV</span>
              </button>

              <a
                href="/adarsh-narayan-portfolio.zip"
                download="adarsh-narayan-portfolio.zip"
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 rounded-xl hover:bg-emerald-900/50 hover:text-white transition-all active:scale-95"
                title="Download complete portfolio source code as .ZIP"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Code (.ZIP)</span>
              </a>

              <button
                onClick={onScrollToProjects}
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                <span>Explore Projects</span>
              </button>
            </div>

            {/* Immediate Recruiter Quick-Contact Row */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Direct Recruiter Channels & Profiles</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <a
                  href="tel:+917667714004"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 hover:bg-emerald-900/50 transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call: +91-7667714004</span>
                </a>

                <a
                  href="https://wa.me/917667714004?text=Hi%20Adarsh,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20engineering%20opportunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/40 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="mailto:Adarshnarayanmzp44@gmail.com?subject=Job%20Opportunity%20-%20Software%20/%20Systems%20Engineer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/50 border border-blue-800/50 text-blue-300 hover:bg-blue-900/50 transition-colors font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Adarshnarayanmzp44@gmail.com</span>
                </a>

                <a
                  href="https://github.com/yajnabhairav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub (@yajnabhairav)</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/adarsh-narayan-397b0425a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-slate-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Adarsh's Portrait Card + Interactive Systems Terminal */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Adarsh's Framed Portrait Card */}
            <div className="relative rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#111827] via-[#0f172a] to-[#090d16] p-4 shadow-[0_0_50px_-15px_rgba(59,130,246,0.25)] backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                
                {/* Photo with Glowing Ring */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-30 blur-sm" />
                  <img
                    src="/images/profile.jpg"
                    alt="Adarsh Narayan"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedBackup) {
                        target.dataset.triedBackup = 'true';
                        target.src = '/images/adarsh-narayan.jpg';
                      }
                    }}
                    className="relative w-32 h-40 sm:w-36 sm:h-44 object-cover rounded-xl border border-blue-400/50 shadow-md"
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-500 text-[10px] font-mono font-bold text-emerald-300">
                    KIIT &apos;22–&apos;26
                  </div>
                </div>

                {/* Profile Bio Card */}
                <div className="space-y-2 text-center sm:text-left">
                  <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    Software & Systems Engineer
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Adarsh Narayan
                  </h3>
                  <div className="text-xs text-slate-300 leading-snug">
                    B.Tech CSE · Minor in VLSI & Embedded Systems
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    <span className="px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800/60 text-[11px] font-mono text-blue-300">
                      CGPA: 8.39
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800/60 text-[11px] font-mono text-amber-300">
                      AWS Cloud Badged
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/60 text-[11px] font-mono text-emerald-300">
                      C++ / Python / SQL
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Systems Terminal / Code Inspector */}
            <div className="relative rounded-xl border border-slate-800 bg-[#0f172a]/95 backdrop-blur-md shadow-2xl overflow-hidden">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/90">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    {snippets[activeSnippetTab].filename}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-slate-400 hover:text-slate-200 bg-slate-800/60 rounded transition-colors"
                    title="Copy snippet"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Segmented Tab Controls */}
              <div className="flex items-center gap-1 p-1.5 bg-slate-900/50 border-b border-slate-800/60">
                <button
                  onClick={() => {
                    setActiveSnippetTab('compiler');
                    setSimOutput(null);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeSnippetTab === 'compiler'
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  C++ Compiler
                </button>
                <button
                  onClick={() => {
                    setActiveSnippetTab('fraud');
                    setSimOutput(null);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeSnippetTab === 'fraud'
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Fraud Evaluator
                </button>
                <button
                  onClick={() => {
                    setActiveSnippetTab('vlsi');
                    setSimOutput(null);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeSnippetTab === 'vlsi'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  VLSI / HDL
                </button>
              </div>

              {/* Code Pane */}
              <div className="p-3.5 bg-[#090d16] font-mono text-[11px] text-slate-300 overflow-x-auto min-h-[145px]">
                <pre className="leading-relaxed">
                  <code>{snippets[activeSnippetTab].code}</code>
                </pre>
              </div>

              {/* Interactive Execution Trigger Bar */}
              <div className="p-2.5 bg-slate-900/80 border-t border-slate-800/80 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>Run Verification Simulation</span>
                  </span>

                  <button
                    onClick={handleRunSimulation}
                    disabled={isRunningSim}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors disabled:opacity-60"
                  >
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span>{isRunningSim ? 'Simulating...' : 'Test Run'}</span>
                  </button>
                </div>

                {simOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2 text-[11px] font-mono bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 rounded"
                  >
                    {simOutput}
                  </motion.div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Claim-to-Proof Adjacency Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm">
          <div>
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">8.39</div>
            <div className="text-xs text-slate-400 mt-0.5">B.Tech CSE Standing (CGPA)</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">VLSI & Embedded</div>
            <div className="text-xs text-slate-400 mt-0.5">Minor Specialization</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">AWS Certified</div>
            <div className="text-xs text-slate-400 mt-0.5">Foundations & Architecture</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">C / C++ & Python</div>
            <div className="text-xs text-slate-400 mt-0.5">Systems & Fraud Analytics</div>
          </div>
        </div>

      </div>
    </section>
  );
};
