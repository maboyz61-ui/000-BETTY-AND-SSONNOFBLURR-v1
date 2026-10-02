import React, { useState } from 'react';
import { FolderKanban, Plus, CheckCircle2, Clock, AlertCircle, ChevronRight, Download, Sparkles, Filter, UserCheck, X } from 'lucide-react';
import { WorkspaceTask } from '../types';

interface ProjectWorkspaceProps {
  tasks: WorkspaceTask[];
  onAddTask: (task: WorkspaceTask) => void;
  onUpdateStage: (taskId: string, newStage: WorkspaceTask['stage']) => void;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({
  tasks,
  onAddTask,
  onUpdateStage,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedLog, setCopiedLog] = useState<boolean>(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<WorkspaceTask['category']>('Audio');
  const [newTaskAssignee, setNewTaskAssignee] = useState<WorkspaceTask['assignee']>('Betty');
  const [newTaskPriority, setNewTaskPriority] = useState<WorkspaceTask['priority']>('medium');
  const [newTaskDue, setNewTaskDue] = useState('2026-11-15');
  const [newTaskNotes, setNewTaskNotes] = useState('');

  const columns: { stage: WorkspaceTask['stage']; label: string; desc: string; color: string }[] = [
    { stage: 'concept', label: 'Concept & Writing', desc: 'Raw themes, chord sketches, lyrics', color: 'border-amber-500/40 text-amber-300' },
    { stage: 'in_progress', label: 'Tracking & Sound Lab', desc: 'Synthesizer takes, vocal tracks, 808s', color: 'border-sky-500/40 text-sky-300' },
    { stage: 'mix_master', label: 'Tape Saturation & Mix', desc: 'Analog reel dubs, stem equalization', color: 'border-purple-500/40 text-purple-300' },
    { stage: 'completed', label: 'Mastered & Released', desc: 'Ready for vinyl, cassette & stage', color: 'border-emerald-500/40 text-emerald-300' },
  ];

  const filteredTasks = filterCategory === 'All'
    ? tasks
    : tasks.filter((t) => t.category === filterCategory);

  const completedCount = tasks.filter((t) => t.stage === 'completed').length;
  const progressPct = Math.round((completedCount / (tasks.length || 1)) * 100);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: WorkspaceTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      stage: 'concept',
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      dueDate: newTaskDue,
      notes: newTaskNotes.trim() || undefined,
    };

    onAddTask(task);
    setNewTaskTitle('');
    setNewTaskNotes('');
    setIsModalOpen(false);
  };

