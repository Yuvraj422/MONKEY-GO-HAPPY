var b3,b3image;
var monkey , monkey_running
var restart,restartImage;
var banana ,bananaImage, obstacle, obstacleImage
var score;
var Bground,BgroundI;
var ground;
var PLAY=1;
var END=0;
var gameState=1;
var bananaGroup;
var stoneGroup;
var monkey_I;
var backSound;
var bananaScore;
var stoneScore;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_I=loadAnimation("sprite_1.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  BgroundI=loadImage("bg.jpg");
  restartImage=loadImage("re.jpg");
  b3image=loadImage("b3.jpg");
  bananaGroup=new Group();
  stoneGroup=new Group();
}



function setup() {
createCanvas(550,480);
score=0;
stoneScore=0;
bananaScore=0;
Bground=createSprite(200,200,500,400);
Bground.addImage(BgroundI);
Bground.scale =1.5;  
monkey=createSprite(80,395,20,60);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
ground=createSprite(400,430,900,10);
ground.velocityX=-(4+score/100);
ground.x=ground.width/2;
ground.shapeColor="darkgreen"; 
ground.visible=false;
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
monkey.debug=false;
restart = createSprite(280,230);
restart.addImage(restartImage);
restart.scale=0.1;  
restart.visible=false;
b3=createSprite(350,60);
b3.addImage(b3image);
b3.scale=0.5;
}



function draw() { 
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  Bground.velocityX=-(3+score/100);
  
  if(Bground.x < 120){
      Bground.x = Bground.width/2;
}
  
  if(ground.x < 120){
      ground.x = ground.width/2;
}
  
  if(keyDown("space")&&monkey.y>=120){
    monkey.velocityY=-12;
}
  
  if(frameCount %80===0){
  var banana=createSprite(400,405,10,40); 
  banana.velocityX = -(6+score/100);
  banana.addImage("ban",bananaImage);
  banana.scale=0.12;  
  banana.y=Math.round(random(150,250));
  banana.lifetime=13.3;
  bananaGroup.add(banana);
  
}
  
if(frameCount%300===0){
    var stone=createSprite(405,405,10,40);
    stone.velocityX=-(6+score/100);
    stone.addImage("sto",obstaceImage);
    stone.scale=0.13;
    stone.lifeTIME=50;
    stoneGroup.add(stone);
}
  
monkey.velocityY = monkey.velocityY + 0.8;
  
  
if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
   bananaScore=bananaScore+2;
}
     switch(bananaScore){
    case 10:monkey.scale=0.12;
    break;
    case 20:monkey.scale=0.14;
    break;
    case 30:monkey.scale=0.16;
    break;
    case 40:monkey.scale=0.18;
    break;
    default:break;
  }
  
if(stoneGroup.isTouching(monkey)){
  monkey.scale=0.1;

}
if(stoneGroup.isTouching(monkey)){
  gameState=END;
}

 else if(gameState===END){
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  monkey.velocityX=0;
  bananaGroup.setVelocityXEaxh=0;
  stoneGroup.setVelocityXEach=0;
  Bground.velocityX=0;
  ground.velocityX=0;
  bananaGroup.setLifetimeEach(-1);
  stoneGroup.setLifetimeEach(-1);
  restart.visible=true;
   
if(mousePressedOver(restart)){
    reset();
   }
}
  
  monkey.collide(ground);
  drawSprites();
  fill("white");
  stroke("white");
  textSize(15);
  text("SURVIVAL TIME: "+ score,1,50); 
}
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
  score=0;
  monkey.visible=true;
}





