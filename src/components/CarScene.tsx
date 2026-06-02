// Pure-CSS animated hero scene: a car that bobs, with spinning wheels,
// a scrolling road, and motion "speed" lines. No JS / no libraries.
export default function CarScene() {
  return (
    <div className="car-scene relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950">
      {/* speed lines */}
      <div className="speed-lines" aria-hidden>
        <span style={{ top: "30%", animationDelay: "0s" }} />
        <span style={{ top: "42%", animationDelay: "0.7s", width: 60 }} />
        <span style={{ top: "55%", animationDelay: "0.3s", width: 90 }} />
        <span style={{ top: "66%", animationDelay: "1.1s", width: 50 }} />
      </div>

      {/* the car */}
      <div className="car-wrap" aria-hidden>
        <svg viewBox="0 0 440 210" width="100%" height="100%" role="img" aria-label="Car">
          <defs>
            <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fb923c" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* body */}
          <path
            d="M30 150 L30 120 Q30 110 42 108 L120 104 L152 68 Q158 58 174 58 L268 58 Q286 58 296 70 L324 104 L400 114 Q414 116 414 130 L414 150 Q414 158 404 158 L40 158 Q30 158 30 150 Z"
            fill="url(#carBody)"
            stroke="#9a3412"
            strokeWidth="2"
          />
          {/* windows */}
          <path d="M160 100 L182 70 L224 70 L224 100 Z" fill="#bae6fd" opacity="0.9" />
          <path d="M232 100 L232 70 L262 70 Q276 70 284 80 L300 100 Z" fill="#bae6fd" opacity="0.9" />
          {/* door line + handle */}
          <line x1="228" y1="104" x2="228" y2="150" stroke="#9a3412" strokeWidth="2" />
          <rect x="196" y="116" width="20" height="5" rx="2" fill="#9a3412" />
          {/* headlight */}
          <circle cx="406" cy="124" r="5" fill="#fde68a" />

          {/* wheels (spin) */}
          <g className="wheel">
            <circle cx="118" cy="158" r="34" fill="#1e293b" />
            <circle cx="118" cy="158" r="20" fill="#cbd5e1" />
            <circle cx="118" cy="158" r="6" fill="#475569" />
            <g stroke="#94a3b8" strokeWidth="4" strokeLinecap="round">
              <line x1="118" y1="158" x2="118" y2="140" />
              <line x1="118" y1="158" x2="118" y2="176" />
              <line x1="118" y1="158" x2="100" y2="158" />
              <line x1="118" y1="158" x2="136" y2="158" />
            </g>
          </g>
          <g className="wheel">
            <circle cx="332" cy="158" r="34" fill="#1e293b" />
            <circle cx="332" cy="158" r="20" fill="#cbd5e1" />
            <circle cx="332" cy="158" r="6" fill="#475569" />
            <g stroke="#94a3b8" strokeWidth="4" strokeLinecap="round">
              <line x1="332" y1="158" x2="332" y2="140" />
              <line x1="332" y1="158" x2="332" y2="176" />
              <line x1="332" y1="158" x2="314" y2="158" />
              <line x1="332" y1="158" x2="350" y2="158" />
            </g>
          </g>
        </svg>
      </div>

      {/* road */}
      <div className="road" aria-hidden />
    </div>
  );
}
