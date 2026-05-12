import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const { isAdmin, request } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [memberEmails, setMemberEmails] = useState({});

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await request("/api/projects"));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await request("/api/projects", { method: "POST", body: JSON.stringify(form) });
      setForm({ name: "", description: "" });
      toast.success("Project created");
      fetchProjects();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const addMember = async (projectId) => {
    try {
      await request(`/api/projects/${projectId}/members`, {
        method: "POST",
        body: JSON.stringify({ email: memberEmails[projectId] })
      });
      setMemberEmails({ ...memberEmails, [projectId]: "" });
      toast.success("Member added");
      fetchProjects();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await request(`/api/projects/${projectId}`, { method: "DELETE" });
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeMember = async (projectId, memberId) => {
    try {
      await request(`/api/projects/${projectId}/members/${memberId}`, { method: "DELETE" });
      toast.success("Member removed");
      fetchProjects();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <LoadingState label="Loading projects..." />;

  return (
    <>
      <section className="mb-10 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500">Project portfolio</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white leading-tight">Build a cleaner <br/>operating rhythm</h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">Keep every project connected to the people responsible for the work, then assign tasks only to the right team members.</p>
        </div>
        <div
          className="hidden min-h-64 bg-cover bg-center lg:block grayscale hover:grayscale-0 transition-all duration-700"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(2,6,23,1), rgba(2,6,23,0.4)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80')" }}
        />
      </section>

      <PageHeader
        eyebrow="Project management"
        title="Projects"
        description={isAdmin ? "Create project spaces and add member accounts by email." : "View the projects where you are a member."}
      />

      {isAdmin && (
        <form onSubmit={createProject} className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-inner">
          <div className="grid gap-4 md:grid-cols-[1.5fr_2.5fr_auto]">
            <input className="form-input" placeholder="Project name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            <input className="form-input" placeholder="What's the core mission?" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
            <button className="btn-primary px-8" type="submit" disabled={saving}>{saving ? "Creating..." : "Launch Project"}</button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <EmptyState title="No projects yet" message={isAdmin ? "Create the first project to start assigning team work." : "Ask an admin to add you to a project."} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {projects.map((project) => (
            <article key={project._id} className="glass-card flex flex-col rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-sm font-black text-white shadow-lg">
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white tracking-tight">{project.name}</h2>
                      <p className="mt-1 text-xs font-medium text-slate-500">Created by {project.createdBy?.name}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">{project.description}</p>
                </div>
                {isAdmin && (
                  <button className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-500" type="button" onClick={() => deleteProject(project._id)}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                )}
              </div>

              <div className="mt-8 border-t border-white/5 pt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Active Workforce</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.members?.length ? project.members.map((member) => (
                    <span key={member._id} className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 ring-1 ring-white/10 group/member">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {member.name}
                      {isAdmin && (
                        <button
                          type="button"
                          className="ml-1 opacity-0 group-hover/member:opacity-100 transition-opacity text-slate-500 hover:text-rose-500"
                          onClick={() => removeMember(project._id, member._id)}
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </span>
                  )) : <span className="text-xs font-medium text-slate-500">No workforce assigned</span>}
                </div>
              </div>

              {isAdmin && (
                <div className="mt-8 flex gap-2">
                  <input className="form-input" type="email" placeholder="Add via email..." value={memberEmails[project._id] || ""} onChange={(event) => setMemberEmails({ ...memberEmails, [project._id]: event.target.value })} />
                  <button className="btn-secondary px-4 py-2" type="button" onClick={() => addMember(project._id)}>+</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default Projects;
