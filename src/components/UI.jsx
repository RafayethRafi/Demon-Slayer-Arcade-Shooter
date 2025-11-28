import React from 'react';

export const UI = ({ score, health, wave, isGameOver, isPlaying, selectedCharacter, onStart, onRestart }) => {
  const getBreathingStyle = () => {
      return selectedCharacter === 'zenitsu' ? 'Thunder Breathing' : 'Water Breathing';
  };

  return (
    <>
      {/* HUD */}
      {isPlaying && !isGameOver && (
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between text-white font-bold text-sm md:text-xl pointer-events-none z-10">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="glass-panel px-4 py-2 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 md:gap-3 border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <span className="text-xl md:text-2xl animate-pulse">❤️</span> 
              <div className="w-24 md:w-32 h-2 md:h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                    style={{ width: `${health}%` }}
                />
              </div>
              <span className="font-mono">{health}%</span>
            </div>
            <div className="glass-panel px-4 py-2 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 md:gap-3 border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <span className="text-xl md:text-2xl">{selectedCharacter === 'zenitsu' ? '⚡' : '🌊'}</span>
              <span className="font-mono whitespace-nowrap text-xs md:text-base opacity-90">
                  {getBreathingStyle()}
              </span>
            </div>
          </div>
          <div className="glass-panel px-4 py-2 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 md:gap-3 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.3)] h-fit">
            <span className="text-xl md:text-2xl">⚔️</span>
            <span className="font-mono text-lg md:text-2xl text-yellow-400">{score.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Start Screen */}
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/95 backdrop-blur-sm p-4">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mb-2 drop-shadow-lg tracking-tighter text-center">
                DEMON SLAYER
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 tracking-widest uppercase drop-shadow-md text-center">
                Arcade Chronicles
            </h2>
            
            <div className="flex flex-row gap-4 md:gap-8 mb-8 md:mb-12 items-center justify-center flex-wrap">
                <button 
                    onClick={() => onStart('tanjiro')}
                    className="group relative w-40 h-56 md:w-64 md:h-80 bg-slate-800 rounded-2xl border-4 border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105 overflow-hidden flex flex-col items-center justify-end pb-4 md:pb-8 shrink-0"
                >
                    <div className="absolute inset-0 bg-[url('/assets/tanjiro.png')] bg-no-repeat bg-center bg-[length:100px] md:bg-[length:128px] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <span className="relative z-10 text-xl md:text-3xl font-bold text-blue-400">TANJIRO</span>
                    <span className="relative z-10 text-[10px] md:text-sm text-slate-400">Balanced • Water</span>
                </button>

                <button 
                    onClick={() => onStart('zenitsu')}
                    className="group relative w-40 h-56 md:w-64 md:h-80 bg-slate-800 rounded-2xl border-4 border-slate-700 hover:border-yellow-500 transition-all transform hover:scale-105 overflow-hidden flex flex-col items-center justify-end pb-4 md:pb-8 shrink-0"
                >
                    <div className="absolute inset-0 bg-[url('/assets/zenitsu.png')] bg-no-repeat bg-center bg-[length:100px] md:bg-[length:128px] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    <span className="relative z-10 text-xl md:text-3xl font-bold text-yellow-400">ZENITSU</span>
                    <span className="relative z-10 text-[10px] md:text-sm text-slate-400">Fast • Thunder</span>
                </button>
            </div>

            <div className="text-slate-400 text-sm md:text-lg flex flex-col items-center gap-2 font-medium text-center animate-pulse">
                <p>Select a Character to Start</p>
            </div>
        </div>
      )}

      {/* Game Over Screen */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-white z-20 backdrop-blur-lg">
          <div className="relative mb-8">
              <div className="absolute -inset-20 bg-red-600/20 blur-3xl rounded-full animate-pulse"></div>
              <h1 className="relative text-6xl md:text-9xl font-black text-red-600 tracking-tighter animate-float drop-shadow-[0_0_35px_rgba(220,38,38,0.8)]">
                GAME OVER
              </h1>
          </div>
          
          <div className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col items-center mb-12 transform hover:scale-105 transition-transform duration-300 border-red-900/30">
            <p className="text-slate-400 text-sm md:text-xl mb-2 uppercase tracking-[0.3em]">Final Score</p>
            <p className="text-5xl md:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">{score.toLocaleString()}</p>
          </div>
          
          <button 
            onClick={onRestart}
            className="group relative px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-[url('/assets/pattern.png')] opacity-20"></div>
            <span className="relative z-10 text-xl md:text-2xl font-black text-white tracking-wider group-hover:tracking-widest transition-all">PLAY AGAIN</span>
          </button>
        </div>
      )}
    </>
  );
};
