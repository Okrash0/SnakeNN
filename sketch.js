var s;
var b;
var rez = 10;
var w = 700;
var h = 600;
var food;
var pState = 1;

function setup() {
    createCanvas(w, h);
    w = (w / rez);
    h = (h / rez);
    frameRate(60);
    background(51);

    s = new snake(w, h);
    s.trainBrain();

    apple();
}

/*function keyPressed() {
    //console.log(keyCode);
    if (keyCode == 32) {
        pause();
    }

    if (s.dir.x === 0 && s.dir.y === 0 && keyCode == 49) {
        frameRate(10);
    }

    else if (s.dir.x === 0 && s.dir.y === 0 && keyCode == 50) {
        frameRate(15);
    }

    else if (s.dir.x === 0 && s.dir.y === 0 && keyCode == 51) {
        frameRate(20);
    }

    if (keyCode == UP_ARROW && s.dir.y === 0) {
        s.dir.x = 0;
        s.dir.y = -1;
    }

    else if (keyCode == DOWN_ARROW && s.dir.y === 0) {
        s.dir.x = 0;
        s.dir.y = 1;
    }

    else if (keyCode == LEFT_ARROW && s.dir.x === 0) {
        s.dir.y = 0;
        s.dir.x = -1;
    }

    else if (keyCode == RIGHT_ARROW && s.dir.x === 0) {
        s.dir.y = 0;
        s.dir.x = 1;
    }
}
*/
function pause() {
    pState *= -1;

    if (pState == -1) {
        noLoop();
        rect(1, 1, 1, 1);
    }

    else if (pState == 1) {
        loop();
    }
}

function pauseText() {
    if (pState == -1) {
        fill(0, 140);
        rect(0, 0, w, h);

        textAlign(CENTER);
        textSize(7);
        fill(255, 0, 0, 255);
        text("Pause", w / 2, h / 2);

    }
    else {
        textAlign(CENTER);
        fill(255, 0, 0, 0);
        text("Pause", w / 2, h / 2);
    }
}

function apple() {
    var x = floor(random(w));
    var y = floor(random(h));
    food = createVector(x, y);
}



//function successfulMove(){
//    if (s.endGame = false )
//}

function draw() {
    background(51);
    scale(rez);
    pauseText();


    s.show();
    s.snakeDir();
    //b.move();
    s.move();
    s.endGame(w, h);

    if (s.eat(food.x, food.y)) {
        apple();
    }
    

    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
}