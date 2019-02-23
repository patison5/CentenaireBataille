window.onload = function () {

	var registrationForm = document.getElementById("js-registration__form"),
		loginForm 		 = document.getElementById("js-login__form"),
		swapFormBtn = document.getElementsByClassName('js-swap_form-btn');

	var _isLoginForm = true;

	var loginSubmit 			= document.getElementById('js-login__submit'),
		registrationSubmit 	= document.getElementById('js-registration__submit'),
		connectServerSubmit  = document.getElementById('js-connect_server__submit'),
		changeNicknameInput	= document.getElementById('js-change_nickname-input');

	var data = {
		nickname: "defUser",
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

		console.log(this)

		console.log('clicked loginSubmit')		
	})


	// registrationSubmit action
	registrationSubmit.addEventListener('click', function (e) {
		e.preventDefault();

		console.log(this)

		console.log('clicked registrationSubmit')		
	})


	// connect_server__submit action
	connectServerSubmit.addEventListener('click', function (e) {
		e.preventDefault();

		console.log(this)

		console.log('clicked connect_server__submit')		
	})


	changeNicknameInput.addEventListener('keyup', function (e) {
		e.preventDefault();

		data.nickname = this.value
	})

}