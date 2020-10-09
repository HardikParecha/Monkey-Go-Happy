
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var invisibleground;
var background1,backgroundImage;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover,gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("background.webp");
  gameoverImage=loadImage("gameover.png");
  
}



function setup() {
createCanvas(600,400);
  
   background1=createSprite(600,200,600,400);
  background1.addImage(backgroundImage);
  background1.scale=2.5;
  
  monkey=createSprite(80,325,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.13;
  
  invisibleground=createSprite(400,370,900,10);
  invisibleground.visible = false;
  
  gameover=createSprite(300,200,120,40);
  gameover.addImage(gameoverImage);
  
  

  FoodGroup=createGroup();
   obstacleGroup=createGroup();
  
   survivaltime=0;

  
}


function draw() {
  background("lightgreen");
  
   if(keyDown("space")&& monkey.y >= 250)
     {
     monkey.velocityY=-13;
     }
  
  
    monkey.velocityY = monkey.velocityY+0.8;
  
  
  background1.velocityX = -5 
  
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
  
 
   console.log(frameCount)
  
  spawnfood();
  spawnobstacles();
  
  //to help pull the monkey down by gravity so it doesn't stay up.\
  if(gamestate===PLAY ){
    gameover.visible=false;
  

  
  
 if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
   survivaltime=survivaltime+2;
 }

   if(monkey.isTouching(obstacleGroup)){
     gamestate=END;
    obstacleGroup.destroyEach();
     
   }
  }
    
    if(gamestate===END){
    
    monkey.destroy();
    background1.velocityX=0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=true;
    
    
  }
  
  monkey.collide(invisibleground);  

  drawSprites();
   
  
  stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime: " + survivaltime,200,50);
  
}

function spawnfood(){
  //this is to make sure the banana appears for every 80 frames.
   if(World.frameCount%80==0){
 
  banana = createSprite(620,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.11;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  FoodGroup.add(banana);
   }
}  

function spawnobstacles(){
  if(World.frameCount%300==0){
     obstacle=createSprite(620,340,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.14;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
  }
}





