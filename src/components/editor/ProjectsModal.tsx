import React, { useState } from 'react';
import { ProjectSummary, CollageState } from '../../types';
import { getAllProjects, loadProjectById, deleteProjectById } from '../../core/storage';
import { FolderOpen, Plus, Trash2, Clock, Check, X, ArrowRight } from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProjectId?: string;
  onSelectProject: (project: CollageState) => void;
  onNewProject: () => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  currentProjectId,
  onSelectProject,
  onNewProject,
}) => {
  const [projects, setProjects] = useState<ProjectSummary[]>(getAllProjects());

  if (!isOpen) return null;

  const handleOpen = (id: string) => {
    const proj = loadProjectById(id);
    if (proj) {
      onSelectProject(proj);
      onClose();
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteProjectById(id);
    setProjects(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4 pr-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-heading font-bold text-white">Your Saved Projects</h2>
            </div>
            <p className="text-xs text-neutral-400">
              Switch between saved collages or start a fresh workspace.
            </p>
          </div>

          <button
            onClick={() => {
              onNewProject();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all shrink-0 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          {projects.length === 0 ? (
            <div className="py-12 text-center text-neutral-500">
              <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No saved projects yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map(proj => {
                const isActive = currentProjectId === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => handleOpen(proj.id)}
                    className={`p-4 rounded-xl bg-neutral-950/80 border transition-all cursor-pointer group flex flex-col justify-between ${
                      isActive
                        ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-neutral-950 shadow-lg shadow-indigo-500/10'
                        : 'border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-950'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        )}
                        <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors truncate max-w-[170px]">
                          {proj.name}
                        </div>
                      </div>
                      <button
                        onClick={e => handleDelete(e, proj.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800/80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300 font-mono">
                          {proj.aspectRatio || '16:9'}
                        </span>
                        {isActive ? (
                          <span className="text-emerald-400 font-semibold flex items-center text-xs">
                            <Check className="w-3.5 h-3.5 mr-0.5" /> Active
                          </span>
                        ) : (
                          <span className="text-indigo-400 font-semibold flex items-center text-xs">
                            Open <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
