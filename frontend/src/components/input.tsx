import type { BrutalInputProps } from "../types/main.types";

export const BrutalInput: React.FC<BrutalInputProps> = ({ label, type = "text", placeholder, id, value, onChange, multiline = false }) => (
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor={id} className="font-mono text-xs uppercase font-bold tracking-wider text-gray-500">{label}</label>
    {multiline ? (
      <textarea
        id={id}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#F4F4F4] border-b-2 border-black p-4 font-bold text-lg focus:outline-none focus:bg-[#CCFF00]/20 focus:border-[#FF4D00] transition-colors placeholder:text-gray-400 resize-none"
      />
    ) : (
      <input 
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#F4F4F4] border-b-2 border-black p-4 font-bold text-lg focus:outline-none focus:bg-[#CCFF00]/20 focus:border-[#FF4D00] transition-colors placeholder:text-gray-400"
      />
    )}
  </div>
);