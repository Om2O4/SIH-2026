import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  className = '' 
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Mountain & Sun Icon SVG */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Sun with rays */}
          <circle cx="24" cy="18" r="7" fill="#F28C28" />
          <path d="M24 6V9" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" />
          <path d="M32.5 9.5L30.4 11.6" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" />
          <path d="M36 18H33" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" />
          <path d="M15.5 9.5L17.6 11.6" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 18H15" stroke="#F28C28" strokeWidth="2" strokeLinecap="round" />
          
          {/* Back Mountain (Snowy Navy) */}
          <path d="M26 42L36 24L46 42H26Z" fill="#2563A9" fillOpacity="0.8" />
          <path d="M36 24L39 29.5L36 31L33 29.5L36 24Z" fill="#DCEEFF" />

          {/* Front Mountain & Shelter Roof Peak */}
          <path d="M6 42L20 18L34 42H6Z" fill="#0B2559" />
          <path d="M20 18L24 25L20 27L16 25L20 18Z" fill="#DCEEFF" />
          
          {/* Green Eco Base / Foundation */}
          <path d="M4 42C4 40.8954 4.89543 40 6 40H42C43.1046 40 44 40.8954 44 42H4Z" fill="#2E7D4F" />
        </svg>
      </div>

      <div>
        <div className="flex items-center space-x-1.5 leading-none">
          <span className={`font-extrabold tracking-tight text-[#0B2559] font-display ${titleSizes[size]}`}>
            CLIMASHELTER
          </span>
          <span className={`font-bold text-[#2563A9] bg-[#DCEEFF] px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase font-mono`}>
            AI
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[10px] text-[#64748B] font-medium tracking-tight mt-0.5">
            Smart Passive Shelter Design & Thermal Optimization
          </p>
        )}
      </div>
    </div>
  );
};
