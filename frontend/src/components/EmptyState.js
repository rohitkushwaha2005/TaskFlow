const EmptyState = ({ title, message }) => {
  return (
    <div className="glass-panel flex flex-col items-center justify-center rounded-3xl p-12 text-center shadow-soft">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
        📭
      </div>
      <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 max-w-xs text-sm font-medium text-slate-500">{message}</p>
    </div>
  );
};

export default EmptyState;
