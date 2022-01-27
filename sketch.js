var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);

  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200)
  ghost.addImage("G",ghostImg)
  ghost.scale = 0.3
  doorGroup=new Group() 
  climberGroup=new Group() 
  invisibleBlockGroup=new Group() 
spookySound.loop()
  
}

function draw() {
  background(0);
  if(gameState==="play"){
if(keyDown("a")){
  ghost.x=ghost.x-3
}
if(keyDown("d")){
  ghost.x=ghost.x+3
}
if(keyDown("space")){
  ghost.velocityY=-10
}
ghost.velocityY=ghost.velocityY+0.8
  
  if(tower.y > 400){
      tower.y = 300
      
    }
   
    spawnDoor()
    if(ghost.isTouching(climberGroup)){
      ghost.velocityY=0

    }
    if(ghost.y>600||ghost.isTouching(invisibleBlockGroup)){
      gameState="end"
    }
    drawSprites()
  }
  if(gameState==="end"){
    fill ("yellow")
    textSize(30)
     text("GameOver",240,300)
  }
}
function spawnDoor() {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
     door = createSprite(200,-50);
     climber=createSprite(200,10)
     invisibleBlock=createSprite(200,15)
     invisibleBlock.width=climber.width
     invisibleBlock.height=2 
     invisibleBlock.debug=true
    door.x = Math.round(random(120,400));
    climber.x=door.x
    invisibleBlock.x=door.x
    door.addImage(doorImg);
    climber.addImage(climberImg);
  
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    
     //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    //adjust the depth
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    
    //adding cloud to the group
   doorGroup.add(door);
   climberGroup.add(climber);
   invisibleBlockGroup.add(invisibleBlock);
    }
}

