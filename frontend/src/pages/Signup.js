import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-visual relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute h-96 w-96 rounded-full bg-violet-500/20 blur-[120px] animate-pulse" />

      <section className="glass-panel relative w-full max-w-md rounded-3xl p-10 shadow-2xl">
        <BrandLogo />
        <h1 className="mt-8 text-3xl font-black tracking-tight text-white">Join the workspace</h1>
        <p className="mt-3 text-sm font-medium text-slate-400">Create your account and start orchestrating team work with clarity.</p>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
            <input className="form-input" placeholder="John Doe" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
            <input className="form-input" type="email" placeholder="name@company.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Key</label>
            <input className="form-input" type="password" placeholder="••••••••" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Workforce Role</label>
            <select className="form-input" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="btn-primary mt-4 w-full" type="submit" disabled={loading}>
            {loading ? "Initializing..." : "Create Mission Account"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs font-bold text-slate-500">
          Already a member? <Link className="text-sky-400 hover:text-sky-300 underline-offset-4 hover:underline" to="/login">Access workspace</Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;