  const handleExportLog = () => {
    const text = `# Betty and Sunnofblur Project Status Log
Generated: ${new Date().toISOString()}
Completion: ${progressPct}% (${completedCount}/${tasks.length} tasks completed)

## Active Pipeline:
${tasks.map(t => `- [${t.stage.toUpperCase()}] ${t.title} (Assigned to ${t.assignee}, Due: ${t.dueDate})`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 3000);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-purple-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
            <FolderKanban className="h-4 w-4" />
            <span>PROJECT MANAGEMENT & STUDIO PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            BETTY & SUNNOFBLUR WORKSPACE
          </h2>
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
            Live production board tracking track bounces, reel dubs, shader code, and merchandise manufacture for the 000-BETTY-AND-SSONNOFBLURR project.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportLog}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-neutral-900/80 px-3.5 py-2 text-xs font-mono text-neutral-300 hover:text-white hover:border-purple-500/40 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{copiedLog ? 'COPIED TO CLIPBOARD' : 'EXPORT STUDIO LOG'}</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-mono font-bold text-white shadow-lg shadow-purple-600/30 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>NEW STUDIO TASK</span>
          </button>
        </div>
      </div>

      {/* Progress & Milestone Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/40 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs text-neutral-400">RELEASE COMPLETION</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-display font-bold text-white">{progressPct}%</span>
            <span className="text-xs text-purple-400 font-mono">({completedCount} of {tasks.length} tasks ready)</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/40 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs text-neutral-400">HARDWARE TRACKING</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-display font-bold text-sky-400">4 / 4</span>
            <span className="text-xs text-neutral-400 font-mono">Analog tape passes calibrated</span>
          </div>
          <p className="mt-3 text-xs text-neutral-500 font-mono">Revox B77 & Nagra reels aligned at 15 IPS</p>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-neutral-900/40 p-5 backdrop-blur-xl">
          <span className="font-mono text-xs text-neutral-400">AUDIO-VISUAL SHADERS</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-display font-bold text-fuchsia-400">96.8%</span>
            <span className="text-xs text-neutral-400 font-mono">Tour visual render latency stable</span>
          </div>
          <p className="mt-3 text-xs text-neutral-500 font-mono">60 FPS synchronized to 808 transient spikes</p>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center gap-1">
          <Filter className="h-3 w-3" /> CATEGORY:
        </span>
        {['All', 'Audio', 'Visual', 'Merch', 'Live', 'Release'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
              filterCategory === cat
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.stage === col.stage);

          return (
            <div
              key={col.stage}
              className="flex flex-col rounded-2xl border border-white/5 bg-neutral-900/50 p-4 backdrop-blur-md"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <h4 className={`font-display font-bold text-sm ${col.color}`}>
                    {col.label}
                  </h4>
                  <p className="font-mono text-[10px] text-neutral-500 truncate">{col.desc}</p>
                </div>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 font-mono text-[11px] text-neutral-300">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-neutral-500 font-mono">
                    No active tasks
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group rounded-xl border border-purple-500/10 bg-neutral-950/70 p-4 shadow-sm hover:border-purple-500/40 hover:shadow-md transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="rounded bg-purple-950/80 px-2 py-0.5 text-purple-300 border border-purple-500/30">
                          {task.category}
                        </span>
                        <span
                          className={`font-bold ${
                            task.priority === 'high'
                              ? 'text-rose-400'
                              : task.priority === 'medium'
                              ? 'text-amber-400'
                              : 'text-neutral-400'
                          }`}
                        >
                          {task.priority.toUpperCase()}
                        </span>
                      </div>

                      <h5 className="font-display font-bold text-sm text-neutral-100 group-hover:text-purple-300 transition-colors leading-snug">
                        {task.title}
                      </h5>

                      {task.notes && (
                        <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-2">
                          {task.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400">
                        <span className="flex items-center gap-1 text-purple-300">
                          <UserCheck className="h-3 w-3" /> {task.assignee}
                        </span>
                        <span>{task.dueDate}</span>
                      </div>

                      {/* Move Stage Quick Actions */}
                      <div className="flex items-center justify-between pt-1 gap-1">
                        {col.stage !== 'concept' && (
                          <button
                            onClick={() => {
                              const stages: WorkspaceTask['stage'][] = ['concept', 'in_progress', 'mix_master', 'completed'];
                              const currIdx = stages.indexOf(col.stage);
                              onUpdateStage(task.id, stages[currIdx - 1]);
                            }}
                            className="text-[10px] font-mono text-neutral-500 hover:text-white"
                          >
                            ← Prev
                          </button>
                        )}
                        <span className="flex-1"></span>
                        {col.stage !== 'completed' && (
                          <button
                            onClick={() => {
                              const stages: WorkspaceTask['stage'][] = ['concept', 'in_progress', 'mix_master', 'completed'];
                              const currIdx = stages.indexOf(col.stage);
                              onUpdateStage(task.id, stages[currIdx + 1]);
                            }}
                            className="text-[10px] font-mono text-purple-400 hover:text-purple-200 font-bold flex items-center"
                          >
                            Advance →
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-lg w-full rounded-3xl border border-purple-500/40 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 rounded-full p-2 bg-neutral-900 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-white mb-1">
              CREATE STUDIO PIPELINE TASK
            </h3>
            <p className="text-xs text-neutral-400 font-mono mb-6">
              Assign audio-visual duties to Betty, Son of Blur, or the Studio Lab.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  TASK TITLE
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Calibrate Sub Frequency Phase on Track 03..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as WorkspaceTask['category'])}
                    className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Audio">Audio</option>
                    <option value="Visual">Visual</option>
                    <option value="Merch">Merch</option>
                    <option value="Live">Live</option>
                    <option value="Release">Release</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    ASSIGNEE
                  </label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value as WorkspaceTask['assignee'])}
                    className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Betty">Betty</option>
                    <option value="Son of Blur">Son of Blur</option>
                    <option value="Studio Lab">Studio Lab</option>
                    <option value="Creative Director">Creative Director</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    PRIORITY
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as WorkspaceTask['priority'])}
                    className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    TARGET DUE DATE
                  </label>
                  <input
                    type="date"
                    value={newTaskDue}
                    onChange={(e) => setNewTaskDue(e.target.value)}
                    className="w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  TECHNICAL NOTES & PARAMETERS
                </label>
                <textarea
                  rows={3}
                  placeholder="DSP filter curves, tape reels, or font specifications..."
                  value={newTaskNotes}
                  onChange={(e) => setNewTaskNotes(e.target.value)}
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-2 text-xs font-mono font-bold text-white shadow-lg shadow-purple-600/30"
                >
                  COMMIT TASK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
