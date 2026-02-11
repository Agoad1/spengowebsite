
export const SpengoLogo = ({ className = "w-8 h-8", glow = true }: { className?: string; glow?: boolean }) => {
    return (
        <div className={`relative ${className}`}>
            {glow && (
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full scale-150 animate-pulse" />
            )}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 w-full h-full"
            >
                {/* Main Bolt Body */}
                <path
                    d="M65 5L25 55H45L35 95L75 45H55L65 5Z"
                    fill="url(#logo-gradient)"
                    className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                />

                {/* Glass Effect Accents */}
                <path
                    d="M65 5L45 35L55 45H75L65 5Z"
                    fill="white"
                    fillOpacity="0.1"
                />

                {/* Inner Circuit Line */}
                <path
                    d="M58 15L38 43M42 62L38 80"
                    stroke="white"
                    strokeOpacity="0.4"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                <defs>
                    <linearGradient id="logo-gradient" x1="25" y1="5" x2="75" y2="95" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a855f7" />
                        <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
