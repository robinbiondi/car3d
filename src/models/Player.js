
const SPEED = 0.3;

module.exports = class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  moveX(direction) {
    this.x += (direction) * SPEED;
  }

  moveZ(direction) {
    this.z += (direction) * SPEED;
  }
};