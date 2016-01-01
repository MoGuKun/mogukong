var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var isGameStart = false;

var bgPic = new Image();

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyBody = [];
var babyEye = [];

var bigTail = [];
var bigBodyOra = [];
var bigBodyBlue = [];
var bigEye = [];

var data;

var wave;
var halo;
var dust;
var dustPic = [];
document.body.onload = game;
function game() {
  init();
  lastTime = Date.now();
  deltaTime = 0;
  gameloop();

}
function init() {
  //获得 canvas context
  can1 = document.getElementById('canvas1'); // fishes,dust, UI,circle
  ctx1 = can1.getContext('2d');
  can2 = document.getElementById('canvas2'); // bg,ane,fruits
  ctx2 = can2.getContext('2d');

  can1.addEventListener("mousemove", onMousemove, false);

  bgPic.src = "./src/background.jpg";
  canWidth = can1.width;
  canHeight = can1.height;

  ane = new aneObj();
  ane.init();

  fruit = new fruitObj();
  fruit.init();

  mom = new momObj();
  mom.init();

  baby = new babyObj();
  baby.init();

  mx = canWidth * 0.5;
  my = canHeight * 0.5;

  for (var i = 0; i < 8; i++) {
    babyTail[i] = new Image();
    babyTail[i].src = "./src/babyTail" + i + ".png";

    bigTail[i] = new Image();
    bigTail[i].src = "./src/bigTail" + i + ".png";

    bigBodyOra[i] = new Image();
    bigBodyOra[i].src = "./src/bigSwim" + i + ".png";

    bigBodyBlue[i] = new Image();
    bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
  }
  for (var i = 0; i < 20; i++) {
    babyBody[i] = new Image();
    babyBody[i].src = "./src/babyFade" + i + ".png";

  }
  for (var i = 0; i < 2; i++) {
    babyEye[i] = new Image();
    babyEye[i].src = "./src/babyEye" + i + ".png";
    bigEye[i] = new Image();
    bigEye[i].src = "./src/bigEye" + i + ".png";

  }

  data = new dataObj();
  ctx1.font = "30px Verdana";
  ctx1.textAlign = "center";

  wave = new waveObj();
  wave.init();

  halo = new haloObj();
  halo.init();

  for (var i = 0; i < 7; i++) {
    dustPic[i] = new Image();
    dustPic[i].src = "./src/dust" + i + ".png";
  }
  dust = new dustObj();
  dust.init();
}
function gameloop() {
  window.requestAnimFrame(gameloop); //frame per second 
  var now = Date.now();
  deltaTime = parseInt(now - lastTime);
  lastTime = now;
  if (deltaTime > 40) deltaTime = 40;

  drawBackground();
  ane.draw();
  fruitMonitor();
  fruit.draw();

  ctx1.clearRect(0, 0, canWidth, canHeight);
  mom.draw();

  if (isGameStart) //判断游戏是否开始
  {
    momFruitsCollision();
    baby.draw();
  }
  momBabyCollision();

  data.draw();
  wave.draw();

  halo.draw();

  dust.draw();

}
function onMousemove(e) {
  if (!data.gameOver) {
    if (e.offsetX || e.layerX) {
      mx = e.offsetX == undefined ? e.layerX: e.offsetX;
      my = e.offsetY == undefined ? e.layerY: e.offsetY;
    }
  }

}
function gameStart() {
  document.getElementById("gameRule").style.display = "none";
  isGameStart = true;
  init();

}
function resetGame() {

  document.getElementById("rank").style.display = "none";
  document.getElementById("gameForm_input").value = "";
  // isGameStart = true;
  init();
}

function upScore() {

  $.ajax({

    url: "js/rank.php",
    data: {
      name: $("[name='name']").val(),
      score: data.score
    },
    type: "post",
    dataType: "json",
    success: function() {
     
      getRank();
      $("#rank").fadeIn(800);

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status+" "+textStatus + "  " + errorThrown);

    }

  });


}
function getRank() {
  $.ajax({

    url: "js/pai.php",
    type: "get",
    dataType: "json",
    success: function(data) {
      $("#rankScore").empty();
      $.each(data,
      function(i, scoreObj) {
        var score = "<li>";
        score += "<span>" + scoreObj.name + "</span>" + "<span>" + scoreObj.score + "</span>";
        score += "</li>";
        $("#rankScore").append(score) 
        if (i > 8) {
          return false;
        }

      });

    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest.status+" "+textStatus + " " + errorThrown);
    }

  });
}