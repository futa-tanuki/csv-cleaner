type Props = {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  placeholder?: string;
};

export default function TextAreaBlock({
  label,
  value,
  onChange,
  readOnly,
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-neutral-800">{label}</span>
      </div>

      <textarea
        className={`w-full min-h-[200px] rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm p-3 font-mono leading-relaxed outline-none focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 ${
          readOnly ? "bg-neutral-100 text-neutral-700" : ""
        }`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  );
}
