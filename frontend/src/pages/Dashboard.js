import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

const StatCard = ({ label, value, tone }) => {
  const tones = {
    slate: "from-slate-400/20 to-slate-400/5 text-white",
    green: "from-emerald-400/20 to-emerald-400/5 text-emerald-400",
    blue: "from-sky-400/20 to-sky-400/5 text-sky-400",
    red: "from-rose-400/20 to-rose-400/5 text-rose-400"
  };

  return (
    <div className={`stat-card relative overflow-hidden group`}>
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl ${tones[tone]}`} />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-3 stat-card-value">{value}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <span className={`block h-full rounded-full bg-gradient-to-r ${tones[tone]} w-2/3`} />
        </span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { request, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", project: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => value && params.append(key, value));
      const [taskData, projectData] = await Promise.all([
        request(`/api/tasks${params.toString() ? `?${params}` : ""}`),
        request("/api/projects")
      ]);
      setTasks(taskData);
      setProjects(projectData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters, request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "Done").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    overdue: tasks.filter((task) => task.status === "Overdue").length
  }), [tasks]);

  if (loading) return <LoadingState label="Loading dashboard..." />;

  return (
    <>
      <section className="visual-hero mb-6 overflow-hidden rounded-md p-6 text-white shadow-soft">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wide text-white/75">{user?.role === "admin" ? "Admin overview" : "My workload"}</p>
          <h1 className="mt-2 text-3xl font-bold">Work that moves together</h1>
          <p className="mt-3 text-sm leading-6 text-white/85">Plan projects, assign clear ownership, and keep overdue work visible before it becomes a blocker.</p>
        </div>
      </section>

      <PageHeader
        eyebrow={user?.role === "admin" ? "Admin overview" : "My workload"}
        title="Dashboard"
        description="Track project work, overdue items, and team delivery from one place."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.total} tone="slate" />
        <StatCard label="Completed" value={stats.completed} tone="green" />
        <StatCard label="In Progress" value={stats.inProgress} tone="blue" />
        <StatCard label="Overdue" value={stats.overdue} tone="red" />
      </div>

      <section className="mt-6 rounded-md border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="grid gap-3 md:grid-cols-3">
          <select className="form-input" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            <option value="">All statuses</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
            <option>Overdue</option>
          </select>
          <select className="form-input" value={filters.priority} onChange={(event) => setFilters({ ...filters, priority: event.target.value })}>
            <option value="">All priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select className="form-input" value={filters.project} onChange={(event) => setFilters({ ...filters, project: event.target.value })}>
            <option value="">All projects</option>
            {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
          </select>
        </div>
      </section>

      <section className="mt-10">
        {tasks.length === 0 ? (
          <EmptyState title="No tasks found" message="Tasks matching the selected filters will appear here." />
        ) : (
          <div className="table-container shadow-2xl shadow-black/20">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5 text-sm">
                <thead className="bg-white/[0.03] text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Task Information</th>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Assignee</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Current Status</th>
                    <th className="px-6 py-4">Target Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tasks.map((task) => (
                    <tr key={task._id} className="table-row">
                      <td className="px-6 py-5">
                        <div className="font-bold text-white">{task.title}</div>
                        <div className="mt-1 text-xs text-slate-500 line-clamp-1">{task.description}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 ring-1 ring-white/10">
                          {task.project?.name}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-sky-500/10 flex items-center justify-center text-[10px] font-black text-sky-400 border border-sky-500/20">
                            {task.assignedTo?.name?.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-300">{task.assignedTo?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5"><Badge type="priority" value={task.priority} /></td>
                      <td className="px-6 py-5"><Badge value={task.status} /></td>
                      <td className="px-6 py-5 font-mono text-xs text-slate-400">{new Date(task.dueDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
