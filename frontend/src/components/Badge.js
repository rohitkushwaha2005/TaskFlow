const Badge = ({ type = "status", value }) => {
  const styles = {
    Todo: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    "In Progress": "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Overdue: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    High: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  };

  return (
    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${styles[value] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
      {value}
    </span>
  );
};

export default Badge;
