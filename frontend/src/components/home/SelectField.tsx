interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export function SelectField({ label, value, onChange, options }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        required
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
