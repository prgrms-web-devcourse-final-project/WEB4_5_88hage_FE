type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?:string;
};

export default function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <span className="relative flex items-center">
        <input
          type="checkbox"
          className="peer checked:border-main focus:ring-main bg-gray-5 h-5 w-5 appearance-none rounded transition-all duration-150 focus:ring-2 focus:outline-none"
          {...props}
        />
        {/* 체크 표시 (V)만 보이도록 */}
        <svg
          className="text-main pointer-events-none absolute top-0 left-0 hidden h-5 w-5 peer-checked:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className="t4 font-semibold">{label}</span>}
    </label>
  );
}
