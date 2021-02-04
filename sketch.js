// Declaring The Vars
var monkey , monkey_running,jumpSound;
var ground, invisibleGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var bg,bgImg;
var index;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  // Loading the Animations,Images & Sounds
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
   
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpSound = loadSound("jump.mp3");
  bgImg = loadImage("jungle.jpg");
  
}

function setup(){
  // Creating the Canvas
  createCanvas(600,300);
  // Creating the groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 // Creating the monkey,ground & Invisible Ground
  monkey = createSprite(300,500,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
    
  
  
  invisibleGround = createSprite(300,508,1200,7);
  invisibleGround.visible = false;
  invisibleGround.debug=false;

  bg=createSprite(0,0,600,600);
  bg.addImage(bgImg);

  index = null;
}

function draw(){
  // Giving Background And Text
  background(bgImg);
  text("Survival Time: "+score, 470, 250);
  text("Bananas: "+bananaScore,300, 250);
  monkey.velocityY = monkey.velocityY + 0.8;

  // Giving the Play state
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
  
    //ground.velocityX = -(4+score*1.5/100);

    camera.position.x = displayWidth/2;
    camera.position.y = displayHeight/2;
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
      jumpSound.play();
    }
    
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore= bananaScore + 1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  // Giving the end state
  if (gameState === END){
    //ground.velocityX = 0;
    
    monkey.velocityY=0;
    //monkey.y = 1700;
    monkey.scale = 0.12;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    

    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
    
    
    
  }
  monkey.collide(invisibleGround);

  drawSprites();

  if(gameState=== END){
    textSize(30);
    text("Game Over!!!", 400, 350);
    textSize(15);
    text("Press R to restart", 420, 370);
  }

}
// Function to Create Bananas
function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
}
  }
//Function to create Obstacles
function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(620,470,50,50);
    obstacle.addAnimation("stone", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
   obstacleGroup.add(obstacle);
}
  }