import React, { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { UI } from './components/UI';

import { TouchControls } from './components/TouchControls';

function App() {
  const [gameState, setGameState] = useState({
    score: 0,
    health: 100,
    wave: 1
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Start false for Start Screen

  const [selectedCharacter, setSelectedCharacter] = useState('tanjiro');

  const handleGameStateChange = (newState) => {
    setGameState(newState);
  };

  const handleStart = (character) => {
      if (character) setSelectedCharacter(character);
      setIsPlaying(true);
      setGameState({ score: 0, health: 100, wave: 1 });
      setIsGameOver(false);
  };

  const handleGameOver = (finalScore) => {
    setIsGameOver(true);
    // Keep isPlaying true so canvas stays mounted (paused) or unmount?
    // Let's unmount to stop the engine
    setIsPlaying(false); 
  };

  const handleRestart = () => {
    handleStart(selectedCharacter);
  };

  // Touch handlers to simulate key presses for GameEngine
  const handleTouchStart = (key) => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: key }));
  };

  const handleTouchEnd = (key) => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: key }));
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full md:max-w-4xl md:aspect-[4/3] md:h-auto bg-black md:rounded-xl shadow-2xl overflow-hidden border border-slate-800">
        {/* We unmount GameCanvas when not playing to force full reset on restart */}
        {isPlaying && (
            <GameCanvas 
                onGameStateChange={handleGameStateChange} 
                onGameOver={handleGameOver}
                isPlaying={isPlaying}
                selectedCharacter={selectedCharacter}
            />
        )}
        <UI 
            {...gameState} 
            isGameOver={isGameOver} 
            isPlaying={isPlaying}
            selectedCharacter={selectedCharacter}
            onStart={handleStart}
            onRestart={handleRestart} 
        />
        
        {isPlaying && !isGameOver && (
            <TouchControls 
                onMove={handleTouchStart} 
                onStopMove={handleTouchEnd} 
            />
        )}
      </div>
    </div>
  );
}

export default App;
