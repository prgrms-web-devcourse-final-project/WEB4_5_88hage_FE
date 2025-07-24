import DatepickerComponent from '@/components/common/DatepickerComponent';

export default function page() {
  return (
    <div className="px-4 py-2">
      <DatepickerComponent
        placeholder="테스트입니당"
        className="bg-amber-200"
      />
    </div>
  );
}
