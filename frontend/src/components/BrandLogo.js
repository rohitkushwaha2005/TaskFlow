const BrandLogo = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="brand-mark animate-float">
        <span>TF</span>
      </div>
      {!compact && (
        <div className="hidden lg:block">
          <div className="text-sm font-black uppercase tracking-widest text-white">TaskFlow</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-500/50">Command Center</div>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
