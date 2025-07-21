import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = { label: string; value: string };
type Props = {
  options: Option[];
  selected: string;
  setSelected: (value: string) => void;
  className?: string;
};

export default function CategoryDropdown({
  options,
  selected,
  setSelected,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭시 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // "카테고리" 값 처리
  const placeholder = options[0];
  const displayLabel =
    options.find((o) => o.value === selected)?.label || placeholder.label;
  // 2글자인지 체크
  const isShortLabel = displayLabel.length <= 2;

  // "카테고리" placeholder만 button에 보이고, 목록에서는 렌더링X
  const optionsForDropdown = options.slice(1);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
  className={`
    flex items-center t1 bg-transparent border-none shadow-none
    text-[#cecece] py-2 ${isShortLabel ? "px-2 min-w-[60px]" : "px-4 min-w-[110px]"}
  `}
  onClick={() => setOpen((v) => !v)}
  type="button"
  style={{ outline: "none" }}
>
  <span className="truncate">{displayLabel}</span>
  <ChevronDown className="ml-1 h-5 w-5 text-[#cecece]" />
</button>
      {open && (
        <ul
          className="
            absolute left-0 mt-2 w-[150px] bg-[#222]
            rounded-[4px] shadow z-10 text-sm border border-[#393939]
          "
        >
          {optionsForDropdown.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`
                  w-full text-left px-4 py-2 hover:bg-[#7f74ff]/30
                  ${selected === option.value ? "text-[#7f74ff] font-semibold" : "text-[#cecece]"}
                `}
                onClick={() => {
                  setSelected(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}