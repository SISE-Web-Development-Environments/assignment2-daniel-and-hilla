
$().ready(function() {
	
	// validate signup form on keyup and submit
	$("#logInForm").validate({
        
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 6
			},

			email: {
				required: true,
				email: true
			},
		},
		messages: {
				username: {
					required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long"
				},
				email: "Please enter a valid email address",
		},
		
		submitHandler: function(){
			var isValid = $("#logInForm").valid();
			if(isValid){
                //chack details - add function and move to game 
                checkDetails();
				
			}
		}
		
	});
    });
    
    function checkDetails(){
        
        var userName = logInForm.usernameLogIn.value;
        var password = logInForm.passwordLogIn.value;
        var email = logInForm.emailLogIn.value;
        var value = localStorage.getItem(email);
        if(value == userName+password){
            lblUserName.value = userName;
            document.getElementById("logInForm").reset();
            switchDivs('settings');
        }
        else{
            showIncorrectDetailsDialog();
            switchDivs('welcome');
        }
       
    }

    function  showIncorrectDetailsDialog(){
        document.getElementById("incorrectDetailsDialog").showModal();
    }