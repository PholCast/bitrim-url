interface CircularLoaderProps {
  size?: number;
  label?: string;
  className?: string;
}

export const CircularLoader = ({
  size = 40,
  label,
  className = "",
}: CircularLoaderProps) => {
  return (
    <div className="text-center">
      <div
        className={`mx-auto animate-spin rounded-full border-4 border-primary/25 border-t-primary ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        aria-hidden="true"
      />

      {label ? <p className="mt-4 text-sm font-semibold text-slate-300">{label}</p> : null}
    </div>
  );
};
