const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

//scores
let playerScore = 0;
let cpuScore = 0;

// Paddle dimensions
const paddleWidth = 10;
const paddleHeight = 100;

// Initial paddle positions
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

// Paddle movement speed
const paddleSpeed = 60;
const AIspeed = 2;

// Ball properties
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;



    // AI logic for right paddle
    let middleOfPaddle = rightPaddleY + paddleHeight / 2;
    if (middleOfPaddle < ballY) {
        rightPaddleY += AIspeed;
    } else if (middleOfPaddle > ballY) {
        rightPaddleY -= AIspeed;
    }

    // Prevent the paddle from moving out of the canvas
    if (rightPaddleY < 0) {
        rightPaddleY = 0;
    } else if (rightPaddleY > canvas.height - paddleHeight) {
        rightPaddleY = canvas.height - paddleHeight;
    }

    // Ball collision with top and bottom walls
    if (ballY + ballSize >= canvas.height || ballY - ballSize <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if ((ballX - ballSize <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) ||
        (ballX + ballSize >= canvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
    }

    // Check for scoring
    if (ballX - ballSize <= 0 || ballX + ballSize >= canvas.width) {
        // Reset ball position
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    requestAnimationFrame(draw);
}



function StartGame() {
    // Start the game
    draw();
    
}


// mouse controls
canvas.addEventListener('mousemove', function(event) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    leftPaddleY = mouseY - paddleHeight / 2;

    // Prevent the paddle from moving out of the canvas
    if (leftPaddleY < 0) {
        leftPaddleY = 0;
    } else if (leftPaddleY > canvas.height - paddleHeight) {
        leftPaddleY = canvas.height - paddleHeight;
    }
});

// listener to wait for start-button to be clicked
document.getElementById('start-button').addEventListener('click', StartGame);