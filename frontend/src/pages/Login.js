import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-visual relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute h-96 w-96 rounded-full bg-sky-500/20 blur-[120px] animate-pulse" />
      
      <section className="glass-panel relative w-full max-w-md rounded-3xl p-10 shadow-2xl">
        <BrandLogo />
        <h1 className="mt-8 text-3xl font-black tracking-tight text-white">Focus on what matters</h1>
        <p className="mt-3 text-sm font-medium text-slate-400">Sign in to manage your high-priority projects and team deliveries.</p>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
            <input className="form-input" type="email" placeholder="name@company.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Key</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          </div>
          <button className="btn-primary mt-4 w-full" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Access Workspace"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs font-bold text-slate-500">
          New to the platform? <Link className="text-sky-400 hover:text-sky-300 underline-offset-4 hover:underline" to="/signup">Create mission account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
