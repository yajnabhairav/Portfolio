import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Layers, 
  Code, 
  X, 
  Terminal, 
  CheckCircle2, 
  RefreshCw,
  GitBranch
} from 'lucide-react';
import { Project } from '../types.ts';
import { api } from '../services/api.ts';

export const ProjectsFeed: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects({
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        search: searchQuery || undefined
      });
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProjects();
  };

  const categories = ['All', 'Systems & Compilers', 'Security & Analytics'];

  return (
    <section id="projects" className="py-16 border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Production Codebase & Systems Engineering
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Featured Projects & Architecture
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-2">
              Dynamic repository feed loaded directly from the Express API backend. 
              Click any project for architectural pipeline breakdowns and source implementations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadProjects}
              title="Refresh projects from database"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
              <span>Sync DB Feed</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800/80 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search C++, AST, Python, SQL..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>

        {/* Dynamic Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-72 rounded-xl border border-slate-800/60 bg-slate-900/30 animate-pulse p-6">
                <div className="h-6 w-1/3 bg-slate-800 rounded mb-4" />
                <div className="h-4 w-3/4 bg-slate-800 rounded mb-2" />
                <div className="h-4 w-1/2 bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-slate-800 bg-slate-900/30">
            <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <div className="text-base font-semibold text-white">No projects found</div>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search criteria or switch to All categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group relative rounded-xl border border-slate-800 bg-[#0f172a]/80 backdrop-blur-sm p-6 md:p-8 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-lg shadow-black/20"
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                    <span className="text-blue-400">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Year {project.year}</span>
                    {project.featured && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-medium">Featured Showcase</span>
                      </>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Summary / Description */}
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {project.keyHighlights && project.keyHighlights.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {project.keyHighlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Tags + Action Controls */}
                <div className="space-y-4 pt-4 border-t border-slate-800/80">
                  
                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono">
                    {project.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="text-slate-300">{tag}</span>
                        {idx < project.tags.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Inspect Architecture & Code</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                          title="View Repository"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* Detailed Architecture & Code Slide-Out Modal */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-700 bg-[#0d1322] p-6 md:p-8 shadow-2xl space-y-6"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                      <span className="text-blue-400">{activeProjectModal.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Built {activeProjectModal.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {activeProjectModal.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Verbatim Description */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Executive Summary & Technical Scope
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeProjectModal.description}
                  </p>
                </div>

                {/* Architectural Pipeline */}
                {activeProjectModal.architecture && activeProjectModal.architecture.components && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Multi-Stage Execution Architecture
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeProjectModal.architecture.components.map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center font-mono text-[10px] shrink-0">
                            {idx + 1}
                          </span>
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Snippet Viewer */}
                {activeProjectModal.codeSnippet && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                        <span>Core Logic Implementation ({activeProjectModal.codeSnippet.language.toUpperCase()})</span>
                      </h4>
                      <span className="text-[11px] font-mono text-slate-500">
                        {activeProjectModal.codeSnippet.title}
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-[#070a12] border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-64">
                      <pre>
                        <code>{activeProjectModal.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Modal Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>Repository:</span>
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {activeProjectModal.githubUrl}
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Close Drawer
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
