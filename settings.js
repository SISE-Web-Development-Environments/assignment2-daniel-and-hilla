
$().ready(function() {
   
	//keys
document.getElementById('keyboardsButtonRight').addEventListener('keydown', (event)=>{
    right = event.keyCode;
    document.getElementById('keyboardsButtonRight').value = event.key;
    rightKeylbl.value = right;
});

let txtL = document.getElementById('keyboardsButtonLeft');
txtL.addEventListener('keydown', (event)=>{
    left = event.keyCode;
    document.getElementById("keyboardsButtonLeft").value = event.key;
    leftKeylbl.value = left;
});

let txtD = document.getElementById('keyboardsButtonDown');
txtD.addEventListener('keydown', (event)=>{
    down = event.keyCode;
    document.getElementById("keyboardsButtonDown").value = event.key;
    downKeylbl.value = down;
});

let txtU = document.getElementById('keyboardsButtonUp');
txtU.addEventListener('keydown', (event)=>{
    up = event.keyCode;
    document.getElementById("keyboardsButtonUp").value = event.key;
    upKeylbl.value = up;
});
 

// validate signup form on keyup and submit
	$("#settingsForm").validate({
		rules: {
			numberOfBalls: {
				required: true,
                //regex: /^[0-9]*$/,
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
            var validKeys = isDiffrenetKeys();
            var validColors = isDifferentColors();
            var isValid = $("#settingsForm").valid() && validKeys && validColors;
            if(isValid){
                setSettings();
                document.getElementById("settingsForm").reset();
                switchDivs('gameBoard')
			}else{
                if (!validColors){
                window.alert("you should pick 3 different colors of balls"); 
               }
               if(!validKeys){
                window.alert("you should pick four different keys"); 
             }
            }
            
		}
		
    });
 
    

    // document.getElementById('aboutDialog').addEventListener('click', (e)=>{   
    //     	if (!(document.getElementById('aboutDialog').contains(e.target))){
    //     		closeAboutDialog();
    //     	} 
    //     });

    });
    
    function isDifferentColors(){
        if (color5p == color15p || color15p == color25p || color5p == color25p){
            return false;
        }
        return true;
    }
    function isDiffrenetKeys(){
        if(right == left || right == up || right == down || left == up || left == down || up == down){
            return false;
        }
        return true;
    }

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
    up = 38;
    upKeylbl.value = up;
    down = 40;
    downKeylbl.value = down;
    right = 39;
    rightKeylbl.value = right;
    left = 37;
    leftKeylbl.value = left;
}

function setRandomNumberOfBalls(){
    var random1 =  Math.floor(Math.random() * 40) + 50;
    food_remain = random1;
}

function setRandomTimeOfGame(){
    var random1 =  Math.floor(Math.random() * 60) + 60;
    totalTimeGame = random1;
    lblTotalGameTime.value = totalTimeGame; 
}

function setRandomColors(){
    var colors = ["red", "orange", "green", "blue", "purple"];
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

function playOrStopMusic(){
    if(isPlay){
        music.pause();
        isPlay=false;
    }
    else{
        music.play();
        isPlay=true;
    }
    // document.getElementById("musicBtn").style.background="url('images/music-icon1.jpg')"; 
}





