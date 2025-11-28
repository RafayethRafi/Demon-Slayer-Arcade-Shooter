export const TouchControls = ({ onMove, onShoot, onStopMove }) => {
  // Simple D-Pad and Shoot Button
  return (
    <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-6 md:px-12 flex justify-between items-end pointer-events-auto z-30 touch-none select-none">
      {/* D-Pad / Movement Area */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 bg-slate-900/40 rounded-full backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <div className="flex">
                <button 
                    className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-t-2xl active:bg-white/30 mb-1 border border-white/20 backdrop-blur-sm transition-colors"
                    onTouchStart={() => onMove('ArrowUp')}
                    onTouchEnd={() => onStopMove('ArrowUp')}
                    onMouseDown={() => onMove('ArrowUp')}
                    onMouseUp={() => onStopMove('ArrowUp')}
                >
                    <span className="text-2xl opacity-80">⬆️</span>
                </button>
            </div>
            <div className="flex gap-1">
                <button 
                    className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-l-2xl active:bg-white/30 border border-white/20 backdrop-blur-sm transition-colors"
                    onTouchStart={() => onMove('ArrowLeft')}
                    onTouchEnd={() => onStopMove('ArrowLeft')}
                    onMouseDown={() => onMove('ArrowLeft')}
                    onMouseUp={() => onStopMove('ArrowLeft')}
                >
                    <span className="text-2xl opacity-80">⬅️</span>
                </button>
                <button 
                    className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-r-2xl active:bg-white/30 border border-white/20 backdrop-blur-sm transition-colors"
                    onTouchStart={() => onMove('ArrowRight')}
                    onTouchEnd={() => onStopMove('ArrowRight')}
                    onMouseDown={() => onMove('ArrowRight')}
                    onMouseUp={() => onStopMove('ArrowRight')}
                >
                    <span className="text-2xl opacity-80">➡️</span>
                </button>
            </div>
            <div className="flex">
                <button 
                    className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-b-2xl active:bg-white/30 mt-1 border border-white/20 backdrop-blur-sm transition-colors"
                    onTouchStart={() => onMove('ArrowDown')}
                    onTouchEnd={() => onStopMove('ArrowDown')}
                    onMouseDown={() => onMove('ArrowDown')}
                    onMouseUp={() => onStopMove('ArrowDown')}
                >
                    <span className="text-2xl opacity-80">⬇️</span>
                </button>
            </div>
        </div>
      </div>

      {/* Shoot Button */}
      <button 
        className="group relative w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-4 border-red-400/50 active:scale-95 transition-all flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.5)] mb-4 md:mb-6 mr-2 md:mr-6 overflow-hidden"
        onTouchStart={() => onMove('Space')} // Treat as key down
        onTouchEnd={() => onStopMove('Space')}
        onMouseDown={() => onMove('Space')}
        onMouseUp={() => onStopMove('Space')}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-active:opacity-100 transition-opacity"></div>
        <span className="text-4xl md:text-5xl drop-shadow-md transform group-active:scale-110 transition-transform">⚔️</span>
      </button>
    </div>
  );
};
