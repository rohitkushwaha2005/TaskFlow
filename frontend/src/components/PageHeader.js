const PageHeader = ({ eyebrow, title, description, action }) => {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-400">{description}</p>}
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
};

export default PageHeader;
