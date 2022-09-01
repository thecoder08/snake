var ctx = document.querySelector('#canvas').getContext('2d');

var snake = [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}];

var dir = {x:0,y:1};

var apple = {x: Math.round(Math.random() * 50), y: Math.round(Math.random() * 50)};

function drawSnake() {
    ctx.fillStyle = 'green';
    for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * 10, apple.y * 10, 10, 10);
}

function moveSnake() {
    snake.unshift({x: snake[0].x + dir.x, y: snake[0].y + dir.y});
    if (snake[0].x == 50) {
        snake[0].x = 0;
    }
    if (snake[0].x == -1) {
        snake[0].x = 49;
    }
    if (snake[0].y == 50) {
        snake[0].y = 0;
    }
    if (snake[0].y == -1) {
        snake[0].y = 49;
    }
    snake.pop();
}

var interval = setInterval(function() {
    moveSnake();
    if ((snake[0].x == apple.x) && (snake[0].y == apple.y)) {
        snake.push({x: snake[snake.length - 1].x - dir.x, y: snake[snake.length - 1].y - dir.y});
        apple = {x: Math.round(Math.random() * 50), y: Math.round(Math.random() * 50)};
    }
    if (snake.filter(v => ((v.x == snake[0].x) && (v.y == snake[0].y))).length > 1) {
        clearInterval(interval);
    }
    ctx.clearRect(0, 0, 500, 500);
    drawApple();
    drawSnake();
}, 100);

document.onkeydown = function(event) {
    if (event.code == 'ArrowUp') {
        dir = {x:0,y:-1};
    }
    if (event.code == 'ArrowDown') {
        dir = {x:0,y:1};
    }
    if (event.code == 'ArrowLeft') {
        dir = {x:-1,y:0};
    }
    if (event.code == 'ArrowRight') {
        dir = {x:1,y:0};
    }
}