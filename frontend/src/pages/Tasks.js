import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  title: "",
  description: "",
  project: "",
  assignedTo: "",
  priority: "Medium",
  status: "Todo",
  dueDate: ""
};

const Tasks = () => {
  const { isAdmin, request } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  const selectedProject = useMemo(() => {
    return projects.find((project) => project._id === form.project);
  }, [projects, form.project]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [taskData, projectData] = await Promise.all([
        request("/api/tasks"),
        request("/api/projects")
      ]);
      setTasks(taskData);
      setProjects(projectData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createTask = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await request("/api/tasks", { method: "POST", body: JSON.stringify(form) });
      setForm(initialForm);
      toast.success("Task created");
      fetchData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await request(`/api/tasks/${taskId}`, { method: "PUT", body: JSON.stringify({ status }) });
      toast.success("Task updated");
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await request(`/api/tasks/${taskId}`, { method: "DELETE" });
      toast.success("Task deleted");
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <LoadingState label="Loading tasks..." />;

  return (
    <>
      <section className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div
            className="hidden min-h-64 bg-cover bg-center lg:block grayscale hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: "linear-gradient(90deg, rgba(2,6,23,1), rgba(2,6,23,0.4)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80')" }}
          />
          <div className="p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500">Task pipeline</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white leading-tight">Focus the <br/>next move</h1>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">Priority, status, owner, and due date stay visible so every handoff has context.</p>
          </div>
        </div>
      </section>

      <PageHeader
        eyebrow="Task management"
        title="Tasks"
        description={isAdmin ? "Create, assign, and monitor work across every project." : "Update the status of the tasks assigned to you."}
      />

      {isAdmin && (
        <form onSubmit={createTask} className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-inner">
          <div className="grid gap-4 lg:grid-cols-2">
            <input className="form-input" placeholder="Mission title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
            <input className="form-input" placeholder="Briefing details..." value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
            <select className="form-input" value={form.project} onChange={(event) => setForm({ ...form, project: event.target.value, assignedTo: "" })} required>
              <option value="">Select project</option>
              {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
            </select>
            <select className="form-input" value={form.assignedTo} onChange={(event) => setForm({ ...form, assignedTo: event.target.value })} required disabled={!selectedProject}>
              <option value="">Assign ownership</option>
              {selectedProject?.members?.map((member) => <option key={member._id} value={member._id}>{member.name} ({member.email})</option>)}
            </select>
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              <select className="form-input" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input className="form-input" type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} required />
            </div>
            <button className="btn-primary lg:col-span-2" type="submit" disabled={saving}>{saving ? "Deploying..." : "Initialize Mission"}</button>
          </div>
        </form>
      )}

      {tasks.length === 0 ? (
        <EmptyState title="No tasks yet" message={isAdmin ? "Create a task after adding members to a project." : "Assigned tasks will appear here."} />
      ) : (
        <div className="grid gap-6">
          {tasks.map((task) => (
            <article key={task._id} className={`glass-card rounded-[2rem] p-8 shadow-xl ${task.status === "Overdue" ? "ring-2 ring-rose-500/50" : ""}`}>
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Badge value={task.status} />
                    <Badge type="priority" value={task.priority} />
                    {task.status === "Overdue" && <span className="text-[10px] font-black uppercase text-rose-500 animate-pulse">Critical Delay</span>}
                  </div>
                  <h2 className="mt-4 text-2xl font-black tracking-tight text-white">{task.title}</h2>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">{task.description}</p>
                  
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                      <div className="h-5 w-5 rounded-md bg-sky-500/10 flex items-center justify-center text-[8px] font-black text-sky-400">P</div>
                      <span className="text-xs font-bold text-slate-300">{task.project?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                      <div className="h-5 w-5 rounded-md bg-violet-500/10 flex items-center justify-center text-[8px] font-black text-violet-400">O</div>
                      <span className="text-xs font-bold text-slate-300">{task.assignedTo?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
                      <div className="h-5 w-5 rounded-md bg-amber-500/10 flex items-center justify-center text-[8px] font-black text-amber-400">D</div>
                      <span className="text-xs font-bold text-slate-300">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-48">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress Stage</label>
                    <select className="form-input" value={task.status} onChange={(event) => updateStatus(task._id, event.target.value)}>
                      <option>Todo</option>
                      <option>In Progress</option>
                      <option>Done</option>
                      <option>Overdue</option>
                    </select>
                  </div>
                  {isAdmin && (
                    <button className="btn-danger w-full !py-2" type="button" onClick={() => deleteTask(task._id)}>
                      Decommission
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default Tasks;
