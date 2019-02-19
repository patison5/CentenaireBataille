window.onload = function () {

	var _isLoginForm = true;

	var registrationFrom = document.getElementById("js-registration__form"),
		loginForm = document.getElementById("js-login__form"),
		swapFormBtn = document.getElementById('js-swap_form');



	swapFormBtn.addEventListener('click', function (e) {
		e.preventDefault();

		_isLoginForm = !_isLoginForm;

		if (!_isLoginForm) {
			loginForm.style.display = 'none';
			registrationFrom.style.display = 'block';
		} else {
			loginForm.style.display = 'block';
			registrationFrom.style.display = 'none';
		}
	})
}


console.log('hello')