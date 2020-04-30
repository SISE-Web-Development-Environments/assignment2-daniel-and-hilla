
$().ready(function() {
	debugger
	// validate signup form on keyup and submit
	$("#signupForm").validate({
		rules: {
			numberOfBalls: {
				required: true,
                regex: /^[0-9]+$/,
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
			var isValid = $("#signupForm").valid();
			if(isValid){
                //save details - add function and move to game 
                saveDetails();
                switchDivs(settings);
				$("#signupForm").reset();
			}
		}
		
	});
    });
    

function setRandomSettings(){

}