class snake{
    constructor() {
        this.posi = [];
        this.posi[0] = createVector(w/2, h/2);
        this.dir = createVector(0, 0);
        this.len = 0;
        this.head;
        this.GameOver = false;
        
        //brain
        this.Front;
        this.Right;
        this.Left;
        this.fFront;
        this.fRight;
        this.fLeft;
        this.Binput;

        this.network = new neataptic.architect.Perceptron(6, 9, 3);
    }

    show() {
        noStroke();
        fill(255);
        for (var i = 0; i < this.posi.length; i++) {
            rect(this.posi[i].x, this.posi[i].y, 1, 1);
        }
        
        textSize(3);
        fill(255,0, 0, 200);
        text('Score:' + this.len, 7, 3);
    }

    move() {
  	    this.head = this.posi[this.posi.length-1].copy();
        this.posi.shift();
        this.head.x += this.dir.x;
        this.head.y += this.dir.y;
        this.posi.push(this.head);
    }
    

    grow(){
        this.len ++;
       // this.head = this.posi[(this.posi.length)-1].copy();
        this.posi.push(this.head);
    }
    
    eat(FoodX, FoodY){
      //  this.head = this.posi[(this.posi.length)-1].copy();
        if (FoodX == this.head.x && FoodY == this.head.y){
            this.grow();
            return true;
        }
        else {
            return false;
        }
    }
    
    endGame(w, h){
       // this.head = this.posi[(this.posi.length)-1].copy();
        if (this.head.x < 0 || this.head.y < 0 || this.head.x+1 > w || this.head.y+1 > h){
            console.log("game over");
            noLoop();
            this.GameOver = true;
        }
        
        for (var i = 0; i < this.posi.length-1; i++){
            var part = this.posi[i];
            if(this.head.x == part.x && this.head.y == part.y ){
                console.log("game over");
                noLoop();
                this.GameOver = true;
            }
        }

    }
//Brain
        getInput(F, R, L, fF, fR, fL) {
        this.Binput = [
            F,
            R,
            L,
            fF,
            fR,
            fL
        ];
        
        
    }
    trainBrain() {
        //input: Fram, Höger, vändter, matFram, matHöger, matVänster.
        //output: Höger, Vänster, Fram
        //kanske inte behövs
        var myTrainingSet = [
            { input: [0, 0, 0, 1, 0, 0], output: [0, 0, 1] },
            { input: [1, 0, 0, 0, 0, 0], output: [1, 0, 0] },
            { input: [1, 1, 0, 0, 0, 0], output: [0, 1, 0] },
            { input: [0, 1, 1, 0, 0, 0], output: [0, 0, 1] },
            { input: [0, 0, 0, 0, 0, 1], output: [0, 1, 0] },
            { input: [0, 0, 0, 0, 0, 0], output: [0, 0, 1] },
            { input: [0, 0, 0, 0, 1, 0], output: [1, 0, 0] },
            { input: [0, 1, 0, 0, 0, 1], output: [0, 1, 0] },
        ];
        console.log(myTrainingSet);
        
        this.network.train(myTrainingSet,{
          log: 10,
          error: 0.03,
          iterations: 1000,
          rate: 0.3
        });
    }
    
