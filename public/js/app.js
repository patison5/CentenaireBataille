window.onload = function () {

	var registrationForm = document.getElementById("js-registration__form"),
		loginForm 		 = document.getElementById("js-login__form"),
		swapFormBtn = document.getElementsByClassName('js-swap_form-btn');

	var _isLoginForm = true;

	var loginSubmit 		 = document.getElementById('js-login__submit'),
		registrationSubmit 	 = document.getElementById('js-registration__submit'),
		connectServerSubmit  = document.getElementById('js-connect_server__submit'),
		changeNicknameInput	 = document.getElementById('js-change_nickname-input');

	var userData = {
		nickname: "Ebanashka",
		id: "#1234"
	};



	for (let i = 0; i < swapFormBtn.length; i++) {
		swapFormBtn[i].addEventListener('click', function (e) {
			e.preventDefault();

			_isLoginForm = !_isLoginForm;

			if (!_isLoginForm) {
				loginForm.style.display = 'none';
				registrationForm.style.display = 'block';
			} else {
				loginForm.style.display = 'block';
				registrationForm.style.display = 'none';
			}
		})
	}



	// loginSubmit action
	loginSubmit.addEventListener('click', function (e) {
		e.preventDefault();

		let data = {
			userName: document.getElementById('js-login_login').value,
			userPassword: document.getElementById('js-login_password').value
		}

		$.ajax({
			type: "post",
			url: "/api/auth/login", 
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data:  JSON.stringify(data,null, 2)
		}).done(function ( data ) { 
			console.log(data); 
		});
	})


	// registrationSubmit action
	registrationSubmit.addEventListener('click', function (e) {
		e.preventDefault();

		let data = {
			userName: document.getElementById('js-registration_login').value,
			userPassword: document.getElementById('js-registration_password').value
		}

		$.ajax({
			type: "post",
			url: "/api/auth/register", 
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data:  JSON.stringify(data,null, 2)
		}).done(function ( data ) { 
			console.log(data); 
		});
	})


	// connect_server__submit action
	connectServerSubmit.addEventListener('click', function (e) {
		e.preventDefault();

		let data = {
			userNickname: userData.nickname,
			serverId: document.getElementById('js-server_id').value
		}


		$.ajax({
			type: "post",
			url: "/api/connect/", 
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data:  JSON.stringify(data,null, 2)
		}).done(function ( data ) { 
			console.log(data); 
		});

		console.log(data)
	})


	changeNicknameInput.addEventListener('keyup', function (e) {
		e.preventDefault();

		userData.nickname = this.value
	})

}