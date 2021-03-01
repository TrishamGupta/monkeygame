

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var  survialTime;
var ground;



var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  createCanvas(900,400);
  
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
 
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  
  score = 0;
  survialTime = 0;
  
}


function draw() {
  if(frameCount %20===0){
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  }
 
  background (180);
  
  
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  score, 100, 50);
  
  
  
  
 
 
  
 
  monkey.collide(ground);
  
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
 score = score + Math.round(getFrameRate()/60);
     
  
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")) {
        monkey.velocityY = -12;
    
    }    
       monkey.velocityY = monkey.velocityY + 0.8
   
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
   
    }
   
 
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  

  obstacleGroup.setLifetimeEach(-1);
  
  
  food();
  obstacles();
  } 
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  
 
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
     ground.setVelocity=0;
        obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 0.1, 200);
    
    if (keyDown("r")){
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
     
      gameState = PLAY; 
    }
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 300);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 100, 240);
   }
 
  
  
 

  drawSprites();
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}


function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}


 
 


