
$().ready(function() {
	
	// validate signup form on keyup and submit
	$("#settingsForm").validate({
		rules: {
			numberOfBalls: {
				required: true,
               // regex: /^[0-9]*$/,
                range: [50, 90]
			},
			timeForAGame: {
				required: true,
                range: [60, Infinity]
			},
			numOfMonsters: {
				required: true,
				range: [1, 4]
            },
            
		},
		messages: {
            numberOfBalls: {
                required: "Please enter a number of balls",
                regex: "Please enter a valid number ",
                range: "Please enter a number in the range"
            },
			timeForAGame: {
				required: "Please enter time for a one game",
                range: "Please enter at least 60 seconds"
			},
			numOfMonsters: {
				required: "Please enter a number of monsters",
				range: "Please enter a number in the range"
			},
		},
		
		submitHandler: function(){
			var isValid = $("#settingsForm").valid();
            if (color5p == color15p || color15p == color25p || color5p == color25p){
                window.alert("you should pick 3 different colors of balls"); 
            }
    
            else if(isValid){
                setSettings();
                document.getElementById("settingsForm").reset();
                switchDivs('gameBoard')
			}
		}
		
	});
    });
    

function setRandomSettings(){
    setDefaultKeyBoards();
    setRandomNumberOfBalls();
    setRandomTimeOfGame();
    setRandomColors();
    setRandomNumberOfMonsters();
    lblNumOfBalls.value = food_remain;
    lblcolor5p.value = color5p; 
	lblcolor15p.value = color15p; 
	lblcolor25p.value = color25p;
	lblNumOfMonsters.value = numberOfMonsters;  
    document.getElementById("settingsForm").reset();
    switchDivs('gameBoard');
}

function checkBoxColors5(id) {
	color5p = document.getElementById(id).value;
}

function checkBoxColors15(id) {
	color15p = document.getElementById(id).value;
}

function checkBoxColors25(id) {
	color25p = document.getElementById(id).value;
}

function  setDefaultKeyBoards(){

}

function setRandomNumberOfBalls(){
    var random1 =  Math.floor(Math.random() * 40) + 50;
    food_remain = random1;
}

function setRandomTimeOfGame(){
    var random1 =  Math.floor(Math.random() * 60) + 60;
    totalTimeGame = random1;
}

function setRandomColors(){
    var colors = ["red", "yellow", "green", "blue", "purple"];
    var random1 = Math.floor(Math.random() * 5);
    var random2 = Math.floor(Math.random() * 5);
    var random3 = Math.floor(Math.random() * 5);
    while(random1 == random2 || random2 == random3 || random1 == random3){
        random1 = Math.floor(Math.random() * 5);
        random2 = Math.floor(Math.random() * 5);
        random3 = Math.floor(Math.random() * 5);
    }
    color5p = colors[random1];
    color15p = colors[random2];
    color25p = colors[random3];
}

function setRandomNumberOfMonsters(){
    var random1 =  Math.floor(Math.random() * 4) + 1;
    numberOfMonsters = random1;
}
 