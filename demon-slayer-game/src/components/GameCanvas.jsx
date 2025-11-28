import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../game/engine';
import { Hero, Enemy } from '../game/entities';

export const GameCanvas = ({ onGameStateChange, onGameOver, isPlaying, selectedCharacter }) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;

    // Resize canvas to match container
    const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            if (engineRef.current) {
                engineRef.current.width = canvas.width;
                engineRef.current.height = canvas.height;
            }
        }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    // Initialize engine
    const engine = new GameEngine(canvas, onGameStateChange, onGameOver);
    engineRef.current = engine;

    // Add Hero
    const hero = new Hero(canvas.width / 2 - 32, canvas.height - 100, selectedCharacter);
    engine.addEntity(hero);

    // Override spawnEnemy to use our classes
    engine.spawnEnemy = () => {
        const x = Math.random() * (canvas.width - 64);
        
        // Boss Logic: Spawn Akaza/Muzan VERY frequently
        // Boss wave every 2 waves
        const isBossWave = engine.wave % 2 === 0;
        const bossCount = engine.entities.filter(e => e.type === 'muzan' || e.type === 'akaza').length;

        if (isBossWave && bossCount === 0) {
             // Guaranteed boss on boss waves
             // Every 4th wave is Muzan, otherwise Akaza
             let bossType = 'akaza';
             if (engine.wave % 4 === 0) {
                 bossType = 'muzan';
             }
             engine.addEntity(new Enemy(x, -80, bossType));
        } else {
             // High chance for bosses in normal waves too
             const rand = Math.random();
             let enemyType = 'enemy';
             
             if (rand > 0.92) enemyType = 'muzan'; // 8% chance for random Muzan!
             else if (rand > 0.75) enemyType = 'akaza'; // 17% chance for random Akaza
             else if (rand > 0.60) enemyType = 'tank_demon'; // 15%
             else if (rand > 0.45) enemyType = 'fast_demon'; // 15%
             else enemyType = 'enemy'; // 45% basic
             
             engine.addEntity(new Enemy(x, -50, enemyType));
        }
    };

    // Start loop
    engine.start();

    return () => {
      engine.cleanup();
    };
  }, [isPlaying]); // Re-run when isPlaying changes (Restart)

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border-4 border-slate-800 bg-slate-900/80 rounded-lg shadow-2xl backdrop-blur-sm"
    />
  );
};
