var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monstersInterval; 
var color5p;
var color15p;
var color25p;
var totalTimeGame;
var numberOfMonsters;
var monstersArray; //saves the monsters locations
var bonusLocation; 
var cellContant; 
var bonusCellContant;
var food_remain;
var up = 38;
var down = 40;
var right = 39;
var left = 37;
var lastMove;
var isPlay=false;
var music;
var wasEatTime = false;
var wasEatLife = false;
var wasEatBonus = false;
var foodCounter = 0;

$(document).ready(function() {
		switchDivs('welcome');
		context = canvas.getContext("2d");
		music = document.getElementById('musicPac');
		init();
		document.getElementById("settingsButton").style.display = "none";
});

function init(){
	var userName = "p";
	var password = "p";
	sessionStorage.setItem(userName, password);
}


function Start() {
	lastMove = 4;
	lblLife.value = 5; 
	monstersArray =[[0,0],[0,11],[11,0],[11,11]];
	cellContant = [0,0,0,0]; 
	bonusCellContant = 0; 
	var food5p = food_remain*0.6;
	var food15p = food_remain*0.3;
	var food25p = food_remain*0.1;
	foodCounter = food5p + food15p + food25p;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var pacman_remain = 1;
	start_time = new Date();
	var monstersLeft=numberOfMonsters;
	for (var i = 0; i < 12; i++) {
		board[i] = new Array();
		
		for (var j = 0; j < 12; j++) {
			//put the monsters in the corners
			if (monstersLeft > 0 && (i == 0 && j == 0) ){
				board[i][j] = 3; 
				monstersLeft--; 
			}
			if (monstersLeft > 0 && (i == 11 && j == 0) ){
				board[i][j] = 3; 
				monstersLeft--; 
			}
			if (monstersLeft > 0 && (i == 0 && j == 11) ){
				board[i][j] = 3; 
				monstersLeft--; 
			}
			if (monstersLeft > 0 && (i == 11 && j == 11) ){
				board[i][j] = 3; 
				monstersLeft--; 
			}
			//init the walls
			if (
				(i == 1 && j == 2) || (i == 2 && j == 2) ||
				(i == 3 && j == 2) || (i == 10 && j == 2) ||
				(i == 9 && j == 2) || (i == 8 && j == 2) ||
				(i == 1 && j == 3) || (i == 10 && j == 3) ||
				(i == 1 && j == 3) || (i == 10 && j == 3) ||
				(i == 1 && j == 3) || (i == 10 && j == 3) ||
				(i == 1 && j == 9) || (i == 2 && j == 9) ||
				(i == 3 && j == 9) || (i == 10 && j == 9) ||
				(i == 9 && j == 9) || (i == 8 && j == 9) ||
				(i == 10 && j == 8) || (i == 1 && j == 8) ||
				(i == 3 && j == 5) || (i == 3 && j == 6) ||
				(i == 8 && j == 5) || (i == 8 && j == 6) 

			) {
				board[i][j] = 4;
			}
			else if (board[i][j] != 3){
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
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 7; //medicine
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 8; //clock
	emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 10; //bonus
	bonusLocation = [emptyCell[0],emptyCell[1]]; 
	
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
	interval = setInterval(UpdatePosition, 100);
	monstersInterval = setInterval(UpdateMonstersPosition, 500);
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
	if (keysDown[up]) {  //up
		return 1;
	}
	if (keysDown[down]) { //down
		return 2;
	}
	if (keysDown[left]) { //left
		return 3;
	}
	if (keysDown[right]) { //right
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	var monstersCount = 1;
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 38 + 18;
			center.y = j * 38 + 18;
			if (board[i][j] == 3 && monstersCount<=4) { //monster
				var monster = new Image();
				monster.src = "images/monster-"+ monstersCount + ".jpg";
				context.drawImage(monster, center.x-15, center.y-15, 30, 30); 
				monstersCount++; 
			}
			else if (board[i][j] == 2) { 
				if (lastMove == 1){
					context.beginPath();
					context.arc(center.x, center.y, 15, -1.15 , 1.45 * Math.PI); // face up
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 4, center.y - 5, 4, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (lastMove == 2){
					context.beginPath();
					context.arc(center.x, center.y, 15, -4.2 , 0.4 * Math.PI); // face down
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 4, center.y - 8, 4, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (lastMove == 3){
					context.beginPath();
					context.arc(center.x, center.y, 15, -2.8 , 0.9 * Math.PI); // face to left
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 4, center.y - 8, 4, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (lastMove == 4){
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 , 1.85 * Math.PI); // face to right
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 4, center.y - 8, 4, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} 
			else if (board[i][j] == 5) { //food 5 points
				context.beginPath();
				context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = color5p; //color
				context.fill();
			} 
			else if (board[i][j] == 15) { //food 15 points
				context.beginPath();
				context.arc(center.x, center.y, 9, 0, 2 * Math.PI); // circle
				context.fillStyle = color15p; //color
				context.fill();
			} 
			else if (board[i][j] == 25) { //food 25 points
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = color25p; //color
				context.fill();
			} 
			else if (board[i][j] == 4) { //wall
				context.beginPath();
				context.rect(center.x - 17, center.y - 17, 34, 34);
				context.fillStyle = "grey"; //color
				context.fill();
			} 
			else if (board[i][j] == 10) { //bonus
				var bonus = new Image();
				bonus.src = "images/gift.jpg";
				context.drawImage(bonus, center.x-10, center.y-10, 20, 20); 
			}	
			else if (board[i][j] == 7) { //medicine
				var heart = new Image();
				heart.src = "images/heart1.jpg";
				context.drawImage(heart, center.x-10, center.y-10, 20, 20); 
			}	
			else if (board[i][j] == 8) { //clock
				var clock = new Image();
				clock.src = "images/clock1.jpeg";
				context.drawImage(clock, center.x-10, center.y-10, 20, 20); 
			}	
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
		lastMove = x;
	}
	if (x == 2) { //down
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
		lastMove = x;
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
		lastMove = x;
	}
	if (x == 4) { //right
		if (shape.i < 11 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
		lastMove = x;
	}
	if (board[shape.i][shape.j] == 5) {
		score +=5;
		foodCounter--;
		lblScore.value = score;
	}
	else if(board[shape.i][shape.j] == 15){
		score +=15;
		foodCounter--;
		lblScore.value = score;
	}
	else if(board[shape.i][shape.j] == 25){
		score +=25;
		foodCounter--;
		lblScore.value = score;
	}
	else if(board[shape.i][shape.j] == 7){
		wasEatLife = true;
		lblLife.value++;
	}
	else if(board[shape.i][shape.j] == 8){
		wasEatTime = true
		totalTimeGame += 15; 
		lblTotalGameTime.value = totalTimeGame; 
	}
	if (didThePacmanFoundTheBonus()){
		wasEatBonus = true;
		score+=50; 
		lblScore.value = score;
		bonusLocation = [-1,-1]; 
		bonusCellContant = 0; 
	}
	if (didTheMonstersFoundMe()){
		score -= 10;
		lblScore.value = score;
		board[shape.i][shape.j] = 0;
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1]; 
		board[shape.i][shape.j] = 0;
		lblLife.value --; 
		resetMonstersPosition();
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 80 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (( foodCounter == 0) && wasEatBonus && wasEatLife && wasEatTime) {
		window.clearInterval(interval);
		window.clearInterval(monstersInterval); 
		isPlay = true;
		playOrStopMusic();
		window.alert("Winner!!!");
		switchDivs('settings'); 
	}
	else if(totalTimeGame < time_elapsed) {
		window.clearInterval(interval);
		window.clearInterval(monstersInterval); 
		if (score >= 100) {
			isPlay=true;
		    playOrStopMusic();
			window.alert("Winner!!!");
			switchDivs('settings'); 
		}
		else{
			isPlay=true;
	    	playOrStopMusic();
			window.alert("You are better then " + score + " points!");
			switchDivs('settings'); 
		}
		
	} else if(lblLife.value == 0) {
		window.clearInterval(interval);
		window.clearInterval(monstersInterval); 
		isPlay=true;
		playOrStopMusic();
		window.alert("Loser!");
		switchDivs('settings'); 
		
	} 
	else {
		Draw();
	}
}


function resetMonstersPosition(){
	for (var i = 0; i < numberOfMonsters; i++){
		if (cellContant[i]==2){
			board[monstersArray[i][0]][monstersArray[i][1]] = 0;
		}
		else{
			board[monstersArray[i][0]][monstersArray[i][1]] = cellContant[i];
		}
	}
	var monstersLeft = numberOfMonsters;
	if (monstersLeft > 0){
		board[0][0] = 3;
		monstersLeft--;
	}
	if (monstersLeft > 0){
		board[0][11] = 3; 
		monstersLeft--;
	}
	if (monstersLeft > 0){
		board[11][0] = 3; 
		monstersLeft--;
	}
	if (monstersLeft > 0){
		board[11][11] = 3; 
		monstersLeft--;
	}
	monstersArray = [[0,0],[0,11],[11,0],[11,11]];
	cellContant = [0,0,0,0];
}

function UpdateMonstersPosition() {
	for (var i = 0; i < numberOfMonsters; i++){
		if (monstersArray[i][0] < shape.i && board[monstersArray[i][0]+1][monstersArray[i][1]]!=4 && board[monstersArray[i][0]+1][monstersArray[i][1]]!=10
			&& board[monstersArray[i][0]+1][monstersArray[i][1]]!=3){
			if(cellContant[i] ==2){
				board[monstersArray[i][0]][monstersArray[i][1]] = 0;
			}
			else{
				board[monstersArray[i][0]][monstersArray[i][1]] = cellContant[i]; 
			}
			monstersArray[i][0]++; 
			cellContant[i] = board[monstersArray[i][0]][monstersArray[i][1]];
			board[monstersArray[i][0]][monstersArray[i][1]] = 3; 
		}
		else if (monstersArray[i][0] > shape.i && board[monstersArray[i][0]-1][monstersArray[i][1]]!=4 && board[monstersArray[i][0]-1][monstersArray[i][1]]!=10
			&& board[monstersArray[i][0]-1][monstersArray[i][1]]!=3){
				if(cellContant[i] ==2){
					board[monstersArray[i][0]][monstersArray[i][1]] = 0; 
					foundThePacman = true;  
				}
				else{
					board[monstersArray[i][0]][monstersArray[i][1]] = cellContant[i]; 
				}
			monstersArray[i][0]--; 
			cellContant[i] = board[monstersArray[i][0]][monstersArray[i][1]];
			board[monstersArray[i][0]][monstersArray[i][1]] = 3; 
		}
		else if (monstersArray[i][1] < shape.j && board[monstersArray[i][0]][monstersArray[i][1]+1]!=4 && board[monstersArray[i][0]][monstersArray[i][1]+1]!=10
			&& board[monstersArray[i][0]][monstersArray[i][1]+1]!=3){
				if(cellContant[i] ==2){
					board[monstersArray[i][0]][monstersArray[i][1]] = 0; 
				}
				else{
					board[monstersArray[i][0]][monstersArray[i][1]] = cellContant[i]; 
				}
			monstersArray[i][1]++; 
			cellContant[i] = board[monstersArray[i][0]][monstersArray[i][1]];
			board[monstersArray[i][0]][monstersArray[i][1]] = 3; 
		}
		else if (monstersArray[i][1] > shape.j && board[monstersArray[i][0]][monstersArray[i][1]-1]!=4 && board[monstersArray[i][0]][monstersArray[i][1]-1]!=10
			&& board[monstersArray[i][0]][monstersArray[i][1]-1]!=3){
				if(cellContant[i] ==2){
					board[monstersArray[i][0]][monstersArray[i][1]] = 0; 
				}
				else{
					board[monstersArray[i][0]][monstersArray[i][1]] = cellContant[i]; 
				}
			monstersArray[i][1]--; 
			cellContant[i] = board[monstersArray[i][0]][monstersArray[i][1]];
			board[monstersArray[i][0]][monstersArray[i][1]] = 3; 
		}

		if (didTheMonstersFoundMe()){
			score -= 10;
			lblScore.value = score;
			var emptyCell = findRandomEmptyCell(board);
			shape.i = emptyCell[0];
			shape.j = emptyCell[1]; 
			board[shape.i][shape.j] = 0;
			lblLife.value --; 
			resetMonstersPosition();
		}
	}
	if (bonusLocation[0] != -1){
		updateBonusPosition();
	}
}

function updateBonusPosition(){
	var moved = false; 
	while (!moved){
		var move = Math.floor(Math.random() * 3) + 1;
		if (move == 1) { //up
			if (bonusLocation[1] > 0 && board[bonusLocation[0]][bonusLocation[1] - 1] != 4 && board[bonusLocation[0]][bonusLocation[1]-1] != 3) {
				board[bonusLocation[0]][bonusLocation[1]] = bonusCellContant; 
				bonusLocation[1]--;
				bonusCellContant = board[bonusLocation[0]][bonusLocation[1]]; 
				board[bonusLocation[0]][bonusLocation[1]] = 10; 
				moved = true;
			}
		}
		if (move == 2) { //down
			if (bonusLocation[1] < 11 && board[bonusLocation[0]][bonusLocation[1] + 1] != 4 && board[bonusLocation[0]][bonusLocation[1] + 1] != 3) {
				board[bonusLocation[0]][bonusLocation[1]] = bonusCellContant; 
				bonusLocation[1]++;
				bonusCellContant = board[bonusLocation[0]][bonusLocation[1]]; 
				board[bonusLocation[0]][bonusLocation[1]] = 10; 
				moved = true;
			}
		}
		if (move == 3) { //left
			if (bonusLocation[0] > 0 && board[bonusLocation[0] - 1][bonusLocation[1]] != 4 && board[bonusLocation[0] - 1][bonusLocation[1]] != 3) {
				board[bonusLocation[0]][bonusLocation[1]] = bonusCellContant; 
				bonusLocation[0]--;
				bonusCellContant = board[bonusLocation[0]][bonusLocation[1]]; 
				board[bonusLocation[0]][bonusLocation[1]] = 10; 
				moved = true;
			}
		}
		if (move == 4) { //right
			if (bonusLocation[0] < 11 && board[bonusLocation[0] + 1][bonusLocation[1]] != 4 && board[bonusLocation[0] + 1][bonusLocation[1]] != 3) {
				board[bonusLocation[0]][bonusLocation[1]] = bonusCellContant; 
				bonusLocation[0]++;
				bonusCellContant = board[bonusLocation[0]][bonusLocation[1]]; 
				board[bonusLocation[0]][bonusLocation[1]] = 10; 
				moved = true;
			}
		}
	}
}

function didTheMonstersFoundMe(){
	for (var i=0; i<numberOfMonsters; i++){
		if(shape.i == monstersArray[i][0] && shape.j == monstersArray[i][1]){
			return true;
		}
	}
	return false; 
}

function didThePacmanFoundTheBonus(){
	if (shape.i==bonusLocation[0] && shape.j==bonusLocation[1]){
		board[shape.i][shape.j] = 2; 
		return true; 
	}
	return false; 
}

function switchDivs(id){

	window.clearInterval(interval);
	window.clearInterval(monstersInterval); 

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
	var gameSettings = document.getElementById('gameSettings');
	gameSettings.style.visibility="hidden";

	//show only one section	    	
	var selected = document.getElementById(id);			
	selected .style.visibility="visible";			

	if(id == 'gameBoard'){
		gameSettings.style.visibility="visible";
		playOrStopMusic();
		Start(); 	
	}

}

function pickDate() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
}


function closeIncorrectDetailsDialog(){
	document.getElementById("incorrectDetailsDialog").close(); 
}

function setSettings(){
	food_remain = settingsForm.numberOfBalls.value;
	lblNumOfBalls.value = food_remain;
	lblcolor5p.value = color5p; 
	lblcolor15p.value = color15p; 
	lblcolor25p.value = color25p;
	numberOfMonsters = settingsForm.numOfMonsters.value;
	lblNumOfMonsters.value = numberOfMonsters;  
	totalTimeGame = settingsForm.timeForAGame.value;
	lblTotalGameTime.value = totalTimeGame; 
}
