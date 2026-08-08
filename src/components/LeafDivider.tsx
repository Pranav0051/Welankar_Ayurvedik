interface LeafDividerProps {
  className?: string;
  color?: string;
}

export default function LeafDivider({ className = "", color = "#2C4A3B" }: LeafDividerProps) {
  return (
    <div className={`flex justify-center items-center py-10 ${className}`}>
      <svg
        width="480"
        height="44"
        viewBox="0 0 480 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left line tapering to center leaf */}
        <path d="M0 22 Q80 22 160 22" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
        {/* Right line tapering from center leaf */}
        <path d="M320 22 Q400 22 480 22" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>

        {/* Central leaf — main vein (spine) */}
        <path d="M168 22 Q200 10 240 22 Q280 34 320 22" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>

        {/* Secondary veins — upper side */}
        <path d="M185 20 Q195 13 204 9"   stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M200 17 Q211 11 221 8"   stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M216 15 Q228 10 238 8"   stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M232 16 Q244 11 254 9"   stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M248 18 Q258 13 268 11"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M263 21 Q273 16 282 14"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>

        {/* Secondary veins — lower side */}
        <path d="M185 24 Q195 31 204 35"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M200 27 Q211 33 221 36"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M216 29 Q228 34 238 36"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M232 28 Q244 33 254 35"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M248 26 Q258 31 268 33"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>
        <path d="M263 23 Q273 28 282 30"  stroke={color} strokeWidth="0.65" strokeLinecap="round"/>

        {/* Small dot at leaf tip */}
        <circle cx="240" cy="22" r="1.8" fill={color} opacity="0.4"/>
      </svg>
    </div>
  );
}
