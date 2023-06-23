let capture;
let detector;

let paddleA, paddleB;
let ball;
let paddleWidth = 10;
let paddleHeight = 60;
let ballSize = 8;
let ballSpeedX = 8;
let ballSpeedY = 8;
let Player1 = 0;
let Player2 = 0;
let gameOver = false;

let medio;
let indice;

const handedness = 'hand.handedness'


const imgSize = 300;

let imgContainer;
let img;
let img2;



async function setup() {
	const canvas = createCanvas(640, 540);
	canvas.parent('canvas-container');
	capture = createCapture(VIDEO);
	capture.size(640, 480);
	capture.hide();
	video = createCapture(VIDEO);
	video.hide();

	imgContainer = select("#img-container");
	img = select("#GAME__OVER.png");
	img2 = select("#YOU_WIN.png");
	paddleA = createVector(paddleWidth, height / 2 - paddleHeight / 2);
	paddleB = createVector(width - paddleWidth * 2, height / 2 - paddleHeight / 2);
	ball = createVector(width / 2, height / 2);



	imgContainer.hide();
	console.log('Carico modello...');
	createDetector().then((res) => {
		detector = res;
		console.log('Modello caricato.');
	});
}

async function preload() {
	img = loadImage('GAME__OVER.png');
	img2 = loadImage('YOU_WIN.png');
}

async function draw() {
	translate(width, 0);
	scale(-1, 1);
	image(video, 0, 0, width, height);
	scale(-1, 1);
	translate(-width, 0);
	// background(0);
	// dashedLine(); // Aggiungi la linea tratteggiata
	drawPaddles();
	moveBall();
	drawBall();
	
	// if (handedness === 'Right') {}
	// if (handedness === 'Left') {}

	if (detector && capture.loadedmetadata) {
		detector.estimateHands(capture.elt, { flipHorizontal: true }).then((hands) => {
			for (let j = 0; j < hands.length; j++) {
				const hand = hands[j];
				if (hand.handedness == 'Left') {
					movePaddleA(hand); // Chiamata alla funzione movePaddleA con le informazioni sulla mano
				}
				if (hand.handedness == 'Right') {
					movePaddleB(hand)
				}
			}
		});
	}

	// fill(250);
	// text('Player 1: ' + Player1, 10, 20);
	// text('Player 2: ' + Player2, 10, 40);

	// if (Player1 >= 10 || Player2 >= 10) { gameOver = true }

	// if (gameOver) {
	// 	if (Player1 <= 10) {
	// 		showGameOver();
	// 	} else if (Player1 >= 10) {
	// 		showGameWon();
	// 	}

	// 	if (Player2 >= 10) {
	// 		showGameWon();
	// 	} else if (Player2 <= 10) {
	// 		showGameOver();
	// 	}

	// }
	fill(250);
	text('Player 1: ' + Player1, 10, 20);
	text('Player 2: ' + Player2, 10, 40);
}

// function draw() {
//   translate(width, 0);
// 		scale(-1, 1);
// 		image(video, 0, 0, width, height);
// 		scale(-1, 1);
// 		translate(-width, 0);
//   background(0);
//   // dashedLine(); // Aggiungi la linea tratteggiata
//   movePaddleA();
//   moveBall();
//   drawPaddles();
//   drawBall();

//   fill(250);
//   text('Player 1: ' + Player1, 10, 20);
//   text('Player 2: ' + Player2, 10, 40);

//   if (Player1 >= 10 || Player2 >= 10) {
//     gameOver = true;
//   }

//   if (gameOver) {
//     if (Player1 <= 10) {
//       showGameOver();
//     } else if (Player1 >= 10) {
//       showGameWon();
//     }

//     if (Player2 >= 10) {
//       showGameWon();
//     } else if (Player2 <= 10) {
//       showGameOver();
//     }


//   }


//       fill(250);
//       text('Player 1: ' + Player1, 10, 20);
//       text('Player 2: ' + Player2, 10, 40);

//       if (detector && capture.loadedmetadata) {
//         detector.estimateHands(capture.elt, {
//           flipHorizontal: true
//         }).then((hands) => {
//           for (let j = 0; j < hands.length; j++) {
//             const hand = hands[j];
//             movePaddleA(hand); // Chiamata alla funzione movePaddleA con le informazioni sulla mano
//           }
//         });
//       }

//       // ...
//     }

function showGameOver() {
	// background(0);
	if (Player1 >= 10) {
		image(img2, 10, height / 2 - imgSize / 2, imgSize, imgSize);
		image(img, width - imgSize - 10, height / 2 - imgSize / 2, imgSize, imgSize);
		noLoop();

	} else {
		image(img, 10, height / 2 - imgSize / 2, imgSize, imgSize);
		image(img2, width - imgSize - 10, height / 2 - imgSize / 2, imgSize, imgSize); // Aggiunta della virgola qui
		noLoop();
	}
}

