
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
			if(isValid){
                // move to game 
                
                setSettings();
                document.getElementById("settingsForm").reset();
                switchDivs('gameBoard');
                
			}
		}
		
	});
    });
    

function setRandomSettings(){

}

function checkBoxColors5(input) {
	
    $('input[type="checkbox"]').on('change', function() {
		$('input[name="' + input.name + '"]').not(input).prop('checked', false);
		input.prop('checked', true);
	});
	
	color5p = input.value;
}

function checkBoxColors15(input) {
    
    $('input[type="checkbox"]').on('change', function() {
        $('input[name="' + input.name + '"]').not(input).prop('checked', false);
	});
	
	color15p = input.value;
}

function checkBoxColors25(input) {
    
    $('input[type="checkbox"]').on('change', function() {
        $('input[name="' + input.name + '"]').not(input).prop('checked', false);
	});
	
	color25p = input.value;
}

 