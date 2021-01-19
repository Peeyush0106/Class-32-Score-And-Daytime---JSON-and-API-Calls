const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird1, bird2, bird3, slingshot;

var gameState = "onSling";

var score;

var scoreColor = "";

var default_bg;

var birds = [];

var fly_bird, select_bird, pig_sound;
var sound_volume;

function preload() {
    getTime();
    default_bg = loadImage("sprites/bg.png");
    fly_bird = loadSound("sounds/bird_flying.mp3");
    select_bird = loadSound("sounds/bird_select.mp3");
    pig_sound = loadSound("sounds/pig_snort.mp3");
}

function setup() {
    createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;

    sound_volume = 0.0002;

    console.log(fly_bird.volume);

    fly_bird.setVolume(sound_volume.value);
    select_bird.setVolume(sound_volume.value);

    score = 0;

    ground = new Ground(600, height, 1200, 20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird1 = new Bird(200, 50);
    bird2 = new Bird(150, 170);
    bird3 = new Bird(100, 170);
    bird4 = new Bird(50, 170);

    birds.push(bird4, bird3, bird2, bird1);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird1.body, { x: 200, y: 50 });
}

function draw() {
    if (backgroundImg) {
        background(backgroundImg);
    }
    else {
        background(default_bg);
    }
    push();
    textSize(20);
    fill(scoreColor);
    text("Score: " + score, 1000, 100);
    pop();

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig3.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird1.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
    //log6.display();
    slingshot.display();
}

function mouseDragged() {
    if (gameState !== "launched") {
        Body.setPosition(birds[birds.length - 1].body, { x: mouseX, y: mouseY });
        Body.applyForce(birds[birds.length - 1].body, birds[birds.length - 1].body.position, { x: 5, y: -5 });
        select_bird.play();
    }
}

function mouseReleased() {
    slingshot.fly();
    fly_bird.play();
    birds.pop();
    gameState = "launched";
}

function keyPressed() {
    if (keyCode === 32) {
        Body.setPosition(birds[birds.length - 1].body, { x: 200, y: 50 });
        slingshot.attach(birds[birds.length - 1].body);
        gameState = "onSling";
        bird1.smokeVisibility = 255;
        select_bird.play();
    }
}

async function getTime() {
    var resource = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var resourceJSON = await resource.json();
    var dayTime = resourceJSON.datetime;
    var hour = dayTime.slice(11, 13);
    if (hour >= 7 && hour <= 19) {
        bg = "sprites/bg.png";
        scoreColor = "blue";
    }
    else {
        bg = "sprites/bg2.jpg";
        scoreColor = "white";
    }
    backgroundImg = loadImage(bg);
}