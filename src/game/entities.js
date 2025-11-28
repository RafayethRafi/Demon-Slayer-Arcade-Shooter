export class Entity {
  constructor(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // 'hero', 'enemy', 'projectile'
    this.markedForDeletion = false;
    this.sprite = null;
    
    // Asset Loading
    if (type === 'hero' || type === 'tanjiro') {
        this.sprite = new Image();
        this.sprite.src = '/assets/tanjiro.png';
    } else if (type === 'zenitsu') {
        this.sprite = new Image();
        this.sprite.src = '/assets/zenitsu.png';
    } else if (type === 'enemy' || type === 'fast_demon' || type === 'tank_demon') {
        this.sprite = new Image();
        this.sprite.src = '/assets/demon.png';
    } else if (type === 'akaza') {
        this.sprite = new Image();
        this.sprite.src = '/assets/akaza.png';
    } else if (type === 'muzan') {
        this.sprite = new Image();
        this.sprite.src = '/assets/muzan.png';
    }
  }

  update(deltaTime, game) {}
  draw(ctx) {
    if (this.sprite && this.sprite.complete) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    } else {
        ctx.fillStyle = (this.type === 'hero' || this.type === 'tanjiro') ? 'green' : (this.type === 'enemy' ? 'red' : 'yellow');
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  onCollision(other, game) {}
}

export class Hero extends Entity {
  constructor(x, y, type = 'hero') {
    super(x, y, 64, 64, type);
    this.speed = 350;
    this.health = 100;
    this.maxHealth = 100;
    this.cooldown = 0;
    this.invulnerabilityTimer = 0;
    
    if (type === 'zenitsu') {
        this.speed = 500; // Faster
        this.health = 80; // Less health
        this.maxHealth = 80;
    }
  }

  update(deltaTime, game) {
    if (game.keys['ArrowLeft'] || game.keys['KeyA']) this.x -= this.speed * deltaTime;
    if (game.keys['ArrowRight'] || game.keys['KeyD']) this.x += this.speed * deltaTime;
    if (game.keys['ArrowUp'] || game.keys['KeyW']) this.y -= this.speed * deltaTime;
    if (game.keys['ArrowDown'] || game.keys['KeyS']) this.y += this.speed * deltaTime;

    // Bounds
    this.x = Math.max(0, Math.min(game.width - this.width, this.x));
    this.y = Math.max(0, Math.min(game.height - this.height, this.y));

    // Shooting
    if (this.cooldown > 0) this.cooldown -= deltaTime;
    if (game.keys['Space'] && this.cooldown <= 0) {
        this.shoot(game);
        this.cooldown = this.type === 'zenitsu' ? 0.1 : 0.15; // Zenitsu shoots faster
    }

    // Invulnerability
    if (this.invulnerabilityTimer > 0) {
        this.invulnerabilityTimer -= deltaTime;
    }
  }

  shoot(game) {
      game.addEntity(new Projectile(this.x + this.width / 2 - 5, this.y, -1, this.type));
  }

  onCollision(other, game) {
      if (this.invulnerabilityTimer > 0) return;

      if (other.type === 'enemy' || other.type === 'akaza' || other.type === 'muzan') {
          this.health -= 10;
          this.invulnerabilityTimer = 1.0; // 1 second invulnerability
      } else if (other.type === 'projectile' && other.owner !== 'hero') {
          this.health -= 10;
          this.invulnerabilityTimer = 1.0;
      }

      if (this.health <= 0) {
          this.markedForDeletion = true;
      }
  }
  
  draw(ctx) {
      if (this.invulnerabilityTimer > 0 && Math.floor(Date.now() / 100) % 2 === 0) {
          // Blink effect
          return;
      }
      super.draw(ctx);
  }
}

export class Enemy extends Entity {
    constructor(x, y, type = 'enemy') {
        super(x, y, 50, 50, type);
        this.speed = 100;
        this.health = 20;
        this.scoreValue = 100;
        
        // Variations
        if (type === 'fast_demon') {
            this.speed = 200;
            this.health = 10;
            this.scoreValue = 150;
            // We'll use the same sprite but maybe draw differently or rely on speed to distinguish
        } else if (type === 'tank_demon') {
            this.speed = 50;
            this.health = 60;
            this.width = 60;
            this.height = 60;
            this.scoreValue = 200;
        } else if (type === 'akaza') {
            this.health = 60; // Reduced from 200
            this.scoreValue = 1000;
            this.speed = 150;
            this.width = 64;
            this.height = 64;
        } else if (type === 'muzan') {
            this.health = 100; // Reduced from 500
            this.scoreValue = 5000;
            this.speed = 50;
            this.width = 80;
            this.height = 80;
        }
    }

    update(deltaTime, game) {
        this.y += this.speed * deltaTime;
        
        // Simple AI: Move towards player horizontally slightly
        if (game.hero) {
            if (this.x < game.hero.x) this.x += this.speed * 0.2 * deltaTime;
            if (this.x > game.hero.x) this.x -= this.speed * 0.2 * deltaTime;
        }

        if (this.y > game.height) this.markedForDeletion = true;
    }

    onCollision(other, game) {
        if (other.type === 'projectile' && (other.owner === 'hero' || other.owner === 'zenitsu' || other.owner === 'tanjiro')) {
            this.health -= 10;
            if (this.health <= 0) {
                this.markedForDeletion = true;
                game.score += this.scoreValue;
            }
        }
    }
}

export class Projectile extends Entity {
    constructor(x, y, direction, owner) { 
        super(x, y, 8, 20, 'projectile');
        this.speed = 600;
        this.direction = direction;
        this.owner = owner; // 'hero' or 'enemy'
    }

    update(deltaTime, game) {
        this.y += this.speed * this.direction * deltaTime;
        if (this.y < 0 || this.y > game.height) this.markedForDeletion = true;
    }

    onCollision(other, game) {
        // Collision logic handled in Hero/Enemy
        this.markedForDeletion = true;
    }
    
    draw(ctx) {
        if (this.owner === 'hero' || this.owner === 'tanjiro') {
            // Water Breathing (Blue Wave)
            ctx.fillStyle = '#38bdf8'; // Sky blue
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width, 0, Math.PI * 2);
            ctx.fill();
            
            // Trail
            ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2 + 10, this.width * 0.8, 0, Math.PI * 2);
            ctx.fill();

        } else if (this.owner === 'zenitsu') {
            // Thunder Breathing (Yellow Lightning)
            ctx.strokeStyle = '#facc15'; // Yellow
            ctx.lineWidth = 3;
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 10;
            
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, this.y);
            ctx.lineTo(this.x, this.y + this.height/3);
            ctx.lineTo(this.x + this.width, this.y + this.height * 2/3);
            ctx.lineTo(this.x + this.width/2, this.y + this.height);
            ctx.stroke();
            
            ctx.shadowBlur = 0; // Reset

        } else {
            // Enemy Projectile (Red Orb)
            ctx.fillStyle = '#ef4444'; 
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 5;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
}
