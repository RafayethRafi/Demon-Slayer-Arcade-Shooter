export class GameEngine {
  constructor(canvas, updateCallback, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.updateCallback = updateCallback;
    this.onGameOver = onGameOver;
    
    this.entities = [];
    this.lastTime = 0;
    this.isRunning = false;
    this.keys = {};

    // Game State
    this.score = 0;
    this.wave = 1;
    this.hero = null;
    this.enemySpawnTimer = 0;
    this.spawnRate = 2.0; // Seconds

    this.handleKeyDown = (e) => this.keys[e.code] = true;
    this.handleKeyUp = (e) => this.keys[e.code] = false;

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    this.isRunning = false;
  }

  cleanup() {
    this.stop();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();

    requestAnimationFrame(this.loop.bind(this));
  }

  update(deltaTime) {
    if (!this.hero || this.hero.markedForDeletion) {
        // Only trigger game over if we actually had a hero and they died
        // Or if we are sure initialization is done. 
        // For now, let's assume if hero is missing, it's a bug or init state.
        // But if hero.markedForDeletion is true, they definitely died.
        if (this.hero && this.hero.markedForDeletion) {
             if (this.isRunning) {
                this.stop();
                if (this.onGameOver) this.onGameOver(this.score);
            }
        }
        // If !this.hero, we might be in init phase, do nothing or wait.
        return;
    }

    // Spawning Logic
    this.enemySpawnTimer -= deltaTime;
    if (this.enemySpawnTimer <= 0) {
        this.spawnEnemy();
        this.enemySpawnTimer = this.spawnRate;
    }

    // Update all entities
    this.entities.forEach(entity => entity.update(deltaTime, this));

    // Collision detection
    this.checkCollisions();

    // Remove dead entities
    this.entities = this.entities.filter(entity => !entity.markedForDeletion);

    // Wave Progression (Simple: Increase difficulty every 1000 points)
    const newWave = Math.floor(this.score / 1000) + 1;
    if (newWave > this.wave) {
        this.wave = newWave;
        this.spawnRate = Math.max(0.5, 2.0 - (this.wave * 0.2)); // Spawn faster
    }

    // Callback for UI updates
    if (this.updateCallback) {
      this.updateCallback({
          score: this.score,
          health: this.hero.health,
          wave: this.wave
      });
    }
  }

  spawnEnemy() {
      // Import Enemy dynamically or pass a factory? 
      // For now, we assume the Entity classes are available or passed in.
      // We'll handle this by passing a spawner function or importing in this file if possible.
      // Since we are in a module, we can rely on the caller to add entities or import here.
      // Let's rely on the `GameCanvas` to handle initial setup, but `GameEngine` needs to spawn.
      // We will emit an event or call a method. 
      // Better: Import `Enemy` here.
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.entities.forEach(entity => entity.draw(this.ctx));
  }

  checkCollisions() {
    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const a = this.entities[i];
        const b = this.entities[j];

        if (a.type !== b.type && this.isColliding(a, b)) {
            // Filter friendly fire
            if (a.type === 'projectile' && a.owner === b.type) continue;
            if (b.type === 'projectile' && b.owner === a.type) continue;

            a.onCollision(b, this);
            b.onCollision(a, this);
        }
      }
    }
  }

  isColliding(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  addEntity(entity) {
    this.entities.push(entity);
    if (entity.type === 'hero' || entity.type === 'zenitsu' || entity.type === 'tanjiro') {
        this.hero = entity;
    }
  }
}
