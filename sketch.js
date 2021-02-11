var PLAY = 1;
var END = 0;
var gameState = 1;
var knife,fruit, fruit1, fruit2, fruit3, fruit4, alien1, alien2, score;
var fruitGroup, enemyGroup;
var gameOverImg, monsterImg;

function preload() 
{
    swordImg = loadImage("sword.png");
    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
    knifeSound = loadSound("knifeSwooshSound.mp3");
    monsterImg = loadAnimation("alien1.png","alien2.png");
    gameOverImg = loadImage("gameover.png");
    gameOverSound = loadSound("gameover.mp3");
}

function setup() 
  {
    createCanvas(500, 500);
    sword = createSprite(200, 200, 20, 20);
    sword.addImage(swordImg);
    sword.scale = 0.7;
    sword.setCollider("rectangle", 0, 0, 40, 40);
    //sword.debug = true;

    fruitsGroup = createGroup();
    enemyGroup = createGroup();

    score = 0;
}

function draw() 
{
    background("lightblue");
    text("Score:" + score, 320,40);

    if(gameState === PLAY)
    {
      sword.x = World.mouseX;
      sword.y = World.mouseY;
      if(fruitsGroup.isTouching(sword))
      {
        fruitsGroup.destroyEach();
        knifeSound.play();
        score=score+2;
      }
    if(enemyGroup.isTouching(sword))
      {
      gameState = END;
      gameOverSound.play();
      
      } 
    } else if (gameState === END)
    {
      fruitsGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      fruitsGroup.destroyEach();
      enemyGroup.destroyEach();
      sword.addImage(gameOverImg);
      sword.scale = 1.3;
      sword.x = 250;
      sword.y = 250;
    }
 
    fruits();
    Enemy();
    drawSprites();
}
 
function fruits()
{
    if(World.frameCount % 80 === 0){
      fruit = createSprite(550,200,20,20);
      fruit.scale = 0.2;
      r=Math.round(random(1,4));
      if(r==1){
        fruit.addImage(fruit1);
      } else if (r==2){
        fruit.addImage(fruit2);
      } else if (r==3){
        fruit.addImage(fruit3);
      } else {
        fruit.addImage(fruit4);
      }

      fruit.y = Math.round(random(40,350));
      position = Math.round(random(1,2));
      if(position == 1){
        fruit.x = 550;
        fruit.velocityX = -(7+(score/4));
      } else if (position == 2){
        fruit.x = -50;
        fruit.velocityX = (7+(score/4));
      }
     fruit.setLifetime = 100;
     fruitsGroup.add(fruit);
    //console.log(position);
    }
}

function Enemy()
{
    if(World.frameCount % 200 === 0)
    {
      monster = createSprite(550,200,20,20);
      monster.addAnimation("moving",monsterImg);
      monster.y = Math.round(random(90,310));
      monster.velocityX = -(8+(score/10));
      monster.setLifetime = 50;
      enemyGroup.add(monster);
    }
}
