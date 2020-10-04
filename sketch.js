var trex,trex_animation,ground,ground_image,invisibleGround,cloudimg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloudsgroup,obstaclesgroup,score,restart,gameOver,restartimg,gameOverimg,collidedtrex;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
 trex_animation= loadAnimation("trex1.png","trex3.png","trex4.png") ;
  ground_image=loadImage("ground2.png");
 cloudimg=loadImage("cloud.png") ;
  obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
   obstacle5=loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
  restartimg=loadImage("restart.png");
  gameOverimg=loadImage("gameOver.png");
  collidedtrex=loadImage("trex_collided.png");
}



function setup() {
  createCanvas(400, 400);
  
  trex=createSprite(25,365,15,10);
  trex.addAnimation("trexrunning",trex_animation);
  trex.addImage("trexcollided",collidedtrex);
  trex.scale=0.4;
  
  score=0;
  
 ground=createSprite(200,380,400,10) ;
  ground.addImage(ground_image);
  ground.velocityX=-4;
  
  invisibleGround=createSprite(200,385,400,4);
  invisibleGround.visible=false;
  
  //place gameOver and restart icon on the screen
 gameOver = createSprite(200,300);
 restart = createSprite(200,340);
gameOver.addImage("gameOver",gameOverimg);
gameOver.scale = 0.5;
restart.addImage("restart",restartimg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

  
  cloudsgroup=new Group();
  obstaclesgroup=new Group();
  
  
}

function draw() {
  background(160);
  
  text("score:"+Math.round(score),340,25);
  
 if(gameState===PLAY){
    if(ground.x <0){
  ground.x=ground.width/2;
  
}  
   
 if(keyDown("space")&&trex.y>364){
     trex.velocityY=-9;
     
}
   
  trex.velocityY=trex.velocityY+0.5;   
   
 score=score+0.3;
    
    spawnClouds();
  spawnObstacles();
   
   if(obstaclesgroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
     // playSound("die.mp3");
    }
   
    ground.velocityX = -(6 + 3*score/100);
   
    } 
  else if(gameState===END){
    
     gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeImage("trexcollided",collidedtrex);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
    reset();
  }
    
  }
  
  
  

//console.log(trex.y)  ;

  
 
  
   

  trex.collide(invisibleGround);
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y =Math.round (random (280,320));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsgroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1)  ;
     break;   
     case 2:obstacle.addImage(obstacle2)  ;
     break;       
      case 3:obstacle.addImage(obstacle3)  ;
     break;   
      case 4:obstacle.addImage(obstacle4)  ;
     break;   
      case 5:obstacle.addImage(obstacle5)  ;
     break;   
      case 6:obstacle.addImage(obstacle6)  ;
     break;   
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    obstaclesgroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("trexrunning",trex_animation);
  
  score = 0;
  
}