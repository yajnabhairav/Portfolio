import React, { useState } from 'react';
import { Code2, Database, Cpu, Wrench, CheckCircle2 } from 'lucide-react';

interface SkillItem {
  name: string;
  level: string;
  details: string;
  focusAreas: string[];
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: <Code2 className="w-4 h-4 text-blue-400" />,
    description: 'Strong foundation in compiled systems programming and scripting.',
    skills: [
      {
        name: 'C++',
        level: 'Primary Focus',
        details: 'Deep comprehension of C++ internals, memory models, object lifecycles, AST design, and performance optimizations.',
        focusAreas: ['C++17/20 Syntax', 'STL Containers', 'Pointers & References', 'Compiler Tokenization']
      },
      {
        name: 'C',
        level: 'Systems & Hardware',
        details: 'Procedural programming, low-level pointer arithmetic, memory management (malloc/free), and hardware-adjacent logic.',
        focusAreas: ['Memory Layout', 'Bitwise Operations', 'Struct Alignment', 'POSIX APIs']
      },
      {
        name: 'Python',
        level: 'Basic / Applied',
        details: 'Applied scripting, data preprocessing, custom pattern validation, and numeric analysis workflows.',
        focusAreas: ['Data Preprocessing', 'Logic Heuristics', 'Validation Scripts', 'File I/O Parsing']
      }
    ]
  },
  {
    id: 'concepts',
    title: 'Core Concepts',
    icon: <Database className="w-4 h-4 text-emerald-400" />,
    description: 'Foundational computer science principles applied across software design.',
    skills: [
      {
        name: 'Object-Oriented Programming (OOPs)',
        level: 'Core Discipline',
        details: 'Polymorphism, inheritance, encapsulation, abstraction, and clean component isolation in modular systems.',
        focusAreas: ['Virtual Dispatch', 'Composition vs Inheritance', 'Design Patterns', 'Interface Segregation']
      },
      {
        name: 'DBMS & Relational Modeling',
        level: 'Data Architecture',
        details: 'Relational data structures, normalization forms (1NF through BCNF), indexing strategies, and transactional ACID guarantees.',
        focusAreas: ['Schema Design', 'ACID Compliance', 'Entity Relationships', 'Index Tuning']
      },
      {
        name: 'SQL',
        level: 'Query & Analysis',
        details: 'Writing structured queries, complex joins, nested aggregations, constraint assertions, and data integrity checks.',
        focusAreas: ['Aggregations', 'Join Optimizations', 'Window Functions', 'Constraints']
      }
    ]
  },
  {
    id: 'embedded',
    title: 'VLSI & Embedded',
    icon: <Cpu className="w-4 h-4 text-purple-400" />,
    description: 'Minor specialization combining hardware principles with digital logic.',
    skills: [
      {
        name: 'Digital Electronics',
        level: 'Hardware Foundations',
        details: 'Combinational & sequential logic circuits, flip-flops, state machines, Karnaugh mapping, and boolean algebra minimization.',
        focusAreas: ['Combinational Circuits', 'Finite State Machines', 'Logic Minimization', 'Timing Diagrams']
      },
      {
        name: 'Basic Embedded Systems Concepts',
        level: 'Hardware-Software Interfacing',
        details: 'Understanding microcontroller registers, clock cycles, interrupt service routines (ISRs), memory maps, and hardware bus protocols.',
        focusAreas: ['Microcontrollers', 'Interrupt Handling', 'Bus Protocols (UART/I2C basics)', 'Hardware Registers']
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: <Wrench className="w-4 h-4 text-amber-400" />,
    description: 'Modern development workflows, versioning, cloud, and environment toolchains.',
    skills: [
      {
        name: 'Git & Version Control',
        level: 'Daily Workflow',
        details: 'Distributed branch management, atomic commits, interactive rebase, pull request workflows, and repository hygiene.',
        focusAreas: ['Branching Models', 'Rebasing & Merging', 'Conflict Resolution', 'GitHub Workflows']
      },
      {
        name: 'VS Code & Tooling',
        level: 'Primary IDE',
        details: 'Integrated debugger configurations, build task automation, C/C++ clangd extensions, and productivity shortcuts.',
        focusAreas: ['Debugger Launch Configs', 'Clangd/CMake Tools', 'Task Automation', 'Keybindings']
      },
      {
        name: 'Linux (Ubuntu)',
        level: 'Operating Environment',
        details: 'Unix shell command-line mastery, process inspection, file permissions, shell scripting, and build toolchains (GCC/G++).',
        focusAreas: ['Bash CLI', 'GCC/G++ Toolchain', 'File Permissions & Cron', 'Process Monitoring']
      },
      {
        name: 'AWS Cloud Foundation',
        level: 'Cloud Architecture',
        details: 'EC2 instances, S3 object storage, VPC networking concepts, IAM security roles, and cloud cost governance.',
        focusAreas: ['Cloud Architecture', 'IAM & Security', 'EC2 & Compute', 'S3 & Storage']
      }
    ]
  }
];

export const SkillsMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('languages');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(CATEGORIES[0].skills[0]);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <section id="skills" className="py-16 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Competencies & Engineering Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Technical Skills Core
          </h2>
          <p className="text-sm md:text-base text-slate-400 mt-2">
            Categorized technical capabilities spanning low-level systems programming, 
            data modeling, digital hardware concepts, and cloud foundations.
          </p>
        </div>

        {/* Interactive Category Selector (Functional Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800/80 mb-8 max-w-2xl">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSelectedSkill(cat.skills[0]);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.icon}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dual Pane Layout: Skill Grid + Deep-Dive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Skill List Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeCategory.skills.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500/80 bg-blue-950/20 shadow-lg shadow-blue-500/5'
                      : 'border-slate-800 bg-[#0f172a]/60 hover:border-slate-700 hover:bg-[#0f172a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-blue-400">
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {skill.details}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-400">
                    {skill.focusAreas.slice(0, 3).map((item, idx) => (
                      <React.Fragment key={item}>
                        <span>{item}</span>
                        {idx < Math.min(skill.focusAreas.length, 3) - 1 && (
                          <span aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Inspector Pane (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-sm space-y-5">
            <div>
              <div className="text-xs font-mono text-blue-400 mb-1">
                Technical Focus & Implementation Rigor
              </div>
              <h3 className="text-xl font-bold text-white">
                {selectedSkill.name}
              </h3>
              <div className="text-xs text-slate-400 mt-1">
                Proficiency Classification: {selectedSkill.level}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedSkill.details}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300">
                Key Technical Focus Areas
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSkill.focusAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 p-2 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded bg-slate-900/90 border border-slate-800/80 text-xs font-mono text-slate-400">
              <span className="text-emerald-400">Verified Concept:</span> Applicable to high-performance systems, compilers, database schemas, and hardware verification tasks.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