    brainOutput() {
        var Boutput = this.network.activate(this.Binput);
        return Boutput;
    }
    
    
    snakeDir() {
    var F, R, L, fF, fR, fL;

    //Saknar om kroppen kommer var där!
    //Wall in front?
    if (this.dir.y == -1 && this.head.y == 0 ||
        this.dir.y == 1 && this.head.y == h - 1 ||
        this.dir.x == -1 && this.head.x == 0 ||
        this.dir.x == 1 && this.head.x == w - 1) {
        F = 1;
    }

    //Check if body is in the way
    for (var i = 0; i < s.posi.length - 2; i++) {
        var part = s.posi[i];
        //kanske ska var 2 vid part.x/y +- 1
        if (this.dir.x == 1 && part.x - 1 == this.head.x && part.y == this.head.y ||
            this.dir.x == -1 && part.x + 1 == this.head.x && part.y == this.head.y ||
            this.dir.y == 1 && part.y - 1 == this.head.y && part.x == this.head.x ||
            this.dir.y == -1 && part.y + 1 == this.head.y && part.x == this.head.x) {
            F = 1;
        }
    }

    if (F !== 1) {
        F = 0;
    }
    //Wall to the right?
    if (this.dir.x == -1 && this.head.y === 0 ||
        this.dir.y == 1 && this.head.x === 0 ||
        this.dir.x == 1 && this.head.y == h - 1 ||
        this.dir.y == -1 && this.head.x == w - 1) {
        R = 1;
    }
    //Check if body is in the way right
    for (i = 0; i < s.posi.length - 2; i++) {
        var part = s.posi[i];
        if (this.dir.x == 1 && part.x == this.head.x && part.y - 1 == this.head.y ||
            this.dir.x == -1 && part.x == this.head.x && part.y + 1 == this.head.y ||
            this.dir.y == 1 && part.y == this.head.y && part.x + 1 == this.head.x ||
            this.dir.y == -1 && part.y == this.head.y && part.x - 1 == this.head.x) {
            R = 1;
        }
    }


    if (R !== 1) {
        R = 0;
    }
    //Wall to the left?
    if (this.dir.x == 1 && this.head.y === 0 ||
        this.dir.y == -1 && this.head.x === 0 ||
        this.dir.x == -1 && this.head.y == h - 1 ||
        this.dir.y == 1 && this.head.x == w - 1) {
        L = 1;
    }
    //Check if body is in the way right
    for (i = 0; i < this.posi.length - 2; i++) {
        var part = this.posi[i];
        if (this.dir.x == 1 && part.x == this.head.x && part.y + 1 == this.head.y ||
            this.dir.x == -1 && part.x == this.head.x && part.y - 1 == this.head.y ||
            this.dir.y == 1 && part.y == this.head.y && part.x - 1 == this.head.x ||
            this.dir.y == -1 && part.y == this.head.y && part.x + 1 == this.head.x) {
            L = 1;
        }
    }
    if (L !== 1) {
        L = 0;
    }
    //Any food in front?
    if (this.dir.x == 1 && food.x >= this.head.x && food.y == this.head.y ||
        this.dir.x == -1 && food.x <= this.head.x && food.y == this.head.y ||
        this.dir.y == 1 && food.y >= this.head.y && food.x == this.head.x ||
        this.dir.y == -1 && food.y <= this.head.y && food.x == this.head.x) {
        fF = 1;
    }
    else {
        fF = 0;
    }
    //Any food right?
    if (this.dir.x == 1 && this.head.y <= food.y && food.x == this.head.x ||
        this.dir.x == -1 && this.head.y >= food.y && food.x == this.head.x ||
        this.dir.y == 1 && this.head.x >= food.x && food.y == this.head.y ||
        this.dir.y == -1 && this.head.x <= food.x && food.y == this.head.y) {
        fR = 1;
    }
    else {
        fR = 0;
    }
    //Any food left?
    if (this.dir.x == 1 && this.head.y >= food.y && food.x == this.head.x ||
        this.dir.x == -1 && this.head.y <= food.y && food.x == this.head.x ||
        this.dir.y == 1 && this.head.x <= food.x && food.y == this.head.y ||
        this.dir.y == -1 && this.head.x >= food.x && food.y == this.head.y) {
        fL = 1;
    }
    else {
        fL = 0;
    }

    if (this.dir.x === 0 && this.dir.y === 0){
        this.dir.y = -1;
    }

    var getInput = [F, R, L, fF, fR, fL];
    var BOutput = this.network.activate(getInput);

    //Turn right
    if (BOutput[0] > BOutput[1] && BOutput[0] > BOutput[2]) {
        if (this.dir.x == 1){
            this.dir.x = 0;
            this.dir.y = 1;
        }
        else if (this.dir.x == -1){
            this.dir.x = 0;
            this.dir.y = -1;
        }
        else if (this.dir.y == 1){
            this.dir.y = 0;
            this.dir.x = -1;
        }
        else if (this.dir.y == -1){
            this.dir.y = 0;
            this.dir.x = 1;
        }
    }
    //Turn left
    if (BOutput[1] > BOutput[0] && BOutput[1] > BOutput[2]) {
                if (this.dir.x == 1){
            this.dir.x = 0;
            this.dir.y = -1;
        }
        else if (this.dir.x == -1){
            this.dir.x = 0;
            this.dir.y = 1;
        }
        else if (this.dir.y == 1){
            this.dir.y = 0;
            this.dir.x = 1;
        }
        else if (this.dir.y == -1){
            this.dir.y = 0;
            this.dir.x = -1;
        }
    }
    
    }
    
}


// ny data var data = []
// data.push({input: [], output: []})