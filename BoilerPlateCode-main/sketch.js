var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner,runnerImg,blast
var enemy,enemyImg
var enemy,enemyImg
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4
var ground,groundImg,invisibleGround,bg
var restart,gameOver,gameOverImg
var score=0;
var coin,coinImg,coinGroup
var life=3;

var theme
var JUMPs
var GAMEOVERs

function preload()
{
runnerImg = loadAnimation('./images/running1.png','./images/running2.png','./images/running3.png')
enemyImg = loadAnimation('./images/villan1.png','./images/villian2.png')
blast = loadImage("./images/blast.png")
bg = loadImage("./images/download5.png")
groundImg = loadImage('./images/road.png')
gameOverImg = loadImage('./images/gameover.png')
obstacle1 = loadImage("./images/obstacle1.png");
obstacle2 = loadImage("./images/pre.png");
obstacle3 = loadImage("./images/obstacle2.png")
obstacle4 = loadImage("./images/obs3 .png")
restartImg = loadImage("./images/restart.png");
coinImg = loadImage("./images/coin.png")
theme = loadSound("theme.mp3")
JUMPs = loadSound("jump.mp3")
GAMEOVERs = loadSound("die.mp3")

}

function setup() {
	createCanvas(windowWidth,windowHeight);
 

 runner = createSprite(500,height-160)
 runner.addAnimation('runnerImg',runnerImg)
 runner.addImage('blast',blast)
 runner.scale = 1

 enemy = createSprite(100,height-230)
 enemy.addAnimation('enemyImg',enemyImg)
 enemy.scale = 0.75

 ground = createSprite(width/2,height-70,width*2,20)
 ground.addImage('groundImg',groundImg)
 ground.velocityX = -5
 
gameOver = createSprite(width/2,height/2)
gameOver.addImage(gameOverImg)
gameOver.visible = false;

  
 restart = createSprite(width/2,height/2+50);
 restart.addImage(restartImg);
  
 restart.scale = 0.5;

 restart.visible = false;
  
 invisibleGround = createSprite(0,height-100,1100,10);
 invisibleGround.visible = false;
  
 
 obstaclesGroup = new Group();
  coinGroup = new Group();
  score = 0;
  theme.loop();
  
}


function draw() {
  rectMode(CENTER);
  background(bg);

 // console.log(runner.y)
 
  runner.velocityY = runner.velocityY+0.2
  
  if(ground.x<0){
	ground.x = ground.width/2
}
  if(keyDown('space') && runner.y>768 ){
	runner.velocityY = -8

  }
  textSize(50)
  text("Score: "+ score, 500,50);
  text("Life:"+life,1000,50)
  
  if (gameState===PLAY){
    
    ground.velocityX = -10;
  
    runner.collide(invisibleGround);
    spawnObstacles();
    Coin()
   
    runner.collide(coinGroup,collectCoin)
    if(enemy.isTouching(runner) || life==0 ){
    gameState = END;

  
    
    

    }
    runner.collide(obstaclesGroup,reduceLife)    
    

  }
  else if (gameState === END) {
    theme.stop()
    GAMEOVERs.play()
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    runner.velocityY = 0;
    runner.velocityX = 0;
    coinGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0);

    runner.changeImage('blast',blast);
    
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1)
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

    
  drawSprites();
 
}

  function spawnObstacles() {
    if(frameCount % 100 === 0) {
     
      if(score<5){
        var obstacle = createSprite(2000,height-150,10,40);
        
        obstacle.setCollider('circle',0,0,20)
        obstacle.velocityX = -10;
        
  
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
          default: break;

        
        }
        obstacle.lifetime = 300;
       
      
    
      obstaclesGroup.add(obstacle);
      }
       else if(score>5){
        var obstacle = createSprite(2000,height-150,10,40);
       
        obstacle.setCollider('circle',0,0,20)
        obstacle.velocityX = -10;
        
        var rand = Math.round(random(1,3));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3)
          default: break;
        }
 
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
       }  
     
        if(score>10){
        var obstacle = createSprite(2000,height-150,10,40);
       
        obstacle.setCollider('circle',0,0,20)
        obstacle.velocityX = -10;
       
        var rand = Math.round(random(1,4));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3)
                  break;
          case 4: obstacle.addImage(obstacle4)
          obstacle.scale = 0.001;
                  break;
          default: break;
        } 
        
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
       }  
    }
  
  }
  function Coin()
  {
   if(frameCount %120==0){
    coin = createSprite(2000,random(height-150,height-200))
    coin.addImage(coinImg)
    coin.scale = 1.25
    coin.lifetime = 300
    coin.velocityX =  -10
    coinGroup.add(coin)

   } 
   
  }
  function collectCoin(r,c){
    c.destroy()
    score+= 1;
    runner.velocityY = 0;
    runner.velocityX = 0;
  }
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    
    obstaclesGroup.destroyEach();
    coinGroup.destroyEach()
    runner.changeAnimation('runnerImg',runnerImg);
    
   
    
    score = 0;
    life = 3;
  }
 function reduceLife(r,o){
  o.destroy();
  life= life-1
  runner.velocityX = 0;
  runner.velocityY = 0;
 }


