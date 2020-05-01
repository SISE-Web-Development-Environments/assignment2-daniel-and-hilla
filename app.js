var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var color5p;
var color15p;
var color25p;
var totalTimeGame;
var numberOfMonsters;
var food_remain;
var up=37;
var down=39;
var right=40;
var left=38;
var lastMove;

$(document).ready(function() {
		switchDivs('welcome')
		context = canvas.getContext("2d");
		
});

function Start() {
	var food5p = food_remain*0.6;
	var food15p = food_remain*0.3;
	var food25p = food_remain*0.1;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 12; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 12; j++) {
			if (
				(i == 3 && j == 3) || (i == 8 && j == 6) ||
				(i == 3 && j == 4) || (i == 7 && j == 8) ||
				(i == 3 && j == 5) || (i == 1 && j == 6) ||
				(i == 6 && j == 1) || (i == 0 && j == 3) ||
				(i == 6 && j == 2) || (i == 4 && j == 0) ||
				(i == 0 && j == 0) || (i == 4 && j == 0)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food5p) / cnt) {
					food5p--;
					board[i][j] = 5;
				} else 
				if (randomNum < (1.0 * (pacman_remain + food5p)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}

	while (food5p > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food5p--;
	}
	while (food15p > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		food15p--;
	}
	while (food25p > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		food25p--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	
	
	interval = setInterval(UpdatePosition, 250);

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 11 + 1);
	var j = Math.floor(Math.random() * 11 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 11 + 1);
		j = Math.floor(Math.random() * 11 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[left]) {  //left
		return 1;
	}
	if (keysDown[right]) { //right
		return 2;
	}
	if (keysDown[up]) { //up
		return 3;
	}
	if (keysDown[down]) { //down
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 40 + 20;
			center.y = j * 40 + 20;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, -1.15 , 1.45 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x - 8, center.y - 12, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) { //food 5 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color5p; //color
				context.fill();
			} else if (board[i][j] == 15) { //food 5 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color15p; //color
				context.fill();
			} else if (board[i][j] == 25) { //food 5 points
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = color25p; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 40, 40);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	lastMove = x;
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 11 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score +=5;
		lblScore.value = score;
	}
	else if(board[shape.i][shape.j] == 15){
		score +=15;
		lblScore.value = score;
	}
	else if(board[shape.i][shape.j] == 25){
		score +=25;
		lblScore.value = score;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else if(totalTimeGame < time_elapsed) {
		window.clearInterval(interval);
		window.alert("Game Over!!!");
	}
	else{
		Draw();
	}
}

function switchDivs(id){

		var welcome = document.getElementById('welcome');
	    welcome.style.visibility="hidden";
		var register = document.getElementById('register');
	    register.style.visibility="hidden";
		var logIn = document.getElementById('logIn');
		logIn.style.visibility="hidden";
		var settings = document.getElementById('settings');
	    settings.style.visibility="hidden";
		var gameBoard = document.getElementById('gameBoard');
		gameBoard.style.visibility="hidden";


	//show only one section	    	
	var selected = document.getElementById(id);			
	selected .style.visibility="visible";			

	if(id == 'gameBoard'){
		Start(); 
	}

}

function pickDate() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
}

function showAboutDialog() { 
	document.getElementById("aboutDialog").showModal(); 
} 

function closeAboutDialog() { 
	document.getElementById("aboutDialog").close(); 
}

function setSettings(){
	food_remain = settingsForm.numberOfBalls.value;
	lblNumOfBalls.value = food_remain;
	//color5p = settingsForm.colorsBalls1.value;
	lblcolor5p.value = color5p; 
	// color15p = settingsForm.colorsBalls2.value;
	lblcolor15p.value = color15p; 
	// color25p = settingsForm.colorsBalls3.value;
	lblcolor25p.value = color25p;
	numberOfMonsters = settingsForm.numOfMonsters.value;
	lblNumOfMonsters.value = numberOfMonsters;  
	totalTimeGame = settingsForm.timeForAGame.value;
}

