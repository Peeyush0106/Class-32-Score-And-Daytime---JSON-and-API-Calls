class Bird {
    constructor(x, y) {
        var options = {
            'restitution': 0.8,
            'friction': 1.0,
            'density': 1.0
        }
        this.radius = 25;
        this.diameter = this.radius * 2;
        this.body = Bodies.circle(x, y, this.radius, options);
        World.add(world, this.body);

        this.image = loadImage("sprites/bird.png");
        this.smokeImage = loadImage("sprites/smoke.png");
        this.trajectory = [];
        this.smokeVisibility = 255;
    }
    display() {
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.diameter, this.diameter);
        pop();
        if (gameState != "onSling") {
            if (this.body.velocity.x > 10 && this.body.position.x > 200) {
                var position = [this.body.position.x, this.body.position.y];
                this.trajectory.push(position);
            }

            for (var i = 0; i < this.trajectory.length; i++) {
                push();
                this.smokeVisibility -= 0.05;
                tint(255, this.smokeVisibility);
                image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
                pop();
            }
        }
    }
}