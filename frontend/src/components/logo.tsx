import type { SoftwiseLogoProps } from "../types/main.types";

export const SoftwiseLogo: React.FC<SoftwiseLogoProps> = ({ className = "h-10", showText = true, theme = "light" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
      <path d="M20 20 H80 V45 H40 V55 H80 V80 H20 V55 H60 V45 H20 V20Z" fill="#006C93" stroke="none" /> 
      <path d="M80 55 V80 H95 V55 H80Z" fill="#FF8C00" />
    </svg>
    {showText && (
      <div className={`font-sans font-bold text-2xl tracking-tight leading-none flex flex-col justify-center ${theme === 'dark' ? 'text-white' : 'text-[#006C93]'}`}>
        <span>Soft<span className="text-[#FF8C00]">wise</span></span>
      </div>
    )}
  </div>
);