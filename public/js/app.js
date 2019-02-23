window.onload = function () {

	var _isLoginForm = true;

	var registrationFrom = document.getElementById("js-registration__form"),
		loginForm = document.getElementById("js-login__form"),
		swapFormBtn = document.getElementsByClassName('js-swap_form-btn');


		swapFormBtn[0].addeventlistener('click', function () {
			console.log('e')
		})


	for (let i = 0; i < swapFormBtn.length; i++) {

		console.log(swapFormBtn[i])



		
		// swapFormBtn[i].addeventlistener('click', function (e) {
		// 	e.preventdefault();
		// 	console.log(e)

		// 	_isloginform = !_isloginform;

		// 	if (!_isloginform) {
		// 		loginform.style.display = 'none';
		// 		registrationfrom.style.display = 'block';
		// 	} else {
		// 		loginform.style.display = 'block';
		// 		registrationfrom.style.display = 'none';
		// 	}
		// })
	}

}


console.log('hello')