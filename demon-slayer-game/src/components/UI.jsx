import React from 'react';

export const UI = ({ score, health, wave, isGameOver, isPlaying, selectedCharacter, onStart, onRestart }) => {
  const getBreathingStyle = () => {
      return selectedCharacter === 'zenitsu' ? 'Thunder Breathing' : 'Water Breathing';
  };

  return (
    <>
      {/* HUD */}
      {isPlaying && !isGameOver && (
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between text-white font-bold text-xl pointer-events-none z-10">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="bg-gradient-to-r from-red-600/90 to-red-800/90 px-6 py-3 rounded-2xl border border-red-400/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center gap-3 backdrop-blur-md w-fit">
              <span className="text-2xl">❤️</span> 
              <span className="font-mono text-2xl">{health}%</span>
            </div>
            <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 px-6 py-3 rounded-2xl border border-blue-400/50 shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center gap-3 backdrop-blur-md w-fit">
              <span className="text-2xl">{selectedCharacter === 'zenitsu' ? '⚡' : '🌊'}</span>
              <span className="font-mono text-xl md:text-2xl whitespace-nowrap">
                  {getBreathingStyle()}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/90 to-amber-700/90 px-6 py-3 rounded-2xl border border-yellow-400/50 shadow-[0_0_15px_rgba(234,179,8,0.5)] flex items-center gap-3 backdrop-blur-md h-fit">
            <span className="text-2xl">⚔️</span>
            <span className="font-mono text-2xl">{score.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Start Screen */}
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mb-2 drop-shadow-lg tracking-tighter text-center">
                DEMON SLAYER
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 tracking-widest uppercase drop-shadow-md text-center">
                Arcade Chronicles
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-12 p-2 items-center justify-center">
                <button 
                    onClick={() => onStart('tanjiro')}
                    className="group relative w-56 h-64 md:w-64 md:h-80 bg-slate-800 rounded-2xl border-4 border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105 overflow-hidden flex flex-col items-center justify-end pb-4 md:pb-8 shrink-0"
                >
                    <div className="absolute inset-0 bg-[url('/assets/tanjiro.png')] bg-no-repeat bg-center bg-[length:100px] md:bg-[length:128px] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <span className="relative z-10 text-2xl md:text-3xl font-bold text-blue-400">TANJIRO</span>
                    <span className="relative z-10 text-xs md:text-sm text-slate-400">Balanced • Water Breathing</span>
                </button>

                <button 
                    onClick={() => onStart('zenitsu')}
                    className="group relative w-56 h-64 md:w-64 md:h-80 bg-slate-800 rounded-2xl border-4 border-slate-700 hover:border-yellow-500 transition-all transform hover:scale-105 overflow-hidden flex flex-col items-center justify-end pb-4 md:pb-8 shrink-0"
                >
                    <div className="absolute inset-0 bg-[url('/assets/zenitsu.png')] bg-no-repeat bg-center bg-[length:100px] md:bg-[length:128px] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <span className="relative z-10 text-2xl md:text-3xl font-bold text-yellow-400">ZENITSU</span>
                    <span className="relative z-10 text-xs md:text-sm text-slate-400">Fast • Thunder Breathing</span>
                </button>
            </div>

            <div className="text-slate-400 text-sm md:text-lg flex flex-col items-center gap-2 font-medium text-center">
                <p>Select a Character to Start</p>
            </div>
        </div>
      )}

      {/* Game Over Screen */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-white z-20 backdrop-blur-md rounded-xl border border-red-900/30">
          <h1 className="text-8xl font-black text-red-600 mb-6 drop-shadow-[0_0_25px_rgba(220,38,38,0.8)] tracking-tighter animate-pulse">
            GAME OVER
          </h1>
          <div className="flex flex-col items-center mb-12 bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <p className="text-slate-400 text-xl mb-2 uppercase tracking-widest">Final Score</p>
            <p className="text-6xl font-mono font-bold text-yellow-400 drop-shadow-lg">{score.toLocaleString()}</p>
          </div>
          <button 
            onClick={onRestart}
            className="px-10 py-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-2xl text-2xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.5)] border border-red-400/30"
          >
            Play Again
          </button>
        </div>
      )}
    </>
  );
};
