var gameOver = false;
var gameOn = false;
var body = $("body")[0];
var index = 0;
var heading = $("h1");

var list = [];
var btnList = [];
var level = 1;


$(".game-btn").each(function(){
    $(this)[0].addEventListener("click", async function(e){
        var active = this;
        var current = btnList[list[index]];

        if(e.isTrusted){
            active.classList.toggle("press");
            setTimeout(function(){
                active.classList.toggle("press");
            }, 100);

            if(gameOver){
                body.classList.toggle("error");
                setTimeout(function(){
                    body.classList.toggle("error");
                }, 100);
                (new Audio("sounds/wrong.mp3")).play();
            }
            else{
                if(gameOn && active.classList[1] != current.classList[1]){
                    heading.html("Game Over💀<button type='button' class='btn btn-outline-light btn-lg'>START</button>");
                    $(".btn")[0].addEventListener("click", start);
                    gameOver = true;
                    gameOn = false;
                    level = 1;
                    list.length = 0;
                    body.classList.toggle("error");
                    setTimeout(function(){
                        body.classList.toggle("error");
                    }, 100);
                    (new Audio("sounds/wrong.mp3")).play();
                }
                else{
                    var path = "sounds/";
                    path += active.classList[1];
                    path += ".mp3";
                    (new Audio(path)).play();
                    
                    if(gameOn){
                        ++index;
                        if(index == level){
                            ++level;
                            heading.html("Level");
                            await sleep(500);
                            nextLevel();
                        }
                    }
                }
            }
        }
        else{
            active.classList.toggle("press");
            setTimeout(function(){
                active.classList.toggle("press");
            }, 300);

            active.classList.toggle("glow");
            setTimeout(function(){
                active.classList.toggle("glow");
            }, 300);

            var path = "sounds/";
            path += active.classList[1];
            path += ".mp3";
            (new Audio(path)).play();
        }
    });

    btnList.push($(this)[0]);
});

$(".btn")[0].addEventListener("click", start);

function start(){
    if(gameOn == false) {
        gameOn = true;
        gameOver = false;
        nextLevel();
    }
}

async function nextLevel(){
    heading.html("Level " + level);
    await sleep(1000);
    index = 0;
    var nxtNumber = Math.floor(Math.random() * 4);
    list.push(nxtNumber);
    btnList[nxtNumber].click();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}