// function showGameWon() {
//   background(0);
//   image(img2, width / 2 - imgSize / 2, height / 2 - imgSize / 2, imgSize, imgSize);
//   noLoop(); // Ferma l'aggiornamento del gioco
// }

// function resetGame() {
// 	Player1 = 0;
// 	Player2 = 0;
// 	gameOver = false;
// 	loop(); // Riprende l'aggiornamento del gioco
// }

// function keyPressed() {
// 	if (gameOver && keyCode === ENTER) {
// 		resetGame();
// 	}
// }
//   function dashedLine() {
// stroke(255);
// strokeWeight(2);
// let x = width / 2;
// for (let y = 0; y <= height; y += 10) {
//   line(x, y, x, y + 5);
// }
// }
// function movePaddleA(hand) {
//   if (hand.medio) {
//     paddleA(hand.medio, hand.keypoints[8].x, hand.keypoints[8].y);
//     console.log('medio');
//   }
// }

// function movePaddleA(hand) {
//   if (hand) {
//     const medio = hand.landmarks[8]; // Ottiene la posizione del dito medio
//     if (medio) {
//       const x = medio[0];
//       const y = medio[1];
//       paddleA.y = y - paddleHeight / 2; // Imposta la coordinata y del paddle A in base alla posizione del dito medio
//     }
//   }
// }
function moveBall() {
	ball.x += ballSpeedX;
	ball.y += ballSpeedY;

	if (ball.y < 0 || ball.y > height - ballSize) {
		ballSpeedY *= -1;
	}

	if (ball.x < paddleA.x + paddleWidth && ball.y > paddleA.y && ball.y < paddleA.y + paddleHeight) {
		ballSpeedX *= -1;
		ballSpeedY = map(ball.y - (paddleA.y + paddleHeight / 2), -paddleHeight / 2, paddleHeight / 2, -3, 3);
	}

	if (ball.x > paddleB.x - ballSize && ball.y > paddleB.y && ball.y < paddleB.y + paddleHeight) {
		ballSpeedX *= -1;
		ballSpeedY = map(ball.y - (paddleB.y + paddleHeight / 2), -paddleHeight / 2, paddleHeight / 2, -3, 3);
	}

	if (ball.x < 0) {
		Player2++;
		reset();
	}

	if (ball.x > width) {
		Player1++;
		reset();
	}
}
clear()
function drawBall() {
	fill(255);
	ellipse(ball.x, ball.y, ballSize, ballSize);
}

function reset() {
	ballSpeedX *= -1;
	ball.x = width / 2;
	ball.y = height / 2;
}

function drawPaddles() {
	fill(255);
	rect(paddleA.x, paddleA.y, paddleWidth, paddleHeight);
	rect(paddleB.x, paddleB.y, paddleWidth, paddleHeight);
}


function movePaddleA(hand) {
	if (hand) {
		const medio = hand.keypoints[9]; // Ottiene la posizione del dito medio
		// const x = medio[0];
		paddleA.y = (medio.y - paddleHeight) / 1; // Imposta la coordinata y del paddle A in base alla posizione del dito medio
		fill(255);
		rect(paddleA.x, paddleA.y, paddleWidth, paddleHeight);
	}
}
function movePaddleB(hand) {
	if (hand.handedness) {
		const medio = hand.keypoints[5]; // Ottiene la posizione del dito medio
		// const x = medio[0];
		paddleB.y = (medio.y - paddleHeight) / 1; // Imposta la coordinata y del paddle A in base alla posizione del dito medio
		fill(255);
		rect(paddleB.x, paddleB.y, paddleWidth, paddleHeight);
	}
}



// if (Player1 >= 10 || Player2 >= 10) {
// 	gameOver = true;
// 	if (keyIsPressed && (key === 'Enter' || key === 'Enter')) {
// 		reset();
// 	}


// }
function showGameOver() {
	// background(0);
	if (Player1 >= 10) {
		image(img2, 10, height / 2 - imgSize / 2, imgSize, imgSize);
		image(img, width - imgSize - 10, height / 2 - imgSize / 2, imgSize, imgSize);
		noLoop();

	} else {
		image(img, 10, height / 2 - imgSize / 2, imgSize, imgSize);
		image(img2, width - imgSize - 10, height / 2 - imgSize / 2, imgSize, imgSize); // Aggiunta della virgola qui
		noLoop();
	}
}

function resetGame() {
	Player1 = 0;
	Player2 = 0;
	gameOver = false;
	loop(); // Riprende l'aggiornamento del gioco
}

function keyPressed() {
	if (gameOver && keyCode === ENTER) {
		resetGame();
	}
}

async function createDetector() {
	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: 'mediapipe',
		modelType: 'full',
		maxHands: 2,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`
	};
	return window.handPoseDetection.createDetector(
		window.handPoseDetection.SupportedModels.MediaPipeHands,
		mediaPipeConfig
	);
}
