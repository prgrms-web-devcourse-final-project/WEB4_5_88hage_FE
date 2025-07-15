interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <div className="t3 rounded-2xl bg-[#393939] px-2.5 py-1 text-white">
      #{name}
    </div>
  );
}
