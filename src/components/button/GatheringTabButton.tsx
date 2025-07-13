interface GatheringTabButtonProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function GatheringTabButton({
  icon,
  label,
  selected = false,
  onClick,
}: GatheringTabButtonProps) {
  return (
    <button onClick={onClick} className="flex flex-col items-center">
      {icon}
      <div className="t3 mt-2">{label}</div>
      {selected && <hr className="w-[125px]" />}
    </button>
  );
}
