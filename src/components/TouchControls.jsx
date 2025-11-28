export const TouchControls = ({ onMove, onShoot, onStopMove }) => {
  // Simple D-Pad and Shoot Button
  return (
    <div className="absolute bottom-4 md:bottom-8 left-0 w-full px-4 md:px-8 flex justify-between items-end pointer-events-auto z-30 touch-none select-none">
      {/* D-Pad / Movement Area */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex">
                <button 
                    className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-t-xl active:bg-white/40 mb-1 border border-white/10"
                    onTouchStart={() => onMove('ArrowUp')}
                    onTouchEnd={() => onStopMove('ArrowUp')}
                    onMouseDown={() => onMove('ArrowUp')}
                    onMouseUp={() => onStopMove('ArrowUp')}
                >⬆️</button>
            </div>
            <div className="flex gap-1">
                <button 
                    className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-l-xl active:bg-white/40 border border-white/10"
                    onTouchStart={() => onMove('ArrowLeft')}
                    onTouchEnd={() => onStopMove('ArrowLeft')}
                    onMouseDown={() => onMove('ArrowLeft')}
                    onMouseUp={() => onStopMove('ArrowLeft')}
                >⬅️</button>
                <button 
                    className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-r-xl active:bg-white/40 border border-white/10"
                    onTouchStart={() => onMove('ArrowRight')}
                    onTouchEnd={() => onStopMove('ArrowRight')}
                    onMouseDown={() => onMove('ArrowRight')}
                    onMouseUp={() => onStopMove('ArrowRight')}
                >➡️</button>
            </div>
            <div className="flex">
                <button 
                    className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-b-xl active:bg-white/40 mt-1 border border-white/10"
                    onTouchStart={() => onMove('ArrowDown')}
                    onTouchEnd={() => onStopMove('ArrowDown')}
                    onMouseDown={() => onMove('ArrowDown')}
                    onMouseUp={() => onStopMove('ArrowDown')}
                >⬇️</button>
            </div>
        </div>
      </div>

      {/* Shoot Button */}
      <button 
        className="w-24 h-24 md:w-28 md:h-28 bg-red-600/80 rounded-full border-4 border-red-400 active:bg-red-500 active:scale-95 transition-transform flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] mb-2 md:mb-4 mr-2 md:mr-4"
        onTouchStart={() => onMove('Space')} // Treat as key down
        onTouchEnd={() => onStopMove('Space')}
        onMouseDown={() => onMove('Space')}
        onMouseUp={() => onStopMove('Space')}
      >
        <span className="text-3xl md:text-4xl drop-shadow-md">⚔️</span>
      </button>
    </div>
  );
};
