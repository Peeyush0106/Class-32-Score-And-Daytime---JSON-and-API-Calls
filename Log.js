class Log {
    constructor(x, y, height, angle) {
        var options = {
            restitution: 0.8,
            friction: 2.0,
            density: 0.5
        }
        this.width = 20;
        this.height = height;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        this.image = loadImage("sprites/wood2.png");
        World.add(world, this.body);
        Matter.Body.setAngle(this.body, angle);
    }
    display() {
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}