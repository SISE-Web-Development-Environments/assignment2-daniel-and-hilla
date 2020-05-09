
$.validator.addMethod("regex",
                function (value, element, regexp) {
                    var re = new RegExp(regexp);
                    return this.optional(element) || re.test(value);
                },"Please check your input."
            );


$().ready(function() {
	// validate signup form on keyup and submit
	
	$("#signupForm").validate({
		rules: {
			firstname: {
				required: true,
				regex: /^([^0-9]*)$/
			},
			lastname: {
				required: true,
				regex: /^([^0-9]*)$/
			},
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				regex: /^[a-zA-Z0-9]*$/,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
		},
		messages: {
				firstname: {
					required: "Please enter a firstname",
                    regex: "Your firstname must contain only letters"
				},
				lastname:{
					required: "Please enter a lastname",
                    regex: "Your lastname must contain only letters"
				},
				username: {
					required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 6 characters long"
				},
				confirm_password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 6 characters long",
					equalTo: "Please enter the same password as above"
				},
				email: "Please enter a valid email address",
		},
		
		submitHandler: function(){
			var isValid = $("#signupForm").valid();
			if(isValid){
                //save details - add function and move to game 
                saveDetails();
				document.getElementById("signupForm").reset();
				switchDivs('settings');
				document.getElementById("settingsButton").style.display = "block";
			}
			else{
				document.getElementById("signupForm").reset();
			}
		}
	});

    });
    
    function saveDetails(){
        var userName = signupForm.username.value;
        var password = signupForm.password.value;
		sessionStorage.setItem(userName, password);
		automaticLogIn(userName);
	} 
	
	function automaticLogIn(userName){
		lblUserName.value = "Hello " + userName;
	}

