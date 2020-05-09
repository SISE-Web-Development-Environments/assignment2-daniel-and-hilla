
$().ready(function() {
	
	// validate signup form on keyup and submit
	$("#logInForm").validate({
        
		// rules: {
		// 	username: {
		// 		required: true,
		// 		minlength: 2
		// 	},
		// 	password: {
		// 		required: true,
		// 		regex: /^[a-zA-Z0-9]*$/,
		// 		minlength: 6
		// 	},

		// 	// email: {
		// 	// 	required: true,
		// 	// 	email: true
		// 	// },
		// },
		// messages: {
		// 		username: {
		// 			required: "Please enter a username",
        //             minlength: "Your username must consist of at least 2 characters"
		// 		},
		// 		password: {
		// 			required: "Please provide a password",
		// 			minlength: "Your password must be at least 6 characters long",
		// 			regex: "Please insert a valid password"
		// 		},
		// 		// email: "Please enter a valid email address",
		// },
		
		submitHandler: function(){
                checkDetails();	
		}
		
	});
    });
    
    function checkDetails(){
        
        var userName = logInForm.usernameLogIn.value;
        var password = logInForm.passwordLogIn.value;
        //var email = logInForm.emailLogIn.value;
        var value = sessionStorage.getItem(userName);
        if(value == password){
            lblUserName.value = "Hello " + userName;
            document.getElementById("logInForm").reset();
			switchDivs('settings');
			document.getElementById("settingsButton").style.display = "block";
        }
        else{
            showIncorrectDetailsDialog();
            document.getElementById("logInForm").reset();
        }
       
    }

    function  showIncorrectDetailsDialog(){
        document.getElementById("incorrectDetailsDialog").showModal();
    }