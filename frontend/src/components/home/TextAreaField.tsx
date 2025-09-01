interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export function TextAreaField({ label, value, onChange, placeholder }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        rows={4}
        required
      />
    </div>
  );
}
